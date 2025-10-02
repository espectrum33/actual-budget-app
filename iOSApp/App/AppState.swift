import Foundation
import Combine

final class AppState: ObservableObject {
    @Published var baseURLString: String {
        didSet { UserDefaults.standard.set(baseURLString, forKey: Keys.baseURL) }
    }
    @Published var apiKey: String {
        didSet { UserDefaults.standard.set(apiKey, forKey: Keys.apiKey) }
    }
    @Published var syncId: String {
        didSet { UserDefaults.standard.set(syncId, forKey: Keys.syncId) }
    }
    @Published var budgetEncryptionPassword: String {
        didSet { UserDefaults.standard.set(budgetEncryptionPassword, forKey: Keys.budgetEncryptionPassword) }
    }

    var isConfigured: Bool { !baseURLString.isEmpty && !apiKey.isEmpty && !syncId.isEmpty }

    init() {
        self.baseURLString = UserDefaults.standard.string(forKey: Keys.baseURL) ?? ""
        self.apiKey = UserDefaults.standard.string(forKey: Keys.apiKey) ?? ""
        self.syncId = UserDefaults.standard.string(forKey: Keys.syncId) ?? ""
        self.budgetEncryptionPassword = UserDefaults.standard.string(forKey: Keys.budgetEncryptionPassword) ?? ""
    }

    func resetConfiguration() {
        baseURLString = ""
        apiKey = ""
        syncId = ""
        budgetEncryptionPassword = ""
    }

    private enum Keys {
        static let baseURL = "ActualBaseURL"
        static let apiKey = "ActualAPIKey"
        static let syncId = "ActualSyncId"
        static let budgetEncryptionPassword = "ActualBudgetEncryptionPassword"
    }
}

