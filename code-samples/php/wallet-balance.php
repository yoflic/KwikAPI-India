<?php
/**
 * KwikAPI SDK — Wallet Balance
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns the current KwikAPI wallet balance for the authenticated merchant account. Monitor this before initiating payment transactions to avoid insufficient-balance failures. Consider caching and polling at a reasonable interval to stay within the rate limit.
 *
 * Endpoint  : GET /api/v2/balance.php
 * Group     : Fetching APIs
 * Rate Limit: 48 / day
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
 * Wallet Balance
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 * @return array
 * @throws RuntimeException
 */
function kwik_wallet_balance(string $apiKey = KWIKAPI_KEY): array
{
    $queryString = http_build_query(['api_key' => $apiKey]);
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/balance.php?' . $queryString,
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
    $result = kwik_wallet_balance(KWIKAPI_KEY);

    if (isset($result['response'])) {
        echo "Success: " . ($result['message'] ?? 'OK') . PHP_EOL;
        echo json_encode($result, JSON_PRETTY_PRINT) . PHP_EOL;
    } else {
        echo "API Error: " . ($result['message'] ?? 'Unknown error') . PHP_EOL;
    }
} catch (RuntimeException $e) {
    echo "Request failed: " . $e->getMessage() . PHP_EOL;
    exit(1);
}
