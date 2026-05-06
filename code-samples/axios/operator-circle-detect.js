/**
 * KwikAPI SDK — Operator & Circle Detect
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects the mobile operator and telecom circle for any given 10-digit Indian mobile number in real time. Fully supports MNP (Mobile Number Portability) and circle-changed numbers. Always call this before initiating a prepaid mobile recharge to ensure the correct operator and state_code are passed.
 *
 * Endpoint  : POST /api/v2/operator_fetch_v2.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supports MNP and circle-changed numbers.
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
 * Operator & Circle Detect
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function operatorCircleDetect(api_key = 'YOUR_API_KEY', number = '9999999999') {
  try {
  const params = new URLSearchParams({
    api_key: api_key,
  number: number,
  });
  const response = await axios.post(`${BASE_URL}/api/v2/operator_fetch_v2.php`, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
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
    const result = await operatorCircleDetect('YOUR_API_KEY', '9999999999');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { operatorCircleDetect };
