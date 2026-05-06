/**
 * KwikAPI SDK — Circle Codes
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all telecom circle codes used across India. These codes are required when initiating prepaid mobile recharges — pass the correct state_code for the subscriber's telecom circle. Cache this response locally as it rarely changes.
 *
 * Endpoint  : GET /api/v2/circle_codes.php
 * Group     : Fetching APIs
 * Rate Limit: 2 / day
 * NOTE: Cache locally — changes infrequently. Rate limit: 2/day.
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
 * Circle Codes
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function circleCodes(api_key = 'YOUR_API_KEY') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/circle_codes.php`, {
    params: {
      api_key: api_key,
    },
    headers: { Accept: 'application/json' },
    timeout: 30000,
  });

    const data = response.data;
    if (!data.success) {
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
    const result = await circleCodes('YOUR_API_KEY');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { circleCodes };
