import SwiftUI

struct AllTransactionsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var transactions: [Transaction] = []
    @State private var accounts: [Account] = []
    @State private var payeesById: [String: Payee] = [:]
    @State private var categoriesById: [String: String] = [:]
    @State private var balancesById: [String: Int] = [:]
    @State private var errorMessage: String?
    @State private var isLoading = false
    @State private var onBudgetOnly: Bool = true
    @State private var filterGranularity: Granularity = .day
    @State private var filterValue: Int = 30
    @State private var showingAdd: Bool = false

    enum Granularity: String, CaseIterable { case day = "Days", week = "Weeks", month = "Months", year = "Years" }

    var filteredTransactions: [Transaction] {
        let set = Set(onBudgetOnly ? accounts.filter { !$0.offbudget }.map { $0.id } : accounts.map { $0.id })
        return transactions
            .filter { set.contains($0.account) }
            .sorted { lhs, rhs in
                if lhs.date == rhs.date {
                    return stableKey(lhs) > stableKey(rhs)
                }
                return lhs.date > rhs.date
            }
    }

    private var listTransactions: [Transaction] {
        let since = sinceDateString()
        return filteredTransactions
            .filter { $0.date >= since }
            .filter { !isTransferToOnBudget($0) }
    }

    var onBudgetBalance: Int {
        let onIds = Set(accounts.filter { !$0.offbudget }.map { $0.id })
        return balancesById.filter { onIds.contains($0.key) }.map { $0.value }.reduce(0, +)
    }

    var body: some View {
        List {
            listHeader
                .listRowInsets(EdgeInsets())
                .listRowBackground(AppTheme.background)
            filtersBar
                .listRowInsets(EdgeInsets())
                .listRowBackground(AppTheme.background)
            Section(header: Text("Recent transactions")
                .font(AppTheme.Fonts.headline)
                .textCase(nil)
                .foregroundColor(AppTheme.accent)
            ) {
                ForEach(Array(listTransactions.enumerated()), id: \.offset) { _, tx in
                    VStack(alignment: .leading, spacing: 6) {
                        // Payee visible
                        Text(payeeText(tx))
                            .font(AppTheme.Fonts.headline)
                            .lineLimit(1)
                            .truncationMode(.tail)

                        HStack(alignment: .firstTextBaseline, spacing: 10) {
                            // Left: account + category on same line
                            if let acc = accounts.first(where: { $0.id == tx.account })?.name {
                                Text(acc)
                                    .font(AppTheme.Fonts.footnote)
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                            }
                            let cat = categoriesById[tx.category ?? ""]
                            if let cat, !cat.isEmpty {
                                Text("•")
                                    .foregroundStyle(.secondary)
                                Text(cat)
                                    .font(AppTheme.Fonts.footnote)
                                    .foregroundStyle(.secondary)
                                    .lineLimit(1)
                            }
                            Spacer(minLength: 8)
                            // Right: amount with date below, avoid wrapping amount
                            VStack(alignment: .trailing, spacing: 2) {
                                Text(formattedSignedAmount(tx.amount))
                                    .font(AppTheme.Fonts.subheadline)
                                    .monospacedDigit()
                                    .foregroundColor((tx.amount ?? 0) < 0 ? .red : .green)
                                    .lineLimit(1)
                                    .minimumScaleFactor(0.8)
                                Text(tx.date)
                                    .font(AppTheme.Fonts.caption)
                                    .foregroundStyle(.secondary)
                            }
                            .frame(minWidth: 90, alignment: .trailing)
                        }
                    }
                    .padding(.vertical, 6)
                    .padding(.horizontal)
                    .listRowInsets(EdgeInsets(top: 6, leading: 16, bottom: 6, trailing: 16))
                }
            }
            .listRowBackground(AppTheme.background)
        }
        .background(AppTheme.background.ignoresSafeArea())
        .navigationBarTitleDisplayMode(.inline)
        .task { await load() }
        .refreshable { await load() }
        .alert("Error", isPresented: Binding(get: { errorMessage != nil }, set: { if !$0 { errorMessage = nil } })) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
                .font(AppTheme.Fonts.subheadline)
        }
        .sheet(isPresented: $showingAdd) {
            TransactionQuickAddSheet()
                .background(AppTheme.background.ignoresSafeArea())
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    showingAdd = true
                } label: {
                    Image(systemName: "plus")
                        .font(.title3.bold())
                        .foregroundColor(AppTheme.accent)
                }
                .accessibilityLabel("Add Transaction")
            }
        }
    }

    private var listHeader: some View {
        AppTheme.glassCard {
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Balance")
                            .font(AppTheme.Fonts.subheadline)
                            .foregroundStyle(.secondary)
                        Text(formatMoney(onBudgetBalance))
                            .font(AppTheme.Fonts.title.bold())
                            .monospacedDigit()
                    }
                    Spacer()
                }
                areaChart
                    .frame(height: 120)
                    .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            }
            .padding(.horizontal)
            .padding(.vertical, 16)
        }
        .padding(.horizontal)
        .padding(.top)
    }

    // removed curvedSeparator per design simplification

    private var filtersBar: some View {
        VStack(spacing: 10) {
            HStack(spacing: 12) {
                Toggle(isOn: $onBudgetOnly) {
                    Text("On-budget only")
                        .font(AppTheme.Fonts.subheadline)
                        .foregroundColor(AppTheme.accent)
                }
                .toggleStyle(SwitchToggleStyle(tint: AppTheme.accent))
            }
            HStack(spacing: 12) {
                Picker("Range", selection: $filterGranularity) {
                    ForEach(Granularity.allCases, id: \.self) { g in
                        Text(g.rawValue).tag(g)
                    }
                }
                .pickerStyle(.segmented)
            }
            HStack {
                Text("Last \(filterValue) \(filterGranularity.rawValue)")
                    .font(AppTheme.Fonts.subheadline)
                    .foregroundColor(AppTheme.accent.opacity(0.7))
                Spacer()
                Stepper("", value: $filterValue, in: 1...365)
                    .labelsHidden()
                    .tint(AppTheme.accent)
            }
        }
        .padding()
        .background(AppTheme.glassCardBackground)
        .cornerRadius(16)
        .padding(.horizontal)
        .padding(.bottom, 12)
    }

    private func isTransferToOnBudget(_ tx: Transaction) -> Bool {
        if tx.transfer_id == nil, let payeeId = tx.payee, let p = payeesById[payeeId], let destId = p.transfer_acct {
            if let dest = accounts.first(where: { $0.id == destId }) {
                return !dest.offbudget
            }
        }
        if tx.transfer_id != nil, let payeeId = tx.payee, let p = payeesById[payeeId], let destId = p.transfer_acct {
            if let dest = accounts.first(where: { $0.id == destId }) {
                return !dest.offbudget
            }
        }
        return false
    }

    private var areaChart: some View {
        let since = sinceDateString()
        let series = seriesByDay(since: since)
        return GeometryReader { geo in
            let w = geo.size.width
            let h = geo.size.height
            let pts = smoothPoints(series: series, size: geo.size)
            ZStack(alignment: .bottomLeading) {
                curvedFillPath(points: pts, width: w, height: h)
                    .fill(
                        LinearGradient(
                            colors: [AppTheme.accent.opacity(0.25), AppTheme.background.opacity(0)],
                            startPoint: .top,
                            endPoint: .bottom)
                    )
                curvedStrokePath(points: pts)
                    .stroke(AppTheme.accent, style: StrokeStyle(lineWidth: 2, lineCap: .round, lineJoin: .round))
            }
        }
    }

    private func smoothPoints(series: [(date: String, value: Int)], size: CGSize) -> [CGPoint] {
        guard !series.isEmpty else { return [] }
        let maxV = max(1, series.map { $0.value }.max() ?? 1)
        let stepX = size.width / CGFloat(max(1, series.count - 1))
        return series.enumerated().map { idx, pt in
            let x = CGFloat(idx) * stepX
            let y = size.height - CGFloat(pt.value) / CGFloat(maxV) * (size.height - 8)
            return CGPoint(x: x, y: y)
        }
    }

    private func curvedStrokePath(points: [CGPoint]) -> Path {
        var path = Path()
        guard points.count > 1 else { return path }
        path.move(to: points[0])
        for i in 0..<(points.count - 1) {
            let mid = CGPoint(x: (points[i].x + points[i+1].x) / 2, y: (points[i].y + points[i+1].y) / 2)
            path.addQuadCurve(to: mid, control: points[i])
        }
        if let last = points.last { path.addQuadCurve(to: last, control: points[points.count - 2]) }
        return path
    }

    private func curvedFillPath(points: [CGPoint], width: CGFloat, height: CGFloat) -> Path {
        var path = curvedStrokePath(points: points)
        path.addLine(to: CGPoint(x: width, y: height))
        path.addLine(to: CGPoint(x: 0, y: height))
        path.closeSubpath()
        return path
    }

    private func seriesByDay(since: String) -> [(date: String, value: Int)] {
        let grouped = filteredTransactions
            .filter { $0.date >= since }
            .reduce(into: [String: Int]()) { acc, tx in acc[tx.date, default: 0] += tx.amount ?? 0 }
        let keys = grouped.keys.sorted()
        return keys.map { ($0, grouped[$0] ?? 0) }
    }

    private func stableKey(_ tx: Transaction) -> String {
        return (tx.id ?? tx.imported_id ?? (tx.payee ?? "")) + "_" + String(tx.amount ?? 0)
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

    private func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            let since = sinceDateString()
            async let accs = try client().fetchAccounts()
            async let payees = try client().fetchPayees()
            async let cats = try client().fetchCategories()
            let (accountsList, payeesList, categories) = try await (accs, payees, cats)
            let mappingCats = Dictionary(uniqueKeysWithValues: categories.map { ($0.id, $0.name) })
            let mappingPayees = Dictionary(uniqueKeysWithValues: payeesList.map { ($0.id, $0) })
            let perAccountTxs = try await withThrowingTaskGroup(of: (String, [Transaction]).self) { group -> [[Transaction]] in
                for acc in accountsList { group.addTask { (acc.id, try await client().fetchTransactions(accountId: acc.id, since: since)) } }
                var results: [[Transaction]] = []
                for try await (_, list) in group { results.append(list) }
                return results
            }
            let balances = try await withThrowingTaskGroup(of: (String, Int).self) { group -> [String: Int] in
                for acc in accountsList { group.addTask { (acc.id, try await fetchBalance(accountId: acc.id)) } }
                var map: [String: Int] = [:]
                for try await (id, bal) in group { map[id] = bal }
                return map
            }
            let combined = perAccountTxs.flatMap { $0 }
            await MainActor.run {
                self.accounts = accountsList
                self.categoriesById = mappingCats
                self.payeesById = mappingPayees
                self.transactions = combined
                self.balancesById = balances
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func fetchBalance(accountId: String) async throws -> Int {
        let url = APIEndpoints.accountBalance(base: try APIEndpoints.baseURL(from: appState.baseURLString), syncId: appState.syncId, accountId: accountId)
        var req = URLRequest(url: url)
        req.httpMethod = "GET"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue(appState.apiKey, forHTTPHeaderField: "x-api-key")
        if !appState.budgetEncryptionPassword.isEmpty { req.setValue(appState.budgetEncryptionPassword, forHTTPHeaderField: "budget-encryption-password") }
        let (data, resp) = try await URLSession.shared.data(for: req)
        guard let http = resp as? HTTPURLResponse, (200..<300).contains(http.statusCode) else { throw URLError(.badServerResponse) }
        let decoded = try JSONDecoder().decode(APIResponse<Int>.self, from: data)
        return decoded.data
    }

    private func sinceDateString() -> String {
        let cal = Calendar(identifier: .gregorian)
        let now = Date()
        let from: Date
        switch filterGranularity {
        case .day:
            from = cal.date(byAdding: .day, value: -filterValue, to: now) ?? now
        case .week:
            from = cal.date(byAdding: .day, value: -7*filterValue, to: now) ?? now
        case .month:
            from = cal.date(byAdding: .month, value: -filterValue, to: now) ?? now
        case .year:
            from = cal.date(byAdding: .year, value: -filterValue, to: now) ?? now
        }
        let f = DateFormatter(); f.calendar = cal; f.dateFormat = "yyyy-MM-dd"; return f.string(from: from)
    }

    private func formattedSignedAmount(_ amount: Int?) -> String {
        let a = amount ?? 0
        return CurrencyFormatter.shared.formatSigned(a, currencyCode: appState.currencyCode)
    }

    private func payeeText(_ tx: Transaction) -> String {
        if let payeeId = tx.payee, let p = payeesById[payeeId] { return p.name }
        if let n = tx.payee_name, !n.isEmpty { return n }
        return "(No payee)"
    }

    private func formatMoney(_ value: Int) -> String {
        return CurrencyFormatter.shared.format(value, currencyCode: appState.currencyCode)
    }

}
