import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject private var appState: AppState
    @State private var baseURL: String = ""
    @State private var apiKey: String = ""
    @State private var syncId: String = ""
    @State private var password: String = ""

    var body: some View {
        ZStack {
            LiquidBackground()
            VStack(spacing: 20) {
                Text("Connect to Actual Server")
                    .font(.largeTitle.bold())
                    .multilineTextAlignment(.center)
                Group {
                    TextField("Base URL (e.g. https://example.com/v1)", text: $baseURL)
                        .textContentType(.URL)
                        .keyboardType(.URL)
                        .autocapitalization(.none)
                        .textInputAutocapitalization(.never)
                        .disableAutocorrection(true)
                    TextField("API Key", text: $apiKey)
                        .textContentType(.password)
                        .autocapitalization(.none)
                        .textInputAutocapitalization(.never)
                        .disableAutocorrection(true)
                    TextField("Sync ID", text: $syncId)
                        .autocapitalization(.none)
                        .textInputAutocapitalization(.never)
                        .disableAutocorrection(true)
                    SecureField("Budget Encryption Password (optional)", text: $password)
                }
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal)
                Button(action: save) {
                    Text("Continue")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 14, style: .continuous))
                }
                .disabled(!isValid)
                .padding(.horizontal)
            }
            .padding()
        }
        .onAppear {
            baseURL = appState.baseURLString
            apiKey = appState.apiKey
            syncId = appState.syncId
            password = appState.budgetEncryptionPassword
        }
    }

    private var isValid: Bool { !baseURL.isEmpty && !apiKey.isEmpty && !syncId.isEmpty }

    private func save() {
        appState.baseURLString = baseURL
        appState.apiKey = apiKey
        appState.syncId = syncId
        appState.budgetEncryptionPassword = password
    }
}

