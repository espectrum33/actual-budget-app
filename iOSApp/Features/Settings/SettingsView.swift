import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var baseURL: String = ""
    @State private var apiKey: String = ""
    @State private var syncId: String = ""
    @State private var password: String = ""

    var body: some View {
        Form {
            Section("Connection") {
                TextField("Base URL", text: $baseURL)
                    .textContentType(.URL)
                    .keyboardType(.URL)
                    .autocapitalization(.none)
                    .textInputAutocapitalization(.never)
                    .disableAutocorrection(true)
                TextField("API Key", text: $apiKey)
                    .autocapitalization(.none)
                    .textInputAutocapitalization(.never)
                    .disableAutocorrection(true)
                TextField("Sync ID", text: $syncId)
                    .autocapitalization(.none)
                    .textInputAutocapitalization(.never)
                    .disableAutocorrection(true)
                SecureField("Budget Encryption Password (optional)", text: $password)
            }

            Section {
                Button(role: .destructive) {
                    appState.resetConfiguration()
                } label: {
                    Text("Reset Configuration")
                }
            }
        }
        .navigationTitle("Settings")
        .onAppear {
            baseURL = appState.baseURLString
            apiKey = appState.apiKey
            syncId = appState.syncId
            password = appState.budgetEncryptionPassword
        }
        .onDisappear {
            appState.baseURLString = baseURL
            appState.apiKey = apiKey
            appState.syncId = syncId
            appState.budgetEncryptionPassword = password
        }
    }
}

