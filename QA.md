# Demo verification — 28 October 2026

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
