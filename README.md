# G-TEC Mahe

## Permanent brand character: Gio

Gio is the site's 3D-rendered learning companion. The canonical transparent PNGs are in `public/mascot/`; the shared component and interactive interest finder are in `src/Mascot.jsx`. Use the existing three poses consistently rather than creating a different mascot for each page. See [the character guide](docs/brand/GIO.md) for appearance, personality, proportions, palette, placement and motion rules, and [the generation prompts](docs/brand/PROMPTS.md) for future identity-preserving variants. Original assets were generated with the built-in imagegen tool.

Gio appears in the interest finder, greeting, empty states and course guidance, with gentle scroll-responsive movement.

Responsive React website with 11 routes: home, about, course discovery, seven individual course pages, and placements.

## Run locally

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

The build prerenders every public route with page content, titles, descriptions, canonical URLs, social metadata, organisation and breadcrumb schema. It generates a sitemap and robots.txt. Browser prerendering uses installed Edge/Chrome, falling back to Playwright Chromium (`npx playwright install chromium`). Playwright is a build dependency for prerendering only; this project has no spec files or automated test suite. Deploy `dist` to a static host. `_redirects` supports SPA fallback on Netlify; configure equivalent fallback on other hosts.

## Connect enquiries

Copy `.env.example` to `.env.local`. Set `VITE_WHATSAPP_NUMBER` to the institution’s verified country-code-prefixed number (digits only). Set `VITE_ENQUIRY_ENDPOINT` to an HTTPS service accepting POST JSON for direct submission. The server must validate, rate-limit, protect against spam, enforce consent and deliver/store submissions; no private API keys belong in Vite variables. Rebuild after configuring.

Without an endpoint, the form validates and prepares a message; it explicitly says that no enquiry has been sent. With a WhatsApp number, it opens a prefilled message for the visitor to send. Without either configuration, visitors can copy the message and access the verified institutional LinkedIn page. The chat is a local automated information guide, not a live human or an AI service. No external chat service or personal-data collection is configured.

## Content provenance and launch checklist

- User supplied site structure and `G-TEC MAHE - WEBSITE DOC.pdf` are the structure source.
- https://gtecmahe.com/ — institutional name and “Innovating Your Tech Future”.
- https://www.linkedin.com/company/gtec-mahe/ — institution’s course fields, practical learning, personalised guidance, placement assistance and address.
- https://in.linkedin.com/in/lasitha-irfan — attributed learner perspective (short excerpt).
- https://in.linkedin.com/in/fazil-abdul-rahim200 — student recognition, paraphrased and linked; not a placement claim.
- Course learning themes and career directions are explicitly indicative, not an approved syllabus or a guaranteed outcome.
- The vision and mission text is proposed editorial positioning, not a quotation of an official institutional policy. Obtain institutional sign-off before publication.
- All imagery is illustrative Unsplash photography. No stock photograph is represented as a verified student, faculty member or campus. Replace it with approved campus and faculty assets for launch.
- The G-TEC wordmark here is a text treatment for this design; replace with the institution’s approved logo.
- No unverified phone numbers, emails, faculty identities, hiring partners, durations, fees, rankings, certifications or placement metrics have been invented.
- Faculty section links to the public team page until approved bios and portraits are supplied.
- Before launch: provide approved course brochures, certificates and entry requirements; verified faculty profiles; campus photos; approved student stories and placement outcomes; official logo; verified WhatsApp number and enquiry delivery endpoint.
- The canonical production origin defaults to https://gtecmahe.com. Update `src/data.js` and `scripts/prerender.mjs` if deploying under another domain.
- A raster PNG social image is generated from `public/social-card.svg` during the production build.
- Illustrative Unsplash images are stored locally as WebP assets. Fonts load from Google Fonts. Google Maps only loads after a visitor clicks.
- Privacy/retention copy must reflect the actual enquiry service before enabling data collection. The default draft flow keeps form data in memory only.

## Accessibility and motion

Keyboard-accessible navigation, skip link, semantic headings, labelled native forms, consent validation, Escape-to-close dialogs, focus trapping and restoration, reduced-motion support, responsive navigation and native expandable FAQs are included.

`src/ScrollMotion.jsx` controls staggered section reveals, Gio’s gentle scroll movement, image parallax, a reading-progress indicator and the header’s scrolled appearance. Intersection observers limit work to visible artwork, and passive scroll events are batched through requestAnimationFrame. New course results are discovered automatically. Content remains visible without animation; keyboard focus finishes active reveals. Reduced-motion preferences disable the scroll effects, including when changed while the page is open. Scrolling remains native, with no scroll locking or forced snapping. Adjust appearance in `src/scroll-motion.css`.
