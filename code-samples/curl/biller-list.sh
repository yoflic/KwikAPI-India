#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Biller List
# ─────────────────────────────────────────────────────────────────────────────
# Returns a paginated list of all billers/operators with their codes, active status, supported amount ranges, required parameters, and service category. Intended for syncing your local biller database. Filter by service category using the 'service' parameter, and paginate large result sets with 'page'.
#
# Endpoint  : GET /api/v2/operator_codes.php
# Group     : Fetching APIs
# Rate Limit: 20 / day
# NOTE: Allowed for syncing/caching purposes only.
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash biller-list.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Allowed for syncing/caching purposes only.

kwik_biller_list() {
  local response
  response=$(
    curl -s -G \
  --data-urlencode 'api_key=YOUR_API_KEY' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Biller List"
kwik_biller_list
