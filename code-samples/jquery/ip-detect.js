/**
 * KwikAPI SDK — IP Detect
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the public IP address of the calling server or client. No authentication required. Use this utility endpoint to discover your server's public IP for IP whitelisting — required before using the Payout API. Run this on your production server, not your local machine.
 *
 * Endpoint  : GET /api/v2/ip_detect.php
 * Group     : Utility APIs
 * Rate Limit: Unlimited
 * NOTE: No authentication required.
 * NOTE: Run on your production server for accurate IP detection.
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
 * IP Detect
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function ipDetect() {
  const data = null;

  return $.ajax({
    url:      BASE_URL + '/api/v2/ip_detect.php',
    method:   'GET',
    data:     data,
    dataType: 'json',
    timeout:  10000,
  })
  .done(function (response) {
    if (!response.success) {
      throw new Error('API error: ' + (response.message || 'Unknown error'));
    }
    return response;
  })
  .fail(function (xhr, status, error) {
    console.error('[KwikAPI] IP Detect failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  ipDetect()
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
