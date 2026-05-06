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
 * @param  {string} apiKey  Your KwikAPI API key
 * (no parameters)
 * @returns {Promise<object>} Parsed JSON response
 *
 * Environment:
 *   UAT (testing) : https://uat.kwikapi.com
 *   Production    : https://www.kwikapi.com  (change BASE_URL)
 *
 * @link https://kwikapi.com/auth/register  Get your API key
 */

const BASE_URL = 'https://uat.kwikapi.com'; // Switch to https://www.kwikapi.com for production

/**
 * IP Detect
 * @returns {Promise<object>}
 */
async function ipDetect() {
  try {
  const response = await fetch('https://uat.kwikapi.com/api/v2/ip_detect.php', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(`API error: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    console.error('[KwikAPI] IP Detect failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await ipDetect();
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
