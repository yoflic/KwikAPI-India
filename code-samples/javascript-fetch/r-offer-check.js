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
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {int}  opid  Operator ID — Airtel or VI only
 * @param  {string}  mobile  10-digit prepaid mobile number to check offers for
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
 * R-Offer Check
 * @param  {api_key = 'YOUR_API_KEY', opid = 'OPERATOR_ID', mobile = '9999999999'}
 * @returns {Promise<object>}
 */
async function rOfferCheck(api_key = 'YOUR_API_KEY', opid = 'OPERATOR_ID', mobile = '9999999999') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('opid', opid);
    formData.append('mobile', mobile);

  const response = await fetch('https://uat.kwikapi.com/api/v2/R-OFFER_check.php', {
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
    console.error('[KwikAPI] R-Offer Check failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await rOfferCheck('YOUR_API_KEY', 'OPERATOR_ID', '9999999999');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
