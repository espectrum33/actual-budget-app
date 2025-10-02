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
            VStack(spacing: 24) {
                Spacer()
                Text("Connect to Actual Server")
                    .font(AppTheme.Fonts.largeTitle)
                    .foregroundColor(.white)
                    .multilineTextAlignment(.center)

                GlassCard {
                    VStack(spacing: 16) {
                        TextField("Base URL (e.g. https://example.com/v1)", text: $baseURL)
                            .textContentType(.URL)
                            .keyboardType(.URL)
                            .autocapitalization(.none)
                        
                        TextField("API Key", text: $apiKey)
                            .textContentType(.password)
                            .autocapitalization(.none)
                        
                        TextField("Sync ID", text: $syncId)
                            .autocapitalization(.none)
                        
                        SecureField("Budget Encryption Password (optional)", text: $password)
                    }
                    .textFieldStyle(GlassTextFieldStyle())
                }
                .padding(.horizontal)

                Button(action: save) {
                    Text("Continue")
                        .font(AppTheme.Fonts.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(AppTheme.accent)
                        .clipShape(RoundedRectangle(cornerRadius: 15, style: .continuous))
                        .foregroundColor(.white)
                }
                .disabled(!isValid)
                .padding(.horizontal)
                
                Spacer()
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
        appState.baseURLString = baseURL.trimmingCharacters(in: .whitespacesAndNewlines)
        appState.apiKey = apiKey.trimmingCharacters(in: .whitespacesAndNewlines)
        appState.syncId = syncId.trimmingCharacters(in: .whitespacesAndNewlines)
        appState.budgetEncryptionPassword = password
    }
}