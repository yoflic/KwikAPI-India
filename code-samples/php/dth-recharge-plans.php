<?php
/**
 * KwikAPI SDK — DTH Recharge Plans
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns all available DTH/D2H recharge packs for a given DTH operator. Plans include pack name, channels, validity, and pricing. Use the opid from the Biller List API filtered by 'DTH' service category.
 *
 * Endpoint  : POST /api/v2/DTH_plans.php
 * Group     : Fetching APIs
 * Rate Limit: Per account
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  int      $opid             (required)  DTH operator ID from Biller List API
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
 * DTH Recharge Plans
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  int      $opid             (required)  DTH operator ID from Biller List API
 * @return array
 * @throws RuntimeException
 */
function kwik_dth_recharge_plans(string $api_key = 'YOUR_API_KEY', string $opid = 'DTH_OPERATOR_ID'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/DTH_plans.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
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
    $result = kwik_dth_recharge_plans('YOUR_API_KEY', 'DTH_OPERATOR_ID');

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
