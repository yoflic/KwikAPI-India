/**
 * KwikAPI SDK — Wallet Balance
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the current KwikAPI wallet balance for the authenticated merchant account. Monitor this before initiating payment transactions to avoid insufficient-balance failures. Consider caching and polling at a reasonable interval to stay within the rate limit.
 *
 * Endpoint  : GET /api/v2/balance.php
 * Group     : Fetching APIs
 * Rate Limit: 48 / day
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
 * Wallet Balance
 * @param {string} api_key - (required) Your KwikAPI API key
 * @returns {Promise<object>}
 */
async function walletBalance(api_key = 'YOUR_API_KEY') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/balance.php?${params.toString()}`, {
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
    console.error('[KwikAPI] Wallet Balance failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await walletBalance('YOUR_API_KEY');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
