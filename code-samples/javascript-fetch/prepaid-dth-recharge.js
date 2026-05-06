/**
 * KwikAPI SDK — Prepaid / DTH Recharge
 * ─────────────────────────────────────────────────────────────────────────────
 * Initiates a prepaid mobile, DTH/D2H, or Datacard recharge in real time. IMPORTANT: Set your HTTP client timeout to 0 (no timeout) — the API processes synchronously and may take longer than default timeouts. Always verify the final outcome by calling the Transaction Status API with your order_id immediately after, regardless of the response received.
 *
 * Endpoint  : GET /api/v2/recharge.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Set HTTP timeout to 0 (no timeout) — API processes in real time.
 * NOTE: Always verify final status via Transaction Status API.
 * NOTE: order_id must be globally unique per transaction.
 *
 * @param  {string} apiKey  Your KwikAPI API key
 * @param  {string}  api_key  Your KwikAPI API key
 * @param  {string}  number  Mobile/DTH subscriber number
 * @param  {number}  amount  Recharge amount in INR
 * @param  {int}  opid  Operator ID from Biller List / Operator Detect API
 * @param  {string}  state_code  Telecom circle code (for mobile prepaid)
 * @param  {string}  order_id  Your unique order ID (must be unique per transaction)
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
 * Prepaid / DTH Recharge
 * @param  {api_key = 'YOUR_API_KEY', number = '9999999999', amount = '199', opid = 'OPERATOR_ID', state_code = 'MH', order_id = 'YOUR_UNIQUE_ORDER_ID'}
 * @returns {Promise<object>}
 */
async function prepaidDthRecharge(api_key = 'YOUR_API_KEY', number = '9999999999', amount = '199', opid = 'OPERATOR_ID', state_code = 'MH', order_id = 'YOUR_UNIQUE_ORDER_ID') {
  try {
  const params = new URLSearchParams();
    params.append('api_key', api_key);
    params.append('number', number);
    params.append('amount', amount);
    params.append('opid', opid);
    params.append('state_code', state_code);
    params.append('order_id', order_id);

  const response = await fetch(`https://uat.kwikapi.com/api/v2/recharge.php?${params.toString()}`, {
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
    console.error('[KwikAPI] Prepaid / DTH Recharge failed:', error.message);
    throw error;
  }
}

// ── Example usage ─────────────────────────────────────────────────────────────
(async () => {
  try {
    const result = await prepaidDthRecharge('YOUR_API_KEY', '9999999999', '199', 'OPERATOR_ID', 'MH', 'YOUR_UNIQUE_ORDER_ID');
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
})();
