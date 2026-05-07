# BBPS Bill Payment Flow — Integration Guide

> Step-by-step guide for integrating BBPS (Bharat Bill Payment System) utility bill payments using KwikAPI.  
> Covers Electricity, Water, Gas, Broadband, Landline, DTH, Insurance, Loan EMI, Education, and 1000+ more billers.

---

## Overview

The integration is split into two phases:

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1 — SETUP  (run once, refresh periodically)             │
│                                                                 │
│  Service Category List                                          │
│       ↓                                                         │
│  Biller List  ──────────────────────────── store in DB         │
│       ↓                                                         │
│  Biller Details (per operator)  ────────── store in DB         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2 — LIVE TRANSACTION  (per bill payment request)        │
│                                                                 │
│  Bill Fetch  ──── optional (only if biller supports it)        │
│       ↓                                                         │
│  Utility Payment  ◄── PAYMENT (BBPS)                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 — Setup (Sync & Store Locally)

Run these once during onboarding, then refresh on a schedule.

---

### Step 1 — Service Category List

**API:** `POST /api/v2/Service-Category-List.php`  
**Refresh:** Weekly or on demand  
**Rate limit:** 10 / day

Fetch all available service categories. For bill payments, relevant categories include:
Electricity, Water, Gas, Broadband, Landline, Insurance, Loan Repayment, Education Fees,
Municipal Taxes, Cable TV, Fastag, Credit Card, and more.

```
Response → categories[] → { service_name, total_operators }
```

> Store the category names. Use them to populate your biller-selection UI by service type.

---

### Step 2 — Biller List

**API:** `GET /api/v2/operator_codes.php`  
**Refresh:** Weekly (changes are rare)  
**Rate limit:** 20 / day

Fetch all BBPS billers with their operator codes, active status, and supported amount ranges.  
Filter by `service` parameter to get only the billers relevant to your use case.

```
Response → operators[] → { opid, name, service, min_amount, max_amount, status }
```

> Store the full list locally. You will use `opid` in every bill payment request.

---

### Step 3 — Biller Details

**API:** `POST /api/v2/operatorFetch.php`  
**Refresh:** Weekly (changes are rare)  
**Rate limit:** 20 / day

Fetch full details per biller — this is critical for bill payments as it tells you:
- Whether the biller supports **bill fetch** (outstanding amount lookup)
- Which **additional fields** (opt1–opt10) are required (e.g. consumer number, account ID, district)
- Supported payment channels and NPCI payment modes

Supports batch lookup — pass multiple opids separated by `#` (e.g. `53#54#55`).

```
Response → operator → {
  bill_fetch_supported,
  required_params[]   ← maps to opt1–opt10 fields in payment API
  payment_channels[],
  min_amount,
  max_amount
}
```

> Always check `required_params` — passing wrong or missing opt fields will cause payment failure.

---

## Phase 2 — Live Transaction (Per Bill Payment)

Run these steps at the time of each customer bill payment request.

---

### Step 4 — Bill Fetch *(Optional — only if biller supports it)*

**API:** `GET /api/v2/bills/validation.php`  
**When:** Only if `bill_fetch_supported = true` in Biller Details (Step 3)

Fetches the outstanding bill amount, due date, and consumer details directly from the biller.  
Use this to show the customer their exact due amount before payment — improves trust and reduces errors.

```
Input → {
  api_key,
  number    ← consumer / account / registered number
  opid      ← operator ID from Biller List (Step 2)
  order_id  ← your unique reference ID for this fetch
  opt1–opt10 ← additional fields as required by the biller (Step 3)
  mobile    ← customer mobile for confirmation (required)

}
```

```
Output → {
  due_amount,
  due_date,
  consumer_name,
  bill_period,
  ...biller-specific fields
}
```

**Two paths from here:**

```
Bill fetch supported  ──→  show due amount to customer  ──→  Step 5
Bill fetch not supported ──→  customer enters amount manually  ──→  Step 5
```

> Never skip checking `bill_fetch_supported` in Biller Details before calling this endpoint.  
> Calling it on a non-supported biller will return an error.

---

### Step 5 — Utility Payment (BBPS) ⚠️

**API:** `GET /api/v2/bills/payments.php`  

Submit the bill payment with all confirmed details.

```
Input → {
  api_key,
  number      ← consumer / account number
  amount      ← bill amount (from fetch or manual entry)
  opid        ← operator ID from Biller List (Step 2)
  order_id    ← your unique order ID (never reuse)
  opt1–opt10  ← additional biller-specific fields (from Step 3)
  refrence_id ← ref_id from Bill Fetch response; pass 0 if bill fetch not supported
  mobile      ← customer mobile for confirmation SMS (required)
}
```

> Generate a unique `order_id` for every transaction. Never reuse one.

**Response:**

```
Output → {
  success: true | false,
  status:  "SUCCESS" | "FAILURE" | "PENDING",
  order_id,
  operator_ref   ← biller's transaction reference
}
```

**Status handling:**

| Status | Action |
|--------|--------|
| `SUCCESS` | Show confirmation to customer, update your records |
| `FAILURE` | Show failure message, do not retry with same order_id |
| `PENDING` | Wait 60–120 seconds, check via Transaction Status API |

> If PENDING — use the Transaction Status API (`/api/v2/status.php`) with your `order_id` to poll.  
> ~99% of transactions complete synchronously with a real-time response.

---

## Complete Flow Diagram

```
SETUP (store in DB, refresh weekly/monthly)
─────────────────────────────────────────────────────────────────
[1] Service Category List
         │
         ▼
[2] Biller List  ──────────────────────────────────── store opids
         │
         ▼
[3] Biller Details (batch by opid)  ─────── store per operator
         │   → required_params (opt1–opt10 mapping)
         │   → bill_fetch_supported flag


LIVE TRANSACTION (per customer bill payment)
─────────────────────────────────────────────────────────────────
Customer selects biller + enters consumer number
         │
         ├── bill_fetch_supported = true?
         │         │
         │         ▼
         │   [4] Bill Fetch  ──── show due amount + due date
         │         │
         │         ▼
         │   Customer confirms amount
         │
         ├── bill_fetch_supported = false?
         │         │
         │         ▼
         │   Customer enters amount manually
         │
         ▼
[5] Utility Payment (BBPS)
         │
         ├── SUCCESS / FAILURE  ──► update records + notify customer
         │
         └── PENDING?  ──► Transaction Status API (poll, optional)
                                         │
                                         ▼
                              Update records + notify customer
```

---

## opt1–opt10 Field Mapping

BBPS billers require different sets of additional parameters passed as `opt1` through `opt10`.  
Always refer to the `required_params` from the **Biller Details API** for each operator.

Common mappings (examples — always verify from Biller Details):

| opt field | Common usage |
|-----------|-------------|
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

> The exact mapping varies per biller. Use `required_params[]` from Biller Details as the source of truth.

---

## Quick Reference

| Step | API File | When | Cache? |
|------|----------|------|--------|
| 1 — Categories | `service-category-list` | Setup | Weekly |
| 2 — Biller List | `biller-list` | Setup | Weekly |
| 3 — Biller Details | `biller-details` | Setup | Weekly |
| 4 — Bill Fetch *(opt)* | `bill-fetch` | If supported | No |
| 5 — Payment | `utility-payments` | Payment | No |

---

## Code Samples

All API samples are available in `code-samples/` in 6 languages:

| Language | Directory |
|----------|-----------|
| PHP 8+ | `code-samples/php/` |
| JavaScript Fetch | `code-samples/javascript-fetch/` |
| cURL | `code-samples/curl/` |
| jQuery | `code-samples/jquery/` |
| Axios (Node.js) | `code-samples/axios/` |
| Python | `code-samples/python/` |

---

## Support

| Channel | Details |
|---------|---------|
| WhatsApp | [+91-7070300613](https://wa.me/917070300613?text=Hi%2C+I+need+help+in+API+docs.+I+am+exploring+the+*GitHub+India+SDK*+%F0%9F%91%89+https%3A%2F%2Fgithub.com%2Fyoflic%2FKwikAPI-India) |
| Email | support@kwikapi.com |
| Toll Free | 18008890016 |

---

*KwikAPI v3.0.1 — by Yoflic India Pvt Ltd*
