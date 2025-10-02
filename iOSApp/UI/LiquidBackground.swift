import SwiftUI

struct LiquidBackground: View {
    @State private var animate = false

    var body: some View {
        ZStack {
            LinearGradient(colors: [.blue.opacity(0.25), .purple.opacity(0.25)], startPoint: .topLeading, endPoint: .bottomTrailing)
                .ignoresSafeArea()
            Circle()
                .fill(.blue.gradient)
                .frame(width: 420, height: 420)
                .blur(radius: 80)
                .offset(x: animate ? -140 : -40, y: animate ? -200 : -120)
                .opacity(0.8)
            Circle()
                .fill(.pink.gradient)
                .frame(width: 360, height: 360)
                .blur(radius: 80)
                .offset(x: animate ? 120 : 40, y: animate ? 180 : 120)
                .opacity(0.7)
            Circle()
                .fill(.mint.gradient)
                .frame(width: 300, height: 300)
                .blur(radius: 80)
                .offset(x: animate ? -60 : -20, y: animate ? 220 : 160)
                .opacity(0.6)
        }
        .animation(.easeInOut(duration: 8).repeatForever(autoreverses: true), value: animate)
        .onAppear { animate = true }
    }
}

