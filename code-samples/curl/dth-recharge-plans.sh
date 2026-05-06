#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — DTH Recharge Plans
# ─────────────────────────────────────────────────────────────────────────────
# Returns all available DTH/D2H recharge packs for a given DTH operator. Plans include pack name, channels, validity, and pricing. Use the opid from the Biller List API filtered by 'DTH' service category.
#
# Endpoint  : POST /api/v2/DTH_plans.php
# Group     : Fetching APIs
# Rate Limit: Per account
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash dth-recharge-plans.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"


kwik_dth_recharge_plans() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'opid=DTH_OPERATOR_ID' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: DTH Recharge Plans"
kwik_dth_recharge_plans
