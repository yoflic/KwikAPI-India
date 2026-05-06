/**
 * KwikAPI SDK — Service Category List
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the complete active list of all service categories available on KwikAPI (e.g. Prepaid, DTH, Broadband, Electricity, Education, Insurance, etc.). Use this to populate your service-selection UI or to sync your local category list. Responses include the total number of operators per category.
 *
 * Endpoint  : POST /api/v2/Service-Category-List.php
 * Group     : Fetching APIs
 * Rate Limit: 10 / day
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @returns {Promise<object>} Parsed JSON response
 *
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
 * @returns {Promise<object>}
 */
async function serviceCategoryList(api_key = 'YOUR_API_KEY') {
  try {
  const formData = new FormData();
    formData.append('api_key', api_key);

  const response = await fetch('https://uat.kwikapi.com/api/v2/Service-Category-List.php', {
    method: 'POST',
    body: formData,
  });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(`API error: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    console.error('[KwikAPI] Service Category List failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await serviceCategoryList('YOUR_API_KEY');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
