/**
 * KwikAPI SDK — DTH Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available DTH/D2H recharge packs for a given DTH operator. Plans include pack name, channels, validity, and pricing. Use the opid from the Biller List API filtered by 'DTH' service category.
 *
 * Endpoint  : POST /api/v2/DTH_plans.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
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
 * DTH Recharge Plans
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function dthRechargePlans(api_key = 'YOUR_API_KEY', opid = 'DTH_OPERATOR_ID') {
  const data = { api_key: api_key, opid: opid };

  return $.ajax({
    url:      BASE_URL + '/api/v2/DTH_plans.php',
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
    console.error('[KwikAPI] DTH Recharge Plans failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  dthRechargePlans('YOUR_API_KEY', 'DTH_OPERATOR_ID')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
