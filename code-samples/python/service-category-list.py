#!/usr/bin/env python3
"""
KwikAPI SDK — Service Category List
─────────────────────────────────────────────────────────────────────────────
Returns the complete active list of all service categories available on KwikAPI (e.g. Prepaid, DTH, Broadband, Electricity, Education, Insurance, etc.). Use this to populate your service-selection UI or to sync your local category list. Responses include the total number of operators per category.

Endpoint  : POST /api/v2/Service-Category-List.php
Group     : Fetching APIs
Rate Limit: 10 / day

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


def service_category_list(api_key: str = 'YOUR_API_KEY') -> dict[str, Any]:
    """
    Service Category List

    Args:
        api_key (string): Required. Your KwikAPI API key

    Returns:
        dict: Parsed JSON response from KwikAPI.

    Raises:
        KwikAPIError: If the API returns success=false.
        requests.HTTPError: On non-2xx HTTP status.
        requests.Timeout: If the request exceeds the timeout.
    """
    url = BASE_URL + "/api/v2/Service-Category-List.php"

    with requests.Session() as session:
        session.headers.update({"Accept": "application/json"})
        response = session.post(url, data={'api_key': api_key}, timeout=30)

    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise KwikAPIError(data.get("message", "Unknown API error"))

    return data


# ── Example usage ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    try:
        result = service_category_list('YOUR_API_KEY')
        import json
        print(json.dumps(result, indent=2))
    except KwikAPIError as e:
        print(f"API Error: {e}")
        raise SystemExit(1)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        raise SystemExit(1)
