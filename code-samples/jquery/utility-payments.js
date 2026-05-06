/**
 * KwikAPI SDK — Utility Payments (BBPS)
 * ─────────────────────────────────────────────────────────────────────────────
 * Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. IMPORTANT: Set HTTP timeout to 0. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.
 *
 * Endpoint  : GET /api/v2/bills/payments.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Set HTTP timeout to 0 (no timeout).
 * NOTE: opt8 must always be 'Bills'.
 * NOTE: Always verify final status via Transaction Status API.
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
 * Utility Payments (BBPS)
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function utilityPayments(api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '500', opid = 'OPERATOR_ID', order_id = 'YOUR_UNIQUE_ORDER_ID', opt8 = 'Bills', mobile = '9999999999') {
  const data = { api_key: api_key, number: number, amount: amount, opid: opid, order_id: order_id, opt8: opt8, mobile: mobile };

  return $.ajax({
    url:      BASE_URL + '/api/v2/bills/payments.php',
    method:   'GET',
    data:     data,
    dataType: 'json',
    timeout:  0,
  })
  .done(function (response) {
    if (!response.success) {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] Utility Payments (BBPS) failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  utilityPayments('YOUR_API_KEY', 'CONSUMER_NUMBER', '500', 'OPERATOR_ID', 'YOUR_UNIQUE_ORDER_ID', 'Bills', '9999999999')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
