# KwikAPI v3.0.1 — API Reference

> Complete parameter reference for all 17 APIs.  
> **UAT:** `https://uat.kwikapi.com` &nbsp;·&nbsp; **Production:** `https://www.kwikapi.com`  
> Authentication: pass `api_key` in the request body (POST) or as a query parameter (GET).

---

## Table of Contents

**Fetching APIs** (sync & store locally)
1. [Service Category List](#1-service-category-list)
2. [Biller List](#2-biller-list)
3. [Biller Details](#3-biller-details)
4. [Circle Codes](#4-circle-codes)
5. [Bill Fetch](#5-bill-fetch)
6. [Wallet Balance](#6-wallet-balance)
7. [Transaction Status](#7-transaction-status)
8. [Last 100 Transactions](#8-last-100-transactions)
9. [Operator & Circle Detect](#9-operator--circle-detect)
10. [Mobile Recharge Plans](#10-mobile-recharge-plans)
11. [DTH Recharge Plans](#11-dth-recharge-plans)
12. [R-Offer Check](#12-r-offer-check)

**Payment APIs**
13. [Prepaid / DTH Recharge](#13-prepaid--dth-recharge)
14. [Utility Payments (BBPS)](#14-utility-payments-bbps)
15. [Payout (Money Transfer)](#15-payout-money-transfer)

**Verification APIs**
16. [Bank/UPI Account Verification v2](#16-bankupi-account-verification-v2)

**Utility APIs**
17. [IP Detect](#17-ip-detect)

---

## Fetching APIs

---

### 1. Service Category List

**Endpoint:** `POST /api/v2/Service-Category-List.php`  
**Rate Limit:** 10 / day  
**Use:** Fetch all active service categories. Use once during setup to populate your UI or sync your local list.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |

#### Sample Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "message": "Service categories fetched successfully",
  "total": 33,
  "categories": [
    { "service_name": "Prepaid", "total_operators": 32 },
    { "service_name": "DTH", "total_operators": 17 },
    { "service_name": "Electricity", "total_operators": 127 }
  ],
  "rate_limit": { "limit": 10, "used": 1, "remaining": 9 }
}
```

---

### 2. Biller List

**Endpoint:** `GET /api/v2/operator_codes.php`  
**Rate Limit:** 20 / day  
**Use:** Fetch all billers with their operator codes. Store locally and refresh weekly. Filter by service category.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `service` | string | Optional | Filter by service category name (e.g. `Prepaid`, `Electricity`, `DTH`) |
| `page` | int | Optional | Page number for pagination (default: `1`) |

#### Sample Response

```json
{
  "status": "SUCCESS",
  "response": [
    {
      "operator_name": "Airtel",
      "operator_id": "1",
      "service_type": "Prepaid",
      "status": "1",
      "biller_status": "on",
      "bill_fetch": "NO",
      "supportValidation": "NOT_SUPPORTED",
      "bbps_enabled": "NO",
      "amount_minimum": "10",
      "amount_maximum": "10000"
    }
  ]
}
```

---

### 3. Biller Details

**Endpoint:** `POST /api/v2/operatorFetch.php`  
**Rate Limit:** 20 / day  
**Use:** Fetch full details for one or more operators. Supports batch lookup — separate multiple `opid` values with `#`.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `opid` | string | ✅ Required | Operator ID(s). For batch: separate with `#` (e.g. `53#54#55`) |

#### Sample Response

```json
{
  "success": true,
  "STATUS": "SUCCESS",
  "operator_name": "Uttar Gujarat Vij Company Limited - UGVCL",
  "operator_id": "53",
  "service_type": "ELC",
  "status": "1",
  "biller_status": "on",
  "bill_fetch": "NO",
  "supportValidation": "OPTIONAL",
  "bbps_enabled": "YES",
  "amount_minimum": "1",
  "amount_maximum": "49999",
  "parameters": [
    { "opt1/param1": "Consumer Number" },
    { "opt2/param2": "" }
  ]
}
```

> **Key fields to store:** `bill_fetch_supported` (drives Bill Fetch decision), `required_params` (maps to `opt1`–`opt10` in payment APIs).

---

### 4. Circle Codes

**Endpoint:** `GET /api/v2/circle_codes.php`  
**Rate Limit:** 2 / day  
**Use:** Fetch all India telecom circle codes. Cache locally — changes very rarely.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |

#### Sample Response

```json
{
  "response": [
    { "circle_name": "DELHI (DL)", "circle_code": "1" },
    { "circle_name": "Maharashtra (MH)", "circle_code": "4" },
    { "circle_name": "Karnataka (KA)", "circle_code": "7" }
  ]
}
```

---

### 5. Bill Fetch

**Endpoint:** `GET /api/v2/bills/validation.php`  
**Rate Limit:** Per account  
**Use:** Fetch outstanding bill amount and consumer details from the biller. Only call if `bill_fetch_supported = true` in Biller Details.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `number` | string | ✅ Required | Consumer / account / registered mobile number |
| `opid` | int | ✅ Required | Operator ID from Biller List API |
| `order_id` | string | ✅ Required | Your unique reference ID for this fetch request |
| `opt1`–`opt10` | string | Optional | Additional operator-specific fields (see `required_params` in Biller Details) |
| `mobile` | string | ✅ Required | Customer mobile number for SMS confirmation |

#### Sample Response

```json
{
  "status": "SUCCESS",
  "provider": "Jio Postpaid",
  "message": "SUCCESS",
  "due_amount": "1885.00",
  "due_date": "13-07-2025",
  "customer_name": "Anushka Verma",
  "bill_number": "202006005985",
  "bill_date": "28-06-2020",
  "bill_period": "MONTHLY",
  "ref_id": "61936",
  "service": "Postpaid",
  "Additional": ""
}
```

---

### 6. Wallet Balance

**Endpoint:** `GET /api/v2/balance.php`  
**Rate Limit:** 48 / day  
**Use:** Check your KwikAPI merchant wallet balance.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |

#### Sample Response

```json
{
  "response": {
    "balance": "262.80",
    "plan_credit": "1"
  }
}
```

---

### 7. Transaction Status

**Endpoint:** `GET /api/v2/status.php`  
**Rate Limit:** 100 / day  
**Use:** Check the final status of any payment by your `order_id`. Call after any payment API if response is PENDING or unclear.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `order_id` | string | ✅ Required | The unique order ID you used during the payment request |

#### Sample Response

```json
{
  "response": {
    "order_id": "11554212",
    "operator_ref": "4162140972233",
    "opr_id": "416214093455",
    "status": "SUCCESS",
    "number": "9876523456",
    "amount": "1",
    "service": "Beneficiary Verification",
    "charged_amount": "2.35",
    "closing_balance": "312.15",
    "available_balance": "0",
    "date": "2024-06-10 14:23:53"
  }
}
```

**Status values:**

| Status | Meaning |
|--------|---------|
| `SUCCESS` | Transaction completed successfully |
| `FAILURE` | Transaction failed — do not retry with the same `order_id` |
| `PENDING` | Processing — poll again after 30–60 seconds (max 3–5 retries) |

---

### 8. Last 100 Transactions

**Endpoint:** `GET /api/v2/transactions.php`  
**Rate Limit:** 48 / day  
**Use:** Fetch the latest 100 transactions in reverse chronological order. Useful for dashboards and reconciliation.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |

#### Sample Response

```json
[
  {
    "trx_id": "2439956",
    "your_id": "15941191532587",
    "number": "7045155381",
    "number2": null,
    "ref_id": "14132909",
    "amount": "220",
    "charged_amount": "212.74",
    "date": "2020-07-07 16:22:33",
    "status": "SUCCESS",
    "service": "SUN DTH"
  }
]
```

---

### 9. Operator & Circle Detect

**Endpoint:** `POST /api/v2/operator_fetch_v2.php`  
**Rate Limit:** Per account  
**Use:** Detect real-time operator and telecom circle for any 10-digit mobile number. Fully MNP-aware.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `number` | string | ✅ Required | 10-digit Indian mobile number |

#### Sample Response

```json
{
  "success": true,
  "message": null,
  "credit_balance": "499",
  "details": {
    "provider": "Airtel",
    "opid": "1",
    "circle_code": "5",
    "circle_name": "Delhi (DL)"
  }
}
```

> Always call this before recharging — never assume operator from number prefix. MNP users will receive the wrong recharge otherwise.

---

### 10. Mobile Recharge Plans

**Endpoint:** `POST /api/v2/recharge_plans.php`  
**Rate Limit:** Per account  
**Use:** Fetch all available prepaid mobile recharge plans for an operator and circle. Use `opid` and `circle_code` from Operator & Circle Detect.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `opid` | int | ✅ Required | Operator ID from Biller List or Operator Detect API |
| `state_code` | string | ✅ Required | Telecom circle code (numeric, e.g. `4` for Maharashtra, `1` for Delhi) from Circle Codes API |

#### Sample Response

```json
{
  "success": true,
  "operator": "IDEA",
  "circle": "BIHAR",
  "message": "Ignore FRC plans.",
  "plans": {
    "3G/4G": [
      {
        "Type": "Data",
        "rs": 22,
        "validity": "1 Day",
        "desc": "Get 1GB Data for 1 day"
      }
    ],
    "Talktime": [
      {
        "Type": "Talktime",
        "rs": 10,
        "validity": "28 Days",
        "desc": "Talktime Rs. 10"
      }
    ]
  }
}
```

---

### 11. DTH Recharge Plans

**Endpoint:** `POST /api/v2/DTH_plans.php`  
**Rate Limit:** Per account  
**Use:** Fetch all available DTH/D2H recharge packs for a DTH operator.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `opid` | int | ✅ Required | DTH operator ID from Biller List API (filter by `service=DTH`) |

#### Sample Response

```json
{
  "success": true,
  "operator": "RELIANCE JIO",
  "circle": "DELHI",
  "message": "Ignore FRC plans.",
  "plans": {
    "FULLTT": [
      {
        "rs": 129,
        "validity": "28 Days",
        "desc": "2GB data + Unlimited calls + 300 SMS",
        "Type": "NEW ALL-IN-ONE"
      }
    ]
  }
}
```

---

### 12. R-Offer Check

**Endpoint:** `POST /api/v2/R-OFFER_check.php`  
**Rate Limit:** Per account  
**Use:** Check active retention / special offers (R-Offers) on a prepaid mobile number.  
⚠️ Supported networks: **Airtel and VI (Vodafone Idea) only.**

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `opid` | int | ✅ Required | Operator ID — must be Airtel or VI |
| `mobile` | string | ✅ Required | 10-digit prepaid mobile number to check offers for |

#### Sample Response

```json
{
  "success": true,
  "operator": "VI",
  "mobile_no": "7070300613",
  "message": "Offer Successfully Checked",
  "offers": [
    {
      "price": "199",
      "ofrtext": "Get EXTRA 1GB/day. Total 1GB/D+ 2GB + UL calls + 300SMS. 28 days.",
      "logdesc": "2GB+1GB/D+UL,28D|Comm0%",
      "validity": "28"
    }
  ]
}
```

---

## Payment APIs

---

### 13. Prepaid / DTH Recharge

**Endpoint:** `GET /api/v2/recharge.php`  
**Rate Limit:** Per account  
**Use:** Initiate a prepaid mobile, DTH/D2H, or Datacard recharge.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `number` | string | ✅ Required | Customer mobile number or DTH subscriber ID |
| `amount` | number | ✅ Required | Recharge amount in INR |
| `opid` | int | ✅ Required | Operator ID from Operator & Circle Detect API |
| `order_id` | string | ✅ Required | Your unique order ID — **never reuse** |

#### Sample Response

```json
{
  "status": "SUCCESS",
  "order_id": "12011070",
  "opr_id": "BRH2512201219430132",
  "balance": "253.18",
  "number": "7070300613",
  "provider": "VI",
  "amount": "10",
  "charged_amount": "9.62",
  "message": "SUCCESS"
}
```

**Status values:** `SUCCESS` · `FAILURE` · `PENDING`

> If PENDING — call [Transaction Status](#7-transaction-status) with your `order_id` to poll.

---

### 14. Utility Payments (BBPS)

**Endpoint:** `GET /api/v2/bills/payments.php`  
**Rate Limit:** Per account  
**Use:** Process any BBPS utility bill payment — Electricity, Water, Gas, Broadband, Landline, Insurance, Loan EMI, Education Fees, and 22000+ more billers.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `number` | string | ✅ Required | Consumer / account number |
| `amount` | number | ✅ Required | Bill amount in INR |
| `opid` | int | ✅ Required | Operator ID from Biller List API |
| `order_id` | string | ✅ Required | Your unique order ID — **never reuse** |
| `opt1`–`opt10` | string | Optional | Operator-specific additional fields (see `required_params` in Biller Details) |
| `refrence_id` | string | ✅ Required | `ref_id` from Bill Fetch response. Pass `0` if bill fetch is not supported by the biller |
| `mobile` | string | ✅ Required | Customer mobile number for SMS confirmation |

#### opt1–opt10 Common Mapping

| Field | Common Usage |
|-------|-------------|
| `opt1` | Consumer number / Account number |
| `opt2` | Consumer name / Account holder name |
| `opt3` | Mobile number / Registered phone |
| `opt4` | Email address |
| `opt5` | District / Sub-division / Zone |
| `opt6` | Bill date / Due date |
| `opt7` | Bill number / Reference number |
| `opt8` | Biller-specific field (see `required_params` in Biller Details) |
| `opt9` | Service type / Category |
| `opt10` | Additional biller-specific field |

> The exact mapping varies per biller. Always use `required_params` from Biller Details as the source of truth.

#### Sample Response

```json
{
  "status": "SUCCESS",
  "order_id": "2439418",
  "opr_id": "BR0106989",
  "balance": "271.67",
  "number": "124385985",
  "approval_no": "0",
  "provider": "North Bihar power distribution company ltd - NBPDCL",
  "amount": "1885.00",
  "charged_amount": "1850",
  "message": "SUCCESS"
}
```

**Status values:** `SUCCESS` · `FAILURE` · `PENDING`

> If PENDING — call [Transaction Status](#7-transaction-status) with your `order_id` to poll.

---

### 15. Payout (Money Transfer)

**Endpoint:** `POST /api/v2/payments/index.php`  
**Rate Limit:** Per account  
**Use:** Initiate a bank account payout via IMPS/NEFT.  
⚠️ **IP whitelisting required** — run [IP Detect](#17-ip-detect) on your production server first and whitelist the IP in your KwikAPI dashboard.  
⚠️ Always validate the beneficiary with [Bank/UPI Account Verification v2](#16-bankupi-account-verification-v2) before payout.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `account_no` | string | ✅ Required | Beneficiary bank account number |
| `amount` | number | ✅ Required | Transfer amount in INR |
| `order_id` | string | ✅ Required | Your unique order ID — **never reuse** |
| `ifsc_code` | string | ✅ Required | Beneficiary bank IFSC code |
| `bene_name` | string | ✅ Required | Beneficiary full name |

#### Sample Response

```json
{
  "status": "SUCCESS",
  "order_id": "2575303",
  "opr_id": "0221452225",
  "balance": "85.35",
  "account_no": "7485452145225",
  "ifsc": "PUNB0227854",
  "bene_name": "RIMMI VERMA",
  "provider": "PAYMENTS",
  "amount": "9000",
  "charged_amount": "9001.01",
  "message": "TRANSACTION SUBMITED SUCCESSFULLY."
}
```

---

## Verification APIs

---

### 16. Bank/UPI Account Verification v2

**Endpoint:** `POST /api/v2/dmt/account_validate_route2`  
**Rate Limit:** Per account  
**Use:** Real-time verification of a bank account (penny-drop) or UPI/VPA address. Returns the registered account holder name and account status. Always call this before Payout.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | ✅ Required | Your KwikAPI API key |
| `number` | string | ✅ Required | Bank account number or UPI/VPA address |
| `account` | string | ✅ Required | Bank account number or UPI/VPA address — auto-detected |
| `ifsc` | string | Optional | IFSC code for bank account routing. Not required for UPI/VPA |
| `order_id` | string | ✅ Required | Your unique order ID for this verification |

#### Sample Response

```json
{
  "success": true,
  "status": "SUCCESS",
  "message": "Transfer Success",
  "order_id": "453408",
  "utr": "90391***8811",
  "ben_name": "Anshikha Sonam",
  "charged_amount": "****",
  "date_time": "2019-02-08 12:30:29",
  "verify_status": "VERIFIED"
}
```

---

## Utility APIs

---

### 17. IP Detect

**Endpoint:** `GET /api/v2/ip_detect.php`  
**Rate Limit:** Unlimited  
**Authentication:** Not required  
**Use:** Detect the public IP address of the calling server. Run this on your **production server** to get the IP to whitelist for the Payout API.

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| *(none)* | — | — | No parameters required |

#### Sample Response

```json
{
  "success": true,
  "message": "Your IP address detected",
  "your_ip": "203.0.113.42",
  "ipv4": "203.0.113.42",
  "ipv6": null
}
```

---

## Response Format

All APIs return JSON. A successful response always has `"success": true`.

```json
{
  "success": true,
  "status": "SUCCESS",
  "message": "..."
}
```

On failure:

```json
{
  "success": false,
  "status": "FAILED",
  "message": "Descriptive error message"
}
```

### Common Error Messages

| Message | Cause |
|---------|-------|
| `Invalid API Key` | Wrong or inactive API key |
| `Rate limit exceeded` | Too many requests in the allowed window |
| `Insufficient balance` | Wallet balance too low |
| `Order ID already exists` | Duplicate `order_id` — must be unique per transaction |
| `IP not whitelisted` | Server IP not added to whitelist (Payout API) |
| `API MISMATCH` | Wrong endpoint or parameter combination |

---

## Rate Limits Summary

| # | API | Default Limit |
|---|-----|--------------|
| 1 | Service Category List | 10 / day |
| 2 | Biller List | 20 / day |
| 3 | Biller Details | 20 / day |
| 4 | Circle Codes | 2 / day |
| 5 | Wallet Balance | 48 / day |
| 6 | Transaction Status | 100 / day |
| 7 | Last 100 Transactions | 48 / day |
| 8–17 | All other APIs | Per account (contact support) |

> Wallet Balance and Transaction Status limits can be increased based on account performance and use case — subject to approval.

---

## Code Samples

All APIs have ready-to-use samples in `code-samples/` across 6 languages:

| Language | Directory |
|----------|-----------|
| PHP 8+ | `code-samples/php/` |
| JavaScript Fetch | `code-samples/javascript-fetch/` |
| cURL | `code-samples/curl/` |
| jQuery 3.x | `code-samples/jquery/` |
| Axios (Node.js) | `code-samples/axios/` |
| Python 3 | `code-samples/python/` |

---

## Support

| Channel | Details |
|---------|---------|
| WhatsApp | [+91-7070300613](https://wa.me/917070300613?text=Hi%2C+I+need+help+in+API+docs.+I+am+exploring+the+*GitHub+India+SDK*+%F0%9F%91%89+https%3A%2F%2Fgithub.com%2Fyoflic%2FKwikAPI-India) |
| Email | support@kwikapi.com |
| Toll Free | 18008890016 |

---

*KwikAPI v3.0.1 — by Yoflic India Pvt Ltd*
