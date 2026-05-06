/**
 * KwikAPI SDK — Service Category List
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the complete active list of all service categories available on KwikAPI (e.g. Prepaid, DTH, Broadband, Electricity, Education, Insurance, etc.). Use this to populate your service-selection UI or to sync your local category list. Responses include the total number of operators per category.
 *
 * Endpoint  : POST /api/v2/Service-Category-List.php
 * Group     : Fetching APIs
 * Rate Limit: 10 / day
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
 * Service Category List
 * @param {string} api_key - (required) Your KwikAPI API key
 * @returns {jQuery.Deferred} Resolves with parsed JSON response
 */
function serviceCategoryList(api_key = 'YOUR_API_KEY') {
  const data = { api_key: api_key };

  return $.ajax({
    url:      BASE_URL + '/api/v2/Service-Category-List.php',
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
    console.error('[KwikAPI] Service Category List failed:', status, error);
    throw new Error(error);
  });
}

// ── Example usage ─────────────────────────────────────────────────────────────
$(function () {
  serviceCategoryList('YOUR_API_KEY')
    .done(function (result) {
      console.log('Success:', result);
    })
    .fail(function (xhr, status, error) {
      console.error('Failed:', error);
    });
});
