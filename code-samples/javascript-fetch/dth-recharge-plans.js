/**
 * KwikAPI SDK — DTH Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available DTH/D2H recharge packs for a given DTH operator. Plans include pack name, channels, validity, and pricing. Use the opid from the Biller List API filtered by 'DTH' service category.
 *
 * Endpoint  : POST /api/v2/DTH_plans.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {int}  opid  DTH operator ID from Biller List API
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
 * DTH Recharge Plans
 * @param  {api_key = 'YOUR_API_KEY', opid = 'DTH_OPERATOR_ID'}
 * @returns {Promise<object>}
 */
async function dthRechargePlans(api_key = 'YOUR_API_KEY', opid = 'DTH_OPERATOR_ID') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('opid', opid);

  const response = await fetch('https://uat.kwikapi.com/api/v2/DTH_plans.php', {
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
    console.error('[KwikAPI] DTH Recharge Plans failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await dthRechargePlans('YOUR_API_KEY', 'DTH_OPERATOR_ID');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
