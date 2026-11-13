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

## Light outline and ixora review preview — 2 November 2026

On `preview/minimal-ixora`, all 15 illustrations now use minimal outlines with modest interior detail. The supplied orange logo is used directly. One kite replaces the three-kite flight. One isolated ixora flower follows a reversible scroll path to the header logo; pause and reduced-motion preferences govern both decorations. `MINIMAL_PREVIEW.md` records the assets, prompts and review scope.

All 19 unit tests and build verification pass. Chromium checked seven routes at 320/390/768/1440px with no overflow or application errors, plus flower landing, reversal, pause/resume and reduced motion. Desktop and mobile screenshots were visually reviewed. The local preview returned HTTP 200 at `http://127.0.0.1:4175/`. Font/network and physical-device limits remain as documented above. This preview has not been pushed to main.

## Click-only ixora, drawn icons and studio contacts — 2 November 2026

The flower is now hidden at rest and on scroll. Activating a link or button flies it to the space right of the header logo, briefly rotates it and clears it. Same-tab navigation carries the feedback to the destination without delaying navigation. Pending form requests keep it active until the response; reduced motion and the existing pause control still disable it. Cross-document view transitions were disabled after Chromium reported an aborted transition during rapid navigation; click feedback now handles that visual response.

All UI icons, including services, social/contact symbols, arrows, menu/close, playback, gallery controls, decorative stars and select chevrons, use individually drawn asymmetric path contours. The supplied logo is preserved. Contact and footer now show `+91 70228 33448` and `namahastudios.in@gmail.com`; tel/mailto and WhatsApp links use those details. Organization metadata also contains the supplied phone and email. The form still needs its Web3Forms public access key before it can send email.

All 21 unit tests and build verification pass. A template-text regression check guards against visible interpolation placeholders. Browser checks at 320/390/768/1440px cover seven routes, no overflow, idle/scroll-hidden flower, click-triggered placement right of the logo, automatic clearing, destination navigation feedback, reduced motion, live contact URLs, and a mocked pending/successful form request. Desktop and mobile captures in `qa/click-ixora-*` were visually inspected. No real enquiry or WhatsApp message was sent. External fonts were omitted during isolated browser checks. Changes remain on the local preview branch.

## Hero detail, logo blending and WhatsApp correction — 2 November 2026

Refined only the Home hero illustration with a modest increase in fine camera/chair/clothing and landscape line detail, preserving its sparse composition. Exact prompt and source path are recorded in `MINIMAL_PREVIEW.md`. The supplied logo is displayed through an alpha filter that removes the JPEG paper; a final SourceAlpha mask prevents opaque padding around the cropped symbol and lettering. WhatsApp now uses the recognizable Simple Icons v13.21.0 brand glyph, with its source attributed in `public/sketch-icons.js`.

All 21 unit tests and production checks pass. Re-ran the seven-route/four-width interaction checks. Home, the scrolled header and WhatsApp were visually reviewed at 390 and 1440px. A separate two-background logo fixture contains zero unwanted near-white or black padding pixels. Header and footer filter IDs remain unique. Review screenshots are `qa/refined-hero-*`, `qa/refined-logo-scroll-*`, `qa/correct-whatsapp-*` and `qa/logo-transparency-check.png`. External fonts and physical devices remain outside these local checks. Main is unchanged.

Follow-up: replaced the Home sun's solid ochre fill with visibly separated golden-orange sketch strokes, matching the client's latest reference. The rest of the refined illustration was preserved. Rebuilt every responsive Home variant, passed production verification and rechecked the desktop/mobile Home, logo and WhatsApp screenshots.

## Consistent hand-sketched drawings across the site — 2 November 2026

Subsequent service-card correction: Creative Development now uses a generated photograph of scriptwriting/storyboard collaboration, matching the other five photographic service cards. Source, exact built-in generation prompt and delivery paths are in `CREATIVE_DEVELOPMENT_PHOTO.md`. The asset slot preserves its portrait composition; existing slots keep their default dimensions. All 21 tests and seven-page production verification pass. Chromium checked the card at 390/1440px: responsive WebP decoded, cover cropping, all six service cards photographic, no overflow or browser/asset errors. Both card captures were visually reviewed in `qa/creative-photo-*`. Other line drawings remain unchanged.

Preserved the approved Home drawing and regenerated the other fourteen illustrations to match its light hand-sketched contours, modest interior detail and open space. Every sun and coloured accent uses separated ochre pencil strokes. The single pointer kite now has outlined panels and tail bows. New delivery URLs prevent the previous week-long image cache from keeping the old drawings visible. Current direction and exact generation prompt are recorded in `LINE_DRAWING_STANDARD.md` and the project instructions.

All 21 unit tests and production verification pass: seven prerendered pages, 288 local references and responsive artwork variants. Chromium checked all seven routes at 390 and 1440px, confirmed all fifteen updated illustration references, loaded responsive WebP files, and found no horizontal overflow, browser errors or failed local assets. Visually reviewed the complete fifteen-image contact sheet and desktop/mobile layouts, including About and the Services process section. Local screenshots and contact sheet are in ignored `qa/`. Browser checks used intercepted build files without external Google Fonts; no real form or WhatsApp messages were sent.

## Monospace and orange ixora menu — 6 November 2026

Self-hosted the exact George Williams Monospace Medium/Bold/Oblique family from the client's link, with SIL OFL notice. Removed the previous Google Fonts request and rebalanced heading sizes, header spacing and a narrow About grid for wider letterforms. Added two transparent orange ixora assets based on the client's photograph. Menu opening reveals a bunch, then one closed bud arcs into the original logo's inner bud and blends away. Navigation preserves feedback across pages; scrolling and unrelated controls do not trigger it. Full prompts and asset paths are in `FONT_MENU_UPDATE.md`.

All 21 tests and production verification pass: seven prerendered pages and 302 local references. Chromium verified the actual self-hosted font loaded on all seven routes at 320/390/768/1024/1440px, with no horizontal overflow or browser/asset errors. Tested menu opening, flying/joined phases, navigation to About, idle scroll, Escape, motion pause and reduced motion. Desktop/phone typography and open-menu flight/join screenshots were visually reviewed in ignored `qa/mono-*`. No real enquiries or messages were sent; physical-device testing remains outstanding.

## Scattered ixora and persistent logo rotation — 6 November 2026

Replaced the compact bouquet with individually spaced botanical flowers and buds, based on the client's scattered reference. Menu opening and button/link activation reveal the scatter; one open flower lifts out, leaving its original spot empty, flies to the logo's inner bud and stays visible rotating once every four seconds. The scatter fades away. Closing the menu preserves the docked flower, and navigation carries the effect to the next page. Docking uses the root logo viewBox because nested SVG bounds included clipped JPEG space and previously put the flower below the symbol. Exact prompt and delivery asset are recorded in `FONT_MENU_UPDATE.md`.

All 21 tests and seven-page production verification pass (372 local references). Chromium checked 320/390px phone menus and desktop navigation: scatter visibility and separation, persistent rotation, logo alignment before/after header condensation, closing the menu, CTA page navigation, motion pause, reduced motion, no page overflow or browser/asset errors. Reviewed `qa/scattered-start-*`, `qa/scattered-docked-*` and `qa/scattered-desktop.png` visually. No real messages or enquiries were sent.

## Brief ixora splash and bud disappearing into logo — 6 November 2026

Latest client correction supersedes persistent rotation. Each activation produces a brief outward burst at the actual click (or keyboard-activated control center), fading completely within 300ms. A closed bud begins its 650ms flight after 80ms, aligns with the logo's inner bud and disappears over 120ms. Everything clears by 850ms; no lingering flower, static scatter or animation loop remains. Page navigation carries only the remaining elapsed effect instead of restarting it. Menu click handling uses the original event path because opening replaces the icon during that click.

All 21 tests and production verification pass (seven pages, 372 local references). Chromium checked 320/390/1440px, recorded splash/flying/merging/idle phases, verified the scatter clears before the bud arrives, confirmed exact logo landing and zero landing rotation, and observed opacity fade and complete cleanup. Rapid replay, navigation, pause and reduced motion pass, with no overflow or browser/asset errors. Visually reviewed burst and cleared captures in ignored `qa/quick-splash-*`. Existing botanical assets are reused; current direction is recorded in `FONT_MENU_UPDATE.md` and `AGENTS.md`.

## Mobile splash performance — 7 November 2026

Replaced the JavaScript per-frame flight loop with browser-managed transform/opacity keyframes. The image keeps fixed layout dimensions and shrinks using scale. All sprite reads are batched before animation writes; the logo is measured once per activation. Phones use seven splash sprites, a 220ms splash and 600ms total effect; desktop uses 260ms/730ms. All previous animations/timers cancel on repeated taps and all animation objects clear after completion. Added touch-action manipulation on relevant controls.

Measured the same 390px menu-open interaction in Chromium at 4x CPU throttling before and after: logo reads 47→1; LayoutCount 40→6; layout duration .03681→.00371 seconds; script duration .08834→.01331 seconds. These are synthetic local measurements, not physical-device results. All 23 tests and production verification pass. Browser checks at 320/390/1440px under throttling cover touch taps, rapid replay, transform-only keyframes, exact logo landing and fade, navigation cleanup, pause/reduced motion, no orphan animations, overflow or browser errors. Screenshots are in ignored `qa/smooth-splash-*`.

## Service discovery and enquiry polish — 8 November 2026

Reworked Home services into six editorial cards with hand-drawn symbols, scope examples and direct service links. Contact now shows four required fields, with company/phone/budget/timing in an optional disclosure that opens on validation errors. On mobile, Email/WhatsApp/Call shortcuts and the form come before the studio introduction; DOM and mobile reading order agree. Added a manual email-draft and copy-brief handoff while the Web3Forms key is empty, with explicit no-send wording and retained values. Corrected the self-hosted-font privacy notice and the Creative Development photo's intrinsic portrait dimensions. Design contract and setup notes are in `SERVICE_ENQUIRY_POLISH.md` and `FORM_SETUP.md`.

All 24 tests and production verification pass: seven pages, 372 local references, responsive artwork. Chromium checked all seven routes at 320/390/768/1440px without page overflow or browser/asset errors. Checked six service links, optional disclosure, validation expansion, service preselection, encoded email draft, clipboard/manual-copy fallback, retained brief, no automatic provider request when unconfigured and corrected privacy copy. Separate isolated fixtures mock provider rejection/retry and confirmed success; no real messages were sent. Desktop/mobile service, Contact and handoff screenshots in ignored `qa/polish-*` were reviewed. Both local and published config had a blank access key at review time. Real inbox delivery remains unverified and requires the owner-issued public Web3Forms access key plus an inbox receipt test.

## Sparse studio activity trial — 13 November 2026

Home-only strip below header: four separate editable SVG scenes with subtle storyboard-arm, dolly, boom, editing-screen and slate motion. References were treated as activity examples, not dense artwork to copy. Desktop four columns, phone two-by-two. Local/global pause, reduced motion and offscreen/background suspension included. Pausing the strip does not trigger the flower effect. See `STUDIO_MOTION_TRIAL.md`.

All 25 tests and seven-page production verification pass, with 379 local references. Chromium at 320/390/768/1440px confirmed actual object movement, local pause/resume, global pause, static reduced-motion display, offscreen pause and Home-only placement without overflow or browser errors. Reviewed desktop strip and mobile Home captures under ignored `qa/studio-motion-*`.

Follow-up — detailed header-height moving artwork: replaced the simple SVG sketches with four built-in-generated ink film-crew illustrations matching the client's newer reference direction. Single row at 72–88px, gentle seamless horizontal travel and subtle independent scene motion. Maintained local/global pause, reduced motion and offscreen/background suspension. All images decode at 320/390/768/1440px; strip height, actual movement, pause/resume, Home-only placement and no overflow/browser errors verified. Desktop/mobile screenshots reviewed. Generated asset paths and exact prompts are in `STUDIO_MOTION_TRIAL.md`. This revision remains a local preview.

Latest correction — actual video requested: removed the dedicated pause control, duplicate strip, all translating/tilting image animations. Added an optional video URL slot with muted/loop/inline playback and still-art fallback; reduced motion, offscreen/background suspension and global pause remain. No clip is installed because a genuine character-animation video has not yet been supplied. `STUDIO_VIDEO_BRIEF.md` contains the existing starter assets, a video-model prompt, wide/16:9 framing constraints and integration steps. Tests: all 25 pass; production verification passes; browser verifies no strip control or image animation, decoded still artwork, no nonexistent video request and no overflow/browser errors at 320/390/1440px. Actual video playback and crop remain unverified until a clip is available.
