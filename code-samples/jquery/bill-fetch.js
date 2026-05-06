/**
 * KwikAPI SDK — Bill Fetch
 * ─────────────────────────────────────────────────────────────────────────────
 * Fetches the outstanding bill or due amount from a biller for operators that support the BBPS bill-fetch facility. Always call the Biller Details API first to verify that the operator supports bill-fetch (look for 'bill_fetch: true' in the response) before calling this endpoint. Returns due amount, due date, and consumer details.
 *
 * Endpoint  : GET /api/v2/bills/validation.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Verify bill-fetch support via Biller Details API before calling.
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
 * Bill Fetch
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} number - (required) Consumer number / account number / registered mobile
 * @param {number} amount - (optional) Pre-filled amount (pass 0 if unknown)
 * @param {int} opid - (required) Operator ID from Biller List API
 * @param {string} order_id - (required) Your unique order/reference ID
 * @param {string} opt1-opt10 - (optional) Additional operator-specific fields (see Biller Details)
 * @param {string} mobile - (optional) Customer mobile number for SMS confirmation
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function billFetch(api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '0', opid = 'OPERATOR_ID', order_id = 'YOUR_ORDER_ID', mobile = '9999999999') {
  const data = { api_key: api_key, number: number, amount: amount, opid: opid, order_id: order_id, mobile: mobile };

  return $.ajax({
    url:      BASE_URL + '/api/v2/bills/validation.php',
    method:   'GET',
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
    console.error('[KwikAPI] Bill Fetch failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  billFetch('YOUR_API_KEY', 'CONSUMER_NUMBER', '0', 'OPERATOR_ID', 'YOUR_ORDER_ID', '9999999999')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
