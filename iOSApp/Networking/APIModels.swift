import Foundation

struct APIResponse<T: Decodable>: Decodable {
    let data: T
}

struct GeneralResponseMessage: Decodable {
    let message: String
}

struct Account: Identifiable, Codable, Equatable {
    let id: String
    var name: String
    var offbudget: Bool
    var closed: Bool
}

struct AccountsListResponse: Decodable {
    let data: [Account]
}

