# Lakewood Garage Door — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://www.lakewoodgaragedoor.biz/ (Lakewood, CO; currently Squarespace).
Preview: https://lgd.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

This is a custom build for Lakewood Garage Door, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `lakewood-garage-door` (framework: Vite). Connect the repo under Vercel → Settings → Git so pushes to `main` deploy automatically.
Domain `lgd.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional):

| Variable | Purpose |
|---|---|
| `VITE_CONCEPT_END_DATE` | Countdown end date in the concept widget (defaults to 2026-11-23) |
| `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` | Not used on this page; reviews link to Yelp, where the business points customers |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Request-form emails (`api/contact.js`). Without them the form shows a demo message |

The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## What changed from the current site

- Fixes the broken image on the homepage and the typos ("If you garage door opener", "New Garage Doors Openers", "Check the sensors at the bottom of the opening one is shooting…").
- Fixes the Arvada service-area page title that shows the literal `<br /><br />` markup; service areas are now one clean strip (Denver, Arvada, Golden, Littleton, Lakewood, Wheat Ridge).
- Removes nav items that go nowhere. Everything is now one page with five working anchors plus a "Request service" button.
- Hours show am/pm everywhere ("Saturday 8:00 am – 3:00 pm" instead of "Saturday 8–3").
- Replaces the external JotForm with a built-in service request form (name, phone, city, service, preferred day, what the door is doing).
- Custom design drawn from the trade: a sectional garage door in the hero that rolls up on its tracks under a torsion spring to reveal their own carriage-house install, with a wall-button control to open and close it; torsion-spring dividers; raised-door-panel service cards; a pegboard of the parts carried on every truck; blinking-sensor "before you call" checks; SVG drawings of the three DoorLink styles; and before/after gallery sliders where you "raise the door" to reveal the finished job. Big Shoulders Display headings and Archivo body, navy and safety orange.
- Pulls scattered knowledge into short sections: the sensor-light troubleshooting and the "every time we vote for a president" tune-up tip from the opener page, the 90-day warranty with the LiftMaster series table, DoorLink door warranty, the showroom, and Stuart and Vonda's story.
- No reviews or ratings are invented. There are no testimonials on the current site, so the page links to their Yelp profile instead.

## Before client presentation

- **Logo colors:** the logo could not be downloaded or viewed from this build environment, so navy (#13263f) and safety orange (#e8742a) are a stand-in palette. Open the logo and match `--navy` / `--orange` in `src/styles.css` (and `public/favicon.svg`, theme-color in `index.html`) to it.
- **Hotlinked images:** the logo (`translogo.png`) and all photos (hero carriage-house door, storefront, repair/opener/DoorLink/LiftMaster images, 14 gallery photos) are hotlinked from their Squarespace CDN. Get permission and copy them into the repo before launch. Each image has a styled fallback if it fails to load.
- **Before/after pairs** are matched by file name (tear_out → tear_out_replacement, before-ozark2 → Ozark-series2, wood-windows-before → wood-windows). Confirm each pair really is the same job.
- **Founding year:** the homepage, repair pages and meta description say since 1990; the About page says Stuart started in 1991. The concept uses 1990. Confirm.
- **Yelp claim:** the current site says "Yelp's top rated garage door service company in Denver" and "over 300 positive reviews." Neither could be verified, so the concept only links to "Read our reviews on Yelp." Add the claim back only if the owner can back it up, with the exact wording.
- **Saturday hours** are listed on the current site as "8–3"; the concept assumes 8:00 am – 3:00 pm. Sunday isn't mentioned, so it isn't shown. Confirm both.
- **Showroom:** "Please call for showroom hours" is kept as "call ahead to visit." Confirm whether set showroom hours should be listed.
- **"Made in Kansas City":** the homepage says DoorLink is manufactured in Kansas City and the gallery says Missouri. Confirm wording.
- **Parts on the truck / first-visit fixes:** the parts lists come from their repair and opener pages; "most fixes happen on the first visit" is our framing of that. Confirm they're comfortable with it.
- **Good Neighbor Podcast:** the About page mentions an interview. Add a link if they want it.
- **Email:** confirm lakewoodgd@gmail.com is the right inbox for service requests (set `CONTACT_TO_EMAIL`).
- Keep the independent-concept disclaimer visible; do not imply this is the company's official site.
- The countdown is display-only, not access control. The subdomain is public to anyone with the URL.
