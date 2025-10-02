import SwiftUI

struct AppBackground: View {
    @EnvironmentObject private var appState: AppState
    
    var body: some View {
        switch appState.currentTheme {
        case .liquidDark:
            LiquidBackground()
        case .amoledDark:
            Color.black.ignoresSafeArea()
        case .systemLight:
            Color(.systemGroupedBackground).ignoresSafeArea()
        }
    }
}