#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Last 100 Transactions
# ─────────────────────────────────────────────────────────────────────────────
# Returns the latest 100 transactions for the merchant account in reverse chronological order. Useful for activity dashboards, reconciliation, and audit logs. Each record includes order_id, status, amount, operator, and timestamps.
#
# Endpoint  : GET /api/v2/transactions.php
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
# Usage: bash last-transactions.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"


kwik_last_transactions() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  "${BASE_URL}/api/v2/transactions.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Last 100 Transactions"
kwik_last_transactions
