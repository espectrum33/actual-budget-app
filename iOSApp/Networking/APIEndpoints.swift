import Foundation

enum APIEndpoints {
    static func baseURL(from baseURLString: String) throws -> URL {
        guard let url = URL(string: baseURLString) else { throw URLError(.badURL) }
        return url
    }

    static func accounts(base: URL, syncId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts") }
    static func account(base: URL, syncId: String, accountId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts/\(accountId)") }
    static func accountBalance(base: URL, syncId: String, accountId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts/\(accountId)/balance") }
    static func accountClose(base: URL, syncId: String, accountId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts/\(accountId)/close") }
    static func accountReopen(base: URL, syncId: String, accountId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts/\(accountId)/reopen") }
    static func accountBankSync(base: URL, syncId: String, accountId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts/\(accountId)/banksync") }
    static func accountsBankSync(base: URL, syncId: String) -> URL { base.appendingPathComponent("/budgets/\(syncId)/accounts/banksync") }
}

