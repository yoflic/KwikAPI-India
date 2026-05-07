<?php
/**
 * KwikAPI SDK — Bank/UPI Account Verification v2
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates a bank account via real-time penny-drop or verifies a UPI/VPA address. Returns the registered account holder name and account status. The account field auto-detects whether the input is a bank account number or UPI/VPA. Always call this before initiating a Payout.
 *
 * Endpoint  : POST /api/v2/dmt/account_validate_route2
 * Group     : Verification APIs
 * Rate Limit: Per account
 * NOTE: Recommended before every Payout to prevent failed transfers.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $account          (required)  Bank account number or UPI/VPA address — auto-detected
 *   @param  string   $ifsc             (optional)  IFSC code for bank account routing; not required for UPI/VPA
 *   @param  string   $order_id         (required)  Your unique order ID for this verification
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
 * Bank/UPI Account Verification v2
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $account          (required)  Bank account number or UPI/VPA address — auto-detected
 *   @param  string   $ifsc             (optional)  IFSC code for bank account routing; not required for UPI/VPA
 *   @param  string   $order_id         (required)  Your unique order ID for this verification
 * @return array
 * @throws RuntimeException
 */
function kwik_bank_account_verify(string $api_key = 'YOUR_API_KEY', string $account = 'ACCOUNT_NUMBER', string $ifsc = 'SBIN0001234', string $order_id = 'YOUR_UNIQUE_ORDER_ID'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/dmt/account_validate_route2',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
        'account' => $account,
        'ifsc' => $ifsc,
        'order_id' => $order_id,
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
    $result = kwik_bank_account_verify('YOUR_API_KEY', 'ACCOUNT_NUMBER', 'SBIN0001234', 'YOUR_UNIQUE_ORDER_ID');

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
