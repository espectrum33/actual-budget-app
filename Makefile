# ActualAccounts Makefile
# Build automation for iOS app

# --- Configuration ---
PROJECT_NAME = ActualAccounts
SCHEME = ActualAccounts
PROJECT_DIR = iOSApp
PROJECT_FILE = $(PROJECT_DIR)/$(PROJECT_NAME).xcodeproj

BUILD_DIR = $(PROJECT_DIR)/build
ARCHIVE_PATH = $(BUILD_DIR)/$(PROJECT_NAME).xcarchive
FINAL_IPA = $(PROJECT_NAME).ipa

PAYLOAD_DIR = $(BUILD_DIR)/Payload
APP_BUNDLE = $(ARCHIVE_PATH)/Products/Applications/$(PROJECT_NAME).app
UNSIGNED_IPA_NAME = $(PROJECT_NAME)-unsigned.ipa
UNSIGNED_IPA_PATH = $(BUILD_DIR)/$(UNSIGNED_IPA_NAME)
DEVELOPER_DIR = /Applications/Xcode.app/Contents/Developer
XCODEBUILD = DEVELOPER_DIR=$(DEVELOPER_DIR) xcodebuild

# --- Self-Signing Certificate Config ---
# The certificate name, without quotes here
CERT_NAME=iPhone Developer: Local Build

# --- Main Targets ---

.PHONY: all
all: ios-unsigned

.PHONY: ios-unsigned
ios-unsigned: clean project
	@echo "\n--- Step 1: Creating Self-Signed Certificate ---"
	
	@echo "\n--- Step 2: Archiving with Self-Signed Certificate ---"
	@$(XCODEBUILD) -project $(PROJECT_FILE) \
		-scheme $(SCHEME) \
		-configuration Release \
		-destination generic/platform=iOS \
		-archivePath $(ARCHIVE_PATH) \
		CODE_SIGN_IDENTITY="$(CERT_NAME)" \
		OTHER_CODE_SIGN_FLAGS="--keychain $(KEYCHAIN_NAME)" \
		archive
	@test -d "$(APP_BUNDLE)" || (echo "❌ Archive failed." && make cleanup-keychain && exit 1)
	@echo "✅ Archive complete: $(ARCHIVE_PATH)"

	@echo "\n--- Step 3: Packaging Unsigned IPA ---"
	@rm -rf $(PAYLOAD_DIR)
	@mkdir -p $(PAYLOAD_DIR)
	@cp -R "$(APP_BUNDLE)" $(PAYLOAD_DIR)/
	@cd $(BUILD_DIR) && zip -qry "$(UNSIGNED_IPA_NAME)" Payload
	@rm -rf $(PAYLOAD_DIR)
	@cp $(UNSIGNED_IPA_PATH) ./$(FINAL_IPA)
	@echo "✅ Build complete: $(FINAL_IPA)"
	@ls -lh $(FINAL_IPA)
	
	@make cleanup-keychain

# --- Utility Targets ---

.PHONY: cleanup-keychain
cleanup-keychain:
	@echo "\n--- Step 4: Cleaning Up Temporary Keychain ---"
	@security delete-keychain $(KEYCHAIN_NAME) || echo "🔑 Keychain already deleted or never created."
	@echo "✅ Cleanup complete."

.PHONY: clean
clean:
	@echo "🧹 Cleaning build artifacts..."
	@echo "   - Removing build directory: '$(BUILD_DIR)'"
	@if [ -d "$(BUILD_DIR)" ]; then rm -rf "$(BUILD_DIR)"; fi
	@echo "   - Removing final IPA: '$(FINAL_IPA)'"
	@if [ -f "$(FINAL_IPA)" ]; then rm -f "$(FINAL_IPA)"; fi
	@echo "✅ Clean complete"

.PHONY: project
project:
	@if ! which xcodegen >/dev/null 2>&1; then \
		echo "❌ xcodegen not found. Please install with: brew install xcodegen"; \
		exit 1; \
	fi
	@if [ ! -d "$(PROJECT_DIR)" ]; then \
		echo "❌ Project directory '$(PROJECT_DIR)' not found."; \
		echo "   Please run 'make' from the root of your repository (the directory containing 'iOSApp')."; \
		exit 1; \
	fi
	@echo "🛠️  Generating Xcode project with XcodeGen..."
	@cd $(PROJECT_DIR) && xcodegen generate
	@test -d "$(PROJECT_FILE)" || (echo "❌ Failed to generate project at '$(PROJECT_FILE)'" && exit 1)
	@echo "✅ Project generated"

# Help target to show information
.PHONY: help
help:
	@echo "📋 Build Information:"
	@echo "  App Name: $(PROJECT_NAME)"
	@echo "  Scheme: $(SCHEME)"
	@echo ""
	@echo "📱 Available targets:"
	@echo "  make             - Build unsigned IPA (default)"
	@echo "  make project     - Regenerate Xcode project via XcodeGen"
	@echo "  make clean       - Clean all build artifacts"

