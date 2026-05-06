/**
 * KwikAPI SDK — Transaction Status
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the real-time status of a previously initiated transaction identified by your unique order_id. Always call this after any payment API to confirm the final status (SUCCESS / FAILURE / PENDING). Do not rely solely on the payment API response — network issues can interrupt delivery. Implement a polling or webhook strategy.
 *
 * Endpoint  : GET /api/v2/status.php
 * Group     : Fetching APIs
 * Rate Limit: 100 / day
 * NOTE: Always verify status — never rely solely on payment API response.
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
 * Transaction Status
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} order_id - (required) Your unique order ID used during the payment request
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function transactionStatus(api_key = 'YOUR_API_KEY', order_id = 'YOUR_ORDER_ID') {
  const data = { api_key: api_key, order_id: order_id };

  return $.ajax({
    url:      BASE_URL + '/api/v2/status.php',
    method:   'GET',
    data:     data,
    dataType: 'json',
  })
  .done(function (response) {
    if (!response.response) {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] Transaction Status failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  transactionStatus('YOUR_API_KEY', 'YOUR_ORDER_ID')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
