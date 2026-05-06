#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Payout (Money Transfer)
# ─────────────────────────────────────────────────────────────────────────────
# Initiates a bank account payout / money transfer to a beneficiary's bank account via IMPS/NEFT. REQUIRES IP WHITELISTING — use the IP Detect API to find your server's public IP and whitelist it in your KwikAPI dashboard before calling this endpoint. Always validate the beneficiary account first using the Bank Account Verification API.
#
# Endpoint  : POST /api/v2/payments/index.php
# Group     : Payment APIs
# Rate Limit: Per account
# NOTE: IP whitelisting required — use IP Detect API first.
# NOTE: Validate beneficiary account using Bank Account Verification API before payout.
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash payout.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: IP whitelisting required — use IP Detect API first. | Validate beneficiary account using Bank Account Verification API before payout.

kwik_payout() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'account_no=BENEFICIARY_ACCOUNT_NUMBER' \
  -F 'amount=1000' \
  -F 'order_id=YOUR_UNIQUE_ORDER_ID' \
  -F 'ifsc_code=SBIN0001234' \
  -F 'bene_name=Beneficiary Name' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Payout (Money Transfer)"
kwik_payout
