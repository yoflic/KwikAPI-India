/**
 * KwikAPI SDK — Transaction Status
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the real-time status of a previously initiated transaction identified by your unique order_id. Always call this after any payment API to confirm the final status (SUCCESS / FAILURE / PENDING). Do not rely solely on the payment API response — network issues can interrupt delivery. Implement a polling or webhook strategy.
 *
 * Endpoint  : GET /api/v2/status.php
 * Group     : Fetching APIs
 * Rate Limit: 100 / day
 * NOTE: Always verify status — never rely solely on payment API response.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  order_id  Your unique order ID used during the payment request
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
 * Transaction Status
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} order_id - (required) Your unique order ID used during the payment request
 * @returns {Promise<object>}
 */
async function transactionStatus(api_key = 'YOUR_API_KEY', order_id = 'YOUR_ORDER_ID') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);
    params.append('order_id', order_id);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/status.php?${params.toString()}`, {
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
    console.error('[KwikAPI] Transaction Status failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await transactionStatus('YOUR_API_KEY', 'YOUR_ORDER_ID');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
