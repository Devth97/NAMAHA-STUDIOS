# NAMAHA-STUDIOS

Current local review: `preview/minimal-ixora` uses lighter outlines with a little interior detail, one kite and the ixora-to-logo scroll trial. See `MINIMAL_PREVIEW.md`. Main remains on the previous published version while this trial is reviewed.

Namaha Studios — studio website (design preview).

Six-page static site plus a 404 page. Warm ivory, ink and muted gold editorial design with Instrument Serif and Manrope typography, detailed pen-and-ink illustrations, cinematic photography, a showreel band, three cursor-following paper kites, work filters, a bento gallery with lightbox, a validated enquiry form and labelled demo WhatsApp links.

See `FORM_SETUP.md` to activate enquiry email delivery and replace the demo WhatsApp number. `ILLUSTRATION_PROMPTS.md` records the new artwork direction and source filenames.

## Run

Node.js 22+ (Netlify builds on Node 24). No package installation is required.

```powershell
npm run dev        # http://127.0.0.1:4173 — pages are prerendered per request, edits show on refresh
npm test           # unit tests (form validation, rendering, kites)
npm run verify     # production build into dist/ + checks on the real output
npm run assets     # image pipeline (Python 3 + Pillow + NumPy) — see ASSET_PROMPTS.md
npm run assets:status
```

## Architecture

- `public/render.js` turns the page templates (`pages.js`, `components.js`) into complete HTML. The **build prerenders every route** into `dist/`, so content, titles, descriptions, Open Graph/Twitter tags and JSON-LD are present before JavaScript runs. In the browser, `app.js` only hydrates interactions. If a page somehow arrives empty, it renders client-side as a fallback.
- `public/config.js` holds the switches for launch: `web3formsAccessKey`, `siteUrl`, `allowIndexing`, `showreelUrl` and `instagram`.
- `public/design-system.css` is the latest design layer (`@layer refine`): type scale, AA-contrast colour tokens, header, mobile menu, showreel, word ribbon, service index, bento gallery, form states, footer, 404, view transitions and print. The earlier stylesheets remain underneath it.
- Routes: `/`, `/about.html`, `/services.html`, `/work.html`, `/gallery.html`, `/contact.html`, and `/404.html` (served by Netlify for unknown URLs).

## Design and UX highlights

- Editorial typography: Instrument Serif display and Manrope text (both SIL OFL) from Google Fonts with `display=swap`, preconnect and metric-matched local fallbacks to limit layout shift.
- Accessibility (WCAG 2.2 AA intent): AA text contrast (gold text darkened to `#86622f`), 3:1 field borders, a minimum label size of 11px, 44px touch targets on mobile, visible focus rings kept clear of the sticky header, a full-screen mobile menu with focus containment, `inert` background and Escape to close, labelled dialogs, live status messages and reduced-motion support for every animation.
- Motion: line-by-line headline reveal, staggered hero entrance, scroll reveals only below the fold (no first-view flicker), cross-page view transitions, smooth filter re-flow, condensing header, and the existing kites and film strip.
- Enquiry form: "reward early, flag late" inline validation, optional budget and timing, a character counter, loading state, a success panel with next steps, and preserved input on failure. Choosing "Let's talk" on a service preselects the project type.
- Performance: hero image preloaded with `fetchpriority="high"`, WebP with JPEG fallback at 480/960/1536px, intrinsic sizes on every image, lazy loading below the fold, a logo PNG of about 33 KB instead of the former 220 KB screenshot, and no third-party scripts.
- Security headers in `netlify.toml`: a CSP that allows only Google Fonts, Web3Forms and YouTube/Vimeo embeds, plus `nosniff`, a referrer policy, a permissions policy and frame denial.

## Artwork

`ASSET_PROMPTS.md` contains 18 ready-to-paste ChatGPT prompts. Every slot already holds a placeholder copy, so the site is complete now. Save generated PNGs to `public/assets/source/` using the given names, then run `npm run assets`. Slots are listed in `scripts/asset-slots.json`. The pipeline also maps line drawings' paper tone to white, so the `multiply` blend sits seamlessly on the page with no visible rectangles.

The brand lockup combines the hand-lettered "Namaha" mark, extracted from the supplied logo, with crisp live type for STUDIOS and the descriptor. Replace it with the studio's original vector logo when it is supplied. `og-image.jpg` (1200×630) and the app icons were rendered from site assets.

## Demo and email behaviour

Projects and gallery images are AI-created and labelled as illustrative concepts, not client production credits. With an empty `web3formsAccessKey`, the form shows a preview confirmation and sends nothing. Before launch, set an owner-verified Web3Forms key (never a mailbox password), send a real test, and check the inbox, the spam folder and reply-to. The privacy dialog switches to live wording automatically once a key is set.

## Before production

- Supply the original logo, real portfolio media, credits and the showreel link (`showreelUrl`).
- Confirm the owner email, phone, location, domain and repository/hosting ownership.
- Set `siteUrl` and `allowIndexing: true` to drop `noindex`, add canonical URLs, absolute social images, `robots.txt` with sitemap, and `sitemap.xml`.
- Optionally self-host the two fonts (download from Google Fonts into `public/fonts/`, then swap the stylesheet link) to remove the Google Fonts request.
- Remove the demo labels only once approved content is in place.

## GitHub and Netlify

Repository: https://github.com/Devth97/NAMAHA-STUDIOS.git. Connect it in Netlify with the repository root as the base directory. `netlify.toml` sets Node 24, `npm run build` and the publish directory `dist`. Do not publish `public/`: the build creates the prerendered pages. Pushing to GitHub and deploying on Netlify are separate steps.
