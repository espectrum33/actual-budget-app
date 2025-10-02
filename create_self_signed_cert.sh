#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
KEYCHAIN_NAME="ios_build.keychain"
KEYCHAIN_PASSWORD="localbuildpassword"
CERT_COMMON_NAME="iPhone Developer: Local Build"

# --- Logic ---

# --- FIXED: Always attempt to delete a leftover keychain from a previous failed run ---
echo "🔑 Cleaning up any old temporary keychains..."
security delete-keychain "$KEYCHAIN_NAME" || echo "   (No old keychain to delete, continuing...)"

# Create a temporary keychain
echo "🔐 Creating temporary keychain: $KEYCHAIN_NAME"
security create-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN_NAME"

# Set the temporary keychain as the default for this script's scope
security default-keychain -s "$KEYCHAIN_NAME"

# Unlock the keychain to allow adding certificates
security unlock-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN_NAME"

# Set keychain to not lock automatically after a timeout
security set-keychain-settings -t 3600 -l "$KEYCHAIN_NAME"

# Generate a new private key
echo "🔑 Generating private key..."
openssl genrsa -out private.key 2048

# Create a certificate signing request (CSR)
echo "📝 Creating certificate signing request..."
openssl req -new -key private.key -out certificate.csr -subj "/CN=$CERT_COMMON_NAME"

# Create a self-signed certificate from the CSR
echo "🖋️  Creating self-signed certificate..."
openssl x509 -req -days 365 -in certificate.csr -signkey private.key -out certificate.cer

# Import the self-signed certificate into the temporary keychain
echo "📥 Importing certificate into keychain..."
security import certificate.cer -k "$KEYCHAIN_NAME" -T /usr/bin/codesign

# Clean up intermediate files
rm private.key certificate.csr certificate.cer

echo "✅ Temporary keychain and self-signed certificate are ready."

