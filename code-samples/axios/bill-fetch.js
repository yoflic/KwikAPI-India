/**
 * KwikAPI SDK — Bill Fetch
 * ─────────────────────────────────────────────────────────────────────────────
 * Fetches the outstanding bill or due amount from a biller for operators that support the BBPS bill-fetch facility. Always call the Biller Details API first to verify that the operator supports bill-fetch (look for 'bill_fetch: true' in the response) before calling this endpoint. Returns due amount, due date, and consumer details.
 *
 * Endpoint  : GET /api/v2/bills/validation.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Verify bill-fetch support via Biller Details API before calling.
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
 * Bill Fetch
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function billFetch(api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '0', opid = 'OPERATOR_ID', order_id = 'YOUR_ORDER_ID', mobile = '9999999999') {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/bills/validation.php`, {
    params: {
      api_key: api_key,
    number: number,
    amount: amount,
    opid: opid,
    order_id: order_id,
    mobile: mobile,
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
    const result = await billFetch('YOUR_API_KEY', 'CONSUMER_NUMBER', '0', 'OPERATOR_ID', 'YOUR_ORDER_ID', '9999999999');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { billFetch };
