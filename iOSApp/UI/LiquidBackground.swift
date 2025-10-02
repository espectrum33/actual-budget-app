import SwiftUI

struct LiquidBackground: View {
    var body: some View {
        LinearGradient(
            colors: [Color(red: 0.06, green: 0.12, blue: 0.20), Color(red: 0.02, green: 0.05, blue: 0.10)],
            startPoint: .topLeading,
            endPoint: .bottomTrailing
        )
        .ignoresSafeArea()
    }
}
