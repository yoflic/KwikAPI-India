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
 * Requires jQuery 3.x+
 * Environment:
 *   UAT (testing) : https://uat.kwikapi.com
 *   Production    : https://www.kwikapi.com  (change BASE_URL)
 *
 * @link https://kwikapi.com/auth/register  Get your API key
 */

const BASE_URL = 'https://uat.kwikapi.com'; // Switch to https://www.kwikapi.com for production

/**
 * Payout (Money Transfer)
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} account_no - (required) Beneficiary bank account number
 * @param {number} amount - (required) Transfer amount in INR
 * @param {string} order_id - (required) Your unique order ID
 * @param {string} ifsc_code - (required) Beneficiary bank IFSC code
 * @param {string} bene_name - (required) Beneficiary full name
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function payout(api_key = 'YOUR_API_KEY', account_no = 'BENEFICIARY_ACCOUNT_NUMBER', amount = '1000', order_id = 'YOUR_UNIQUE_ORDER_ID', ifsc_code = 'SBIN0001234', bene_name = 'Beneficiary Name') {
  const data = { api_key: api_key, account_no: account_no, amount: amount, order_id: order_id, ifsc_code: ifsc_code, bene_name: bene_name };

  return $.ajax({
    url:      BASE_URL + '/api/v2/payments/index.php',
    method:   'POST',
    data:     data,
    dataType: 'json',
  })
  .done(function (response) {
    if (response.status !== 'SUCCESS') {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] Payout (Money Transfer) failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  payout('YOUR_API_KEY', 'BENEFICIARY_ACCOUNT_NUMBER', '1000', 'YOUR_UNIQUE_ORDER_ID', 'SBIN0001234', 'Beneficiary Name')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
