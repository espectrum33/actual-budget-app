import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState
    @State private var selectedTab: Int = 2 // default to Transactions

    var body: some View {
        Group {
            if appState.isConfigured {
                TabView(selection: $selectedTab) {
                    NavigationStack { DashboardView() }
                        .tabItem { Label("Dashboard", systemImage: "gauge") }
                        .tag(0)
                    NavigationStack { AccountsView() }
                        .tabItem { Label("Accounts", systemImage: "creditcard") }
                        .tag(1)
                    NavigationStack { AllTransactionsView() }
                        .tabItem { Label("Transactions", systemImage: "list.bullet.rectangle") }
                        .tag(2)
                    NavigationStack { SettingsView() }
                        .tabItem { Label("Settings", systemImage: "gearshape") }
                        .tag(3)
                }
            } else {
                OnboardingView()
            }
        }
    }
}

