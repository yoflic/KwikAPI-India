/**
 * KwikAPI SDK — Wallet Balance
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the current KwikAPI wallet balance for the authenticated merchant account. Monitor this before initiating payment transactions to avoid insufficient-balance failures. Consider caching and polling at a reasonable interval to stay within the rate limit.
 *
 * Endpoint  : GET /api/v2/balance.php
 * Group     : Fetching APIs
 * Rate Limit: 48 / day
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
 * Wallet Balance
 * @param {string} api_key - (required) Your KwikAPI API key
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function walletBalance(api_key = 'YOUR_API_KEY') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/balance.php`, {
    params: {
      api_key: api_key,
    },
    headers: { Accept: 'application/json' },
  });

    const data = response.data;
    if (!data.response) {
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
    const result = await walletBalance('YOUR_API_KEY');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { walletBalance };
