#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Biller Details
# ─────────────────────────────────────────────────────────────────────────────
# Returns full details for one or more billers by their operator code (opid). Supports batch lookups — pass multiple opids separated by '#' (e.g. '53#54#55'). Response includes supported payment channels, NPCI payment modes, bill-fetch support flag, required parameters for bill payments, and amount constraints.
#
# Endpoint  : POST /api/v2/operatorFetch.php
# Group     : Fetching APIs
# Rate Limit: 20 / day
# NOTE: Allowed for syncing/caching purposes only.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#   opid               (required) Operator ID(s) — use '#' to separate multiple (e.g. '53#54#55')
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash biller-details.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Allowed for syncing/caching purposes only.

kwik_biller_details() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'opid=53' \
  "${BASE_URL}/api/v2/operatorFetch.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Biller Details"
kwik_biller_details
