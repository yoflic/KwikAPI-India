#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Circle Codes
# ─────────────────────────────────────────────────────────────────────────────
# Returns all telecom circle codes used across India. These codes are required when initiating prepaid mobile recharges — pass the correct state_code for the subscriber's telecom circle. Cache this response locally as it rarely changes.
#
# Endpoint  : GET /api/v2/circle_codes.php
# Group     : Fetching APIs
# Rate Limit: 2 / day
# NOTE: Cache locally — changes infrequently. Rate limit: 2/day.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash circle-codes.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Cache locally — changes infrequently. Rate limit: 2/day.

kwik_circle_codes() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  "${BASE_URL}/api/v2/circle_codes.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Circle Codes"
kwik_circle_codes
