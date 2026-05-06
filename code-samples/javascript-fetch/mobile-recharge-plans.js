/**
 * KwikAPI SDK — Mobile Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available prepaid mobile recharge plans for a given operator and telecom circle. Plans are grouped by category (Data, Talktime, SMS, etc.) and include validity, description, and pricing. Use the Operator & Circle Detect API to get the correct opid and state_code for the subscriber's number before calling this.
 *
 * Endpoint  : POST /api/v2/recharge_plans.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  state_code  Telecom circle code from Circle Codes API
 * @param  {int}  opid  Operator ID from Biller List API
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
 * Mobile Recharge Plans
 * @param  {api_key = 'YOUR_API_KEY', state_code = 'MH', opid = '1'}
 * @returns {Promise<object>}
 */
async function mobileRechargePlans(api_key = 'YOUR_API_KEY', state_code = 'MH', opid = '1') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('state_code', state_code);
    formData.append('opid', opid);

  const response = await fetch('https://uat.kwikapi.com/api/v2/recharge_plans.php', {
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
    console.error('[KwikAPI] Mobile Recharge Plans failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await mobileRechargePlans('YOUR_API_KEY', 'MH', '1');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
