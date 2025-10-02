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
                HStack(alignment: .firstTextBaseline) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(payeeText(tx))
                            .font(.headline)
                        HStack(spacing: 8) {
                            Text(formattedDate(tx.date))
                                .font(.caption)
                                .foregroundStyle(.secondary)
                            if let cat = categoryName(tx.category) {
                                Text(cat)
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.secondary.opacity(0.1), in: Capsule())
                            }
                            if isTransfer(tx) {
                                Text("Transfer")
                                    .font(.caption2)
                                    .foregroundStyle(.secondary)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.blue.opacity(0.1), in: Capsule())
                            }
                        }
                        if let notes = tx.notes, !notes.isEmpty {
                            Text(notes)
                                .font(.footnote)
                                .foregroundStyle(.secondary)
                        }
                    }
                    Spacer()
                    Text(formattedSignedAmount(tx.amount))
                        .font(.headline)
                        .monospacedDigit()
                        .foregroundStyle((tx.amount ?? 0) < 0 ? .red : .green)
                        .frame(minWidth: 90, alignment: .trailing)
                }
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
            }
        }
        .background(LiquidBackground())
        .navigationTitle(account.name)
        .toolbarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button { startNew() } label: { Image(systemName: "plus") }
            }
        }
        .task { await loadAll() }
        .refreshable { await loadAll() }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
        .sheet(isPresented: $showingEditor) {
            TransactionEditorView(
                accountId: account.id,
                categoriesById: categoriesById,
                payees: Array(payeesById.values).sorted { $0.name < $1.name },
                transaction: editingTransaction,
                onSave: { tx in Task { await save(tx) } }
            )
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
    let accountId: String
    let categoriesById: [String: String]
    let payees: [Payee]
    var transaction: Transaction?
    var onSave: (Transaction) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var date: Date = Date()
    @State private var amountUnits: String = "0" // integer only minor units
    @State private var isNegative: Bool = true // default '-'
    @State private var payeeModeIsPicker: Bool = true
    @State private var selectedPayeeId: String = ""
    @State private var customPayee: String = ""
    @State private var notes: String = ""
    @State private var categoryId: String?

    var body: some View {
        NavigationStack {
            Form {
                Section("Details") {
                    DatePicker("Date", selection: $date, displayedComponents: [.date])
                    HStack(spacing: 12) {
                        TextField("Amount (integer)", text: Binding(
                            get: { amountUnits },
                            set: { newVal in amountUnits = newVal.filter { $0.isNumber } }
                        ))
                        .keyboardType(.numberPad)
                        .frame(maxWidth: .infinity)
                        HStack(spacing: 8) {
                            Button(action: { isNegative = true }) {
                                Text("−")
                                    .font(.system(size: 24, weight: .bold))
                                    .frame(width: 48, height: 48)
                                    .background(isNegative ? Color.red.opacity(0.25) : Color.clear)
                                    .clipShape(Circle())
                            }
                            .buttonStyle(.plain)
                            Button(action: { isNegative = false }) {
                                Text("+")
                                    .font(.system(size: 24, weight: .bold))
                                    .frame(width: 48, height: 48)
                                    .background(!isNegative ? Color.green.opacity(0.25) : Color.clear)
                                    .clipShape(Circle())
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    Picker("Payee input", selection: $payeeModeIsPicker) {
                        Text("Choose from list").tag(true)
                        Text("Type custom name").tag(false)
                    }
                    if payeeModeIsPicker {
                        Picker("Payee", selection: $selectedPayeeId) {
                            Text("None").tag("")
                            ForEach(payees, id: \.id) { payee in
                                Text(payee.name).tag(payee.id)
                            }
                        }
                    } else {
                        TextField("Payee name", text: $customPayee)
                    }
                    TextField("Notes", text: $notes)
                    Picker("Category", selection: Binding(
                        get: { categoryId ?? "" },
                        set: { categoryId = $0.isEmpty ? nil : $0 }
                    )) {
                        Text("None").tag("")
                        ForEach(categoriesById.sorted { $0.value < $1.value }, id: \.key) { pair in
                            Text(pair.value).tag(pair.key)
                        }
                    }
                }
            }
            .navigationTitle(transaction?.id == nil ? "New Transaction" : "Edit Transaction")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Cancel") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") { onSave(buildTransaction()) }
                }
            }
            .onAppear {
                if let t = transaction {
                    date = parseDate(t.date) ?? Date()
                    amountUnits = String(abs(t.amount ?? 0))
                    isNegative = (t.amount ?? 0) < 0
                    if let payeeId = t.payee { selectedPayeeId = payeeId; payeeModeIsPicker = true } else { payeeModeIsPicker = false; customPayee = t.payee_name ?? "" }
                    notes = t.notes ?? ""
                    categoryId = t.category
                } else {
                    isNegative = true
                }
            }
        }
    }

    private func buildTransaction() -> Transaction {
        let payeeId: String? = payeeModeIsPicker ? (selectedPayeeId.isEmpty ? nil : selectedPayeeId) : nil
        let payeeName: String? = payeeModeIsPicker ? nil : (customPayee.isEmpty ? nil : customPayee)
        let units = Int(amountUnits) ?? 0
        let signed = isNegative ? -abs(units) : abs(units)
        return Transaction(
            id: transaction?.id,
            account: accountId,
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
}
