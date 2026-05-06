#!/usr/bin/env python3
"""
KwikAPI SDK — Bill Fetch
─────────────────────────────────────────────────────────────────────────────
Fetches the outstanding bill or due amount from a biller for operators that support the BBPS bill-fetch facility. Always call the Biller Details API first to verify that the operator supports bill-fetch (look for 'bill_fetch: true' in the response) before calling this endpoint. Returns due amount, due date, and consumer details.

Endpoint  : GET /api/v2/bills/validation.php
Group     : Fetching APIs
Rate Limit: Per account
    # NOTE: Verify bill-fetch support via Biller Details API before calling.

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


def bill_fetch(api_key: str = 'YOUR_API_KEY', number: str = 'CONSUMER_NUMBER', amount: str = '0', opid: str = 'OPERATOR_ID', order_id: str = 'YOUR_ORDER_ID', mobile: str = '9999999999') -> dict[str, Any]:
    """
    Bill Fetch

    Args:
        api_key (string): Required. Your KwikAPI API key
        number (string): Required. Consumer number / account number / registered mobile
        amount (number): Optional. Pre-filled amount (pass 0 if unknown)
        opid (int): Required. Operator ID from Biller List API
        order_id (string): Required. Your unique order/reference ID
        opt1-opt10 (string): Optional. Additional operator-specific fields (see Biller Details)
        mobile (string): Optional. Customer mobile number for SMS confirmation

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
        requests.Timeout: If the request exceeds the timeout.
    """
    url = BASE_URL + "/api/v2/bills/validation.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key, 'number': number, 'amount': amount, 'opid': opid, 'order_id': order_id, 'mobile': mobile}, timeout=30)

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = bill_fetch('YOUR_API_KEY', 'CONSUMER_NUMBER', '0', 'OPERATOR_ID', 'YOUR_ORDER_ID', '9999999999')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
