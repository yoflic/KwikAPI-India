<?php
/**
 * KwikAPI SDK — Mobile Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available prepaid mobile recharge plans for a given operator and telecom circle. Plans are grouped by category (Data, Talktime, SMS, etc.) and include validity, description, and pricing. Use the Operator & Circle Detect API to get the correct opid and state_code for the subscriber's number before calling this.
 *
 * Endpoint  : POST /api/v2/recharge_plans.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $state_code       (required)  Telecom circle code from Circle Codes API
 *   @param  int      $opid             (required)  Operator ID from Biller List API
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
 * Mobile Recharge Plans
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $state_code       (required)  Telecom circle code from Circle Codes API
 *   @param  int      $opid             (required)  Operator ID from Biller List API
 * @return array
 * @throws RuntimeException
 */
function kwik_mobile_recharge_plans(string $api_key = 'YOUR_API_KEY', string $state_code = '4', string $opid = '1'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/recharge_plans.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
        'state_code' => $state_code,
        'opid' => $opid,
        ]),
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
    $result = kwik_mobile_recharge_plans('YOUR_API_KEY', 'MH', '1');

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
