#!/usr/bin/env python3
"""
KwikAPI SDK — DTH Recharge Plans
─────────────────────────────────────────────────────────────────────────────
Returns all available DTH/D2H recharge packs for a given DTH operator. Plans include pack name, channels, validity, and pricing. Use the opid from the Biller List API filtered by 'DTH' service category.

Endpoint  : POST /api/v2/DTH_plans.php
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


def dth_recharge_plans(api_key: str = 'YOUR_API_KEY', opid: str = 'DTH_OPERATOR_ID') -> dict[str, Any]:
    """
    DTH Recharge Plans

    Args:
        api_key (string): Required. Your KwikAPI API key
        opid (int): Required. DTH operator ID from Biller List API

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/DTH_plans.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key, 'opid': opid})

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = dth_recharge_plans('YOUR_API_KEY', 'DTH_OPERATOR_ID')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
