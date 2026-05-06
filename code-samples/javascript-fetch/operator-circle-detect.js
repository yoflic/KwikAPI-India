/**
 * KwikAPI SDK — Operator & Circle Detect
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects the mobile operator and telecom circle for any given 10-digit Indian mobile number in real time. Fully supports MNP (Mobile Number Portability) and circle-changed numbers. Always call this before initiating a prepaid mobile recharge to ensure the correct operator and state_code are passed.
 *
 * Endpoint  : POST /api/v2/operator_fetch_v2.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supports MNP and circle-changed numbers.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  number  10-digit Indian mobile number
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
 * Operator & Circle Detect
 * @param  {api_key = 'YOUR_API_KEY', number = '9999999999'}
 * @returns {Promise<object>}
 */
async function operatorCircleDetect(api_key = 'YOUR_API_KEY', number = '9999999999') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('number', number);

  const response = await fetch('https://uat.kwikapi.com/api/v2/operator_fetch_v2.php', {
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
    console.error('[KwikAPI] Operator & Circle Detect failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await operatorCircleDetect('YOUR_API_KEY', '9999999999');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
