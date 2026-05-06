# KwikAPI India — SDK Code Samples

> Official multi-language code samples for the **KwikAPI v3.0.1** platform by [Yoflic India Pvt Ltd](https://www.kwikapi.com).  
> Instantly integrate India's bill payments, prepaid/DTH recharges, BBPS utility payments, payouts, and penny-drop verification and more.

📖 **[API Reference — All 17 APIs with parameters, response shapes & examples](./API-REFERENCE.md)**  
🌐 **[API Reference HTML](./API-REFERENCE.html)**

---

## Quick Start

1. [Register and get your API key](https://www.kwikapi.com/auth/register&action=QuickKey)
2. Clone this repo
3. Pick your language folder under `code-samples/`
4. Replace `YOUR_API_KEY` in any file with your actual key
5. All samples point to the **UAT environment** by default — switch `BASE_URL` to `https://www.kwikapi.com` for production

---

## Environments

| Environment | Base URL |
|-------------|----------|
| **UAT / Testing** | `https://uat.kwikapi.com` |
| **Production** | `https://www.kwikapi.com` |


> Always develop and test against UAT first. One-line switch to go live.
> Single key works for both enviroments.
---

## Authentication

All APIs (except IP Detect) require an `api_key`:

| Method | How to pass `api_key` |
|--------|-----------------------|
| POST | form-data body field |
| GET | query string parameter |

---

## Rate Limits

| API | Default Limit |
|-----|--------------|
| Service Category List | 10 / day |
| Biller List | 20 / day |
| Biller Details | 20 / day |
| Circle Codes | 2 / day |
| Wallet Balance | 48 / day |
| Transaction Status | 100 / day |
| Last 100 Transactions | 48 / day |
| All others | Per account (contact support) |

> Limits for Balance and Status can be increased based on account performance. Subject to approval.

---

## API Reference

### Fetching APIs

| File | Endpoint | Method | Description |
|------|----------|--------|-------------|
| `service-category-list` | `/api/v2/Service-Category-List.php` | POST | All active service categories with operator counts |
| `biller-list` | `/api/v2/operator_codes.php` | GET | Paginated biller list with codes, status, and amount ranges |
| `biller-details` | `/api/v2/operatorFetch.php` | POST | Full biller details; supports batch lookup (`53#54#55`) |
| `circle-codes` | `/api/v2/circle_codes.php` | GET | All India telecom circle codes (cache locally) |
| `bill-fetch` | `/api/v2/bills/validation.php` | GET | Fetch outstanding bill/due amount from a BBPS biller |
| `wallet-balance` | `/api/v2/balance.php` | GET | Current KwikAPI wallet balance |
| `transaction-status` | `/api/v2/status.php` | GET | Real-time status of a transaction by `order_id` |
| `last-transactions` | `/api/v2/transactions.php` | GET | Latest 100 transactions for the account |
| `operator-circle-detect` | `/api/v2/operator_fetch_v2.php` | POST | Detect operator & circle for any mobile number (MNP-aware) |
| `mobile-recharge-plans` | `/api/v2/recharge_plans.php` | POST | All prepaid plans for an operator + circle |
| `dth-recharge-plans` | `/api/v2/DTH_plans.php` | POST | All DTH packs for a given operator |
| `r-offer-check` | `/api/v2/R-OFFER_check.php` | POST | Active R-Offers for a mobile number (Airtel & VI only) |

### Payment APIs

| File | Endpoint | Method | Description |
|------|----------|--------|-------------|
| `prepaid-dth-recharge` | `/api/v2/recharge.php` | GET | Prepaid mobile / DTH / Datacard recharge |
| `utility-payments` | `/api/v2/bills/payments.php` | GET | All BBPS utility bill payments |
| `payout` | `/api/v2/payments/index.php` | POST | Bank account payout via IMPS/NEFT ⚠️ IP whitelist required |

### Verification APIs

| File | Endpoint | Method | Description |
|------|----------|--------|-------------|
| `bank-account-verify` | `/api/v2/dmt/account_validate_route2` | POST | Real-time penny-drop bank account verification |

### Utility

| File | Endpoint | Method | Description |
|------|----------|--------|-------------|
| `ip-detect` | `/api/v2/ip_detect.php` | GET | Returns your server's public IP — no auth required |

---

## Repository Structure

```
code-samples/
├── php/                    # PHP 8+ with cURL — SDK-style functions
│   ├── service-category-list.php
│   ├── biller-list.php
│   ├── biller-details.php
│   ├── circle-codes.php
│   ├── bill-fetch.php
│   ├── wallet-balance.php
│   ├── transaction-status.php
│   ├── last-transactions.php
│   ├── operator-circle-detect.php
│   ├── mobile-recharge-plans.php
│   ├── dth-recharge-plans.php
│   ├── r-offer-check.php
│   ├── prepaid-dth-recharge.php
│   ├── utility-payments.php
│   ├── payout.php
│   ├── bank-account-verify.php
│   └── ip-detect.php
│
├── javascript-fetch/       # Browser Fetch API — async/await ES modules
│   └── *.js
│
├── curl/                   # Shell scripts — bash functions with error handling
│   └── *.sh
│
├── jquery/                 # jQuery 3.x AJAX — promise-based
│   └── *.js
│
├── axios/                  # Node.js + Axios — async/await CommonJS modules
│   └── *.js
│
└── python/                 # Python 3.10+ — SDK class with requests library
    └── *.py
```

---

## SDK Design Conventions

Every sample follows these conventions for drop-in SDK use:

- **Single function per file** — named after the endpoint (e.g. `kwik_wallet_balance()`, `walletBalance()`)
- **UAT URL by default** — change `BASE_URL` / `KWIKAPI_BASE_URL` constant to switch to production
- **Structured error handling** — raises/throws on HTTP errors and API-level errors (`success: false`)
- **No silent failures** — all errors surface with clear, actionable messages
- **Typed return values** — functions return the full parsed JSON response directly
- **Exportable** — Axios and Python samples export the function for use as a library module
- **Zero extra dependencies** — PHP uses built-in cURL, JS Fetch is native browser API

---

## Recommended Transaction Flows

### Prepaid / DTH Recharge
```
1. operator-circle-detect   →  get opid + state_code for mobile number
2. mobile-recharge-plans    →  show plans to user
3. wallet-balance           →  verify sufficient balance
4. prepaid-dth-recharge     →  initiate recharge
5. transaction-status       →  ALWAYS verify final status by order_id
```

### BBPS Utility Payment
```
1. biller-details           →  confirm bill-fetch support + required params
2. bill-fetch               →  fetch outstanding due amount
3. wallet-balance           →  verify sufficient balance
4. utility-payments         →  process payment (opt8 = "Bills")
5. transaction-status       →  ALWAYS verify final status
```

### Payout / Money Transfer
```
1. ip-detect                →  find your server's public IP
2. [Whitelist IP]           →  add IP in your KwikAPI dashboard
3. bank-account-verify      →  penny-drop verify beneficiary
4. payout                   →  initiate transfer
5. transaction-status       →  verify final status
```

---

## Error Handling

All API responses return JSON. A successful response always has `"success": true`.

```json
{
  "success": true,
  "status": "SUCCESS",
  "message": "Transaction successful",
  "data": { ... }
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

| Error Message | Cause |
|---------------|-------|
| `Invalid API Key` | Wrong or inactive API key |
| `Rate limit exceeded` | Too many requests in the allowed window |
| `Insufficient balance` | Wallet balance too low for the transaction |
| `Order ID already exists` | Duplicate `order_id` — must be unique per transaction |
| `IP not whitelisted` | Server IP not added to whitelist (Payout API) |

---

## Payment API Critical Notes

> ⚠️ **Prepaid/DTH Recharge & Utility Payments:**
> - **Always call Transaction Status** after every payment, regardless of response
> - `order_id` must be **globally unique** per transaction — never reuse

> ⚠️ **Payout API:**
> - Requires **IP whitelisting** — use `ip-detect` first, then whitelist in dashboard
> - Always verify beneficiary with `bank-account-verify` before every payout

---

## Support & Contact

| Channel | Details |
|---------|---------|
| Website | [kwikapi.com](https://www.kwikapi.com) |
| Register | [Get API Key](https://www.kwikapi.com/auth/register&action=QuickKey) |
| Email | support@kwikapi.com |
| Toll Free | 18008890016 |
| WhatsApp | [+91-7070300613](https://wa.me/917070300613?text=Hi%2C+I+need+help+in+API+docs.+I+am+exploring+the+*GitHub+India+SDK*+%F0%9F%91%89+https%3A%2F%2Fgithub.com%2Fyoflic%2FKwikAPI-India) |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

---

*KwikAPI v3.0.1 — by Yoflic India Pvt Ltd. Last updated: May 2026.*
