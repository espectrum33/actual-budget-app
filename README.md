# ActualAccounts iOS App

A SwiftUI iOS app for managing Actual Budget accounts over the HTTP API defined in `swagger.json`.

## Prerequisites
- Xcode 16 (iOS 17+ SDK)
- [XcodeGen](https://github.com/yonaskolb/XcodeGen) installed (`brew install xcodegen`)

## Generate and open the project
```bash
cd iOSApp
xcodegen generate
open ActualAccounts.xcodeproj
```

## Configure the app
On first launch, enter:
- Base URL (e.g. `https://your-actual-server/v1`)
- API Key (sent as `x-api-key`)
- Sync ID (budget sync ID)
- Optional Budget Encryption Password (sent as `budget-encryption-password`)

You can change these later from Settings.

## Features
- Accounts list with pull-to-refresh and search
- Account actions: create, delete, close, reopen, trigger bank sync
- Liquid design background using gradients and animated blobs
- Onboarding and Settings flows for connection settings

## Notes
- The API contract is based on `swagger.json`. Ensure your server exposes matching endpoints.
- Credentials are stored in `UserDefaults`. Consider migrating to Keychain for secrets.

