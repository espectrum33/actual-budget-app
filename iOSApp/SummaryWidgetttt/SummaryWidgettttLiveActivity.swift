//
//  SummaryWidgettttLiveActivity.swift
//  SummaryWidgetttt
//
//  Created by Anuj Parihar on 03/10/25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct SummaryWidgettttAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var emoji: String
    }

    var name: String
}

struct SummaryWidgettttLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: SummaryWidgettttAttributes.self) { context in
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
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

extension SummaryWidgettttAttributes {
    fileprivate static var preview: SummaryWidgettttAttributes {
        SummaryWidgettttAttributes(name: "World")
    }
}

extension SummaryWidgettttAttributes.ContentState {
    fileprivate static var smiley: SummaryWidgettttAttributes.ContentState {
        SummaryWidgettttAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: SummaryWidgettttAttributes.ContentState {
         SummaryWidgettttAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: SummaryWidgettttAttributes.preview) {
   SummaryWidgettttLiveActivity()
} contentStates: {
    SummaryWidgettttAttributes.ContentState.smiley
    SummaryWidgettttAttributes.ContentState.starEyes
}
