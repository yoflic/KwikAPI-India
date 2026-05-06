#!/usr/bin/env python3
"""
KwikAPI SDK — Biller Details
─────────────────────────────────────────────────────────────────────────────
Returns full details for one or more billers by their operator code (opid). Supports batch lookups — pass multiple opids separated by '#' (e.g. '53#54#55'). Response includes supported payment channels, NPCI payment modes, bill-fetch support flag, required parameters for bill payments, and amount constraints.

Endpoint  : POST /api/v2/operatorFetch.php
Group     : Fetching APIs
Rate Limit: 20 / day
    # NOTE: Allowed for syncing/caching purposes only.

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


def biller_details(api_key: str = 'YOUR_API_KEY', opid: str = '53') -> dict[str, Any]:
    """
    Biller Details

    Args:
        api_key (string): Required. Your KwikAPI API key
        opid (string): Required. Operator ID(s) — use '#' to separate multiple (e.g. '53#54#55')

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/operatorFetch.php"

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
        result = biller_details('YOUR_API_KEY', '53')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
