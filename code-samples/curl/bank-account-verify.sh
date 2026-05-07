#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Bank/UPI Account Verification v2
# ─────────────────────────────────────────────────────────────────────────────
# Validates a bank account via real-time penny-drop or verifies a UPI/VPA address. Returns the registered account holder name and account status. The account field auto-detects whether the input is a bank account number or UPI/VPA. Always call this before initiating a Payout.
#
# Endpoint  : POST /api/v2/dmt/account_validate_route2
# Group     : Verification APIs
# Rate Limit: Per account
# NOTE: Recommended before every Payout to prevent failed transfers.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#   account            (required) Bank account number or UPI/VPA address — auto-detected
#   ifsc               (optional) IFSC code for bank account routing; not required for UPI/VPA
#   order_id           (required) Your unique order ID for this verification
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash bank-account-verify.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Recommended before every Payout to prevent failed transfers.

kwik_bank_account_verify() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'account=ACCOUNT_NUMBER' \
  -F 'ifsc=SBIN0001234' \
  -F 'order_id=YOUR_UNIQUE_ORDER_ID' \
  "${BASE_URL}/api/v2/dmt/account_validate_route2"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Bank/UPI Account Verification v2"
kwik_bank_account_verify
