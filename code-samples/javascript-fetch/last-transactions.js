/**
 * KwikAPI SDK — Last 100 Transactions
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the latest 100 transactions for the merchant account in reverse chronological order. Useful for activity dashboards, reconciliation, and audit logs. Each record includes order_id, status, amount, operator, and timestamps.
 *
 * Endpoint  : GET /api/v2/transactions.php
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
 * Last 100 Transactions
 * @param  {api_key = 'YOUR_API_KEY'}
 * @returns {Promise<object>}
 */
async function lastTransactions(api_key = 'YOUR_API_KEY') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/transactions.php?${params.toString()}`, {
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
    console.error('[KwikAPI] Last 100 Transactions failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await lastTransactions('YOUR_API_KEY');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
