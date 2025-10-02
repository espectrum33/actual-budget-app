import SwiftUI

struct AccountsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var accounts: [Account] = []
    @State private var search: String = ""
    @State private var isLoading = false
    @State private var errorMessage: String?
    @State private var showingCreate = false
    @State private var balancesById: [String: Int] = [:]

    private var onBudget: [Account] {
        let list = accounts.filter { !$0.offbudget }.sorted { $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending }
        guard !search.isEmpty else { return list }
        return list.filter { $0.name.localizedCaseInsensitiveContains(search) }
    }

    private var offBudget: [Account] {
        let list = accounts.filter { $0.offbudget }.sorted { $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending }
        guard !search.isEmpty else { return list }
        return list.filter { $0.name.localizedCaseInsensitiveContains(search) }
    }

    var body: some View {
        NavigationStack {
            List {
                if !accounts.isEmpty {
                    HStack {
                        Text("All accounts:")
                            .font(AppTheme.Fonts.subheadline)
                            .foregroundStyle(.secondary)
                        Spacer()
                        Text(formattedAmount(accounts.map { balancesById[$0.id] ?? 0 }.reduce(0, +)))
                            .font(AppTheme.Fonts.subheadline)
                            .monospacedDigit()
                    }
                    .listRowBackground(AppTheme.background)
                }
                if !onBudget.isEmpty {
                    Section(header: sectionHeader(title: "On budget", accounts: onBudget)) {
                        ForEach(onBudget) { account in
                            NavigationLink(destination: TransactionsView(account: account)) {
                                row(for: account)
                            }
                            .contextMenu { contextMenu(for: account) }
                        }
                    }
                }
                if !offBudget.isEmpty {
                    Section(header: sectionHeader(title: "Off budget", accounts: offBudget)) {
                        ForEach(offBudget) { account in
                            NavigationLink(destination: TransactionsView(account: account)) {
                                row(for: account)
                            }
                            .contextMenu { contextMenu(for: account) }
                        }
                    }
                }
            }
            .searchable(text: $search)
            .refreshable { await hardReload() }
            .background(AppTheme.background.ignoresSafeArea())
            // removed floating add button; add action moved to toolbar menu
            .navigationTitle("Accounts")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Menu {
                        Button { showingCreate = true } label: {
                            Label("Add Account", systemImage: "plus")
                        }
                        NavigationLink(destination: SettingsView()) {
                            Label("Settings", systemImage: "gearshape")
                        }
                    } label: {
                        Image(systemName: "line.3.horizontal")
                    }
                    .tint(AppTheme.accent)
                }
            }
        }
        .accentColor(AppTheme.accent)
        .onAppear { Task { await softReload() } }
        .alert("Error", isPresented: .constant(errorMessage != nil)) {
            Button("OK") { errorMessage = nil }
        } message: {
            Text(errorMessage ?? "")
        }
        .sheet(isPresented: $showingCreate) {
            CreateAccountSheet { name, offbudget in
                Task { await createAccount(name: name, offbudget: offbudget) }
            }
            .presentationDetents([.medium])
        }
    }

    private func sectionHeader(title: String, accounts: [Account]) -> some View {
        let total = accounts.map { balancesById[$0.id] ?? 0 }.reduce(0, +)
        return HStack {
            Text(title)
                .font(AppTheme.Fonts.subheadline)
                .foregroundStyle(.secondary)
            Spacer()
            Text(formattedAmount(total))
                .font(AppTheme.Fonts.subheadline)
                .monospacedDigit()
        }
        .padding(.vertical, 6)
    }

    private func row(for account: Account) -> some View {
        HStack {
            VStack(alignment: .leading) {
                Text(account.name)
                    .font(AppTheme.Fonts.headline)
                Text(account.offbudget ? "Off-budget" : "On-budget")
                    .font(AppTheme.Fonts.caption)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Text(formattedAmount(balancesById[account.id]))
                .font(AppTheme.Fonts.headline)
                .monospacedDigit()
                .foregroundStyle(.primary)
        }
        .padding(.vertical, 8)
        .padding(.horizontal)
        .listRowInsets(EdgeInsets(top: 0, leading: 16, bottom: 0, trailing: 16))
        .task { await loadBalanceIfNeeded(account) }
    }

    @ViewBuilder private func contextMenu(for account: Account) -> some View {
        Button("Close") { Task { await close(account) } }
        Button("Reopen") { Task { await reopen(account) } }
        Button("Bank Sync") { Task { await bankSync(account) } }
        Button(role: .destructive) { Task { await deleteAccount(account) } } label: { Text("Delete") }
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

    private func hardReload() async { await load(clearBalances: true) }
    private func softReload() async { await load(clearBalances: false) }

    private func load(clearBalances: Bool) async {
        isLoading = true
        defer { isLoading = false }
        do {
            let list = try await client().fetchAccounts()
            await MainActor.run {
                self.accounts = list
                if clearBalances { self.balancesById.removeAll() }
            }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func loadBalanceIfNeeded(_ account: Account) async {
        if balancesById[account.id] != nil { return }
        do {
            let bal = try await fetchBalance(accountId: account.id)
            await MainActor.run { balancesById[account.id] = bal }
        } catch {
            // ignore per-row errors
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

    private func formattedAmount(_ amount: Int?) -> String {
        return CurrencyFormatter.shared.format(amount ?? 0, currencyCode: appState.currencyCode)
    }

    private func createAccount(name: String, offbudget: Bool) async {
        do {
            _ = try await client().createAccount(name: name, offbudget: offbudget)
            await hardReload()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func deleteAccount(_ account: Account) async {
        do {
            try await client().deleteAccount(accountId: account.id)
            await hardReload()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func close(_ account: Account) async {
        do {
            try await client().closeAccount(accountId: account.id, transferAccountId: nil, transferCategoryId: nil)
            await hardReload()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func reopen(_ account: Account) async {
        do {
            try await client().reopenAccount(accountId: account.id)
            await hardReload()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func bankSync(_ account: Account) async {
        do {
            try await client().bankSync(accountId: account.id)
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }
}

private struct CreateAccountSheet: View {
    var onCreate: (String, Bool) -> Void
    @Environment(\.dismiss) private var dismiss
    @State private var name: String = ""
    @State private var offbudget: Bool = false

    var body: some View {
        NavigationStack {
            Form {
                TextField("Name", text: $name)
                Toggle("Off-budget", isOn: $offbudget)
            }
            .navigationTitle("New Account")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Cancel") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Create") { onCreate(name, offbudget); dismiss() }
                        .disabled(name.isEmpty)
                }
            }
        }
        .accentColor(AppTheme.accent)
    }
}
