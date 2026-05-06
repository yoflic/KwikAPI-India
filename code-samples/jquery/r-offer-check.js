/**
 * KwikAPI SDK — R-Offer Check
 * ─────────────────────────────────────────────────────────────────────────────
 * Checks for active R-Offers (retention/special offers) running on a prepaid mobile number. R-Offers are personalised discount plans offered by the operator to retain subscribers. Currently supported only for Airtel and VI (Vodafone Idea) networks in India. Always check network before calling — will return an error for unsupported operators.
 *
 * Endpoint  : POST /api/v2/R-OFFER_check.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supported networks: Airtel and VI (Vodafone Idea) only.
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
 * R-Offer Check
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function rOfferCheck(api_key = 'YOUR_API_KEY', opid = 'OPERATOR_ID', mobile = '9999999999') {
  const data = { api_key: api_key, opid: opid, mobile: mobile };

  return $.ajax({
    url:      BASE_URL + '/api/v2/R-OFFER_check.php',
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
    console.error('[KwikAPI] R-Offer Check failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  rOfferCheck('YOUR_API_KEY', 'OPERATOR_ID', '9999999999')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
