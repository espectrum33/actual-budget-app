import SwiftUI

struct DashboardView: View {
    @EnvironmentObject private var appState: AppState
    @State private var accounts: [Account] = []
    @State private var categoriesById: [String: String] = [:]
    @State private var payeesById: [String: Payee] = [:]
    @State private var transactions: [Transaction] = []
    @State private var errorMessage: String?
    @State private var showingAdd: Bool = false

    var onBudgetAccounts: [Account] { accounts.filter { !$0.offbudget } }

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                HStack(spacing: 16) {
                    metricCard(title: "Spent Today", value: spentToday())
                    metricCard(title: "Spent This Month", value: spentThisMonth())
                }
                HStack(spacing: 16) {
                    metricCard(title: "Spent Last Month", value: spentLastMonth())
                    metricCard(title: "On-budget Accounts", value: onBudgetAccounts.count, isMoney: false)
                }
                chartByDay()
                chartByCategory()

                // Recent transactions section
                VStack(alignment: .leading, spacing: 8) {
                    HStack {
                        Text("Recent Transactions").font(.headline)
                        Spacer()
                        NavigationLink("View All") { AllTransactionsView() }
                    }
                    ForEach(recentNonTransferOnBudget().prefix(5), id: \.id) { tx in
                        HStack {
                            VStack(alignment: .leading) {
                                Text(payeeText(tx)).font(.subheadline)
                                Text(tx.date).font(.caption).foregroundStyle(.secondary)
                            }
                            Spacer()
                            Text(formatMoney(abs(tx.amount ?? 0))).foregroundStyle(.red).monospacedDigit()
                        }
                        .padding(10)
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    }
                    Button {
                        showingAdd = true
                    } label: {
                        HStack {
                            Image(systemName: "plus.circle.fill")
                            Text("Add Transaction")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                    }
                }
            }
            .padding()
        }
        .background(LiquidBackground())
        .navigationTitle("Dashboard")
        .task { await load() }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
        .sheet(isPresented: $showingAdd) {
            // Quick add uses the first on-budget account by default
            if let firstAcc = onBudgetAccounts.first {
                TransactionsView(account: firstAcc)
            }
        }
    }

    private func client() throws -> ActualAPIClient {
        try ActualAPIClient(
            baseURLString: appState.baseURLString,
            apiKey: appState.apiKey,
            syncId: appState.syncId,
            budgetEncryptionPassword: appState.budgetEncryptionPassword
        )
    }

    private func load() async {
        do {
            async let accs = try client().fetchAccounts()
            async let cats = try client().fetchCategories()
            async let payees = try client().fetchPayees()
            let (accList, catList, payeeList) = try await (accs, cats, payees)
            let since = firstOfThisMonthMinus(days: 31)
            let txs = try await withThrowingTaskGroup(of: [Transaction].self) { group -> [[Transaction]] in
                for acc in accList { group.addTask { try await client().fetchTransactions(accountId: acc.id, since: since) } }
                var results: [[Transaction]] = []
                for try await list in group { results.append(list) }
                return results
            }
            await MainActor.run {
                accounts = accList
                categoriesById = Dictionary(uniqueKeysWithValues: catList.map { ($0.id, $0.name) })
                payeesById = Dictionary(uniqueKeysWithValues: payeeList.map { ($0.id, $0) })
                transactions = txs.flatMap { $0 }
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func metricCard(title: String, value: Int, isMoney: Bool = true) -> some View {
        VStack(alignment: .leading) {
            Text(title).font(.headline)
            Text(isMoney ? formatMoney(value) : String(value))
                .font(.title2.bold())
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private func spentToday() -> Int {
        let today = format(date: Date())
        let onBudgetIds = Set(onBudgetAccounts.map { $0.id })
        let todays = transactions.filter { $0.date == today && onBudgetIds.contains($0.account) && !isTransfer($0) }
        return -todays.map { $0.amount ?? 0 }.filter { $0 < 0 }.reduce(0, +)
    }

    private func spentThisMonth() -> Int {
        let (start, end) = monthRange(date: Date())
        let onBudgetIds = Set(onBudgetAccounts.map { $0.id })
        let list = transactions.filter { $0.date >= start && $0.date <= end && onBudgetIds.contains($0.account) && !isTransfer($0) }
        return -list.map { $0.amount ?? 0 }.filter { $0 < 0 }.reduce(0, +)
    }

    private func spentLastMonth() -> Int {
        let cal = Calendar(identifier: .gregorian)
        let lastMonthDate = cal.date(byAdding: .month, value: -1, to: Date()) ?? Date()
        let (start, end) = monthRange(date: lastMonthDate)
        let onBudgetIds = Set(onBudgetAccounts.map { $0.id })
        let list = transactions.filter { $0.date >= start && $0.date <= end && onBudgetIds.contains($0.account) && !isTransfer($0) }
        return -list.map { $0.amount ?? 0 }.filter { $0 < 0 }.reduce(0, +)
    }

    private func isTransfer(_ tx: Transaction) -> Bool {
        if tx.transfer_id != nil { return true }
        if let payeeId = tx.payee, let p = payeesById[payeeId], p.transfer_acct != nil { return true }
        return false
    }

    private func recentNonTransferOnBudget() -> [Transaction] {
        let onBudgetIds = Set(onBudgetAccounts.map { $0.id })
        return transactions.filter { onBudgetIds.contains($0.account) && !isTransfer($0) }.sorted { $0.date > $1.date }
    }

    private func chartByDay() -> some View {
        let (start, end) = monthRange(date: Date())
        let onBudgetIds = Set(onBudgetAccounts.map { $0.id })
        let buckets = Dictionary(grouping: transactions.filter { $0.date >= start && $0.date <= end && ( $0.amount ?? 0) < 0 && onBudgetIds.contains($0.account) && !isTransfer($0) }, by: { $0.date })
            .mapValues { -$0.compactMap { $0.amount }.reduce(0, +) }
        let days = sortedDatesBetween(start: start, end: end)
        return VStack(alignment: .leading, spacing: 8) {
            Text("This Month Spend (Daily)").font(.headline)
            HStack(alignment: .bottom, spacing: 4) {
                let maxVal = max(1, buckets.values.max() ?? 1)
                ForEach(days, id: \.self) { d in
                    let v = buckets[d] ?? 0
                    Rectangle()
                        .fill(Color.red.opacity(0.7))
                        .frame(width: 8, height: CGFloat(v) / CGFloat(maxVal) * 120.0)
                        .overlay(Text(String(d.suffix(2))).font(.system(size: 8)).foregroundStyle(.secondary), alignment: .bottom)
                }
            }
            .frame(height: 140)
            .padding(.vertical, 8)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
    }

    private func chartByCategory() -> some View {
        let (start, end) = monthRange(date: Date())
        let onBudgetIds = Set(onBudgetAccounts.map { $0.id })
        let catBuckets = Dictionary(grouping: transactions.filter { $0.date >= start && $0.date <= end && ( $0.amount ?? 0) < 0 && onBudgetIds.contains($0.account) && !isTransfer($0) }, by: { $0.category ?? "" })
            .mapValues { -$0.compactMap { $0.amount }.reduce(0, +) }
        let sortedCats = catBuckets.sorted { $0.value > $1.value }.prefix(6)
        return VStack(alignment: .leading, spacing: 8) {
            Text("Top Categories (This Month)").font(.headline)
            ForEach(Array(sortedCats), id: \.key) { key, value in
                HStack {
                    Text(categoriesById[key] ?? "Uncategorized").lineLimit(1)
                    Spacer()
                    Text(formatMoney(value)).monospacedDigit()
                }
                .padding(.horizontal)
            }
            .padding(.vertical, 8)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
        }
    }

    private func monthRange(date: Date) -> (String, String) {
        let cal = Calendar(identifier: .gregorian)
        let comps = cal.dateComponents([.year, .month], from: date)
        let startDate = cal.date(from: comps) ?? date
        let endDate = cal.date(byAdding: DateComponents(month: 1, day: -1), to: startDate) ?? date
        return (format(date: startDate), format(date: endDate))
    }

    private func sortedDatesBetween(start: String, end: String) -> [String] {
        let f = DateFormatter(); f.calendar = Calendar(identifier: .gregorian); f.dateFormat = "yyyy-MM-dd"
        guard let s = f.date(from: start), let e = f.date(from: end) else { return [] }
        var out: [String] = []
        var d = s
        while d <= e {
            out.append(f.string(from: d))
            d = Calendar(identifier: .gregorian).date(byAdding: .day, value: 1, to: d) ?? d
        }
        return out
    }

    private func firstOfThisMonthMinus(days: Int) -> String {
        let cal = Calendar(identifier: .gregorian)
        let comps = cal.dateComponents([.year, .month], from: Date())
        let start = cal.date(from: comps) ?? Date()
        let since = cal.date(byAdding: .day, value: -days, to: start) ?? start
        return format(date: since)
    }

    private func format(date: Date) -> String {
        let f = DateFormatter()
        f.calendar = Calendar(identifier: .gregorian)
        f.dateFormat = "yyyy-MM-dd"
        return f.string(from: date)
    }

    private func formatMoney(_ amount: Int) -> String {
        let f = NumberFormatter(); f.numberStyle = .currency
        return f.string(from: NSNumber(value: Double(amount)/100.0)) ?? String(amount)
    }

    private func payeeText(_ tx: Transaction) -> String {
        if let payeeId = tx.payee, let p = payeesById[payeeId] { return p.name }
        if let n = tx.payee_name, !n.isEmpty { return n }
        return "(No payee)"
    }
}
