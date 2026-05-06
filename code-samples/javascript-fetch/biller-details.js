/**
 * KwikAPI SDK — Biller Details
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns full details for one or more billers by their operator code (opid). Supports batch lookups — pass multiple opids separated by '#' (e.g. '53#54#55'). Response includes supported payment channels, NPCI payment modes, bill-fetch support flag, required parameters for bill payments, and amount constraints.
 *
 * Endpoint  : POST /api/v2/operatorFetch.php
 * Group     : Fetching APIs
 * Rate Limit: 20 / day
 * NOTE: Allowed for syncing/caching purposes only.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  opid  Operator ID(s) — use '#' to separate multiple (e.g. '53#54#55')
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
 * Biller Details
 * @param  {api_key = 'YOUR_API_KEY', opid = '53'}
 * @returns {Promise<object>}
 */
async function billerDetails(api_key = 'YOUR_API_KEY', opid = '53') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('opid', opid);

  const response = await fetch('https://uat.kwikapi.com/api/v2/operatorFetch.php', {
    method: 'POST',
    body: formData,
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
    console.error('[KwikAPI] Biller Details failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await billerDetails('YOUR_API_KEY', '53');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
