#!/usr/bin/env python3
"""
KwikAPI SDK — Bank/UPI Account Verification v2
─────────────────────────────────────────────────────────────────────────────
Validates a bank account via real-time penny-drop or verifies a UPI/VPA address. Returns the registered account holder name and account status. The account field auto-detects whether the input is a bank account number or UPI/VPA. Always call this before initiating a Payout.

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
    Bank/UPI Account Verification v2

    Args:
        api_key (string): Required. Your KwikAPI API key
        number (string): Required. Bank account number or UPI/VPA address
        account (string): Required. Bank account number or UPI/VPA address — auto-detected
        ifsc (string): Optional. IFSC code for bank account routing; not required for UPI/VPA
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
