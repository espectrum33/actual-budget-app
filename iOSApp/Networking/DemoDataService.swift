import Foundation

struct DemoDataService {
    static let shared = DemoDataService()
    
    private init() {}
    
    // MARK: - Demo Accounts
    func generateAccounts() -> [Account] {
        return [
            Account(id: "demo-checking", name: "Checking Account", offbudget: false, closed: false),
            Account(id: "demo-savings", name: "Savings Account", offbudget: false, closed: false),
            Account(id: "demo-credit", name: "Credit Card", offbudget: false, closed: false),
            Account(id: "demo-investment", name: "Investment Account", offbudget: true, closed: false),
            Account(id: "demo-cash", name: "Cash", offbudget: true, closed: false)
        ]
    }
    
    // MARK: - Demo Categories
    func generateCategories() -> [Category] {
        return [
            Category(id: "demo-food", name: "Food & Dining", is_income: false, hidden: false, group_id: "demo-expenses"),
            Category(id: "demo-transport", name: "Transportation", is_income: false, hidden: false, group_id: "demo-expenses"),
            Category(id: "demo-entertainment", name: "Entertainment", is_income: false, hidden: false, group_id: "demo-expenses"),
            Category(id: "demo-bills", name: "Bills & Utilities", is_income: false, hidden: false, group_id: "demo-expenses"),
            Category(id: "demo-shopping", name: "Shopping", is_income: false, hidden: false, group_id: "demo-expenses"),
            Category(id: "demo-salary", name: "Salary", is_income: true, hidden: false, group_id: "demo-income"),
            Category(id: "demo-freelance", name: "Freelance", is_income: true, hidden: false, group_id: "demo-income")
        ]
    }
    
    // MARK: - Demo Payees
    func generatePayees() -> [Payee] {
        return [
            Payee(id: "demo-grocery", name: "Grocery Store", category: "demo-food", transfer_acct: nil),
            Payee(id: "demo-gas", name: "Gas Station", category: "demo-transport", transfer_acct: nil),
            Payee(id: "demo-netflix", name: "Netflix", category: "demo-entertainment", transfer_acct: nil),
            Payee(id: "demo-electric", name: "Electric Company", category: "demo-bills", transfer_acct: nil),
            Payee(id: "demo-amazon", name: "Amazon", category: "demo-shopping", transfer_acct: nil),
            Payee(id: "demo-employer", name: "Employer", category: "demo-salary", transfer_acct: nil),
            Payee(id: "demo-client", name: "Client ABC", category: "demo-freelance", transfer_acct: nil)
        ]
    }
    
    // MARK: - Demo Transactions
    func generateTransactions(for accountId: String, since: String) -> [Transaction] {
        let accounts = generateAccounts()
        let payees = generatePayees()
        let categories = generateCategories()
        
        guard let account = accounts.first(where: { $0.id == accountId }) else { return [] }
        
        let calendar = Calendar(identifier: .gregorian)
        let sinceDate = parseDate(since) ?? Date()
        let now = Date()
        
        var transactions: [Transaction] = []
        let daysDiff = calendar.dateComponents([.day], from: sinceDate, to: now).day ?? 30
        
        // Generate 20-50 random transactions
        let transactionCount = Int.random(in: 20...50)
        
        for _ in 0..<transactionCount {
            let randomDaysAgo = Int.random(in: 0...daysDiff)
            let transactionDate = calendar.date(byAdding: .day, value: -randomDaysAgo, to: now) ?? now
            
            let isIncome = account.offbudget || Bool.random()
            let amount = isIncome ? 
                Int.random(in: 2000...10000) : // $20-$100 income
                -Int.random(in: 500...5000)    // $5-$50 expense
            
            let payee = payees.randomElement()!
            let category = categories.randomElement()!
            
            transactions.append(Transaction(
                id: "demo-\(UUID().uuidString)",
                account: accountId,
                date: formatDate(transactionDate),
                amount: amount,
                payee: payee.id,
                payee_name: nil,
                imported_payee: nil,
                category: category.id,
                notes: Bool.random() ? generateRandomNote() : nil,
                imported_id: nil,
                transfer_id: nil,
                cleared: Bool.random(),
                subtransactions: nil
            ))
        }
        
        return transactions.sorted { $0.date > $1.date }
    }
    
    // MARK: - Demo Budget Data
    func generateBudgetMonth() -> BudgetMonth {
        return BudgetMonth(
            month: "2024-01",
            incomeAvailable: 500000, // $5000
            lastMonthOverspent: -5000, // -$50
            forNextMonth: 10000, // $100
            totalBudgeted: 450000, // $4500
            toBudget: 50000, // $500
            fromLastMonth: 0,
            totalIncome: 600000, // $6000
            totalSpent: -400000, // $4000
            totalBalance: 100000 // $1000
        )
    }
    
    func generateBudgetCategoryGroups() -> [BudgetMonthCategoryGroup] {
        let categories = generateCategories()
        let groups = [
            ("demo-expenses", "Usual Expenses", false),
            ("demo-income", "Income", true)
        ]
        
        return groups.map { groupId, groupName, isIncome in
            let groupCategories = categories.filter { $0.group_id == groupId }
            let budgeted = isIncome ? 0 : Int.random(in: 10000...100000)
            let spent = isIncome ? Int.random(in: 50000...200000) : -Int.random(in: 5000...80000)
            let balance = budgeted + spent
            
            return BudgetMonthCategoryGroup(
                id: groupId,
                name: groupName,
                is_income: isIncome,
                hidden: false,
                categories: groupCategories.map { cat in
                    let catBudgeted = isIncome ? 0 : Int.random(in: 2000...30000)
                    let catSpent = isIncome ? Int.random(in: 10000...100000) : -Int.random(in: 1000...20000)
                    let catBalance = catBudgeted + catSpent
                    
                    return BudgetMonthCategory(
                        id: cat.id,
                        name: cat.name,
                        is_income: cat.is_income,
                        hidden: cat.hidden,
                        group_id: cat.group_id,
                        budgeted: catBudgeted,
                        spent: catSpent,
                        balance: catBalance,
                        carryover: false
                    )
                },
                budgeted: budgeted,
                spent: spent,
                balance: balance
            )
        }
    }
    
    // MARK: - Helper Methods
    private func generateRandomNote() -> String {
        let notes = [
            "Monthly subscription",
            "Grocery shopping",
            "Gas for commute",
            "Coffee with friends",
            "Online purchase",
            "Utility bill",
            "Restaurant dinner",
            "Movie tickets",
            "Book purchase",
            "Gym membership"
        ]
        return notes.randomElement() ?? "Transaction"
    }
    
    private func parseDate(_ str: String) -> Date? {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.date(from: str)
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }
}
