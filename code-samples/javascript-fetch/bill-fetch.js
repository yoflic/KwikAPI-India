/**
 * KwikAPI SDK — Bill Fetch
 * ─────────────────────────────────────────────────────────────────────────────
 * Fetches the outstanding bill or due amount from a biller for operators that support the BBPS bill-fetch facility. Always call the Biller Details API first to verify that the operator supports bill-fetch (look for 'bill_fetch: true' in the response) before calling this endpoint. Returns due amount, due date, and consumer details.
 *
 * Endpoint  : GET /api/v2/bills/validation.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Verify bill-fetch support via Biller Details API before calling.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  number  Consumer number / account number / registered mobile
 * @param  {number}  amount  Pre-filled amount (pass 0 if unknown)
 * @param  {int}  opid  Operator ID from Biller List API
 * @param  {string}  order_id  Your unique order/reference ID
 * @param  {string}  opt1-opt10  Additional operator-specific fields (see Biller Details)
 * @param  {string}  mobile  Customer mobile number for SMS confirmation
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
 * Bill Fetch
 * @param  {api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '0', opid = 'OPERATOR_ID', order_id = 'YOUR_ORDER_ID', mobile = '9999999999'}
 * @returns {Promise<object>}
 */
async function billFetch(api_key = 'YOUR_API_KEY', number = 'CONSUMER_NUMBER', amount = '0', opid = 'OPERATOR_ID', order_id = 'YOUR_ORDER_ID', mobile = '9999999999') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);
    params.append('number', number);
    params.append('amount', amount);
    params.append('opid', opid);
    params.append('order_id', order_id);
    params.append('mobile', mobile);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/bills/validation.php?${params.toString()}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
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
    console.error('[KwikAPI] Bill Fetch failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await billFetch('YOUR_API_KEY', 'CONSUMER_NUMBER', '0', 'OPERATOR_ID', 'YOUR_ORDER_ID', '9999999999');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
