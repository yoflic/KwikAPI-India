#!/usr/bin/env python3
"""
KwikAPI SDK — Last 100 Transactions
─────────────────────────────────────────────────────────────────────────────
Returns the latest 100 transactions for the merchant account in reverse chronological order. Useful for activity dashboards, reconciliation, and audit logs. Each record includes order_id, status, amount, operator, and timestamps.

Endpoint  : GET /api/v2/transactions.php
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


def last_transactions(api_key: str = 'YOUR_API_KEY') -> dict[str, Any]:
    """
    Last 100 Transactions

    Args:
        api_key (string): Required. Your KwikAPI API key

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the response is not a list.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/transactions.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key})

    response.raise_for_status()
    data = response.json()

    if not isinstance(data, list):
        raise KwikAPIError(data.get("message", "Unexpected response format"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = last_transactions('YOUR_API_KEY')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
