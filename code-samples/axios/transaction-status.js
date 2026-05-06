/**
 * KwikAPI SDK — Transaction Status
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the real-time status of a previously initiated transaction identified by your unique order_id. Always call this after any payment API to confirm the final status (SUCCESS / FAILURE / PENDING). Do not rely solely on the payment API response — network issues can interrupt delivery. Implement a polling or webhook strategy.
 *
 * Endpoint  : GET /api/v2/status.php
 * Group     : Fetching APIs
 * Rate Limit: 100 / day
 * NOTE: Always verify status — never rely solely on payment API response.
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
 * Transaction Status
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function transactionStatus(api_key = 'YOUR_API_KEY', order_id = 'YOUR_ORDER_ID') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/status.php`, {
    params: {
      api_key: api_key,
    order_id: order_id,
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
    const result = await transactionStatus('YOUR_API_KEY', 'YOUR_ORDER_ID');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { transactionStatus };
