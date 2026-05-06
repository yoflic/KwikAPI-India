#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Utility Payments (BBPS)
# ─────────────────────────────────────────────────────────────────────────────
# Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.
#
# Endpoint  : GET /api/v2/bills/payments.php
# Group     : Payment APIs
# Rate Limit: Per account
# NOTE: opt8 must always be 'Bills'.
# NOTE: Always verify final status via Transaction Status API.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#   number             (required) Consumer/account number
#   amount             (required) Bill amount in INR
#   opid               (required) Operator ID from Biller List API
#   order_id           (required) Your unique order ID
#   opt1-opt10         (optional) Operator-specific additional fields (see Biller Details)
#   opt8               (required) Must always be 'Bills'
#   refrence_id        (optional) Optional reference ID for reconciliation
#   mobile             (optional) Customer mobile for confirmation SMS
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash utility-payments.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: opt8 must always be 'Bills'. | Always verify final status via Transaction Status API.

kwik_utility_payments() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  --data-urlencode 'number=CONSUMER_NUMBER' \
  --data-urlencode 'amount=500' \
  --data-urlencode 'opid=OPERATOR_ID' \
  --data-urlencode 'order_id=YOUR_UNIQUE_ORDER_ID' \
  --data-urlencode 'opt8=Bills' \
  --data-urlencode 'mobile=9999999999' \
  "${BASE_URL}/api/v2/bills/payments.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Utility Payments (BBPS)"
kwik_utility_payments
