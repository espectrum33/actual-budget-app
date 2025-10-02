import SwiftUI

struct AppTheme {
    static let gradientTop = Color(red: 0.06, green: 0.12, blue: 0.20)
    static let gradientBottom = Color(red: 0.02, green: 0.05, blue: 0.10)
    static let accent = Color.cyan
    static let accentSoft = Color.cyan.opacity(0.25)
}

struct LiquidBackground: View {
    var body: some View {
        LinearGradient(
            colors: [AppTheme.gradientTop, AppTheme.gradientBottom],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
        .ignoresSafeArea()
    }
}

