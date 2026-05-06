#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# KwikAPI SDK — IP Detect
# ─────────────────────────────────────────────────────────────────────────────
# Returns the public IP address of the calling server or client. No authentication required. Use this utility endpoint to discover your server's public IP for IP whitelisting — required before using the Payout API. Run this on your production server, not your local machine.
#
# Endpoint  : GET /api/v2/ip_detect.php
# Group     : Utility APIs
# Rate Limit: Unlimited
# NOTE: No authentication required.
# NOTE: Run on your production server for accurate IP detection.
#
# Parameters:
#   (none)
#
# Environment:
#   UAT (testing) : https://uat.kwikapi.com
#   Production    : https://www.kwikapi.com  (change BASE_URL below)
#
# Usage: bash ip-detect.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BASE_URL="https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY="YOUR_API_KEY"

# IMPORTANT: No authentication required. | Run on your production server for accurate IP detection.

kwik_ip_detect() {
  local response
  response=$(
    curl -s "${BASE_URL}/api/v2/ip_detect.php"
  )

  echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
}

# ── Run ───────────────────────────────────────────────────────────────────────
echo "Calling: IP Detect"
kwik_ip_detect
