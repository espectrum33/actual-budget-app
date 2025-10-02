# Actual Accounts iOS App

A modern, native iOS app for managing your personal finances with the Actual Budget backend. Built with SwiftUI and designed for a clean, intuitive user experience.

## Features

### 💰 **Financial Overview**
- **Dashboard**: Quick insights with spending metrics and recent transactions
- **Account Management**: View all your accounts with real-time balances
- **Transaction Tracking**: Comprehensive transaction history with filtering
- **Budget Planning**: Visual budget management with category breakdowns

### 🎨 **Modern UI/UX**
- **Glass Morphism Design**: Beautiful translucent cards and backgrounds
- **Dark Mode Support**: Optimized for both light and dark themes
- **Responsive Layout**: Adapts to different screen sizes and orientations
- **Smooth Animations**: Fluid transitions and micro-interactions

### 🌍 **International Support**
- **30+ Currencies**: Support for major world currencies (USD, EUR, GBP, JPY, etc.)
- **Localized Formatting**: Proper currency symbols and number formatting
- **Auto-Detection**: Automatically detects your device's currency preference

### 🧪 **Demo Mode**
- **Sample Data**: Test the app with realistic demo data
- **No Setup Required**: Perfect for trying out features without configuration
- **Toggle On/Off**: Switch between demo and real data seamlessly

## Screenshots

*Add screenshots of your app here*

## Requirements

- iOS 17.0+
- Xcode 15.0+
- Swift 5.9+

## Installation

### Prerequisites
1. Clone this repository
2. Open `iOSApp/ActualAccounts.xcodeproj` in Xcode
3. Ensure you have a valid Apple Developer account for device testing

### Setup
1. **Configure Actual Budget Backend**:
   - Set up your Actual Budget server
   - Note your API endpoint, API key, and sync ID

2. **App Configuration**:
   - Launch the app
   - Go to Settings (via Accounts → gear icon)
   - Enter your Actual Budget credentials:
     - Base URL (e.g., `https://your-actual-server.com`)
     - API Key
     - Sync ID
     - Budget Encryption Password (optional)

3. **Alternative - Demo Mode**:
   - Enable "Demo Mode" in Settings
   - The app will show sample data for testing

## Architecture

### Tech Stack
- **SwiftUI**: Modern declarative UI framework
- **Combine**: Reactive programming for data flow
- **URLSession**: HTTP networking
- **Core Data**: Local data persistence (if needed)

### Project Structure
```
iOSApp/
├── App/
│   ├── ActualAccountsApp.swift      # Main app entry point
│   └── AppState.swift               # Global app state management
├── Features/
│   ├── Dashboard/                   # Dashboard screen
│   ├── Accounts/                    # Account management
│   ├── Transactions/                # Transaction views
│   ├── Budget/                      # Budget planning
│   └── Settings/                    # App settings
├── Networking/
│   ├── ActualAPIClient.swift        # API client
│   ├── APIEndpoints.swift          # Endpoint definitions
│   ├── APIModels.swift             # Data models
│   ├── CurrencyFormatter.swift     # Currency formatting
│   └── DemoDataService.swift       # Demo data generation
└── UI/
    ├── GlassCard.swift             # Reusable glass card component
    └── LiquidBackground.swift      # Animated background
```

## Key Features

### Dashboard
- **Spending Metrics**: Today, this month, last month spending
- **Account Overview**: On-budget account count
- **Visual Charts**: Daily spending trends and category breakdowns
- **Quick Actions**: Add transactions directly from dashboard

### Account Management
- **Account List**: All accounts with current balances
- **Account Types**: On-budget and off-budget account separation
- **Account Actions**: Create, edit, close, and sync accounts
- **Balance Tracking**: Real-time balance updates

### Transaction Management
- **Transaction List**: Comprehensive transaction history
- **Smart Filtering**: Filter by date range, account type, and categories
- **Transaction Editor**: Full-featured transaction creation/editing
- **Account Picker**: Choose destination account when creating transactions

### Budget Planning
- **Category Groups**: Organized budget categories with collapsible sections
- **Budget Tracking**: Monitor budgeted vs. spent amounts
- **Visual Progress**: Progress bars for spending visualization
- **Month Navigation**: Navigate between different budget months

### Settings
- **Connection Settings**: Configure Actual Budget server connection
- **Currency Selection**: Choose from 30+ supported currencies
- **Demo Mode**: Toggle sample data for testing
- **Configuration Reset**: Clear all settings

## API Integration

The app integrates with the Actual Budget API to provide real-time financial data:

- **Authentication**: API key-based authentication
- **Data Sync**: Real-time synchronization with Actual Budget server
- **Offline Support**: Graceful handling of network issues
- **Error Handling**: User-friendly error messages and retry mechanisms

## Demo Mode

Perfect for testing and showcasing the app:

- **Realistic Data**: Sample accounts, transactions, and budget data
- **No Setup Required**: Works immediately without server configuration
- **Full Feature Access**: All app features work with demo data
- **Easy Toggle**: Switch between demo and real data in settings

## Customization

### Currency Support
The app supports 30+ currencies including:
- Major currencies: USD, EUR, GBP, JPY, CAD, AUD
- Regional currencies: INR, BRL, MXN, KRW, SGD
- And many more...

### UI Themes
- **Glass Morphism**: Modern translucent design elements
- **Liquid Backgrounds**: Animated gradient backgrounds
- **Consistent Spacing**: Harmonious layout and typography
- **Accessibility**: VoiceOver and Dynamic Type support

## Development

### Building the App
1. Open `iOSApp/ActualAccounts.xcodeproj` in Xcode
2. Select your target device or simulator
3. Build and run (⌘+R)

### Code Style
- **SwiftUI Best Practices**: Declarative UI patterns
- **MVVM Architecture**: Clean separation of concerns
- **Async/Await**: Modern concurrency patterns
- **Error Handling**: Comprehensive error management

### Testing
- **Demo Mode**: Use for UI testing and feature validation
- **Unit Tests**: Core business logic testing
- **UI Tests**: Automated user interface testing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under a custom "Personal Use Only" license - see the [LICENSE](LICENSE) file for details.

**Quick Summary:**
- ✅ **Personal Use**: Free to use, modify, and learn from for personal purposes
- ✅ **Open Source**: Full source code available for viewing and study
- ❌ **Commercial Use**: Not allowed for business, corporate, or commercial purposes
- ❌ **Distribution**: Cannot be sold, licensed, or distributed commercially

For commercial licensing inquiries, please contact the author.

## Acknowledgments

- **Actual Budget**: The open-source budgeting backend that powers this app
- **SwiftUI Community**: For inspiration and best practices
- **Design Inspiration**: Modern iOS design patterns and glass morphism trends

## Support

For support, feature requests, or bug reports:
- Open an issue on GitHub
- Check the documentation
- Review the demo mode for feature examples

---

**Built with ❤️ using SwiftUI and Actual Budget**