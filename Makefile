# ActualAccounts Makefile
# Build automation for iOS app

# Configuration
APP_NAME = ActualAccounts
SCHEME = ActualAccounts
PROJECT_DIR = iOSApp
PROJECT_FILE = $(PROJECT_DIR)/ActualAccounts.xcodeproj
ARCHIVE_PATH = $(PROJECT_DIR)/build/$(APP_NAME).xcarchive
IPA_OUTPUT_DIR = $(PROJECT_DIR)/build/ipa
FINAL_IPA = $(APP_NAME).ipa

# Derived for unsigned packaging
PAYLOAD_DIR = $(PROJECT_DIR)/build/Payload
APP_BUNDLE = $(ARCHIVE_PATH)/Products/Applications/$(APP_NAME).app
UNSIGNED_IPA = $(PROJECT_DIR)/build/$(APP_NAME)-unsigned.ipa

# Xcode settings
DEVELOPER_DIR = /Applications/Xcode.app/Contents/Developer
XCODEBUILD = DEVELOPER_DIR=$(DEVELOPER_DIR) xcodebuild

# Default target
.PHONY: all
all: ios-unsigned

# Clean build artifacts
.PHONY: clean
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf $(PROJECT_DIR)/build/
	rm -f $(FINAL_IPA)
	rm -f $(UNSIGNED_IPA)
	@echo "✅ Clean complete"

# Generate Xcode project via XcodeGen
.PHONY: project
project:
	@which xcodegen >/dev/null 2>&1 || (echo "❌ xcodegen not found. Install with: brew install xcodegen" && exit 1)
	@test -f "$(PROJECT_DIR)/project.yml" || (echo "❌ Missing $(PROJECT_DIR)/project.yml" && exit 1)
	@echo "🛠️  Generating Xcode project with XcodeGen..."
	@cd $(PROJECT_DIR) && xcodegen generate
	@test -d "$(PROJECT_FILE)" || (echo "❌ Failed to generate $(PROJECT_FILE)" && exit 1)
	@echo "✅ Project generated: $(PROJECT_FILE)"

# Build iOS app (unsigned IPA)
.PHONY: ios-unsigned
ios-unsigned: clean ios-archive-nocode
	@echo "📦 Packaging unsigned IPA..."
	@rm -rf $(PAYLOAD_DIR)
	@mkdir -p $(PAYLOAD_DIR)
	@test -d "$(APP_BUNDLE)" || (echo "❌ .app not found at $(APP_BUNDLE)." && exit 1)
	@cp -R "$(APP_BUNDLE)" $(PAYLOAD_DIR)/
	@cd $(PROJECT_DIR)/build && zip -qry "$(APP_NAME)-unsigned.ipa" Payload
	@rm -rf $(PAYLOAD_DIR)
	@cp $(UNSIGNED_IPA) ./$(FINAL_IPA)
	@echo "✅ Build complete: $(FINAL_IPA)"
	@ls -lh $(FINAL_IPA)

# Build archive only (signed settings as per Xcode project)
.PHONY: ios-archive
ios-archive: project
	@echo "🔨 Creating iOS archive..."
	$(XCODEBUILD) -project $(PROJECT_FILE) \
		-scheme $(SCHEME) \
		-configuration Release \
		-destination generic/platform=iOS \
		-archivePath $(ARCHIVE_PATH) \
		archive
	@echo "✅ Archive complete: $(ARCHIVE_PATH)"

# Build archive only with code signing disabled (for unsigned IPA)
.PHONY: ios-archive-nocode
ios-archive-nocode: project
	@echo "🔨 Creating iOS archive (no code signing)..."
	$(XCODEBUILD) -project $(PROJECT_FILE) \
		-scheme $(SCHEME) \
		-configuration Release \
		-destination generic/platform=iOS \
		-archivePath $(ARCHIVE_PATH) \
		CODE_SIGNING_ALLOWED=NO \
		CODE_SIGNING_REQUIRED=NO \
		CODE_SIGN_IDENTITY="" \
		archive
	@test -d "$(APP_BUNDLE)" || (echo "❌ Archive failed or .app not found at $(APP_BUNDLE)" && exit 1)
	@echo "✅ Archive (no code signing) complete: $(ARCHIVE_PATH)"

# Export (signed) IPA using exportOptions.plist (optional; requires signing)
.PHONY: ios-export
ios-export: project
	@echo "📦 Exporting IPA (requires valid signing and export-options.plist)..."
	$(XCODEBUILD) -exportArchive \
		-archivePath $(ARCHIVE_PATH) \
		-exportPath $(IPA_OUTPUT_DIR) \
		-exportOptionsPlist iOSApp/export-options.plist
	@echo "📁 Moving IPA to project root..."
	cp $(IPA_OUTPUT_DIR)/$(APP_NAME).ipa ./$(FINAL_IPA)
	@echo "✅ Export complete: $(FINAL_IPA)"
	@ls -lh $(FINAL_IPA)

# Show build info
.PHONY: info
info:
	@echo "📋 Build Information:"
	@echo "  App Name: $(APP_NAME)"
	@echo "  Scheme: $(SCHEME)"
	@echo "  Project: $(PROJECT_FILE)"
	@echo "  Archive Path: $(ARCHIVE_PATH)"
	@echo "  Output IPA: $(FINAL_IPA)"
	@echo "  Unsigned IPA: $(UNSIGNED_IPA)"
	@echo "  Xcode Path: $(DEVELOPER_DIR)"
	@echo ""
	@echo "📱 Available targets:"
	@echo "  make ios-unsigned  - Build unsigned IPA (default)"
	@echo "  make ios-archive   - Create archive only (signed as configured)"
	@echo "  make ios-archive-nocode - Create archive with signing disabled"
	@echo "  make ios-export    - Export IPA via exportArchive (requires signing)"
	@echo "  make project       - Generate Xcode project via XcodeGen"
	@echo "  make clean         - Clean build artifacts"
	@echo "  make info          - Show this information"

# Check if Xcode is available
.PHONY: check-xcode
check-xcode:
	@if [ ! -d "$(DEVELOPER_DIR)" ]; then \
		echo "❌ Xcode not found at $(DEVELOPER_DIR)"; \
		echo "   Please install Xcode from the App Store"; \
		exit 1; \
	fi
	@echo "✅ Xcode found at $(DEVELOPER_DIR)"
	@$(XCODEBUILD) -version

# Install dependencies (if any were needed)
.PHONY: install
install: check-xcode
	@which xcodegen >/dev/null 2>&1 || (echo "📦 Installing xcodegen..." && brew install xcodegen)
	@echo "✅ All dependencies satisfied"

# Help target
.PHONY: help
help: info
