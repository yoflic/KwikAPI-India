/**
 * KwikAPI SDK — Utility Payments (BBPS)
 * ─────────────────────────────────────────────────────────────────────────────
 * Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. IMPORTANT: Set HTTP timeout to 0. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.
 *
 * Endpoint  : GET /api/v2/bills/payments.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Set HTTP timeout to 0 (no timeout).
 * NOTE: opt8 must always be 'Bills'.
 * NOTE: Always verify final status via Transaction Status API.
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
 * Utility Payments (BBPS)
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function utilityPayments(api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '500', opid = 'OPERATOR_ID', order_id = 'YOUR_UNIQUE_ORDER_ID', opt8 = 'Bills', mobile = '9999999999') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/bills/payments.php`, {
    params: {
      api_key: api_key,
    number: number,
    amount: amount,
    opid: opid,
    order_id: order_id,
    opt8: opt8,
    mobile: mobile,
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
    const result = await utilityPayments('YOUR_API_KEY', 'CONSUMER_NUMBER', '500', 'OPERATOR_ID', 'YOUR_UNIQUE_ORDER_ID', 'Bills', '9999999999');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { utilityPayments };
