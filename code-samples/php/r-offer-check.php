<?php
/**
 * KwikAPI SDK — R-Offer Check
 * ─────────────────────────────────────────────────────────────────────────────
 * Checks for active R-Offers (retention/special offers) running on a prepaid mobile number. R-Offers are personalised discount plans offered by the operator to retain subscribers. Currently supported only for Airtel and VI (Vodafone Idea) networks in India. Always check network before calling — will return an error for unsupported operators.
 *
 * Endpoint  : POST /api/v2/R-OFFER_check.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 * NOTE: Supported networks: Airtel and VI (Vodafone Idea) only.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  int      $opid             (required)  Operator ID — Airtel or VI only
 *   @param  string   $mobile           (required)  10-digit prepaid mobile number to check offers for
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
 * R-Offer Check
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  int      $opid             (required)  Operator ID — Airtel or VI only
 *   @param  string   $mobile           (required)  10-digit prepaid mobile number to check offers for
 * @return array
 * @throws RuntimeException
 */
function kwik_r_offer_check(string $api_key = 'YOUR_API_KEY', string $opid = 'OPERATOR_ID', string $mobile = '9999999999'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/R-OFFER_check.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
        'opid' => $opid,
        'mobile' => $mobile,
        ]),
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
    $result = kwik_r_offer_check('YOUR_API_KEY', 'OPERATOR_ID', '9999999999');

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
