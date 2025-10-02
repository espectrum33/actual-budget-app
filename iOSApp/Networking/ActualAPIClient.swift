import Foundation

final class ActualAPIClient {
    private let session: URLSession
    private let baseURL: URL
    private let apiKey: String
    private let syncId: String
    private let budgetEncryptionPassword: String?

    init(baseURLString: String, apiKey: String, syncId: String, budgetEncryptionPassword: String?) throws {
        self.session = URLSession(configuration: .default)
        self.baseURL = try APIEndpoints.baseURL(from: baseURLString)
        self.apiKey = apiKey
        self.syncId = syncId
        self.budgetEncryptionPassword = budgetEncryptionPassword?.isEmpty == true ? nil : budgetEncryptionPassword
    }

    // MARK: - Public API

    func fetchAccounts() async throws -> [Account] {
        let url = APIEndpoints.accounts(base: baseURL, syncId: syncId)
        let request = try buildRequest(url: url, method: "GET")
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
        return try JSONDecoder().decode(AccountsListResponse.self, from: data).data
    }

    func createAccount(name: String, offbudget: Bool) async throws -> String {
        let url = APIEndpoints.accounts(base: baseURL, syncId: syncId)
        var request = try buildRequest(url: url, method: "POST")
        let body: [String: Any] = [
            "account": [
                "name": name,
                "offbudget": offbudget
            ]
        ]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
        let msg = try JSONDecoder().decode(GeneralResponseMessage.self, from: data)
        return msg.message
    }

    func updateAccount(accountId: String, name: String?, offbudget: Bool?) async throws {
        let url = APIEndpoints.account(base: baseURL, syncId: syncId, accountId: accountId)
        var request = try buildRequest(url: url, method: "PATCH")
        var account: [String: Any] = [:]
        if let name { account["name"] = name }
        if let offbudget { account["offbudget"] = offbudget }
        request.httpBody = try JSONSerialization.data(withJSONObject: ["account": account])
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
    }

    func deleteAccount(accountId: String) async throws {
        let url = APIEndpoints.account(base: baseURL, syncId: syncId, accountId: accountId)
        let request = try buildRequest(url: url, method: "DELETE")
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
    }

    func closeAccount(accountId: String, transferAccountId: String?, transferCategoryId: String?) async throws {
        let url = APIEndpoints.accountClose(base: baseURL, syncId: syncId, accountId: accountId)
        var request = try buildRequest(url: url, method: "PUT")
        var transfer: [String: Any] = [:]
        if let transferAccountId { transfer["transferAccountId"] = transferAccountId }
        if let transferCategoryId { transfer["transferCategoryId"] = transferCategoryId }
        request.httpBody = try JSONSerialization.data(withJSONObject: ["transfer": transfer])
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
    }

    func reopenAccount(accountId: String) async throws {
        let url = APIEndpoints.accountReopen(base: baseURL, syncId: syncId, accountId: accountId)
        let request = try buildRequest(url: url, method: "PUT")
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
    }

    func bankSync(accountId: String?) async throws {
        let url: URL
        if let accountId {
            url = APIEndpoints.accountBankSync(base: baseURL, syncId: syncId, accountId: accountId)
        } else {
            url = APIEndpoints.accountsBankSync(base: baseURL, syncId: syncId)
        }
        let request = try buildRequest(url: url, method: "POST")
        let (data, response) = try await session.data(for: request)
        try ensureSuccess(response: response, data: data)
    }

    // MARK: - Helpers

    private func buildRequest(url: URL, method: String) throws -> URLRequest {
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue(apiKey, forHTTPHeaderField: "x-api-key")
        if let budgetEncryptionPassword { request.setValue(budgetEncryptionPassword, forHTTPHeaderField: "budget-encryption-password") }
        return request
    }

    private func ensureSuccess(response: URLResponse, data: Data) throws {
        guard let http = response as? HTTPURLResponse else { throw URLError(.badServerResponse) }
        guard (200..<300).contains(http.statusCode) else {
            let serverMessage = String(data: data, encoding: .utf8) ?? ""
            throw APIError.httpError(status: http.statusCode, body: serverMessage)
        }
    }
}

enum APIError: Error, LocalizedError {
    case httpError(status: Int, body: String)

    var errorDescription: String? {
        switch self {
        case let .httpError(status, body):
            return "HTTP \(status): \(body)"
        }
    }
}

