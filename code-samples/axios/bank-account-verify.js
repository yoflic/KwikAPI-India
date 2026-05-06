/**
 * KwikAPI SDK — Bank Account Verification
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates a bank account by performing a real-time penny-drop verification. Returns the registered account holder name, account status (active/inactive), and bank details. Always call this before initiating a Payout to avoid failed transfers due to incorrect account details. Supports optional IFSC for faster routing.
 *
 * Endpoint  : POST /api/v2/dmt/account_validate_route2
 * Group     : Verification APIs
 * Rate Limit: Per account
 * NOTE: Recommended before every Payout to prevent failed transfers.
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
 * Bank Account Verification
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} number - (required) Beneficiary bank account number
 * @param {string} account - (required) Same as number (required field alias)
 * @param {string} ifsc - (optional) IFSC code for faster verification
 * @param {string} order_id - (required) Your unique order ID for this verification
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function bankAccountVerify(api_key = 'YOUR_API_KEY', number = 'ACCOUNT_NUMBER', account = 'ACCOUNT_NUMBER', ifsc = 'SBIN0001234', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  try {
  const params = new URLSearchParams({
    api_key: api_key,
  number: number,
  account: account,
  ifsc: ifsc,
  order_id: order_id,
  });
  const response = await axios.post(`${BASE_URL}/api/v2/dmt/account_validate_route2`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
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
    const result = await bankAccountVerify('YOUR_API_KEY', 'ACCOUNT_NUMBER', 'ACCOUNT_NUMBER', 'SBIN0001234', 'YOUR_UNIQUE_ORDER_ID');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { bankAccountVerify };
