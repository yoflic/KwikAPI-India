# Recharge Flow — Integration Guide

> Step-by-step guide for integrating prepaid mobile and DTH recharge using KwikAPI.  
> Covers both the **setup phase** (sync once, store locally) and the **live transaction phase** (per recharge).

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
│       ↓                                                         │
│  Circle Codes  ─────────────────────────── store in DB         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2 — LIVE TRANSACTION  (per recharge request)            │
│                                                                 │
│  Operator & Circle Detect  (real-time, MNP-aware)              │
│       ↓                                                         │
│  Recharge Plan Fetch  ──── optional (skip = manual amount)     │
│       ↓                                                         │
│  Prepaid / DTH Recharge  ◄── PAYMENT                           │
│       ↓                                                         │
│  Transaction Status  ──── optional (real-time success ~99%)    │
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

Fetch all available service categories (Prepaid, DTH, Broadband, Electricity, etc.).  
Use this to build your service selection UI and know which categories are available.

```
Response → categories[] → { service_name, total_operators }
```

> Store the category names. Use them to filter the Biller List in the next step.

---

### Step 2 — Biller List

**API:** `GET /api/v2/operator_codes.php`  
**Refresh:** Weekly (changes are rare)  
**Rate limit:** 20 / day

Fetch all billers/operators with their codes, active status, and supported amount ranges.  
Filter by `service=Prepaid` or `service=DTH` to get only relevant operators.

```
Response → operators[] → { opid, name, service, min_amount, max_amount, status }
```

> Store the full list locally. You will use `opid` in every recharge request.

---

### Step 3 — Biller Details

**API:** `POST /api/v2/operatorFetch.php`  
**Refresh:** Weekly (changes are rare)  
**Rate limit:** 20 / day

Fetch full details for each operator — supported payment channels, NPCI payment modes,  
bill-fetch support flag, and required extra fields (opt1–opt10).

Supports batch lookup — pass multiple opids separated by `#` (e.g. `53#54#55`).

```
Response → operator → { bill_fetch_supported, payment_channels[], required_params[] }
```

> Store per operator. Use `bill_fetch_supported` to decide if you can show a bill preview.

---

### Step 4 — Circle Codes

**API:** `GET /api/v2/circle_codes.php`  
**Refresh:** Monthly (rarely changes)  
**Rate limit:** 2 / day

Fetch all India telecom circle codes (MH, DL, KA, etc.).  
Required when fetching recharge plans and initiating prepaid recharges.

```
Response → circles[] → { circle_name, circle_code }
```

> Cache this locally. It almost never changes.

---

## Phase 2 — Live Transaction (Per Recharge)

Run these steps at the time of each recharge request.

---

### Step 5 — Operator & Circle Detect

**API:** `POST /api/v2/operator_fetch_v2.php`  
**When:** Every time a mobile number is entered  
**Supports:** MNP (ported numbers) + circle-changed numbers

Pass the customer's 10-digit mobile number. Returns the real-time detected operator and circle.

```
Input  → number: "9876543210"
Output → { opid, operator_name, circle_code, circle_name, is_ported }
```

> Always call this — never assume operator from number prefix. MNP users will get the wrong recharge otherwise.

---

### Step 6 — Recharge Plan Fetch *(Optional)*

**API:** `POST /api/v2/recharge_plans.php` (mobile) or `POST /api/v2/DTH_plans.php` (DTH)  
**When:** If you want to show available plans to the customer

Pass the `opid` (from Step 5) and `state_code` (from Step 5) to get all available plans.

```
Input  → { opid, state_code }
Output → plans[] → { amount, validity, description, type }
```

**Two paths from here:**

```
Customer selects a plan  ──→  use plan amount  ──→  Step 7
Customer enters manually ──→  use entered amount ──→  Step 7
```

> Skipping this step is valid. Just let the customer enter an amount directly.

---

### Step 7 — Prepaid / DTH Recharge ⚠️

**API:** `GET /api/v2/recharge.php`  

Submit the recharge with all confirmed details.

```
Input → {
  api_key,
  number      ← customer mobile / DTH subscriber ID
  amount      ← from plan or manual entry
  opid        ← from Operator Detect (Step 5)
  state_code  ← from Operator Detect (Step 5)
  order_id    ← your unique order ID (never reuse)
}
```

> Generate a unique `order_id` for every transaction. Store it — you may need it for status lookup.

---

### Step 8 — Transaction Status *(Optional)*

**API:** `GET /api/v2/status.php`  
**When:** Only if the recharge API response is PENDING or ambiguous

~99% of transactions return a real-time `SUCCESS` or `FAILURE` response directly from the recharge API.  
You only need to call this if the response was PENDING, timed out, or unclear.

```
Input  → { api_key, order_id }
Output → { status: "SUCCESS" | "FAILURE" | "PENDING", operator_ref }
```

**Status handling:**

| Status | Action |
|--------|--------|
| `SUCCESS` | Show confirmation, update your records |
| `FAILURE` | Show failure message, do not retry with same order_id |
| `PENDING` | Wait 30–60 seconds, poll again (max 3–5 times) |

> Only call this endpoint when the recharge API response is PENDING or unclear. If still PENDING after retries — contact KwikAPI support with the `order_id`.

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
         │
         ▼
[4] Circle Codes  ─────────────────────────────── store circles


LIVE TRANSACTION (per customer recharge)
─────────────────────────────────────────────────────────────────
Customer enters mobile number
         │
         ▼
[5] Operator & Circle Detect  ──── get opid + state_code (MNP-safe)
         │
         ├──── [6a] Show Plans?  ──► Recharge Plan Fetch
         │                                   │
         │          Enter amount manually ◄──┘
         │
         ▼
[7] Prepaid / DTH Recharge  ◄── PAYMENT
         │
         ├── SUCCESS / FAILURE  ──► update records + notify customer
         │
         └── PENDING?  ──► [8] Transaction Status (poll, optional)
                                         │
                                         ▼
                              Update records + notify customer
```

---

## Quick Reference

| Step | API File | When | Cache? |
|------|----------|------|--------|
| 1 — Categories | `service-category-list` | Setup | Weekly |
| 2 — Biller List | `biller-list` | Setup | Weekly |
| 3 — Biller Details | `biller-details` | Setup | Weekly |
| 4 — Circle Codes | `circle-codes` | Setup | Monthly |
| 5 — Operator Detect | `operator-circle-detect` | Per recharge | No |
| 6 — Plans *(opt)* | `mobile-recharge-plans` / `dth-recharge-plans` | Per recharge | Short TTL |
| 7 — Recharge | `prepaid-dth-recharge` | Payment | No |
| 8 — Status *(opt)* | `transaction-status` | Only if PENDING | No |

---

## Code Samples

All API samples are available in `code-samples/` in 5 languages:

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
