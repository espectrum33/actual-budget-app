import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), spentToday: 12345, currencyCode: "USD")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SharedDataManager.shared.readEntry()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let entry = SharedDataManager.shared.readEntry()
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let spentToday: Int
    let currencyCode: String
}

struct SummaryWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("SPENT TODAY")
                // --- FIXED: This is the correct font syntax ---
                .font(.caption.bold())
                .foregroundColor(.secondary)
            
            Text(formatMoney(entry.spentToday))
                .font(.title2.weight(.semibold).monospacedDigit())
                .foregroundColor(Color.accentColor)
        }
        .padding()
    }
    
    private func formatMoney(_ amount: Int) -> String {
        CurrencyFormatter.shared.format(amount, currencyCode: entry.currencyCode)
    }
}

// --- FIXED: @main attribute is removed from here ---
struct SummaryWidget: Widget {
    let kind: String = "SummaryWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            SummaryWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Spending Summary")
        .description("See how much you've spent today at a glance.")
        .supportedFamilies([.systemSmall])
    }
}