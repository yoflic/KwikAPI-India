/**
 * KwikAPI SDK — Utility Payments (BBPS)
 * ─────────────────────────────────────────────────────────────────────────────
 * Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.
 *
 * Endpoint  : GET /api/v2/bills/payments.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: opt8 must always be 'Bills'.
 * NOTE: Always verify final status via Transaction Status API.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  number  Consumer/account number
 * @param  {number}  amount  Bill amount in INR
 * @param  {int}  opid  Operator ID from Biller List API
 * @param  {string}  order_id  Your unique order ID
 * @param  {string}  opt1–opt10  Operator-specific additional fields (see Biller Details)
 * @param  {string}  opt8  Must always be 'Bills'
 * @param  {string}  refrence_id  Optional reference ID for reconciliation
 * @param  {string}  mobile  Customer mobile for confirmation SMS
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
 * Utility Payments (BBPS)
 * @param {string} api_key - (required) Your KwikAPI API key
 * @param {string} number - (required) Consumer/account number
 * @param {number} amount - (required) Bill amount in INR
 * @param {int} opid - (required) Operator ID from Biller List API
 * @param {string} order_id - (required) Your unique order ID
 * @param {string} opt1-opt10 - (optional) Operator-specific additional fields (see Biller Details)
 * @param {string} opt8 - (required) Must always be 'Bills'
 * @param {string} refrence_id - (optional) Optional reference ID for reconciliation
 * @param {string} mobile - (optional) Customer mobile for confirmation SMS
 * @returns {Promise<object>}
 */
async function utilityPayments(api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '500', opid = 'OPERATOR_ID', order_id = 'YOUR_UNIQUE_ORDER_ID', opt8 = 'Bills', mobile = '9999999999') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);
    params.append('number', number);
    params.append('amount', amount);
    params.append('opid', opid);
    params.append('order_id', order_id);
    params.append('opt8', opt8);
    params.append('mobile', mobile);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/bills/payments.php?${params.toString()}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'SUCCESS') {
      throw new Error(`API error: ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    console.error('[KwikAPI] Utility Payments (BBPS) failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await utilityPayments('YOUR_API_KEY', 'CONSUMER_NUMBER', '500', 'OPERATOR_ID', 'YOUR_UNIQUE_ORDER_ID', 'Bills', '9999999999');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
