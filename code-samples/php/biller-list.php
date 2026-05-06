<?php
/**
 * KwikAPI SDK — Biller List
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns a paginated list of all billers/operators with their codes, active status, supported amount ranges, required parameters, and service category. Intended for syncing your local biller database. Filter by service category using the 'service' parameter, and paginate large result sets with 'page'.
 *
 * Endpoint  : GET /api/v2/operator_codes.php
 * Group     : Fetching APIs
 * Rate Limit: 20 / day
 * NOTE: Allowed for syncing/caching purposes only.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $service          (optional)  Filter by service category name (e.g. 'Prepaid')
 *   @param  int      $page             (optional)  Page number for pagination (default: 1)
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
 * Biller List
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $service          (optional)  Filter by service category name (e.g. 'Prepaid')
 *   @param  int      $page             (optional)  Page number for pagination (default: 1)
 * @return array
 * @throws RuntimeException
 */
function kwik_biller_list(string $apiKey = KWIKAPI_KEY): array
{
    $queryString = http_build_query(['api_key' => $apiKey]);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/operator_codes.php?' . $queryString,
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
    $result = kwik_biller_list(KWIKAPI_KEY);

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
