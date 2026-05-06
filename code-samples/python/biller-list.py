#!/usr/bin/env python3
"""
KwikAPI SDK — Biller List
─────────────────────────────────────────────────────────────────────────────
Returns a paginated list of all billers/operators with their codes, active status, supported amount ranges, required parameters, and service category. Intended for syncing your local biller database. Filter by service category using the 'service' parameter, and paginate large result sets with 'page'.

Endpoint  : GET /api/v2/operator_codes.php
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


def biller_list(api_key: str = 'YOUR_API_KEY') -> dict[str, Any]:
    """
    Biller List

    Args:
        api_key (string): Required. Your KwikAPI API key
        service (string): Optional. Filter by service category name (e.g. 'Prepaid')
        page (int): Optional. Page number for pagination (default: 1)

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns a non-SUCCESS status.
        requests.HTTPError: On non-2xx HTTP status.
    """
    url = BASE_URL + "/api/v2/operator_codes.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.get(url, params={'api_key': api_key})

    response.raise_for_status()
    data = response.json()

    if data.get("status") != "SUCCESS":
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = biller_list('YOUR_API_KEY')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
