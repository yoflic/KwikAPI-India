#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Wallet Balance
# ─────────────────────────────────────────────────────────────────────────────
# Returns the current KwikAPI wallet balance for the authenticated merchant account. Monitor this before initiating payment transactions to avoid insufficient-balance failures. Consider caching and polling at a reasonable interval to stay within the rate limit.
#
# Endpoint  : GET /api/v2/balance.php
# Group     : Fetching APIs
# Rate Limit: 48 / day
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash wallet-balance.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"


kwik_wallet_balance() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  "${BASE_URL}/api/v2/balance.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Wallet Balance"
kwik_wallet_balance
