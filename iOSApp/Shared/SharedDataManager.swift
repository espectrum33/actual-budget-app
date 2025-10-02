import Foundation
import WidgetKit

class SharedDataManager {
    static let shared = SharedDataManager()
    
    // IMPORTANT: Replace with your App Group identifier
    private let userDefaults = UserDefaults(suiteName: "group.com.actualbudget.actualaccounts")

    private enum Keys {
        static let spentToday = "spentToday"
        static let currencyCode = "currencyCode"
    }

    func save(spentToday: Int, currencyCode: String) {
        guard let userDefaults = userDefaults else { return }
        userDefaults.setValue(spentToday, forKey: Keys.spentToday)
        userDefaults.setValue(currencyCode, forKey: Keys.currencyCode)
        
        // Tell widgets to refresh
        WidgetCenter.shared.reloadAllTimelines()
    }

    func readEntry() -> SimpleEntry {
        guard let userDefaults = userDefaults else {
            return SimpleEntry(date: Date(), spentToday: 0, currencyCode: "USD")
        }
        let spent = userDefaults.integer(forKey: Keys.spentToday)
        let code = userDefaults.string(forKey: Keys.currencyCode) ?? "USD"
        return SimpleEntry(date: Date(), spentToday: spent, currencyCode: code)
    }
}