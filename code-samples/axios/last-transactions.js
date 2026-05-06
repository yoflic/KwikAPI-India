/**
 * KwikAPI SDK — Last 100 Transactions
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the latest 100 transactions for the merchant account in reverse chronological order. Useful for activity dashboards, reconciliation, and audit logs. Each record includes order_id, status, amount, operator, and timestamps.
 *
 * Endpoint  : GET /api/v2/transactions.php
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
 * Last 100 Transactions
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function lastTransactions(api_key = 'YOUR_API_KEY') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/transactions.php`, {
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
    const result = await lastTransactions('YOUR_API_KEY');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { lastTransactions };
