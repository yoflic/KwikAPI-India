#!/usr/bin/env python3
"""
KwikAPI SDK — Prepaid / DTH Recharge
─────────────────────────────────────────────────────────────────────────────
Initiates a prepaid mobile, DTH/D2H, or Datacard recharge in real time. Always verify the final outcome by calling the Transaction Status API with your order_id immediately after, regardless of the response received.

Endpoint  : GET /api/v2/recharge.php
Group     : Payment APIs
Rate Limit: Per account
    # NOTE: Always verify final status via Transaction Status API.
    # NOTE: order_id must be globally unique per transaction.

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


def prepaid_dth_recharge(api_key: str = 'YOUR_API_KEY', number: str = '9999999999', amount: str = '199', opid: str = 'OPERATOR_ID', order_id: str = 'YOUR_UNIQUE_ORDER_ID') -> dict[str, Any]:
    """
    Prepaid / DTH Recharge

    Args:
        api_key (string): Required. Your KwikAPI API key
        number (string): Required. Mobile/DTH subscriber number
        amount (number): Required. Recharge amount in INR
        opid (int): Required. Operator ID from Biller List / Operator Detect API
        order_id (string): Required. Your unique order ID (must be unique per transaction)

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns a non-SUCCESS status.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/recharge.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key, 'number': number, 'amount': amount, 'opid': opid, 'order_id': order_id})

    response.raise_for_status()
    data = response.json()

    if data.get("status") != "SUCCESS":
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = prepaid_dth_recharge('YOUR_API_KEY', '9999999999', '199', 'OPERATOR_ID', '4', 'YOUR_UNIQUE_ORDER_ID')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
