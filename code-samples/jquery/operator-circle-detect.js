/**
 * KwikAPI SDK — Operator & Circle Detect
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects the mobile operator and telecom circle for any given 10-digit Indian mobile number in real time. Fully supports MNP (Mobile Number Portability) and circle-changed numbers. Always call this before initiating a prepaid mobile recharge to ensure the correct operator and opid are passed.
 *
 * Endpoint  : POST /api/v2/operator_fetch_v2.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supports MNP and circle-changed numbers.
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
 * Operator & Circle Detect
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} number - (required) 10-digit Indian mobile number
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function operatorCircleDetect(api_key = 'YOUR_API_KEY', number = '9999999999') {
  const data = { api_key: api_key, number: number };

  return $.ajax({
    url:      BASE_URL + '/api/v2/operator_fetch_v2.php',
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
    console.error('[KwikAPI] Operator & Circle Detect failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  operatorCircleDetect('YOUR_API_KEY', '9999999999')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
