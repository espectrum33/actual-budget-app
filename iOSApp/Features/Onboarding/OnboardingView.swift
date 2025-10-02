import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject private var appState: AppState
    @State private var baseURL: String = ""
    @State private var apiKey: String = ""
    @State private var syncId: String = ""
    @State private var password: String = ""

    var body: some View {
        AppTheme.background
            .ignoresSafeArea()
            .overlay {
                VStack(spacing: 24) {
                    Text("Connect to Actual Server")
                        .font(AppTheme.Fonts.title)
                        .multilineTextAlignment(.center)
                        .padding(.top, 24)
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
                    .font(AppTheme.Fonts.body)
                    .textFieldStyle(.roundedBorder)
                    .padding(.horizontal, 24)
                    Button(action: save) {
                        Text("Continue")
                            .font(AppTheme.Fonts.body)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(AppTheme.accent)
                            .clipShape(RoundedRectangle(cornerRadius: AppTheme.cornerRadius, style: .continuous))
                            .foregroundColor(.white)
                    }
                    .disabled(!isValid)
                    .padding(.horizontal, 24)
                    .padding(.bottom, 24)
                }
                .background(AppTheme.glassCardBackground)
                .clipShape(RoundedRectangle(cornerRadius: AppTheme.cornerRadius, style: .continuous))
                .padding(.horizontal, 24)
                .padding(.vertical, 48)
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
