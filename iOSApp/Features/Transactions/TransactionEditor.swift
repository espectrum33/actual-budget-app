import SwiftUI

struct TransactionEditor: View {
    enum PayeeInputMode { case picker, custom }

    var transaction: Transaction?
    var initialAccountId: String?
    var onSave: (Transaction) -> Void
    
    @EnvironmentObject private var appState: AppState
    @Environment(\.dismiss) private var dismiss

    @State private var accounts: [Account] = []
    @State private var categoriesById: [String: String] = [:]
    @State private var payees: [Payee] = []
    @State private var errorMessage: String?
    
    // Form State
    @State private var date: Date = Date()
    @State private var amountString: String = "0.00"
    @State private var isNegative: Bool = true
    @State private var selectedPayeeId: String = ""
    @State private var customPayee: String = ""
    @State private var payeeMode: PayeeInputMode = .picker
    @State private var notes: String = ""
    @State private var categoryId: String?
    @State private var selectedAccountId: String = ""

    var body: some View {
        NavigationView {
            ZStack {
                AppBackground()
                
                if accounts.isEmpty && errorMessage == nil {
                    ProgressView().tint(AppTheme.accent)
                } else {
                    formContent
                }
            }
            .navigationTitle(transaction == nil ? "New Transaction" : "Edit Transaction")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Cancel") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) { Button("Save", action: save).bold() }
            }
            .task { await load() }
            .onAppear(perform: setupInitialState)
            .alert("Error", isPresented: .constant(errorMessage != nil)) {
                Button("OK") { errorMessage = nil }
            } message: { Text(errorMessage ?? "") }
        }
        .tint(AppTheme.accent)
    }
    
    private var formContent: some View {
        Form {
            Section("Account") {
                Picker("Account", selection: $selectedAccountId) {
                    ForEach(accounts, id: \.id) { acc in
                        Text(acc.name + (acc.offbudget ? " (Off-Budget)" : "")).tag(acc.id)
                    }
                }
            }
            .listRowBackground(Color.primary.opacity(0.05)) // Changed
            
            Section("Details") {
                DatePicker("Date", selection: $date, displayedComponents: .date)
                
                HStack {
                    TextField("Amount", text: $amountString)
                        .keyboardType(.decimalPad)
                    
                    Picker("Type", selection: $isNegative) {
                        Text("Expense").tag(true)
                        Text("Income").tag(false)
                    }
                    .pickerStyle(.segmented)
                    .frame(width: 150)
                }
                
                Picker("Payee", selection: $payeeMode) {
                    Text("Choose").tag(PayeeInputMode.picker)
                    Text("Custom").tag(PayeeInputMode.custom)
                }
                .pickerStyle(.segmented)

                if payeeMode == .picker {
                    Picker("Payee", selection: $selectedPayeeId) {
                        Text("None").tag("")
                        ForEach(payees, id: \.id) { payee in
                            Text(payee.name).tag(payee.id)
                        }
                    }
                } else {
                    TextField("Payee Name", text: $customPayee)
                }
                
                Picker("Category", selection: $categoryId) {
                    Text("None").tag(String?.none)
                    ForEach(categoriesById.sorted { $0.value < $1.value }, id: \.key) { key, value in
                        Text(value).tag(String?.some(key))
                    }
                }
                
                TextField("Notes", text: $notes)
            }
            .listRowBackground(Color.primary.opacity(0.05)) // Changed
        }
        .scrollContentBackground(.hidden) // This allows AppBackground to show through
    }
    
    private func buildTransaction() -> Transaction {
        let units = parseAmountFromDisplay(amountString)
        let signed = isNegative ? -abs(units) : abs(units)
        
        let payeeId: String? = payeeMode == .picker ? (selectedPayeeId.isEmpty ? nil : selectedPayeeId) : nil
        let payeeName: String? = payeeMode == .custom ? (customPayee.isEmpty ? nil : customPayee) : nil
        
        return Transaction(
            id: transaction?.id,
            account: selectedAccountId,
            date: formatDate(date),
            amount: signed,
            payee: payeeId,
            payee_name: payeeName,
            imported_payee: nil,
            category: categoryId,
            notes: notes.isEmpty ? nil : notes,
            imported_id: nil, transfer_id: nil, cleared: false, subtransactions: nil
        )
    }

    private func setupInitialState() {
        if let t = transaction {
            date = parseDate(t.date) ?? Date()
            amountString = formatAmountForDisplay(abs(t.amount ?? 0))
            isNegative = (t.amount ?? 0) < 0
            
            if let payeeId = t.payee, !payeeId.isEmpty {
                selectedPayeeId = payeeId
                payeeMode = .picker
            } else if let payeeName = t.payee_name, !payeeName.isEmpty {
                customPayee = payeeName
                payeeMode = .custom
            } else {
                payeeMode = .picker
            }
            
            notes = t.notes ?? ""
            categoryId = t.category
            selectedAccountId = t.account
        } else {
            selectedAccountId = initialAccountId ?? accounts.first?.id ?? ""
        }
    }
    
    // MARK: - Unchanged Data Logic
    private func save() {
        Task {
            do {
                let built = buildTransaction()
                if let id = built.id {
                    try await client().updateTransaction(transactionId: id, transaction: built)
                } else {
                    try await client().createTransaction(accountId: built.account, transaction: built)
                }
                onSave(built)
                dismiss()
            } catch {
                await MainActor.run { errorMessage = error.localizedDescription }
            }
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

    private func load() async {
        do {
            async let accs = try client().fetchAccounts()
            async let cats = try client().fetchCategories()
            async let pays = try client().fetchPayees()
            let (a, c, p) = try await (accs, cats, pays)
            await MainActor.run {
                accounts = a.filter { !$0.closed }
                categoriesById = Dictionary(uniqueKeysWithValues: c.map { ($0.id, $0.name) })
                payees = p.sorted { $0.name < $1.name }
                if transaction == nil {
                    selectedAccountId = initialAccountId ?? accounts.first?.id ?? ""
                }
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func parseDate(_ str: String) -> Date? {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd"; return f.date(from: str)
    }
    private func formatDate(_ date: Date) -> String {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd"; return f.string(from: date)
    }
    private func formatAmountForDisplay(_ amount: Int) -> String {
        String(format: "%.2f", Double(amount) / 100.0)
    }
    private func parseAmountFromDisplay(_ display: String) -> Int {
        Int((Double(display.replacingOccurrences(of: ",", with: ".")) ?? 0.0) * 100)
    }
}
