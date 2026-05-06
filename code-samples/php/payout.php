<?php
/**
 * KwikAPI SDK — Payout (Money Transfer)
 * ─────────────────────────────────────────────────────────────────────────────
 * Initiates a bank account payout / money transfer to a beneficiary's bank account via IMPS/NEFT. REQUIRES IP WHITELISTING — use the IP Detect API to find your server's public IP and whitelist it in your KwikAPI dashboard before calling this endpoint. Always validate the beneficiary account first using the Bank Account Verification API.
 *
 * Endpoint  : POST /api/v2/payments/index.php
 * Group     : Payment APIs
 * Rate Limit: Per account
 * NOTE: IP whitelisting required — use IP Detect API first.
 * NOTE: Validate beneficiary account using Bank Account Verification API before payout.
 *
 * Parameters:
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $account_no       (required)  Beneficiary bank account number
 *   @param  number   $amount           (required)  Transfer amount in INR
 *   @param  string   $order_id         (required)  Your unique order ID
 *   @param  string   $ifsc_code        (required)  Beneficiary bank IFSC code
 *   @param  string   $bene_name        (required)  Beneficiary full name
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
 * Payout (Money Transfer)
 *
 *   @param  string   $api_key          (required)  Your KwikAPI API key
 *   @param  string   $account_no       (required)  Beneficiary bank account number
 *   @param  number   $amount           (required)  Transfer amount in INR
 *   @param  string   $order_id         (required)  Your unique order ID
 *   @param  string   $ifsc_code        (required)  Beneficiary bank IFSC code
 *   @param  string   $bene_name        (required)  Beneficiary full name
 * @return array
 * @throws RuntimeException
 */
function kwik_payout(string $api_key = 'YOUR_API_KEY', string $account_no = 'BENEFICIARY_ACCOUNT_NUMBER', string $amount = '1000', string $order_id = 'YOUR_UNIQUE_ORDER_ID', string $ifsc_code = 'SBIN0001234', string $bene_name = 'Beneficiary Name'): array
{
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://uat.kwikapi.com/api/v2/payments/index.php',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
        'api_key' => $api_key,
        'account_no' => $account_no,
        'amount' => $amount,
        'order_id' => $order_id,
        'ifsc_code' => $ifsc_code,
        'bene_name' => $bene_name,
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
    $result = kwik_payout('YOUR_API_KEY', 'BENEFICIARY_ACCOUNT_NUMBER', '1000', 'YOUR_UNIQUE_ORDER_ID', 'SBIN0001234', 'Beneficiary Name');

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
