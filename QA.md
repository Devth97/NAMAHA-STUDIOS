# Demo verification

## 1 November 2026 — design system, prerendering and UX upgrade
Scope: prerendered HTML for all routes plus 404; per-page SEO/OG/Twitter/JSON-LD; Instrument Serif + Manrope type system; AA contrast tokens; condensing header; full-screen mobile menu; showreel band; word ribbon; unique artwork slots with placeholders; sticky service index; illustrated process; filter counts; bento gallery; inline-validated form with budget/timing, counter and success panel; new footer; 404 page; view transitions; WebP pipeline; line-art paper neutralisation; brand lockup; OG image and icons; Netlify security and cache headers.

Checks run in Chromium (Playwright) in the cloud workspace:
- `npm test`: 16 pass (enquiry, rendering/meta/indexing, inline validation, kites).
- `npm run verify`: 7 prerendered pages, one h1 each, unique IDs, meta and social tags, 266 local references and all responsive variants resolve; no stale WebP variants.
- Full-page screenshots of all pages at 1440×900 and 390×844 were reviewed. No horizontal overflow on any route at 390px after fixes.
- Interaction script: mobile menu opens with focus on the first link, Escape closes it and restores `inert`; the service query string preselects the project type; inline email error appears on blur; submitting with errors announces the count and focuses the first invalid field; a valid demo submission shows the success panel; gallery filter (People → 2), lightbox arrow-key navigation and the project dialog work.
- The `dist/` output was served with the exact `netlify.toml` Content-Security-Policy: no CSP violations, console errors or double rendering.
- Fixed during review: multiply-blend boxes (hero isolation, animated success panel), backdrop-filter trapping the fixed mobile menu, oversized button labels, bento gaps, and dev-server module caching.

Not yet verified: final rendering with Instrument Serif/Manrope (the cloud browser cannot reach Google Fonts, so fallbacks were rendered), Safari/Firefox, physical devices, Lighthouse/axe audits, live email delivery and Netlify deployment.

## 28 October 2026

## Mobile hero and touch-pigment correction

User reported the hero image did not fit mobile screens and the paint effect was absent. Added a final mobile stylesheet resetting inherited hero dimensions/offsets and image percentage height: illustrations now use width 100%, automatic height and their natural 3:2 proportions within the padded content column. Removed the intentional fine-pointer restriction from pigment availability. Added passive single-finger touch handlers that continue during native scrolling, avoid duplicate pointer/touch emissions, ignore multi-touch gestures, retain 1.6-second idle clearing and reduced-motion preference, and use a reduced mobile render/particle budget. The mobile pause control is now visible.

Nine tests pass, including new regression coverage for touch movement, unblocked native scrolling, no duplicate touch-pointer emissions and multi-touch handling. Production build and asset checks pass. Fresh physical-phone and browser visual checks remain unverified due to the previously reported browser-access restriction; this correction does not claim those checks were completed.

## Pre-deployment verification and mobile improvements

- `npm test`: six enquiry tests pass.
- `npm run verify`: production build succeeds; six route outputs exist; heading/ID checks pass; 159 local references and all 66 full-size/responsive image files resolve.
- HTTP checks against the local server return 200 for all six routes, film-strip stylesheet and a phone-sized hero asset.
- Added responsive delivery images at 480px and 960px; all 22 original assets remain at 1536px. Complete 480px set measures 0.87 MB versus 10.45 MB full-size (92% smaller); this is an asset-size comparison, not a measured page-speed score.
- Increased mobile form text to 16px and common tap targets to 44px; adjusted narrow header spacing accordingly. Corrected the menu's accessible label on Escape/outside-close.
- Moving cards now pause when off-screen and when the tab is hidden, in addition to hover/focus/manual pause and reduced-motion handling.
- Final visual/device verification is pending: the browser tool still reports local browser use disabled after the user's enable attempt and a session refresh. Earlier responsive tests below do not verify the latest changes.
- The site remains a demo: the form intentionally sends no email without a verified provider key; sample imagery is identified; noindex remains appropriate for the demo. Real enquiry delivery is not claimed.

## Moving film-card section and GitHub preparation

Added a looping cinematic card row on Home and Work with hover/focus pause, explicit pause/resume control, and a static manually scrollable reduced-motion fallback. Animation uses a duplicated noninteractive card group, hidden from accessibility output, with equal group widths for seamless looping. No dependencies added. Native page controls and the site-wide pigment effect remain independent. Added Netlify configuration for Node 24, `npm run build` and `dist` publication. Existing six tests, module syntax checks and static build pass. Browser visual verification remains unavailable because local browser use is disabled in Work settings.

## Image refresh

The previous browser checks below describe the original demo. The subsequent image refresh replaces screenshot crops with standalone AI-generated assets while preserving the original logo and existing card/layout dimensions. New image provenance and prompts are in `image-manifest.json`. Native images include intrinsic dimensions and descriptive/empty alternative text as appropriate; hero assets are eager-loaded, supporting assets lazy-loaded. Image exports retain source resolution at JPEG quality 92.

New visual asset review was performed using a contact sheet. Fresh browser layout verification could not run because local browser use is disabled in Work settings. Do not interpret the earlier browser screenshots as verification of the new assets. Existing form tests and JavaScript syntax checks pass after the refresh. AI imagery continues to be identified as illustrative content, rather than real Namaha production evidence.

Final refresh checks: all 22 images are 1536 × 1024; all 22 asset references resolve in the static build output; all six page renderers produce the new native image markup; build and diff whitespace checks pass. The original logo still uses the supplied reference and has not been regenerated. All generated artwork and photos were reviewed together for subject, style and consistency.

## Passed

- Static production build creates six page entry points and all required assets without package installation.
- Six enquiry tests cover empty/whitespace input, invalid email/service, valid input, demo no-send behaviour, provider rejection and provider-confirmed success.
- JavaScript syntax checks passed for application, pages, interactions and pigment modules.
- All six routes rendered with one main heading at 320, 768, 1024 and 1440 viewport widths in Chrome. An initial narrow-screen overflow was fixed; all six routes were rechecked at 320 with no horizontal page overflow.
- Desktop homepage and mobile homepage/Services layouts visually inspected. Original logo preserved from the supplied artwork; logo background treatment refined.
- Work Films filter shows two concepts; a project preview opens and closes with Escape.
- Gallery People filter shows two images; next-image navigation advances to the other visible image.
- Mobile menu opens and its Services link navigates correctly.
- Enquiry service query preselects Film Production; missing required fields show errors. A valid demo enquiry reports explicitly that no email was sent and retains entered details.
- Site-wide pointer canvas is a direct child of body with fixed viewport positioning after scrolling. Pointer trails visually checked over the services section; subsequent screenshot confirmed the trail cleared after inactivity. Idle expiry uses elapsed time and a 1.6-second inactivity clear, so slow frames cannot prolong it.

## Limits and production prerequisites

- Real email delivery has not been configured or tested; the owner must verify the chosen receiving email/provider form identifier.
- External hosting, repository remote and domain have not been configured. This is a local demo; no deployment is claimed.
- Browser checks used desktop Chrome with responsive viewport resizing, not physical mobile hardware or Safari/Firefox. Reduced-motion/coarse-pointer fallbacks are implemented; physical-device behaviour remains to be checked before launch.
- The browser reported an error from an installed Chrome extension's ad-blocker script. No application-source console error was observed during the page/interaction checks.
- No full Lighthouse or automated accessibility audit has been run. Keyboard dialog dismissal, labels and heading structure were checked within the documented scope.
- Imagery is cropped for presentation from the supplied reference JPEGs. Use higher-resolution original logo/artwork and approved production stills for the final client launch.

Local QA screenshots are in ignored `qa/`; generated build output is in ignored `dist/`.

## 29 October 2026 - kite cursor animation
Replaced the pigment overlay with three original SVG paper kites and animated ribbon tails. Retained passive single-touch support, pause/resume and reduced-motion handling. Flight updates cap long frame gaps and stop after two idle seconds or on blur/visibility loss. Eleven unit tests and the six-route build/asset verification pass. Automated Chrome checks cover visible canvas output across all six pages, pause/resume, idle clearing, reduced motion, touch input and no horizontal overflow at 320, 768, 1024 and 1440 pixels. Desktop/mobile screenshots reviewed. Physical-device testing remains outstanding. Existing line-art work in data.js and its image files was preserved.
## Featured Work covers — 1 November 2026

- Generated B1–B4 with the built-in image generator using the verbatim prompts in `ASSET_PROMPTS.md`; saved `public/assets/source/project-01.png` through `project-04.png` and ingested all four through the existing image pipeline. All four slots report ready; 14 other slots still use placeholders.
- Restored the missing `siteConfig.location` setting to `Mangalore, Karnataka` for the preview. The footer and Contact page previously rendered undefined. Location is provisional and needs client confirmation.
- Added `claude/client-brief.md` from the user-supplied brief summary; the original client brief was not in the local folder. The record identifies its source and pending client inputs.
- Adjusted Featured Work image focal positions so the first subject's face and the event performer's headdress remain visible on desktop.
- All 16 existing tests pass. Production build and static verification pass: seven prerendered pages and 267 local references.
- Chromium inspected the built site at 320, 390, 768, 1024 and 1440px: four category cards, loaded covers, no horizontal overflow and no undefined content. All four project dialogs opened and closed; Contact location and Home structured address passed checks. Desktop and phone screenshots were visually reviewed and saved as `qa/featured-1440.png` and `qa/featured-390.png`.
- Browser verification served the built files through request interception because localhost access was restricted. External Google Fonts were omitted, so screenshots use fallback typography; remote font delivery and a hosted deployment were not verified. Local assets and scripts produced no browser errors in this mode.

## Detailed illustrations and contact options — 2 November 2026

- Replaced all 15 line drawings with newly generated detailed pen-and-ink illustrations, including the six page heroes, two story illustrations, Creative Development service image, four process illustrations, 404 and enquiry success image. Prompt set: `ILLUSTRATION_PROMPTS.md`. All have responsive JPEG and WebP delivery files. Earlier B1–B4 Featured Work covers are included in this delivery.
- Contact form now has a clear heading, an optional company field, full-width phone fields, inline validation, loading/error/confirmation states and an honest no-send preview. Web3Forms remains unconfigured; `FORM_SETUP.md` explains the required receiving inbox and public form access key.
- WhatsApp uses a fictional demo number, clearly labelled. Floating links appear on other pages; Contact has an inline button so it cannot obscure the form. Opening a link does not automatically send a message.
- Fixed narrow Services-index overflow and preserved illustration detail on repeat image builds. A second full asset build produced identical SHA-256 hashes for every illustration master.
- All 18 unit tests and production verification pass: seven prerendered pages, 267 local references and all 40 referenced artworks with responsive delivery variants.
- Chromium verified seven pages at 320, 390, 768 and 1440px without page overflow. Checked WhatsApp URL, demo label and new-tab behaviour. Form browser tests cover required fields, demo no-send with retained values, mocked provider rejection/retry, and mocked success with cleared fields. No real messages or emails were sent.
- Visually reviewed all 15 illustrations together and Home/Contact desktop/phone layouts. Local review files are in ignored `qa/`. Browser tests used intercepted local build files and omitted Google Fonts because network access was restricted; remote font loading, physical devices and live email delivery remain unverified.
