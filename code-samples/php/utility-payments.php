<?php
/**
 * KwikAPI SDK — Utility Payments (BBPS)
 * ─────────────────────────────────────────────────────────────────────────────
 * Processes all BBPS (Bharat Bill Payment System) utility bill payments — including Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, and more. IMPORTANT: Set HTTP timeout to 0. Always pass opt8='Bills' as required by the API. Pass additional operator-specific fields (opt1–opt10) as indicated in the Biller Details response. After submission, always confirm final status via Transaction Status API.
 *
 * Endpoint  : GET /api/v2/bills/payments.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Set HTTP timeout to 0 (no timeout).
 * NOTE: opt8 must always be 'Bills'.
 * NOTE: Always verify final status via Transaction Status API.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  Consumer/account number
 *   @param  number   $amount           (required)  Bill amount in INR
 *   @param  int      $opid             (required)  Operator ID from Biller List API
 *   @param  string   $order_id         (required)  Your unique order ID
 *   @param  string   $opt1–opt10       (optional)  Operator-specific additional fields (see Biller Details)
 *   @param  string   $opt8             (required)  Must always be 'Bills'
 *   @param  string   $refrence_id      (optional)  Optional reference ID for reconciliation
 *   @param  string   $mobile           (optional)  Customer mobile for confirmation SMS
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
 * Utility Payments (BBPS)
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  Consumer/account number
 *   @param  number   $amount           (required)  Bill amount in INR
 *   @param  int      $opid             (required)  Operator ID from Biller List API
 *   @param  string   $order_id         (required)  Your unique order ID
 *   @param  string   $opt1–opt10       (optional)  Operator-specific additional fields (see Biller Details)
 *   @param  string   $opt8             (required)  Must always be 'Bills'
 *   @param  string   $refrence_id      (optional)  Optional reference ID for reconciliation
 *   @param  string   $mobile           (optional)  Customer mobile for confirmation SMS
 * @return array
 * @throws RuntimeException
 */
function kwik_utility_payments(string $apiKey = KWIKAPI_KEY, string $number = 'CONSUMER_NUMBER', string $amount = '500', string $opid = 'OPERATOR_ID', string $order_id = 'YOUR_UNIQUE_ORDER_ID', string $opt8 = 'Bills', string $mobile = '9999999999'): array
{
    $queryString = http_build_query(['api_key' => $apiKey, 'number' => $number, 'amount' => $amount, 'opid' => $opid, 'order_id' => $order_id, 'opt8' => $opt8, 'mobile' => $mobile]);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/bills/payments.php?' . $queryString,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPGET        => true,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_TIMEOUT        => 0,
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
    $result = kwik_utility_payments(KWIKAPI_KEY, 'CONSUMER_NUMBER', '500', 'OPERATOR_ID', 'YOUR_UNIQUE_ORDER_ID', 'Bills', '9999999999');

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
