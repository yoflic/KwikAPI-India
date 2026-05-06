/**
 * KwikAPI SDK — Biller List
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns a paginated list of all billers/operators with their codes, active status, supported amount ranges, required parameters, and service category. Intended for syncing your local biller database. Filter by service category using the 'service' parameter, and paginate large result sets with 'page'.
 *
 * Endpoint  : GET /api/v2/operator_codes.php
 * Group     : Fetching APIs
 * Rate Limit: 20 / day
 * NOTE: Allowed for syncing/caching purposes only.
 *
 * Requires: npm install axios
 * Environment:
 *   UAT (testing) : https://uat.kwikapi.com
 *   Production    : https://www.kwikapi.com  (change BASE_URL)
 *
 * @link https://kwikapi.com/auth/register  Get your API key
 */

'use strict';

const axios = require('axios');

const BASE_URL = 'https://uat.kwikapi.com'; // Switch to https://www.kwikapi.com for production

/**
 * Biller List
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} service - (optional) Filter by service category name (e.g. 'Prepaid')
 * @param {int} page - (optional) Page number for pagination (default: 1)
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function billerList(api_key = 'YOUR_API_KEY') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/operator_codes.php`, {
    params: {
      api_key: api_key,
    },
    headers: { Accept: 'application/json' },
  });

    const data = response.data;
    if (data.status !== 'SUCCESS') {
      throw new Error(`API error: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(`HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await billerList('YOUR_API_KEY');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { billerList };
