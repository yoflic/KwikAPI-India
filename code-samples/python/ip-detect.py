#!/usr/bin/env python3
"""
KwikAPI SDK — IP Detect
─────────────────────────────────────────────────────────────────────────────
Returns the public IP address of the calling server or client. No authentication required. Use this utility endpoint to discover your server's public IP for IP whitelisting — required before using the Payout API. Run this on your production server, not your local machine.

Endpoint  : GET /api/v2/ip_detect.php
Group     : Utility APIs
Rate Limit: Unlimited
    # NOTE: No authentication required.
    # NOTE: Run on your production server for accurate IP detection.

Requirements:
    pip install requests

Environment:
    UAT (testing) : https://uat.kwikapi.com
    Production    : https://www.kwikapi.com  (change BASE_URL)

Get your API key: https://kwikapi.com/auth/register
"""

import requests
from typing import Any

BASE_URL = "https://uat.kwikapi.com"  # Switch to https://www.kwikapi.com for production
API_KEY  = "YOUR_API_KEY"


class KwikAPIError(Exception):
    """Raised when the KwikAPI returns a non-success response."""


def ip_detect() -> dict[str, Any]:
    """
    IP Detect

    Args:
        None

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/ip_detect.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url)

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = ip_detect()
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
