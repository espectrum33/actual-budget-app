import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var appState: AppState
    @State private var baseURL: String = ""
    @State private var apiKey: String = ""
    @State private var syncId: String = ""
    @State private var password: String = ""

    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                AppTheme.glassCard {
                    Section {
                        VStack(spacing: 12) {
                            TextField("Base URL", text: $baseURL)
                                .textContentType(.URL)
                                .keyboardType(.URL)
                                .autocapitalization(.none)
                                .textInputAutocapitalization(.never)
                                .disableAutocorrection(true)
                                .font(AppTheme.Fonts.body)
                            TextField("API Key", text: $apiKey)
                                .autocapitalization(.none)
                                .textInputAutocapitalization(.never)
                                .disableAutocorrection(true)
                                .font(AppTheme.Fonts.body)
                            TextField("Sync ID", text: $syncId)
                                .autocapitalization(.none)
                                .textInputAutocapitalization(.never)
                                .disableAutocorrection(true)
                                .font(AppTheme.Fonts.body)
                            SecureField("Budget Encryption Password (optional)", text: $password)
                                .font(AppTheme.Fonts.body)
                        }
                    } header: {
                        Text("Connection")
                            .font(AppTheme.Fonts.subtitle)
                            .foregroundColor(.primary)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding()
                }

                AppTheme.glassCard {
                    Section {
                        Picker("Currency", selection: $appState.currencyCode) {
                            ForEach(CurrencyFormatter.supportedCurrencies, id: \.0) { code, name in
                                Text("\(code) - \(name)").tag(code)
                            }
                        }
                        .pickerStyle(.menu)
                        .accentColor(AppTheme.accent)
                        .font(AppTheme.Fonts.body)
                    } header: {
                        Text("Currency")
                            .font(AppTheme.Fonts.subtitle)
                            .foregroundColor(.primary)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding()
                }

                AppTheme.glassCard {
                    Section {
                        Toggle("Enable Demo Mode", isOn: $appState.isDemoMode)
                            .toggleStyle(SwitchToggleStyle(tint: AppTheme.accent))
                            .font(AppTheme.Fonts.body)

                        if appState.isDemoMode {
                            Text("Demo mode shows random sample data for testing the app interface.")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                                .padding(.top, 4)
                        }
                    } header: {
                        Text("Demo Mode")
                            .font(AppTheme.Fonts.subtitle)
                            .foregroundColor(.primary)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    .padding()
                }

                AppTheme.glassCard {
                    Section {
                        Button(role: .destructive) {
                            appState.resetConfiguration()
                        } label: {
                            Text("Reset Configuration")
                                .font(AppTheme.Fonts.body)
                                .frame(maxWidth: .infinity, alignment: .center)
                        }
                    }
                    .padding()
                }
            }
            .padding(.horizontal)
            .padding(.top, 20)
            .padding(.bottom, 40)
        }
        .background(AppTheme.background.ignoresSafeArea())
        .navigationTitle("Settings")
        .navigationBarTitleDisplayMode(.inline)
        .toolbarColorScheme(.light, for: .navigationBar)
        .toolbarBackground(AppTheme.background, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .accentColor(AppTheme.accent)
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
