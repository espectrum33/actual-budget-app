// import SwiftUI

// struct RootView: View {
//     @EnvironmentObject private var appState: AppState
//     @State private var selectedTab: Int = 2 // default to Transactions

//     var body: some View {
//         Group {
//             if appState.isConfigured {
//                 TabView(selection: $selectedTab) {
//                     NavigationStack { DashboardView() }
//                         .tabItem { Label("Dashboard", systemImage: "gauge") }
//                         .tag(0)
//                     NavigationStack { AccountsView() }
//                         .tabItem { Label("Accounts", systemImage: "creditcard") }
//                         .tag(1)
//                     NavigationStack { AllTransactionsView() }
//                         .tabItem { Label("Transactions", systemImage: "list.bullet.rectangle") }
//                         .tag(2)
//                     NavigationStack { BudgetView() }
//                         .tabItem { Label("Budget", systemImage: "chart.pie") }
//                         .tag(3)
//                 }
//                 .accentColor(AppTheme.accent)
//                 .background(AppTheme.background.ignoresSafeArea())
//             } else {
//                 OnboardingView()
//                     .background(AppTheme.background.ignoresSafeArea())
//             }
//         }
//         .preferredColorScheme(.dark)
//     }
// }

import SwiftUI

struct MainTabView: View {
    @EnvironmentObject private var appState: AppState
    @StateObject private var appStateObserver = AppStateObserver.shared
    
    // A computed property to determine the color scheme
    private var colorScheme: ColorScheme? {
        switch appState.currentTheme {
        case .liquidDark, .amoledDark:
            return .dark
        case .systemLight:
            return .light
        }
    }
    
    var body: some View {
        TabView {
            NavigationStack { DashboardView() }
                .tabItem { Label("Dashboard", systemImage: "chart.pie.fill") }

            NavigationStack { AccountsView() }
                .tabItem { Label("Accounts", systemImage: "wallet.pass.fill") }
            
            NavigationStack { BudgetView() }
                .tabItem { Label("Budget", systemImage: "list.clipboard.fill") }

            NavigationStack { SettingsView() }
                .tabItem { Label("Settings", systemImage: "gearshape.fill") }
        }
        .tint(AppTheme.accent)
        .sheet(isPresented: $appStateObserver.shouldShowAddSheet) {
            TransactionEditor(onSave: { _ in })
        }
        // --- THIS IS THE KEY CHANGE ---
        // It forces the entire app to adopt the correct color scheme.
        .preferredColorScheme(colorScheme)
    }
}

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        if appState.isConfigured {
            MainTabView()
        } else {
            OnboardingView()
        }
    }
}