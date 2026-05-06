<?php
/**
 * KwikAPI SDK — Operator & Circle Detect
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects the mobile operator and telecom circle for any given 10-digit Indian mobile number in real time. Fully supports MNP (Mobile Number Portability) and circle-changed numbers. Always call this before initiating a prepaid mobile recharge to ensure the correct operator and state_code are passed.
 *
 * Endpoint  : POST /api/v2/operator_fetch_v2.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supports MNP and circle-changed numbers.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  10-digit Indian mobile number
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
 * Operator & Circle Detect
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $number           (required)  10-digit Indian mobile number
 * @return array
 * @throws RuntimeException
 */
function kwik_operator_circle_detect(string $api_key = 'YOUR_API_KEY', string $number = '9999999999'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/operator_fetch_v2.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
        'number' => $number,
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
    $result = kwik_operator_circle_detect('YOUR_API_KEY', '9999999999');

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
