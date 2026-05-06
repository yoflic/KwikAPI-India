/**
 * KwikAPI SDK — Mobile Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available prepaid mobile recharge plans for a given operator and telecom circle. Plans are grouped by category (Data, Talktime, SMS, etc.) and include validity, description, and pricing. Use the Operator & Circle Detect API to get the correct opid and state_code for the subscriber's number before calling this.
 *
 * Endpoint  : POST /api/v2/recharge_plans.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
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
 * Mobile Recharge Plans
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} state_code - (required) Telecom circle code from Circle Codes API
 * @param {int} opid - (required) Operator ID from Biller List API
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function mobileRechargePlans(api_key = 'YOUR_API_KEY', state_code = '4', opid = '1') {
  try {
  const params = new URLSearchParams({
    api_key: api_key,
  state_code: state_code,
  opid: opid,
  });
  const response = await axios.post(`${BASE_URL}/api/v2/recharge_plans.php`, params, {
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
    const result = await mobileRechargePlans('YOUR_API_KEY', 'MH', '1');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { mobileRechargePlans };
