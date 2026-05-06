#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — R-Offer Check
# ─────────────────────────────────────────────────────────────────────────────
# Checks for active R-Offers (retention/special offers) running on a prepaid mobile number. R-Offers are personalised discount plans offered by the operator to retain subscribers. Currently supported only for Airtel and VI (Vodafone Idea) networks in India. Always check network before calling — will return an error for unsupported operators.
#
# Endpoint  : POST /api/v2/R-OFFER_check.php
# Group     : Fetching APIs
# Rate Limit: Per account
# NOTE: Supported networks: Airtel and VI (Vodafone Idea) only.
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash r-offer-check.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Supported networks: Airtel and VI (Vodafone Idea) only.

kwik_r_offer_check() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'opid=OPERATOR_ID' \
  -F 'mobile=9999999999' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: R-Offer Check"
kwik_r_offer_check
