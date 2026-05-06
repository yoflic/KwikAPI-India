#!/usr/bin/env python3
"""
KwikAPI SDK — Wallet Balance
─────────────────────────────────────────────────────────────────────────────
Returns the current KwikAPI wallet balance for the authenticated merchant account. Monitor this before initiating payment transactions to avoid insufficient-balance failures. Consider caching and polling at a reasonable interval to stay within the rate limit.

Endpoint  : GET /api/v2/balance.php
Group     : Fetching APIs
Rate Limit: 48 / day

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


def wallet_balance(api_key: str = 'YOUR_API_KEY') -> dict[str, Any]:
    """
    Wallet Balance

    Args:
        api_key (string): Required. Your KwikAPI API key

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API response wrapper is missing.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/balance.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key})

    response.raise_for_status()
    data = response.json()

    if "response" not in data:
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = wallet_balance('YOUR_API_KEY')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
