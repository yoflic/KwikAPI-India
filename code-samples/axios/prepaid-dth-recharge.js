/**
 * KwikAPI SDK — Prepaid / DTH Recharge
 * ─────────────────────────────────────────────────────────────────────────────
 * Initiates a prepaid mobile, DTH/D2H, or Datacard recharge in real time. IMPORTANT: Set your HTTP client timeout to 0 (no timeout) — the API processes synchronously and may take longer than default timeouts. Always verify the final outcome by calling the Transaction Status API with your order_id immediately after, regardless of the response received.
 *
 * Endpoint  : GET /api/v2/recharge.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Set HTTP timeout to 0 (no timeout) — API processes in real time.
 * NOTE: Always verify final status via Transaction Status API.
 * NOTE: order_id must be globally unique per transaction.
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
 * Prepaid / DTH Recharge
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function prepaidDthRecharge(api_key = 'YOUR_API_KEY', number = '9999999999', amount = '199', opid = 'OPERATOR_ID', state_code = 'MH', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/recharge.php`, {
    params: {
      api_key: api_key,
    number: number,
    amount: amount,
    opid: opid,
    state_code: state_code,
    order_id: order_id,
    },
    headers: { Accept: 'application/json' },
    timeout: 0,
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
    const result = await prepaidDthRecharge('YOUR_API_KEY', '9999999999', '199', 'OPERATOR_ID', 'MH', 'YOUR_UNIQUE_ORDER_ID');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { prepaidDthRecharge };
