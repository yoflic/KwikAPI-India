/**
 * KwikAPI SDK — IP Detect
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the public IP address of the calling server or client. No authentication required. Use this utility endpoint to discover your server's public IP for IP whitelisting — required before using the Payout API. Run this on your production server, not your local machine.
 *
 * Endpoint  : GET /api/v2/ip_detect.php
 * Group     : Utility APIs
 * Rate Limit: Unlimited
 * NOTE: No authentication required.
 * NOTE: Run on your production server for accurate IP detection.
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
 * IP Detect
 * @returns {Promise<object>} Parsed JSON response
 * @throws {Error} on HTTP or API-level error
 */
async function ipDetect() {
  try {
  const response = await axios.get(`${BASE_URL}/api/v2/ip_detect.php`, {
    headers: { Accept: 'application/json' },
    timeout: 10000,
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
    const result = await ipDetect();
    console.log('Success:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();

module.exports = { ipDetect };
