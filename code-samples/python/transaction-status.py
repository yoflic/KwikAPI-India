#!/usr/bin/env python3
"""
KwikAPI SDK — Transaction Status
─────────────────────────────────────────────────────────────────────────────
Returns the real-time status of a previously initiated transaction identified by your unique order_id. Always call this after any payment API to confirm the final status (SUCCESS / FAILURE / PENDING). Do not rely solely on the payment API response — network issues can interrupt delivery. Implement a polling or webhook strategy.

Endpoint  : GET /api/v2/status.php
Group     : Fetching APIs
Rate Limit: 100 / day
    # NOTE: Always verify status — never rely solely on payment API response.

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


def transaction_status(api_key: str = 'YOUR_API_KEY', order_id: str = 'YOUR_ORDER_ID') -> dict[str, Any]:
    """
    Transaction Status

    Args:
        api_key (string): Required. Your KwikAPI API key
        order_id (string): Required. Your unique order ID used during the payment request

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API response wrapper is missing.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/status.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key, 'order_id': order_id})

    response.raise_for_status()
    data = response.json()

    if "response" not in data:
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = transaction_status('YOUR_API_KEY', 'YOUR_ORDER_ID')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
