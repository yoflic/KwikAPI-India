#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Bank Account Verification
# ─────────────────────────────────────────────────────────────────────────────
# Validates a bank account by performing a real-time penny-drop verification. Returns the registered account holder name, account status (active/inactive), and bank details. Always call this before initiating a Payout to avoid failed transfers due to incorrect account details. Supports optional IFSC for faster routing.
#
# Endpoint  : POST /api/v2/dmt/account_validate_route2
# Group     : Verification APIs
# Rate Limit: Per account
# NOTE: Recommended before every Payout to prevent failed transfers.
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
  -F 'number=ACCOUNT_NUMBER' \
  -F 'account=ACCOUNT_NUMBER' \
  -F 'ifsc=SBIN0001234' \
  -F 'order_id=YOUR_UNIQUE_ORDER_ID' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Bank Account Verification"
kwik_bank_account_verify
