#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Service Category List
# ─────────────────────────────────────────────────────────────────────────────
# Returns the complete active list of all service categories available on KwikAPI (e.g. Prepaid, DTH, Broadband, Electricity, Education, Insurance, etc.). Use this to populate your service-selection UI or to sync your local category list. Responses include the total number of operators per category.
#
# Endpoint  : POST /api/v2/Service-Category-List.php
# Group     : Fetching APIs
# Rate Limit: 10 / day
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash service-category-list.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"


kwik_service_category_list() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  '"${{BASE_URL}}{api["path"]}"'
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Service Category List"
kwik_service_category_list
