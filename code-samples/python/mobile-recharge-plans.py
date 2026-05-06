#!/usr/bin/env python3
"""
KwikAPI SDK — Mobile Recharge Plans
─────────────────────────────────────────────────────────────────────────────
Returns all available prepaid mobile recharge plans for a given operator and telecom circle. Plans are grouped by category (Data, Talktime, SMS, etc.) and include validity, description, and pricing. Use the Operator & Circle Detect API to get the correct opid and state_code for the subscriber's number before calling this.

Endpoint  : POST /api/v2/recharge_plans.php
Group     : Fetching APIs
Rate Limit: Per account

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


def mobile_recharge_plans(api_key: str = 'YOUR_API_KEY', state_code: str = '4', opid: str = '1') -> dict[str, Any]:
    """
    Mobile Recharge Plans

    Args:
        api_key (string): Required. Your KwikAPI API key
        state_code (string): Required. Telecom circle code from Circle Codes API
        opid (int): Required. Operator ID from Biller List API

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/recharge_plans.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key, 'state_code': state_code, 'opid': opid})

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = mobile_recharge_plans('YOUR_API_KEY', '4', '1')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
