#!/usr/bin/env python3
"""
KwikAPI SDK — R-Offer Check
─────────────────────────────────────────────────────────────────────────────
Checks for active R-Offers (retention/special offers) running on a prepaid mobile number. R-Offers are personalised discount plans offered by the operator to retain subscribers. Currently supported only for Airtel and VI (Vodafone Idea) networks in India. Always check network before calling — will return an error for unsupported operators.

Endpoint  : POST /api/v2/R-OFFER_check.php
Group     : Fetching APIs
Rate Limit: Per account
    # NOTE: Supported networks: Airtel and VI (Vodafone Idea) only.

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


def r_offer_check(api_key: str = 'YOUR_API_KEY', opid: str = 'OPERATOR_ID', mobile: str = '9999999999') -> dict[str, Any]:
    """
    R-Offer Check

    Args:
        api_key (string): Required. Your KwikAPI API key
        opid (int): Required. Operator ID — Airtel or VI only
        mobile (string): Required. 10-digit prepaid mobile number to check offers for

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/R-OFFER_check.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key, 'opid': opid, 'mobile': mobile})

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = r_offer_check('YOUR_API_KEY', 'OPERATOR_ID', '9999999999')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
