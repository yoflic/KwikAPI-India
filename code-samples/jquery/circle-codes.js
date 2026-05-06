/**
 * KwikAPI SDK — Circle Codes
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all telecom circle codes used across India. These codes are required when initiating prepaid mobile recharges — pass the correct state_code for the subscriber's telecom circle. Cache this response locally as it rarely changes.
 *
 * Endpoint  : GET /api/v2/circle_codes.php
 * Group     : Fetching APIs
 * Rate Limit: 2 / day
 * NOTE: Cache locally — changes infrequently. Rate limit: 2/day.
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
 * Circle Codes
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function circleCodes(api_key = 'YOUR_API_KEY') {
  const data = { api_key: api_key };

  return $.ajax({
    url:      BASE_URL + '/api/v2/circle_codes.php',
    method:   'GET',
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
    console.error('[KwikAPI] Circle Codes failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  circleCodes('YOUR_API_KEY')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
