import SwiftUI

struct AppTheme {
    static let accent = Color.blue
    static let accentSoft = Color.blue.opacity(0.2)
    static let background = Color.black
    static let cardBackground = Color(.systemGray6).opacity(0.1)
    static let softBackground = Color(.systemGray6).opacity(0.05)
    static let destructive = Color.red
    static let cornerRadius: CGFloat = 16

    // ShapeStyle for glass card fills (use in .fill(...) or .background(_:in:...))
    static let glassCardBackground = AnyShapeStyle(.ultraThinMaterial)

    // View background variant for places that expect a View (e.g., listRowBackground, .background(View))
    static var glassCardBackgroundView: some View {
        RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
            .fill(.ultraThinMaterial)
    }

    static func glassBackground() -> some View {
        Rectangle()
            .fill(.ultraThinMaterial)
            .ignoresSafeArea()
    }

    static func glassCard<Content: View>(@ViewBuilder content: () -> Content) -> some View {
        content()
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(Color.white.opacity(0.08), lineWidth: 1)
            )
    }

    struct Fonts {
        static let title = Font.system(size: 24, weight: .bold, design: .rounded)
        static let subtitle = Font.system(size: 18, weight: .semibold, design: .rounded)
        static let body = Font.system(size: 16, weight: .regular, design: .rounded)
        static let headline = Font.system(size: 16, weight: .semibold, design: .rounded)
        static let subheadline = Font.system(size: 14, weight: .medium, design: .rounded)
        static let footnote = Font.system(size: 12, weight: .regular, design: .rounded)
        static let caption = Font.system(size: 11, weight: .regular, design: .rounded)
        static let caption2 = Font.system(size: 10, weight: .regular, design: .rounded)
    }
}
