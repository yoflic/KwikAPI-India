<?php
/**
 * KwikAPI SDK — Prepaid / DTH Recharge
 * ─────────────────────────────────────────────────────────────────────────────
 * Initiates a prepaid mobile, DTH/D2H, or Datacard recharge in real time. Always verify the final outcome by calling the Transaction Status API with your order_id immediately after, regardless of the response received.
 *
 * Endpoint  : GET /api/v2/recharge.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: Always verify final status via Transaction Status API.
 * NOTE: order_id must be globally unique per transaction.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  Mobile/DTH subscriber number
 *   @param  number   $amount           (required)  Recharge amount in INR
 *   @param  int      $opid             (required)  Operator ID from Biller List / Operator Detect API
 *   @param  string   $state_code       (required)  Telecom circle code (for mobile prepaid)
 *   @param  string   $order_id         (required)  Your unique order ID (must be unique per transaction)
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
 * Prepaid / DTH Recharge
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  Mobile/DTH subscriber number
 *   @param  number   $amount           (required)  Recharge amount in INR
 *   @param  int      $opid             (required)  Operator ID from Biller List / Operator Detect API
 *   @param  string   $state_code       (required)  Telecom circle code (for mobile prepaid)
 *   @param  string   $order_id         (required)  Your unique order ID (must be unique per transaction)
 * @return array
 * @throws RuntimeException
 */
function kwik_prepaid_dth_recharge(string $apiKey = KWIKAPI_KEY, string $number = '9999999999', string $amount = '199', string $opid = 'OPERATOR_ID', string $state_code = '4', string $order_id = 'YOUR_UNIQUE_ORDER_ID'): array
{
    $queryString = http_build_query(['api_key' => $apiKey, 'number' => $number, 'amount' => $amount, 'opid' => $opid, 'state_code' => $state_code, 'order_id' => $order_id]);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/recharge.php?' . $queryString,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPGET        => true,
        CURLOPT_SSL_VERIFYPEER => true,
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
    $result = kwik_prepaid_dth_recharge(KWIKAPI_KEY, '9999999999', '199', 'OPERATOR_ID', 'MH', 'YOUR_UNIQUE_ORDER_ID');

    if (($result['status'] ?? '') === 'SUCCESS') {
        echo "Success: " . ($result['message'] ?? 'OK') . PHP_EOL;
        echo json_encode($result, JSON_PRETTY_PRINT) . PHP_EOL;
    } else {
        echo "API Error: " . ($result['message'] ?? 'Unknown error') . PHP_EOL;
    }
} catch (RuntimeException $e) {
    echo "Request failed: " . $e->getMessage() . PHP_EOL;
    exit(1);
}
