/**
 * KwikAPI SDK — Last 100 Transactions
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the latest 100 transactions for the merchant account in reverse chronological order. Useful for activity dashboards, reconciliation, and audit logs. Each record includes order_id, status, amount, operator, and timestamps.
 *
 * Endpoint  : GET /api/v2/transactions.php
 * Group     : Fetching APIs
 * Rate Limit: 48 / day
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
 * Last 100 Transactions
 * @param {string} api_key - (required) Your KwikAPI API key
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function lastTransactions(api_key = 'YOUR_API_KEY') {
  const data = { api_key: api_key };

  return $.ajax({
    url:      BASE_URL + '/api/v2/transactions.php',
    method:   'GET',
    data:     data,
    dataType: 'json',
  })
  .done(function (response) {
    if (!Array.isArray(response)) {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] Last 100 Transactions failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  lastTransactions('YOUR_API_KEY')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
