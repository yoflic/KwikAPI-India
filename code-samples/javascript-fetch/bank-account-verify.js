/**
 * KwikAPI SDK — Bank Account Verification
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates a bank account by performing a real-time penny-drop verification. Returns the registered account holder name, account status (active/inactive), and bank details. Always call this before initiating a Payout to avoid failed transfers due to incorrect account details. Supports optional IFSC for faster routing.
 *
 * Endpoint  : POST /api/v2/dmt/account_validate_route2
 * Group     : Verification APIs
 * Rate Limit: Per account
 * NOTE: Recommended before every Payout to prevent failed transfers.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  number  Beneficiary bank account number
 * @param  {string}  account  Same as number (required field alias)
 * @param  {string}  ifsc  IFSC code for faster verification (optional)
 * @param  {string}  order_id  Your unique order ID for this verification
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
 * Bank Account Verification
 * @param  {api_key = 'YOUR_API_KEY', number = 'ACCOUNT_NUMBER', account = 'ACCOUNT_NUMBER', ifsc = 'SBIN0001234', order_id = 'YOUR_UNIQUE_ORDER_ID'}
 * @returns {Promise<object>}
 */
async function bankAccountVerify(api_key = 'YOUR_API_KEY', number = 'ACCOUNT_NUMBER', account = 'ACCOUNT_NUMBER', ifsc = 'SBIN0001234', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('number', number);
    formData.append('account', account);
    formData.append('ifsc', ifsc);
    formData.append('order_id', order_id);

  const response = await fetch('https://uat.kwikapi.com/api/v2/dmt/account_validate_route2', {
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
    console.error('[KwikAPI] Bank Account Verification failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await bankAccountVerify('YOUR_API_KEY', 'ACCOUNT_NUMBER', 'ACCOUNT_NUMBER', 'SBIN0001234', 'YOUR_UNIQUE_ORDER_ID');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
