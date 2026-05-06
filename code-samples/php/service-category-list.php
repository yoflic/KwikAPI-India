<?php
/**
 * KwikAPI SDK — Service Category List
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the complete active list of all service categories available on KwikAPI (e.g. Prepaid, DTH, Broadband, Electricity, Education, Insurance, etc.). Use this to populate your service-selection UI or to sync your local category list. Responses include the total number of operators per category.
 *
 * Endpoint  : POST /api/v2/Service-Category-List.php
 * Group     : Fetching APIs
 * Rate Limit: 10 / day
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
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
 * Service Category List
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 * @return array
 * @throws RuntimeException
 */
function kwik_service_category_list(string $api_key = 'YOUR_API_KEY'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/Service-Category-List.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
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
    $result = kwik_service_category_list('YOUR_API_KEY');

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
