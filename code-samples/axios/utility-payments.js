/**
 * KwikAPI SDK — Utility Payments (BBPS)
 * ─────────────────────────────────────────────────────────────────────────────
 * Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.
 *
 * Endpoint  : GET /api/v2/bills/payments.php
 * Group     : Payment APIs
 * Rate Limit: Per account
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
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} number - (required) Consumer/account number
 * @param {number} amount - (required) Bill amount in INR
 * @param {int} opid - (required) Operator ID from Biller List API
 * @param {string} order_id - (required) Your unique order ID
 * @param {string} opt1-opt10 - (optional) Operator-specific additional fields (see Biller Details)
 * @param {string} opt8 - (required) Must always be 'Bills'
 * @param {string} refrence_id - (optional) Optional reference ID for reconciliation
 * @param {string} mobile - (optional) Customer mobile for confirmation SMS
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
    const result = await utilityPayments('YOUR_API_KEY', 'CONSUMER_NUMBER', '500', 'OPERATOR_ID', 'YOUR_UNIQUE_ORDER_ID', 'Bills', '9999999999');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { utilityPayments };
