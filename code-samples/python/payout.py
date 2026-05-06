#!/usr/bin/env python3
"""
KwikAPI SDK — Payout (Money Transfer)
─────────────────────────────────────────────────────────────────────────────
Initiates a bank account payout / money transfer to a beneficiary's bank account via IMPS/NEFT. REQUIRES IP WHITELISTING — use the IP Detect API to find your server's public IP and whitelist it in your KwikAPI dashboard before calling this endpoint. Always validate the beneficiary account first using the Bank Account Verification API.

Endpoint  : POST /api/v2/payments/index.php
Group     : Payment APIs
Rate Limit: Per account
    # NOTE: IP whitelisting required — use IP Detect API first.
    # NOTE: Validate beneficiary account using Bank Account Verification API before payout.

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


def payout(api_key: str = 'YOUR_API_KEY', account_no: str = 'BENEFICIARY_ACCOUNT_NUMBER', amount: str = '1000', order_id: str = 'YOUR_UNIQUE_ORDER_ID', ifsc_code: str = 'SBIN0001234', bene_name: str = 'Beneficiary Name') -> dict[str, Any]:
    """
    Payout (Money Transfer)

    Args:
        api_key (string): Required. Your KwikAPI API key
        account_no (string): Required. Beneficiary bank account number
        amount (number): Required. Transfer amount in INR
        order_id (string): Required. Your unique order ID
        ifsc_code (string): Required. Beneficiary bank IFSC code
        bene_name (string): Required. Beneficiary full name

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
        requests.Timeout: If the request exceeds the timeout.
    """
    url = BASE_URL + "/api/v2/payments/index.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key, 'account_no': account_no, 'amount': amount, 'order_id': order_id, 'ifsc_code': ifsc_code, 'bene_name': bene_name}, timeout=60)

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = payout('YOUR_API_KEY', 'BENEFICIARY_ACCOUNT_NUMBER', '1000', 'YOUR_UNIQUE_ORDER_ID', 'SBIN0001234', 'Beneficiary Name')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
