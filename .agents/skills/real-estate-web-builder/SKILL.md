---
name: real-estate-web-builder
description: >-
  Use this skill whenever creating, modifying, or redesigning a luxury high-conversion real estate landing page or website.
  Enforces mandatory real estate rules: strict Indian mobile validation, price and floor plan lead gating,
  native mobile app view, interactive datepicker, animated counter effect, MahaRERA compliance pages,
  and instant WhatsApp/email lead routing.
---

# Luxury Real Estate Web Builder — Master Blueprint & Production Standard

This skill encapsulates the complete production architecture, design standards, conversion techniques, and statutory compliance required for high-converting real estate websites (builders, luxury townships, commercial landmarks).

---

## 🏗️ 1. Core Real Estate Invariants (Always Enforce)

### A. Mandatory Price & Blueprint Gating Rule
* **Never reveal starting prices or high-resolution architectural floor plans upfront.**
* Default pricing must display as masked: `₹ 4X.XX Lakhs*` or `₹ 1.XX Cr*` with an amber/gold lock icon.
* Floor plan images must have a blur/locked overlay (`.gated-plan-img.is-locked`) with an unlock CTA button.
* When a visitor submits any lead form with a verified phone number:
  1. Set `localStorage.setItem('<project>_unlocked', 'true')`.
  2. Dynamically reveal actual prices (`₹ 42.40 Lakhs*`) with fade-in animation.
  3. Remove blur/lock overlays from floor plan galleries and blueprints.
  4. Change lock badges to `Price Unlocked` (emerald green).

### B. Strict 10-Digit Indian Phone Validation Rule
* Real estate traffic in India suffers from high junk lead ratios; enforce client-side sanitization:
  - Valid number: Exactly 10 digits starting with **6, 7, 8, or 9** (`^[6-9]\d{9}$`).
  - Auto-strip country codes (`+91`, `91`, leading `0`), dashes, spaces, and non-numeric characters on paste or type.
  - Reject numbers starting with $0\text{--}5$, numbers under 10 digits, or alphabetical sequences.
  - Inline error feedback container (`.phone-error-msg`) under every phone input.

---

## 📱 2. Authentic Native Mobile App View Suite

On mobile screens ($\le 640\text{px}$ / DevTools 360–430px), avoid desktop-like stacked layouts. Transform into a native mobile app view:

1. **Compact 56px Sticky Header:**
   - App bar containing brand logo, live status pulse badge (`● AI Living`), and 1-tap call/WhatsApp triggers.
2. **Horizontal Quick Category Pills Bar (`.mobile-app-pills-bar`):**
   - Horizontally scrollable strip directly beneath the header linking to key zones: *Overview, AI Living, Prices, Amenities, Floor Plans, Video Tour, Location, RERA Approvals*.
3. **Hero View Fold Optimization:**
   - Hide duplicate hero logo on mobile (`hidden sm:flex`) since the sticky app bar already displays branding, saving $\approx 100\text{px}$ of vertical fold space.
   - Convert multi-item connectivity boxes into a touch-friendly **horizontal snap carousel** (`.mobile-snap-carousel` with `scroll-snap-type: x mandatory`).
4. **Floating Bottom App Dock (`.mobile-app-dock`):**
   - Fixed iOS/Android glassmorphism island at screen bottom:
     - 📞 **Call** (`tel:+91...`)
     - 💬 **WhatsApp** (`https://wa.me/...`)
     - 🔓 **Prices** (opens brochure & pricing unlock modal)
     - 📅 **Book Visit** (primary brand-colored CTA)
5. **Slide-Up Bottom Sheets for Modals:**
   - Modals on mobile must slide up from the bottom with `border-top-left-radius: 1.75rem`, `border-top-right-radius: 1.75rem`, touch momentum scrolling, and a visible drag handle pill (`.app-sheet-handle`).

---

## 🔢 3. Luxury Animated Stat Counter Effect

Implement an animated count-up effect for developer credentials, delivered square footage, and project numbers:

```html
<div class="stat-counter" data-counter="28" data-suffix="+">28+</div>
<div class="stat-counter" data-counter="2.5" data-decimals="1" data-suffix="+ M">2.5+ M</div>
<div class="stat-counter" data-counter="7200" data-suffix="+">7,200+</div>
```

* **Timing Curve:** Use `easeOutExpo` ($\text{progress} = 1 - 2^{-10 \cdot t}$) over $1.8\text{s}$ for an energetic start that smoothly decelerates into place.
* **Tabular Numbers:** Apply `font-variant-numeric: tabular-nums` in CSS to prevent digit jitter during animation.
* **Trigger:** Use `IntersectionObserver` with a threshold of $0.2$ and a `has-animated` flag so animation fires once per session.

---

## 📅 4. Interactive Site Visit Date Picker

* Provide a calendar datepicker customized to the brand palette.
* Include quick date chips for immediate conversion:
  - `Today`
  - `Tomorrow`
  - `Saturday` (next upcoming Saturday)
  - `Sunday` (next upcoming Sunday)
* Accompany with trust badges: *"Site Open Daily with Free Cab Facility"*.

---

## ⚖️ 5. Legal & Statutory Compliance Suite (MahaRERA)

Every real estate portal must include dedicated legal pages linked in the footer:

1. **`rera-approvals.html`:**
   - Official MahaRERA registration number prominent in monospace styling.
   - Sanction dates, KDMC / municipal approvals checklist, environmental clearances.
   - Direct link to official MahaRERA portal (`maharera.mahaonline.gov.in`).
   - MahaRERA QR code visual.
2. **`privacy-policy.html`:**
   - Personal data collection disclosure (name, phone, email, site visit preferences).
   - Grievance Officer contact details, direct phone, WhatsApp, and official email.
3. **`terms-conditions.html`:**
   - Disclaimers on artistic impressions, carpet area RERA calculations, pricing statutory exclusions (stamp duty, GST, registration).

---

## 📨 6. Multi-Channel Instant Lead Routing

When a lead submits any form:
1. Compile a structured dossier:
   ```text
   *New Lead Enquiry - [Project Name]*
   👤 Name: [Customer Name]
   📞 Mobile: +91 [Customer 10-Digit Mobile]
   ✉️ Email: [Customer Email if entered]
   🏠 Configuration: [1 BHK / 2 BHK / Commercial]
   📅 Preferred Visit Date: [Selected Date]
   🚗 Free Cab Facility: [Yes/No]
   📍 Source: [Form Name / Modal]
   ⏰ Time: [Timestamp IST]
   ```
2. Direct the lead to the project sales hotline on **WhatsApp (`https://wa.me/...`)**.
3. Display a 1-tap WhatsApp continuation button on the **Success Confirmation Modal**.
4. Save the lead in `localStorage` under `<project>_leads` with `destinationEmail` and `destinationPhone`.

---

## 🎨 7. Theme & Brand Adaptability Checklist

When starting a new real estate project, adapt these tokens while preserving the exact technical architecture:
1. **Palette:** Extract 3 colors from the brand logo:
   - Primary Dark / Luxury Base (e.g. Deep Wine `#38040E`, Midnight Navy, or Emerald Charcoal).
   - Accent Metal (e.g. Royal Gold `#D4AF37`, Rose Gold, or Platinum Bronze).
   - High-Conversion CTA (e.g. Tuscan Terracotta `#C85A32`, Amber, or Crimson Red).
2. **Typography:**
   - Headings: Serif luxury font (*Cinzel*, *Playfair Display*, or *Cormorant Garamond*).
   - Body & Controls: Clean geometric sans (*Outfit*, *Plus Jakarta Sans*, or *Inter*).
   - Badges & Codes: Monospace (*JetBrains Mono* or *Fira Code*).
3. **Favicon Suite:**
   - Generate multi-format `favicon.svg`, `favicon.ico`, `favicon-32x32.png`, and `apple-touch-icon.png` (180x180) featuring the brand monogram / crown.
