/**
 * KwikAPI SDK — Biller List
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns a paginated list of all billers/operators with their codes, active status, supported amount ranges, required parameters, and service category. Intended for syncing your local biller database. Filter by service category using the 'service' parameter, and paginate large result sets with 'page'.
 *
 * Endpoint  : GET /api/v2/operator_codes.php
 * Group     : Fetching APIs
 * Rate Limit: 20 / day
 * NOTE: Allowed for syncing/caching purposes only.
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
 * Biller List
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} service - (optional) Filter by service category name (e.g. 'Prepaid')
 * @param {int} page - (optional) Page number for pagination (default: 1)
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function billerList(api_key = 'YOUR_API_KEY') {
  const data = { api_key: api_key };

  return $.ajax({
    url:      BASE_URL + '/api/v2/operator_codes.php',
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
    console.error('[KwikAPI] Biller List failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  billerList('YOUR_API_KEY')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
