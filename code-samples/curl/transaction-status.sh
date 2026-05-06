#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Transaction Status
# ─────────────────────────────────────────────────────────────────────────────
# Returns the real-time status of a previously initiated transaction identified by your unique order_id. Always call this after any payment API to confirm the final status (SUCCESS / FAILURE / PENDING). Do not rely solely on the payment API response — network issues can interrupt delivery. Implement a polling or webhook strategy.
#
# Endpoint  : GET /api/v2/status.php
# Group     : Fetching APIs
# Rate Limit: 100 / day
# NOTE: Always verify status — never rely solely on payment API response.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#   order_id           (required) Your unique order ID used during the payment request
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash transaction-status.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Always verify status — never rely solely on payment API response.

kwik_transaction_status() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  --data-urlencode 'order_id=YOUR_ORDER_ID' \
  "${BASE_URL}/api/v2/status.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Transaction Status"
kwik_transaction_status
