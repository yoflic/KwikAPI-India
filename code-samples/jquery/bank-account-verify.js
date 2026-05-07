/**
 * KwikAPI SDK — Bank/UPI Account Verification v2
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates a bank account via real-time penny-drop or verifies a UPI/VPA address. Returns the registered account holder name and account status. The account field auto-detects whether the input is a bank account number or UPI/VPA. Always call this before initiating a Payout.
 *
 * Endpoint  : POST /api/v2/dmt/account_validate_route2
 * Group     : Verification APIs
 * Rate Limit: Per account
 * NOTE: Recommended before every Payout to prevent failed transfers.
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
 * Bank/UPI Account Verification v2
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} number - (required) Bank account number or UPI/VPA address
 * @param {string} account - (required) Bank account number or UPI/VPA address — auto-detected
 * @param {string} ifsc - (optional) IFSC code for bank account routing; not required for UPI/VPA
 * @param {string} order_id - (required) Your unique order ID for this verification
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function bankAccountVerify(api_key = 'YOUR_API_KEY', number = 'ACCOUNT_NUMBER', account = 'ACCOUNT_NUMBER', ifsc = 'SBIN0001234', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  const data = { api_key: api_key, number: number, account: account, ifsc: ifsc, order_id: order_id };

  return $.ajax({
    url:      BASE_URL + '/api/v2/dmt/account_validate_route2',
    method:   'POST',
    data:     data,
    dataType: 'json',
  })
  .done(function (response) {
    if (!response.success) {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] Bank/UPI Account Verification v2 failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  bankAccountVerify('YOUR_API_KEY', 'ACCOUNT_NUMBER', 'ACCOUNT_NUMBER', 'SBIN0001234', 'YOUR_UNIQUE_ORDER_ID')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
