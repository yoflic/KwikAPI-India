#!/usr/bin/env python3
"""
KwikAPI SDK — Bank Account Verification
─────────────────────────────────────────────────────────────────────────────
Validates a bank account by performing a real-time penny-drop verification. Returns the registered account holder name, account status (active/inactive), and bank details. Always call this before initiating a Payout to avoid failed transfers due to incorrect account details. Supports optional IFSC for faster routing.

Endpoint  : POST /api/v2/dmt/account_validate_route2
Group     : Verification APIs
Rate Limit: Per account
    # NOTE: Recommended before every Payout to prevent failed transfers.

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


def bank_account_verify(api_key: str = 'YOUR_API_KEY', number: str = 'ACCOUNT_NUMBER', account: str = 'ACCOUNT_NUMBER', ifsc: str = 'SBIN0001234', order_id: str = 'YOUR_UNIQUE_ORDER_ID') -> dict[str, Any]:
    """
    Bank Account Verification

    Args:
        api_key (string): Required. Your KwikAPI API key
        number (string): Required. Beneficiary bank account number
        account (string): Required. Same as number (required field alias)
        ifsc (string): Optional. IFSC code for faster verification (optional)
        order_id (string): Required. Your unique order ID for this verification

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/dmt/account_validate_route2"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key, 'number': number, 'account': account, 'ifsc': ifsc, 'order_id': order_id})

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = bank_account_verify('YOUR_API_KEY', 'ACCOUNT_NUMBER', 'ACCOUNT_NUMBER', 'SBIN0001234', 'YOUR_UNIQUE_ORDER_ID')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
