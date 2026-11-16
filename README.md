# Columbine Tree Service & Transplanting

Marketing site for a father and son tree business in Littleton, Colorado.
Six public pages, a lead form that texts the owners, a password protected
/admin lead list, and a one page Fohn's Firewood site at /firewood.

## Where things are
- `content/` every word, question and photo on the site, in plain files.
- `OPEN_QUESTIONS.md` everything still to confirm with Lou and Tim.
- `COSTS.md` expected monthly costs and domain options.
- `tests/` checks that run on every change (form, text alerts, sign in, copy rules).

## Run it
    npm install
    npm run dev
    npm run check

## Settings (Vercel environment variables, never in this repo)
- `ADMIN_PASSWORD` the shared password for /admin
- `DATABASE_URL` Postgres connection (leads)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`
- `LEAD_ALERT_NUMBERS` the mobile numbers that get lead texts, comma separated
- `NEXT_PUBLIC_SITE_URL` the live address, once there is a domain

Without the database and Twilio settings the site runs in test mode:
leads go to temporary storage and no texts are sent.

## Rules
No prices, no em dashes, no invented facts. Anything unconfirmed is written
as `[CONFIRM WITH LOU: ...]` and shows as a red tag on the site.
