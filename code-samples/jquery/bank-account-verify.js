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
 * Requires jQuery 3.x+
 * Environment:
 *   UAT (testing) : https://uat.kwikapi.com
 *   Production    : https://www.kwikapi.com  (change BASE_URL)
 *
 * @link https://kwikapi.com/auth/register  Get your API key
 */

const BASE_URL = 'https://uat.kwikapi.com'; // Switch to https://www.kwikapi.com for production

/**
 * Bank Account Verification
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function bankAccountVerify(api_key = 'YOUR_API_KEY', number = 'ACCOUNT_NUMBER', account = 'ACCOUNT_NUMBER', ifsc = 'SBIN0001234', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  const data = { api_key: api_key, number: number, account: account, ifsc: ifsc, order_id: order_id };

  return $.ajax({
    url:      BASE_URL + '/api/v2/dmt/account_validate_route2',
    method:   'POST',
    data:     data,
    dataType: 'json',
    timeout:  30000,
  })
  .done(function (response) {
    if (!response.success) {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] Bank Account Verification failed:', status, error);
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
