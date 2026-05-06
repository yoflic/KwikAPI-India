#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Bill Fetch
# ─────────────────────────────────────────────────────────────────────────────
# Fetches the outstanding bill or due amount from a biller for operators that support the BBPS bill-fetch facility. Always call the Biller Details API first to verify that the operator supports bill-fetch (look for 'bill_fetch: true' in the response) before calling this endpoint. Returns due amount, due date, and consumer details.
#
# Endpoint  : GET /api/v2/bills/validation.php
# Group     : Fetching APIs
# Rate Limit: Per account
# NOTE: Verify bill-fetch support via Biller Details API before calling.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#   number             (required) Consumer number / account number / registered mobile
#   amount             (optional) Pre-filled amount (pass 0 if unknown)
#   opid               (required) Operator ID from Biller List API
#   order_id           (required) Your unique order/reference ID
#   opt1-opt10         (optional) Additional operator-specific fields (see Biller Details)
#   mobile             (optional) Customer mobile number for SMS confirmation
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash bill-fetch.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Verify bill-fetch support via Biller Details API before calling.

kwik_bill_fetch() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  --data-urlencode 'number=CONSUMER_NUMBER' \
  --data-urlencode 'amount=0' \
  --data-urlencode 'opid=OPERATOR_ID' \
  --data-urlencode 'order_id=YOUR_ORDER_ID' \
  --data-urlencode 'mobile=9999999999' \
  "${BASE_URL}/api/v2/bills/validation.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Bill Fetch"
kwik_bill_fetch
