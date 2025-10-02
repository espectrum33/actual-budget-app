import SwiftUI

struct BudgetView: View {
    @EnvironmentObject private var appState: AppState
    @State private var monthDate: Date = Date()
    @State private var budget: BudgetMonth?
    @State private var monthGroups: [BudgetMonthCategoryGroup] = []
    @State private var expandedGroups: Set<String> = []
    @State private var categoriesById: [String: String] = [:]
    @State private var accounts: [Account] = []
    @State private var payeesById: [String: Payee] = [:]
    @State private var transactions: [Transaction] = []
    @State private var errorMessage: String?

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                header()
                table()
            }
            .padding()
        }
        .background(LiquidBackground())
        .navigationTitle(monthTitle())
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                HStack(spacing: 12) {
                    Button { moveMonth(-1) } label: { Image(systemName: "chevron.left") }
                    Button { moveMonth(+1) } label: { Image(systemName: "chevron.right") }
                }
            }
        }
        .task { await loadAll() }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: { Text(errorMessage ?? "") }
    }

    private func header() -> some View {
        VStack(spacing: 8) {
            let available = budget?.totalBalance ?? 0
            let overspent = budget?.lastMonthOverspent ?? 0
            let budgeted = budget?.totalBudgeted ?? 0
            let forNext = budget?.forNextMonth ?? 0
            VStack(spacing: 6) {
                Text("Available funds").font(.caption).foregroundStyle(.secondary)
                Text(formatMoney(available)).font(.title3.bold()).monospacedDigit()
                HStack {
                    VStack { Text("Overspent in Sep").font(.caption).foregroundStyle(.secondary); Text(formatMoney(-overspent)).monospacedDigit() }
                    Spacer(minLength: 12)
                    VStack { Text("Budgeted").font(.caption).foregroundStyle(.secondary); Text(formatMoney(budgeted)).monospacedDigit() }
                    Spacer(minLength: 12)
                    VStack { Text("For next month").font(.caption).foregroundStyle(.secondary); Text(formatMoney(forNext)).monospacedDigit() }
                }
            }
            if let total = budget?.toBudget, total < 0 {
                VStack(spacing: 4) {
                    Text("Overbudgeted:").font(.caption).foregroundStyle(.secondary)
                    Text(formatMoney(total)).foregroundStyle(.red).font(.title2.bold()).monospacedDigit()
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding()
        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 16, style: .continuous))
    }

    private func table() -> some View {
        VStack(alignment: .leading, spacing: 12) {
            // Groups and categories
            ForEach(sortedGroups(), id: \.id) { group in
                let isExpanded = expandedGroups.contains(group.id)
                VStack(alignment: .leading, spacing: 8) {
                    // Group header row
                    Button(action: {
                        if isExpanded { expandedGroups.remove(group.id) } else { expandedGroups.insert(group.id) }
                    }) {
                        HStack(spacing: 12) {
                            Image(systemName: isExpanded ? "chevron.down" : "chevron.right").font(.caption.bold())
                            Text(group.name)
                                .font(.headline)
                                .lineLimit(1)
                                .truncationMode(.tail)
                                .layoutPriority(10)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                    }
                    .buttonStyle(PlainButtonStyle())
                    .padding(.horizontal)
                    .padding(.vertical, 8)
                    .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))

                    if !isExpanded {
                        HStack {
                            labeledAmount("Budgeted", group.budgeted ?? 0)
                            Spacer()
                            labeledAmount("Spent", abs(group.spent ?? 0))
                            Spacer()
                            labeledAmount("Balance", group.balance ?? 0)
                        }
                        .padding(.horizontal)
                    }

                    // Category rows
                    if isExpanded {
                        VStack(spacing: 6) {
                            ForEach(group.categories ?? [], id: \.id) { cat in
                                VStack(alignment: .leading, spacing: 6) {
                                    Text(cat.name)
                                        .font(.subheadline)
                                        .lineLimit(1)
                                        .truncationMode(.tail)
                                        .layoutPriority(10)
                                    HStack {
                                        labeledAmount("Budgeted", cat.budgeted ?? 0)
                                        Spacer()
                                        labeledAmount("Spent", abs(cat.spent ?? 0))
                                        Spacer()
                                        labeledAmount("Balance", cat.balance ?? 0)
                                    }
                                }
                                .padding(.horizontal)
                                .padding(.vertical, 8)
                                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12, style: .continuous))
                            }
                        }
                    }
                }
                .padding(.bottom, 12)
            }
        }
    }

    private func labeledAmount(_ label: String, _ value: Int) -> some View {
        VStack(alignment: .trailing, spacing: 2) {
            Text(label).font(.caption2).foregroundStyle(.secondary)
            Text(formatMoney(value)).monospacedDigit()
        }
    }

    // removed progress bar per request

    private func sortedGroups() -> [BudgetMonthCategoryGroup] {
        // Place income group(s) at bottom if present
        let income = monthGroups.filter { $0.is_income == true }
        let spend = monthGroups.filter { $0.is_income != true }
        return spend + income
    }

    private func moveMonth(_ delta: Int) { monthDate = Calendar(identifier: .gregorian).date(byAdding: .month, value: delta, to: monthDate) ?? monthDate; Task { await loadAll() } }

    private func monthTitle() -> String {
        let f = DateFormatter(); f.dateFormat = "LLLL"; let y = DateFormatter(); y.dateFormat = "yyyy"; return "\(f.string(from: monthDate)) \(y.string(from: monthDate))"
    }

    private func monthRange(date: Date) -> (String, String) {
        let cal = Calendar(identifier: .gregorian)
        let comps = cal.dateComponents([.year, .month], from: date)
        let startDate = cal.date(from: comps) ?? date
        let endDate = cal.date(byAdding: DateComponents(month: 1, day: -1), to: startDate) ?? date
        return (format(date: startDate), format(date: endDate))
    }

    private func format(date: Date) -> String { let f = DateFormatter(); f.calendar = Calendar(identifier: .gregorian); f.dateFormat = "yyyy-MM-dd"; return f.string(from: date) }

    private func formatMoney(_ amount: Int) -> String { 
        return CurrencyFormatter.shared.format(amount, currencyCode: appState.currencyCode) 
    }

    private func client() throws -> ActualAPIClient {
        try ActualAPIClient(
            baseURLString: appState.baseURLString,
            apiKey: appState.apiKey,
            syncId: appState.syncId,
            budgetEncryptionPassword: appState.budgetEncryptionPassword,
            isDemoMode: appState.isDemoMode
        )
    }

    private func loadAll() async {
        do {
            async let cats = try client().fetchCategories()
            async let accs = try client().fetchAccounts()
            async let payees = try client().fetchPayees()
            let (catList, accList, payeeList) = try await (cats, accs, payees)
            let (start, _) = monthRange(date: monthDate)
            let txs = try await withThrowingTaskGroup(of: [Transaction].self) { group -> [[Transaction]] in
                for acc in accList { group.addTask { try await client().fetchTransactions(accountId: acc.id, since: start) } }
                var results: [[Transaction]] = []
                for try await list in group { results.append(list) }
                return results
            }
            let monthKey = String(format: "%04d-%02d", Calendar.current.component(.year, from: monthDate), Calendar.current.component(.month, from: monthDate))
            async let budgetMonth = try client().fetchBudgetMonth(monthKey)
            async let groups = try client().fetchBudgetMonthCategoryGroups(monthKey)
            let (bm, g) = try await (budgetMonth, groups)
            await MainActor.run {
                categoriesById = Dictionary(uniqueKeysWithValues: catList.map { ($0.id, $0.name) })
                accounts = accList
                payeesById = Dictionary(uniqueKeysWithValues: payeeList.map { ($0.id, $0) })
                transactions = txs.flatMap { $0 }
                budget = bm
                monthGroups = g
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }
}


