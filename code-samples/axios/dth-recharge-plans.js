/**
 * KwikAPI SDK — DTH Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available DTH/D2H recharge packs for a given DTH operator. Plans include pack name, channels, validity, and pricing. Use the opid from the Biller List API filtered by 'DTH' service category.
 *
 * Endpoint  : POST /api/v2/DTH_plans.php
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
 * DTH Recharge Plans
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function dthRechargePlans(api_key = 'YOUR_API_KEY', opid = 'DTH_OPERATOR_ID') {
  try {
  const params = new URLSearchParams({
    api_key: api_key,
  opid: opid,
  });
  const response = await axios.post(`${BASE_URL}/api/v2/DTH_plans.php`, params, {
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
    const result = await dthRechargePlans('YOUR_API_KEY', 'DTH_OPERATOR_ID');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { dthRechargePlans };
