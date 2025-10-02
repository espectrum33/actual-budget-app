import SwiftUI

struct AccountsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var accounts: [Account] = []
    @State private var search: String = ""
    @State private var isLoading = false
    @State private var errorMessage: String?
    @State private var showingCreate = false

    private var filtered: [Account] {
        guard !search.isEmpty else { return accounts }
        return accounts.filter { $0.name.localizedCaseInsensitiveContains(search) }
    }

    var body: some View {
        NavigationStack {
            ZStack {
                LiquidBackground()
                List {
                    ForEach(filtered) { account in
                        HStack {
                            VStack(alignment: .leading) {
                                Text(account.name)
                                    .font(.headline)
                                Text(account.offbudget ? "Off-budget" : "On-budget")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                            Spacer()
                            if account.closed {
                                Text("Closed")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .contextMenu {
                            Button("Close") { Task { await close(account) } }
                            Button("Reopen") { Task { await reopen(account) } }
                            Button("Bank Sync") { Task { await bankSync(account) } }
                            Button(role: .destructive) { Task { await deleteAccount(account) } } label: { Text("Delete") }
                        }
                    }
                }
                .searchable(text: $search)
                .refreshable { await load() }
                .overlay(alignment: .bottomTrailing) {
                    Button { showingCreate = true } label: {
                        Image(systemName: "plus")
                            .font(.title2.bold())
                            .padding()
                            .background(.ultraThinMaterial, in: Circle())
                    }
                    .padding()
                }
            }
            .navigationTitle("Accounts")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    NavigationLink(destination: SettingsView()) {
                        Image(systemName: "gearshape")
                    }
                }
            }
        }
        .task { await load() }
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

    private func client() throws -> ActualAPIClient {
        try ActualAPIClient(
            baseURLString: appState.baseURLString,
            apiKey: appState.apiKey,
            syncId: appState.syncId,
            budgetEncryptionPassword: appState.budgetEncryptionPassword
        )
    }

    private func load() async {
        isLoading = true
        defer { isLoading = false }
        do {
            let accounts = try await client().fetchAccounts()
            await MainActor.run { self.accounts = accounts }
        } catch {
            await MainActor.run { errorMessage = error.localizedDescription }
        }
    }

    private func createAccount(name: String, offbudget: Bool) async {
        do {
            _ = try await client().createAccount(name: name, offbudget: offbudget)
            await load()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func deleteAccount(_ account: Account) async {
        do {
            try await client().deleteAccount(accountId: account.id)
            await load()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func close(_ account: Account) async {
        do {
            try await client().closeAccount(accountId: account.id, transferAccountId: nil, transferCategoryId: nil)
            await load()
        } catch { await MainActor.run { errorMessage = error.localizedDescription } }
    }

    private func reopen(_ account: Account) async {
        do {
            try await client().reopenAccount(accountId: account.id)
            await load()
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
    }
}

