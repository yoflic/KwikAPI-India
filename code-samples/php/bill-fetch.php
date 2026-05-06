<?php
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
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  Consumer number / account number / registered mobile
 *   @param  number   $amount           (optional)  Pre-filled amount (pass 0 if unknown)
 *   @param  int      $opid             (required)  Operator ID from Biller List API
 *   @param  string   $order_id         (required)  Your unique order/reference ID
 *   @param  string   $opt1-opt10       (optional)  Additional operator-specific fields (see Biller Details)
 *   @param  string   $mobile           (optional)  Customer mobile number for SMS confirmation
 *
 * @return array  Decoded JSON response from KwikAPI
 * @throws RuntimeException  on cURL failure or invalid JSON response
 *
 * Environment:
 *   UAT (testing) : https://uat.kwikapi.com
 *   Production    : https://www.kwikapi.com  (change KWIKAPI_BASE_URL)
 *
 * @link https://kwikapi.com/auth/register  Get your API key
 */

define('KWIKAPI_BASE_URL', 'https://uat.kwikapi.com'); // Switch to https://www.kwikapi.com for production
define('KWIKAPI_KEY', 'YOUR_API_KEY');

/**
 * Bill Fetch
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  Consumer number / account number / registered mobile
 *   @param  number   $amount           (optional)  Pre-filled amount (pass 0 if unknown)
 *   @param  int      $opid             (required)  Operator ID from Biller List API
 *   @param  string   $order_id         (required)  Your unique order/reference ID
 *   @param  string   $opt1-opt10       (optional)  Additional operator-specific fields (see Biller Details)
 *   @param  string   $mobile           (optional)  Customer mobile number for SMS confirmation
 * @return array
 * @throws RuntimeException
 */
function kwik_bill_fetch(string $apiKey = KWIKAPI_KEY, string $number = 'CONSUMER_NUMBER', string $amount = '0', string $opid = 'OPERATOR_ID', string $order_id = 'YOUR_ORDER_ID', string $mobile = '9999999999'): array
{
    $queryString = http_build_query(['api_key' => $apiKey, 'number' => $number, 'amount' => $amount, 'opid' => $opid, 'order_id' => $order_id, 'mobile' => $mobile]);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/bills/validation.php?' . $queryString,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPGET        => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    ]);

    $response = curl_exec($ch);
    $httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        throw new RuntimeException("cURL error: {$curlError}");
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException('Invalid JSON response (HTTP ' . $httpCode . ')');
    }

    return $data;
}

// ── Example usage ─────────────────────────────────────────────────────────────
try {
    $result = kwik_bill_fetch(KWIKAPI_KEY, 'CONSUMER_NUMBER', '0', 'OPERATOR_ID', 'YOUR_ORDER_ID', '9999999999');

    if ($result['success'] ?? false) {
        echo "Success: " . ($result['message'] ?? 'OK') . PHP_EOL;
        echo json_encode($result, JSON_PRETTY_PRINT) . PHP_EOL;
    } else {
        echo "API Error: " . ($result['message'] ?? 'Unknown error') . PHP_EOL;
    }
} catch (RuntimeException $e) {
    echo "Request failed: " . $e->getMessage() . PHP_EOL;
    exit(1);
}
