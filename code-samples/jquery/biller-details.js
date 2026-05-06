/**
 * KwikAPI SDK — Biller Details
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns full details for one or more billers by their operator code (opid). Supports batch lookups — pass multiple opids separated by '#' (e.g. '53#54#55'). Response includes supported payment channels, NPCI payment modes, bill-fetch support flag, required parameters for bill payments, and amount constraints.
 *
 * Endpoint  : POST /api/v2/operatorFetch.php
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
 * Biller Details
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function billerDetails(api_key = 'YOUR_API_KEY', opid = '53') {
  const data = { api_key: api_key, opid: opid };

  return $.ajax({
    url:      BASE_URL + '/api/v2/operatorFetch.php',
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
    console.error('[KwikAPI] Biller Details failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  billerDetails('YOUR_API_KEY', '53')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
