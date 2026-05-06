/**
 * KwikAPI SDK — Mobile Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available prepaid mobile recharge plans for a given operator and telecom circle. Plans are grouped by category (Data, Talktime, SMS, etc.) and include validity, description, and pricing. Use the Operator & Circle Detect API to get the correct opid and state_code for the subscriber's number before calling this.
 *
 * Endpoint  : POST /api/v2/recharge_plans.php
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
 * Mobile Recharge Plans
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} state_code - (required) Telecom circle code from Circle Codes API
 * @param {int} opid - (required) Operator ID from Biller List API
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function mobileRechargePlans(api_key = 'YOUR_API_KEY', state_code = '4', opid = '1') {
  const data = { api_key: api_key, state_code: state_code, opid: opid };

  return $.ajax({
    url:      BASE_URL + '/api/v2/recharge_plans.php',
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
    console.error('[KwikAPI] Mobile Recharge Plans failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  mobileRechargePlans('YOUR_API_KEY', 'MH', '1')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
