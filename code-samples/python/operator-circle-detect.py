#!/usr/bin/env python3
"""
KwikAPI SDK — Operator & Circle Detect
─────────────────────────────────────────────────────────────────────────────
Detects the mobile operator and telecom circle for any given 10-digit Indian mobile number in real time. Fully supports MNP (Mobile Number Portability) and circle-changed numbers. Always call this before initiating a prepaid mobile recharge to ensure the correct operator and opid are passed.

Endpoint  : POST /api/v2/operator_fetch_v2.php
Group     : Fetching APIs
Rate Limit: Per account
    # NOTE: Supports MNP and circle-changed numbers.

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


def operator_circle_detect(api_key: str = 'YOUR_API_KEY', number: str = '9999999999') -> dict[str, Any]:
    """
    Operator & Circle Detect

    Args:
        api_key (string): Required. Your KwikAPI API key
        number (string): Required. 10-digit Indian mobile number

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/operator_fetch_v2.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key, 'number': number})

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = operator_circle_detect('YOUR_API_KEY', '9999999999')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
