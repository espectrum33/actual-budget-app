import WidgetKit
import SwiftUI

// The Provider and Timeline logic remains the same.
// It's responsible for fetching the data from SharedDataManager.
struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), spentToday: 12345, currencyCode: "INR")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SharedDataManager.shared.readEntry()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let entry = SharedDataManager.shared.readEntry()
        // Refresh the widget every 15 minutes
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
}

struct SummaryWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .top) {
                // Title
                VStack(alignment: .leading) {
                    Text("Spent Today")
                        .font(AppTheme.Fonts.headline)
                        .foregroundColor(.white.opacity(0.8))
                    
                    // Formatted Amount
                    Text(formatMoney(entry.spentToday))
                        .font(AppTheme.Fonts.title)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .lineLimit(1)
                        .minimumScaleFactor(0.7)
                }
                
                Spacer(minLength: 0)
                
                // Icon
                Image(systemName: "arrow.down.circle.fill")
                    .font(.title)
                    .foregroundColor(AppTheme.accentSoft)
            }
            
            Spacer(minLength: 0)
            
            // Last Updated Timestamp
            Text("Updated: \(entry.date, style: .time)")
                .font(AppTheme.Fonts.caption)
                .foregroundColor(.white.opacity(0.6))
        }
        .padding()
    }
    
    private func formatMoney(_ amount: Int) -> String {
        return CurrencyFormatter.shared.format(amount, currencyCode: entry.currencyCode)
    }
}

// The main Widget configuration
@main
struct SummaryWidget: Widget {
    let kind: String = "SummaryWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            SummaryWidgetEntryView(entry: entry)
                // This modifier provides the background for modern iOS versions
                .containerBackground(for: .widget) {
                    AppTheme.accent.opacity(0.8)
                }
        }
        .configurationDisplayName("Spending Summary")
        .description("See how much you've spent today at a glance.")
        .supportedFamilies([.systemSmall])
    }
}

// Preview provider for Xcode Previews
struct SummaryWidget_Previews: PreviewProvider {
    static var previews: some View {
        SummaryWidgetEntryView(entry: SimpleEntry(date: Date(), spentToday: 54321, currencyCode: "INR"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
            .containerBackground(for: .widget) {
                 AppTheme.accent.opacity(0.8)
            }
    }
}
