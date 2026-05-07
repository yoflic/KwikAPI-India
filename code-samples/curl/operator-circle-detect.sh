#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — Operator & Circle Detect
# ─────────────────────────────────────────────────────────────────────────────
# Detects the mobile operator and telecom circle for any given 10-digit Indian mobile number in real time. Fully supports MNP (Mobile Number Portability) and circle-changed numbers. Always call this before initiating a prepaid mobile recharge to ensure the correct operator and opid are passed.
#
# Endpoint  : POST /api/v2/operator_fetch_v2.php
# Group     : Fetching APIs
# Rate Limit: Per account
# NOTE: Supports MNP and circle-changed numbers.
#
# Parameters:
#   api_key            (required) Your KwikAPI API key
#   number             (required) 10-digit Indian mobile number
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash operator-circle-detect.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: Supports MNP and circle-changed numbers.

kwik_operator_circle_detect() {
  local response
  response=$(
    curl -s -X POST \
  -F 'api_key=YOUR_API_KEY' \
  -F 'number=9999999999' \
  "${BASE_URL}/api/v2/operator_fetch_v2.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: Operator & Circle Detect"
kwik_operator_circle_detect
