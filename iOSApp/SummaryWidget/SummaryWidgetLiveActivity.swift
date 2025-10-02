//
//  SummaryWidgetLiveActivity.swift
//  SummaryWidget
//
//  Created by Anuj Parihar on 03/10/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct SummaryWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct SummaryWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: SummaryWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension SummaryWidgetAttributes {
    fileprivate static var preview: SummaryWidgetAttributes {
        SummaryWidgetAttributes(name: "World")
    }
}

extension SummaryWidgetAttributes.ContentState {
    fileprivate static var smiley: SummaryWidgetAttributes.ContentState {
        SummaryWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: SummaryWidgetAttributes.ContentState {
         SummaryWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: SummaryWidgetAttributes.preview) {
   SummaryWidgetLiveActivity()
} contentStates: {
    SummaryWidgetAttributes.ContentState.smiley
    SummaryWidgetAttributes.ContentState.starEyes
}
