#!/usr/bin/env python3
"""
KwikAPI SDK — Circle Codes
─────────────────────────────────────────────────────────────────────────────
Returns all telecom circle codes used across India. These codes are required when initiating prepaid mobile recharges — pass the correct state_code for the subscriber's telecom circle. Cache this response locally as it rarely changes.

Endpoint  : GET /api/v2/circle_codes.php
Group     : Fetching APIs
Rate Limit: 2 / day
    # NOTE: Cache locally — changes infrequently. Rate limit: 2/day.

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


def circle_codes(api_key: str = 'YOUR_API_KEY') -> dict[str, Any]:
    """
    Circle Codes

    Args:
        api_key (string): Required. Your KwikAPI API key

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
        requests.Timeout: If the request exceeds the timeout.
    """
    url = BASE_URL + "/api/v2/circle_codes.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key}, timeout=30)

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = circle_codes('YOUR_API_KEY')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
