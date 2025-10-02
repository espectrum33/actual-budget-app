import AppIntents
import SwiftUI

struct AddTransactionIntent: AppIntent {
    static var title: LocalizedStringResource = "Add New Transaction"
    static var description = IntentDescription("Opens the app to add a new transaction.")
    
    // This makes the shortcut appear in the Shortcuts app and Spotlight
    static var openAppWhenRun: Bool = true

    @MainActor
    func perform() async throws -> some IntentResult {
        // This will be handled by the main app view
        AppStateObserver.shared.requestAddTransaction()
        return .result()
    }
}

// This helper class allows the intent to communicate with your SwiftUI views
class AppStateObserver: ObservableObject {
    static let shared = AppStateObserver()
    @Published var shouldShowAddSheet: Bool = false
    
    func requestAddTransaction() {
        shouldShowAddSheet = true
    }
}

// This makes your shortcut easily discoverable
struct ActualShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddTransactionIntent(),
            phrases: ["Add a transaction in \(.applicationName)"]
        )
    }
}