/**
 * KwikAPI SDK — Circle Codes
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all telecom circle codes used across India. These codes are required when initiating prepaid mobile recharges — pass the correct state_code for the subscriber's telecom circle. Cache this response locally as it rarely changes.
 *
 * Endpoint  : GET /api/v2/circle_codes.php
 * Group     : Fetching APIs
 * Rate Limit: 2 / day
 * NOTE: Cache locally — changes infrequently. Rate limit: 2/day.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
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
 * Circle Codes
 * @param {string} api_key - (required) Your KwikAPI API key
 * @returns {Promise<object>}
 */
async function circleCodes(api_key = 'YOUR_API_KEY') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/circle_codes.php?${params.toString()}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error(`API error: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    console.error('[KwikAPI] Circle Codes failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await circleCodes('YOUR_API_KEY');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
