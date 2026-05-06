/**
 * KwikAPI SDK — Prepaid / DTH Recharge
 * ─────────────────────────────────────────────────────────────────────────────
 * Initiates a prepaid mobile, DTH/D2H, or Datacard recharge in real time. IMPORTANT: Set your HTTP client timeout to 0 (no timeout) — the API processes synchronously and may take longer than default timeouts. Always verify the final outcome by calling the Transaction Status API with your order_id immediately after, regardless of the response received.
 *
 * Endpoint  : GET /api/v2/recharge.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Set HTTP timeout to 0 (no timeout) — API processes in real time.
 * NOTE: Always verify final status via Transaction Status API.
 * NOTE: order_id must be globally unique per transaction.
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
 * Prepaid / DTH Recharge
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function prepaidDthRecharge(api_key = 'YOUR_API_KEY', number = '9999999999', amount = '199', opid = 'OPERATOR_ID', state_code = 'MH', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  const data = { api_key: api_key, number: number, amount: amount, opid: opid, state_code: state_code, order_id: order_id };

  return $.ajax({
    url:      BASE_URL + '/api/v2/recharge.php',
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
    console.error('[KwikAPI] Prepaid / DTH Recharge failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  prepaidDthRecharge('YOUR_API_KEY', '9999999999', '199', 'OPERATOR_ID', 'MH', 'YOUR_UNIQUE_ORDER_ID')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
