#!/usr/bin/env python3
"""
KwikAPI SDK — Utility Payments (BBPS)
─────────────────────────────────────────────────────────────────────────────
Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.

Endpoint  : GET /api/v2/bills/payments.php
Group     : Payment APIs
Rate Limit: Per account
    # NOTE: opt8 must always be 'Bills'.
    # NOTE: Always verify final status via Transaction Status API.

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


def utility_payments(api_key: str = 'YOUR_API_KEY', number: str = 'CONSUMER_NUMBER', amount: str = '500', opid: str = 'OPERATOR_ID', order_id: str = 'YOUR_UNIQUE_ORDER_ID', opt8: str = 'Bills', mobile: str = '9999999999') -> dict[str, Any]:
    """
    Utility Payments (BBPS)

    Args:
        api_key (string): Required. Your KwikAPI API key
        number (string): Required. Consumer/account number
        amount (number): Required. Bill amount in INR
        opid (int): Required. Operator ID from Biller List API
        order_id (string): Required. Your unique order ID
        opt1–opt10 (string): Optional. Operator-specific additional fields (see Biller Details)
        opt8 (string): Required. Must always be 'Bills'
        refrence_id (string): Optional. Optional reference ID for reconciliation
        mobile (string): Optional. Customer mobile for confirmation SMS

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns a non-SUCCESS status.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/bills/payments.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key, 'number': number, 'amount': amount, 'opid': opid, 'order_id': order_id, 'opt8': opt8, 'mobile': mobile})

    response.raise_for_status()
    data = response.json()

    if data.get("status") != "SUCCESS":
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = utility_payments('YOUR_API_KEY', 'CONSUMER_NUMBER', '500', 'OPERATOR_ID', 'YOUR_UNIQUE_ORDER_ID', 'Bills', '9999999999')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
