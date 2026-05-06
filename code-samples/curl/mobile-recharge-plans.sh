#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Mobile Recharge Plans
# ─────────────────────────────────────────────────────────────────────────────
# Returns all available prepaid mobile recharge plans for a given operator and telecom circle. Plans are grouped by category (Data, Talktime, SMS, etc.) and include validity, description, and pricing. Use the Operator & Circle Detect API to get the correct opid and state_code for the subscriber's number before calling this.
#
# Endpoint  : POST /api/v2/recharge_plans.php
# Group     : Fetching APIs
# Rate Limit: Per account
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash mobile-recharge-plans.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"


kwik_mobile_recharge_plans() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'state_code=MH' \
  -F 'opid=1' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Mobile Recharge Plans"
kwik_mobile_recharge_plans
