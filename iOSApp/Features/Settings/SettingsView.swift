import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var baseURL: String = ""
    @State private var apiKey: String = ""
    @State private var syncId: String = ""
    @State private var password: String = ""

    var body: some View {
        ZStack {
            AppBackground()
            ScrollView {
                VStack(spacing: 24) {
                    GlassCard {
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Connection")
                                .font(AppTheme.Fonts.subtitle)
                                .foregroundColor(.primary)
                            
                            TextField("Base URL", text: $baseURL).textFieldStyle(GlassTextFieldStyle())
                            TextField("API Key", text: $apiKey).textFieldStyle(GlassTextFieldStyle())
                            TextField("Sync ID", text: $syncId).textFieldStyle(GlassTextFieldStyle())
                            SecureField("Budget Encryption Password", text: $password).textFieldStyle(GlassTextFieldStyle())
                        }
                    }

                    GlassCard {
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Preferences")
                                .font(AppTheme.Fonts.subtitle)
                                .foregroundColor(.primary)
                            
                            Picker("Theme", selection: $appState.currentTheme) {
                                ForEach(AppState.Theme.allCases) { theme in
                                    Text(theme.rawValue).tag(theme)
                                }
                            }
                            
                            Picker("Currency", selection: $appState.currencyCode) {
                                ForEach(CurrencyFormatter.supportedCurrencies, id: \.0) { code, name in
                                    Text("\(code) - \(name)").tag(code)
                                }
                            }
                            .tint(AppTheme.accent)
                        }
                    }

                    GlassCard {
                        VStack(alignment: .leading, spacing: 12) {
                             Text("Advanced")
                                .font(AppTheme.Fonts.subtitle)
                                .foregroundColor(.primary)

                            Toggle("Enable Demo Mode", isOn: $appState.isDemoMode)
                                .tint(AppTheme.accent)

                            Button(role: .destructive) {
                                appState.resetConfiguration()
                            } label: {
                                Text("Reset & Sign Out")
                                    .frame(maxWidth: .infinity, alignment: .center)
                            }
                            .padding(.top)
                        }
                    }
                }
                .padding()
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