/**
 * KwikAPI SDK — Payout (Money Transfer)
 * ─────────────────────────────────────────────────────────────────────────────
 * Initiates a bank account payout / money transfer to a beneficiary's bank account via IMPS/NEFT. REQUIRES IP WHITELISTING — use the IP Detect API to find your server's public IP and whitelist it in your KwikAPI dashboard before calling this endpoint. Always validate the beneficiary account first using the Bank Account Verification API.
 *
 * Endpoint  : POST /api/v2/payments/index.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: IP whitelisting required — use IP Detect API first.
 * NOTE: Validate beneficiary account using Bank Account Verification API before payout.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  account_no  Beneficiary bank account number
 * @param  {number}  amount  Transfer amount in INR
 * @param  {string}  order_id  Your unique order ID
 * @param  {string}  ifsc_code  Beneficiary bank IFSC code
 * @param  {string}  bene_name  Beneficiary full name
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
 * Payout (Money Transfer)
 * @param  {api_key = 'YOUR_API_KEY', account_no = 'BENEFICIARY_ACCOUNT_NUMBER', amount = '1000', order_id = 'YOUR_UNIQUE_ORDER_ID', ifsc_code = 'SBIN0001234', bene_name = 'Beneficiary Name'}
 * @returns {Promise<object>}
 */
async function payout(api_key = 'YOUR_API_KEY', account_no = 'BENEFICIARY_ACCOUNT_NUMBER', amount = '1000', order_id = 'YOUR_UNIQUE_ORDER_ID', ifsc_code = 'SBIN0001234', bene_name = 'Beneficiary Name') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);
    formData.append('account_no', account_no);
    formData.append('amount', amount);
    formData.append('order_id', order_id);
    formData.append('ifsc_code', ifsc_code);
    formData.append('bene_name', bene_name);

  const response = await fetch('https://uat.kwikapi.com/api/v2/payments/index.php', {
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
    console.error('[KwikAPI] Payout (Money Transfer) failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await payout('YOUR_API_KEY', 'BENEFICIARY_ACCOUNT_NUMBER', '1000', 'YOUR_UNIQUE_ORDER_ID', 'SBIN0001234', 'Beneficiary Name');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
