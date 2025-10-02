import SwiftUI

struct TransactionsView: View {
    let account: Account
    @EnvironmentObject private var appState: AppState
    @State private var transactions: [Transaction] = []
    @State private var categoriesById: [String: String] = [:]
    @State private var payeesById: [String: Payee] = [:]
    @State private var errorMessage: String?
    @State private var isLoading = false
    @State private var showingEditor: Bool = false
    @State private var editingTransaction: Transaction?

    var sortedTransactions: [Transaction] {
        transactions.sorted { ($0.date) > ($1.date) }
    }

    var body: some View {
        List {
            ForEach(Array(sortedTransactions.enumerated()), id: \.offset) { _, tx in
                VStack(alignment: .leading, spacing: 6) {
                    // Payee visible
                    Text(payeeText(tx))
                        .font(AppTheme.Fonts.headline)
                        .lineLimit(1)
                        .truncationMode(.tail)

                    HStack(alignment: .firstTextBaseline, spacing: 10) {
                        // Left: current account name + category on same line
                        Text(account.name)
                            .font(AppTheme.Fonts.footnote)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                        let cat = categoryName(tx.category)
                        if let cat, !cat.isEmpty {
                            Text("•").foregroundStyle(.secondary)
                            Text(cat)
                                .font(AppTheme.Fonts.footnote)
                                .foregroundStyle(.secondary)
                                .lineLimit(1)
                        }
                        Spacer(minLength: 8)
                        VStack(alignment: .trailing, spacing: 2) {
                            Text(formattedSignedAmount(tx.amount))
                                .font(AppTheme.Fonts.subheadline)
                                .monospacedDigit()
                                .foregroundStyle((tx.amount ?? 0) < 0 ? .red : .green)
                                .lineLimit(1)
                                .minimumScaleFactor(0.8)
                            Text(formattedDate(tx.date))
                                .font(AppTheme.Fonts.caption)
                                .foregroundStyle(.secondary)
                        }
                        .frame(minWidth: 90, alignment: .trailing)
                    }
                }
                .padding(.vertical, 10)
                .padding(.horizontal, 14)
                .contentShape(Rectangle())
                .onTapGesture { startEdit(tx) }
                .contextMenu {
                    if let destAccountId = transferDestinationAccountId(tx) {
                        NavigationLink(destination: TransactionsView(account: Account(id: destAccountId, name: accountName(destAccountId), offbudget: false, closed: false))) {
                            Label("Go to transfer account", systemImage: "arrow.right.circle")
                        }
                    }
                    Button(role: .destructive) { Task { await delete(tx) } } label: { Label("Delete", systemImage: "trash") }
                }
                .swipeActions(edge: .trailing, allowsFullSwipe: true) {
                    Button(role: .destructive) { Task { await delete(tx) } } label: { Label("Delete", systemImage: "trash") }
                }
                .listRowBackground(Color.clear)
                .listRowSeparator(.hidden)
            }
        }
        .scrollContentBackground(.hidden)
        .background(AppTheme.background.ignoresSafeArea())
        .navigationTitle(account.name)
        .toolbarBackground(AppTheme.background, for: .navigationBar)
        .toolbarColorScheme(.light, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    startNew()
                } label: {
                    Image(systemName: "plus.circle")
                        .foregroundColor(AppTheme.accent)
                        .font(.system(size: 20, weight: .semibold))
                }
                .buttonStyle(.plain)
                .accessibilityLabel("Add Transaction")
            }
        }
        .tint(AppTheme.accent)
        .task { await loadAll() }
        .refreshable { await loadAll() }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
        .sheet(isPresented: $showingEditor) {
            TransactionEditorView(
                initialAccountId: account.id,
                categoriesById: categoriesById,
                payees: Array(payeesById.values).sorted { $0.name < $1.name },
                accounts: [],
                showAccountPicker: false,
                transaction: editingTransaction,
                onSave: { tx in Task { await save(tx) } }
            )
            .background(AppTheme.background.ignoresSafeArea())
        }
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
        isLoading = true
        defer { isLoading = false }
        do {
            async let cats = try client().fetchCategories()
            async let payees = try client().fetchPayees()
            async let txs = try client().fetchTransactions(accountId: account.id, since: defaultSinceDate())
            let (categories, payeesList, list) = try await (cats, payees, txs)
            let catMap = Dictionary(uniqueKeysWithValues: categories.map { ($0.id, $0.name) })
            let payeeMap = Dictionary(uniqueKeysWithValues: payeesList.map { ($0.id, $0) })
            await MainActor.run {
                categoriesById = catMap
                payeesById = payeeMap
                transactions = list
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func formattedAmount(_ amount: Int?) -> String {
        let value = Double(amount ?? 0) / 100.0
        let f = NumberFormatter()
        f.numberStyle = .currency
        return f.string(from: NSNumber(value: value)) ?? String(value)
    }

    private func formattedSignedAmount(_ amount: Int?) -> String {
        let a = amount ?? 0
        let s = formattedAmount(abs(a))
        return a < 0 ? "-\(s)" : "+\(s)"
    }

    private func formattedDate(_ iso: String) -> String { iso }

    private func categoryName(_ id: String?) -> String? {
        guard let id else { return nil }
        return categoriesById[id]
    }

    private func payeeText(_ tx: Transaction) -> String {
        if let payeeId = tx.payee, let p = payeesById[payeeId] { return p.name }
        if let n = tx.payee_name, !n.isEmpty { return n }
        return "(No payee)"
    }

    private func isTransfer(_ tx: Transaction) -> Bool {
        if tx.transfer_id != nil { return true }
        if let payeeId = tx.payee, let p = payeesById[payeeId], p.transfer_acct != nil { return true }
        return false
    }

    private func transferDestinationAccountId(_ tx: Transaction) -> String? {
        if let payeeId = tx.payee, let p = payeesById[payeeId], let acct = p.transfer_acct { return acct }
        return nil
    }

    private func accountName(_ id: String) -> String {
        if id == account.id { return account.name }
        return "Account \(id.prefix(6))..."
    }

    private func defaultSinceDate() -> String {
        let cal = Calendar(identifier: .gregorian)
        let start = cal.date(byAdding: .year, value: -1, to: Date()) ?? Date()
        let f = DateFormatter()
        f.calendar = cal
        f.dateFormat = "yyyy-MM-dd"
        return f.string(from: start)
    }

    private func startNew() {
        editingTransaction = Transaction(
            id: nil,
            account: account.id,
            date: todayString(),
            amount: 0,
            payee: nil,
            payee_name: nil,
            imported_payee: nil,
            category: nil,
            notes: nil,
            imported_id: nil,
            transfer_id: nil,
            cleared: false,
            subtransactions: nil
        )
        showingEditor = true
    }

    private func startEdit(_ tx: Transaction) {
        editingTransaction = tx
        showingEditor = true
    }

    private func save(_ tx: Transaction) async {
        do {
            if let id = tx.id {
                try await client().updateTransaction(transactionId: id, transaction: tx)
            } else {
                try await client().createTransaction(accountId: account.id, transaction: tx)
            }
            await loadAll()
            await MainActor.run { showingEditor = false }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func delete(_ tx: Transaction) async {
        guard let id = tx.id else { return }
        do {
            try await client().deleteTransaction(transactionId: id)
            await loadAll()
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func todayString() -> String {
        let f = DateFormatter()
        f.calendar = Calendar(identifier: .gregorian)
        f.dateFormat = "yyyy-MM-dd"
        return f.string(from: Date())
    }
}

struct TransactionEditorView: View {
    let initialAccountId: String?
    let categoriesById: [String: String]
    let payees: [Payee]
    var accounts: [Account] = []
    var showAccountPicker: Bool = false
    var transaction: Transaction?
    var onSave: (Transaction) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var date: Date = Date()
    @State private var amountString: String = "0.00" // decimal display
    @State private var isNegative: Bool = true // default '-'
    @State private var payeeModeIsPicker: Bool = true
    @State private var selectedPayeeId: String = ""
    @State private var customPayee: String = ""
    @State private var notes: String = ""
    @State private var categoryId: String?
    @State private var selectedAccountId: String = ""

    var body: some View {
        NavigationStack {
            Form {
                if showAccountPicker {
                    Section("Account") {
                        Picker("Account", selection: $selectedAccountId) {
                            let grouped = accounts.sorted { lhs, rhs in
                                if lhs.offbudget == rhs.offbudget {
                                    return lhs.name.localizedCaseInsensitiveCompare(rhs.name) == .orderedAscending
                                }
                                return lhs.offbudget == false && rhs.offbudget == true
                            }
                            ForEach(grouped, id: \.id) { acc in
                                Text(acc.name + (acc.offbudget ? " (Off)" : ""))
                                    .tag(acc.id)
                            }
                        }
                        .listRowBackground(AppTheme.glassCardBackgroundView)
                        .pickerStyle(.menu)
                    }
                    .listRowBackground(AppTheme.glassCardBackgroundView)
                }
                Section("Details") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date])
                        .listRowBackground(AppTheme.glassCardBackgroundView)
                    HStack(spacing: 12) {
                        TextField("Amount", text: Binding(
                            get: { amountString },
                            set: { newVal in 
                                // Allow only numbers and one decimal point
                                let filtered = newVal.filter { $0.isNumber || $0 == "." }
                                let parts = filtered.split(separator: ".")
                                if parts.count <= 2 && (parts.last?.count ?? 0) <= 2 {
                                    amountString = filtered
                                }
                            }
                        ))
                        .keyboardType(.decimalPad)
                        .font(AppTheme.Fonts.body)
                        .padding(10)
                        .frame(maxWidth: .infinity)
                        // Standalone glass circle over parent, with +/- text underneath
                        ZStack(alignment: .leading) {
                            HStack(spacing: 24) {
                                Text("−")
                                    .font(.system(size: 24, weight: .bold))
                                    .frame(width: 24)
                                    .onTapGesture { withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) { isNegative = true } }
                                Text("+")
                                    .font(.system(size: 24, weight: .bold))
                                    .frame(width: 24)
                                    .onTapGesture { withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) { isNegative = false } }
                            }
                            .frame(height: 44)

                            Circle()
                                .frame(width: 40, height: 40)
                                .background(.ultraThinMaterial, in: Circle())
                                .overlay(Circle().stroke(Color.white.opacity(0.12), lineWidth: 1))
                                .shadow(color: Color.black.opacity(0.15), radius: 8, x: 0, y: 4)
                                .offset(x: isNegative ? 0 : 48, y: 0)
                                .animation(.spring(response: 0.35, dampingFraction: 0.8), value: isNegative)
                                .onTapGesture { withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) { isNegative.toggle() } }
                        }
                    }
                    .padding(.vertical, 6)
                    Picker("Payee input", selection: $payeeModeIsPicker) {
                        Text("Choose from list").tag(true)
                        Text("Type custom name").tag(false)
                    }
                    .pickerStyle(.segmented)
                    .listRowBackground(AppTheme.glassCardBackgroundView)
                    if payeeModeIsPicker {
                        Picker("Payee", selection: $selectedPayeeId) {
                            Text("None").tag("")
                            ForEach(payees, id: \.id) { payee in
                                Text(payee.name).tag(payee.id)
                            }
                        }
                        .listRowBackground(AppTheme.glassCardBackgroundView)
                        .pickerStyle(.menu)
                    } else {
                        TextField("Payee name", text: $customPayee)
                            .font(AppTheme.Fonts.body)
                            .padding(10)
                    }
                    TextField("Notes", text: $notes)
                        .font(AppTheme.Fonts.body)
                        .padding(10)
                    Picker("Category", selection: Binding(
                        get: { categoryId ?? "" },
                        set: { categoryId = $0.isEmpty ? nil : $0 }
                    )) {
                        Text("None").tag("")
                        ForEach(categoriesById.sorted { $0.value < $1.value }, id: \.key) { pair in
                            Text(pair.value).tag(pair.key)
                        }
                    }
                        .listRowBackground(AppTheme.glassCardBackgroundView)
                    .pickerStyle(.menu)
                }
                .listRowBackground(AppTheme.glassCardBackgroundView)
            }
            .scrollContentBackground(.hidden)
            .background(AppTheme.background.ignoresSafeArea())
            .navigationTitle(transaction?.id == nil ? "New Transaction" : "Edit Transaction")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                    .foregroundColor(AppTheme.accent)
                    .font(AppTheme.Fonts.body)
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        onSave(buildTransaction())
                    }
                    .foregroundColor(AppTheme.accent)
                    .font(AppTheme.Fonts.body.bold())
                }
            }
            .tint(AppTheme.accent)
            .onAppear {
                if let t = transaction {
                    date = parseDate(t.date) ?? Date()
                    amountString = formatAmountForDisplay(abs(t.amount ?? 0))
                    isNegative = (t.amount ?? 0) < 0
                    if let payeeId = t.payee { selectedPayeeId = payeeId; payeeModeIsPicker = true } else { payeeModeIsPicker = false; customPayee = t.payee_name ?? "" }
                    notes = t.notes ?? ""
                    categoryId = t.category
                } else {
                    isNegative = true
                    amountString = "0.00"
                }
                selectedAccountId = (initialAccountId ?? selectedAccountId).isEmpty ? (accounts.first?.id ?? "") : (initialAccountId ?? "")
            }
        }
    }

    private func buildTransaction() -> Transaction {
        let payeeId: String? = payeeModeIsPicker ? (selectedPayeeId.isEmpty ? nil : selectedPayeeId) : nil
        let payeeName: String? = payeeModeIsPicker ? nil : (customPayee.isEmpty ? nil : customPayee)
        let units = parseAmountFromDisplay(amountString)
        let signed = isNegative ? -abs(units) : abs(units)
        return Transaction(
            id: transaction?.id,
            account: selectedAccountId.isEmpty ? (initialAccountId ?? "") : selectedAccountId,
            date: formatDate(date),
            amount: signed,
            payee: payeeId,
            payee_name: payeeName,
            imported_payee: nil,
            category: categoryId,
            notes: notes.isEmpty ? nil : notes,
            imported_id: nil,
            transfer_id: transaction?.transfer_id,
            cleared: transaction?.cleared ?? false,
            subtransactions: nil
        )
    }

    private func parseDate(_ str: String) -> Date? {
        let f = DateFormatter(); f.calendar = Calendar(identifier: .gregorian); f.dateFormat = "yyyy-MM-dd"; return f.date(from: str)
    }
    private func formatDate(_ date: Date) -> String {
        let f = DateFormatter(); f.calendar = Calendar(identifier: .gregorian); f.dateFormat = "yyyy-MM-dd"; return f.string(from: date)
    }

    private func formatAmountForDisplay(_ amount: Int) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 2
        return formatter.string(from: NSNumber(value: Double(amount) / 100.0)) ?? "0.00"
    }

    private func parseAmountFromDisplay(_ display: String) -> Int {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        if let number = formatter.number(from: display) {
            return Int(number.doubleValue * 100)
        }
        return 0
    }
}

struct TransactionQuickAddSheet: View {
    @EnvironmentObject private var appState: AppState
    @Environment(\.dismiss) private var dismiss

    @State private var accounts: [Account] = []
    @State private var categoriesById: [String: String] = [:]
    @State private var payees: [Payee] = []
    @State private var errorMessage: String?

    var body: some View {
        NavigationStack {
            if accounts.isEmpty {
                ProgressView()
                    .progressViewStyle(CircularProgressViewStyle(tint: AppTheme.accent))
                    .task { await load() }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(AppTheme.background.ignoresSafeArea())
            } else {
                TransactionEditorView(
                    initialAccountId: accounts.first?.id,
                    categoriesById: categoriesById,
                    payees: payees,
                    accounts: accounts,
                    showAccountPicker: true,
                    transaction: nil,
                    onSave: { tx in Task { await save(tx) } }
                )
                .background(AppTheme.background.ignoresSafeArea())
            }
        }
        .tint(AppTheme.accent)
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: { Text(errorMessage ?? "") }
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
        do {
            async let accs = try client().fetchAccounts()
            async let cats = try client().fetchCategories()
            async let pays = try client().fetchPayees()
            let (a, c, p) = try await (accs, cats, pays)
            await MainActor.run {
                accounts = a
                categoriesById = Dictionary(uniqueKeysWithValues: c.map { ($0.id, $0.name) })
                payees = p.sorted { $0.name < $1.name }
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func save(_ tx: Transaction) async {
        do {
            try await client().createTransaction(accountId: tx.account, transaction: tx)
            await MainActor.run { dismiss() }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }
}
