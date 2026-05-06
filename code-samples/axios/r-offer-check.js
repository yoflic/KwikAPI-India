/**
 * KwikAPI SDK — R-Offer Check
 * ─────────────────────────────────────────────────────────────────────────────
 * Checks for active R-Offers (retention/special offers) running on a prepaid mobile number. R-Offers are personalised discount plans offered by the operator to retain subscribers. Currently supported only for Airtel and VI (Vodafone Idea) networks in India. Always check network before calling — will return an error for unsupported operators.
 *
 * Endpoint  : POST /api/v2/R-OFFER_check.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supported networks: Airtel and VI (Vodafone Idea) only.
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
 * R-Offer Check
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {int} opid - (required) Operator ID — Airtel or VI only
 * @param {string} mobile - (required) 10-digit prepaid mobile number to check offers for
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function rOfferCheck(api_key = 'YOUR_API_KEY', opid = 'OPERATOR_ID', mobile = '9999999999') {
  try {
  const params = new URLSearchParams({
    api_key: api_key,
  opid: opid,
  mobile: mobile,
  });
  const response = await axios.post(`${BASE_URL}/api/v2/R-OFFER_check.php`, params, {
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
    const result = await rOfferCheck('YOUR_API_KEY', 'OPERATOR_ID', '9999999999');
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { rOfferCheck };
