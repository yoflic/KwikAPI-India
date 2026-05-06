#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Prepaid / DTH Recharge
# ─────────────────────────────────────────────────────────────────────────────
# Initiates a prepaid mobile, DTH/D2H, or Datacard recharge in real time. IMPORTANT: Set your HTTP client timeout to 0 (no timeout) — the API processes synchronously and may take longer than default timeouts. Always verify the final outcome by calling the Transaction Status API with your order_id immediately after, regardless of the response received.
#
# Endpoint  : GET /api/v2/recharge.php
# Group     : Payment APIs
# Rate Limit: Per account
# NOTE: Set HTTP timeout to 0 (no timeout) — API processes in real time.
# NOTE: Always verify final status via Transaction Status API.
# NOTE: order_id must be globally unique per transaction.
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash prepaid-dth-recharge.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Set HTTP timeout to 0 (no timeout) — API processes in real time. | Always verify final status via Transaction Status API. | order_id must be globally unique per transaction.
# NOTE: --max-time 0 means no timeout — required for payment APIs

kwik_prepaid_dth_recharge() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  --data-urlencode 'number=9999999999' \
  --data-urlencode 'amount=199' \
  --data-urlencode 'opid=OPERATOR_ID' \
  --data-urlencode 'state_code=MH' \
  --data-urlencode 'order_id=YOUR_UNIQUE_ORDER_ID' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Prepaid / DTH Recharge"
kwik_prepaid_dth_recharge
