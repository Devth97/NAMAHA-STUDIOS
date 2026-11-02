# Light line drawing and ixora review preview — 2 November 2026

**Current site-wide drawing standard:** `LINE_DRAWING_STANDARD.md` and `AGENTS.md` supersede earlier illustration directions in this review record. All fifteen drawings use matching light line work and stroke-based colour accents, with fresh delivery URLs.

Latest revision: ixora is now click feedback, not a scroll decoration. All UI icons use individually drawn, slightly asymmetric SVG paths in `public/sketch-icons.js`. The studio contact details are `+91 70228 33448` and `namahastudios.in@gmail.com`; WhatsApp uses the real phone number. See `FORM_SETUP.md` for the remaining form access-key step.

Current direction: minimal line drawings with a little interior detail. Use thin contours and a few camera features, facial/profile lines and clothing folds. Keep backgrounds open. Avoid dark fills, heavy strokes, crosshatching, engraving and dense scenery. The client's camera/clapperboard and director sketches set the detail ceiling. This supersedes the earlier detailed illustration direction in `ILLUSTRATION_PROMPTS.md`.

Latest hero refinement: `public/assets/source/hero-refined.png` is an imagegen edit of the existing Home drawing, adding reel holes, lens rings and camera controls, tripod joints, light clothing seams, chair stitching, a script page, a small distant tiled-roof outline and a few grasses. The camera/director layout, light line work, open white background and small ochre sun remain. Delivery files are `public/assets/hero-line.jpg` and its responsive JPEG/WebP siblings. Prompt: retain the existing airy 3:2 composition; add about 25% more hand-sketched line detail; keep at least 65% open space; no dark fills, heavy outlines, dense hatching, shaded volumes, text or elaborate scenery.

The supplied logo's near-white paper is removed at display time with an SVG alpha filter, masked to the original image alpha. This preserves the supplied artwork and prevents light rectangles or opaque filter padding over the translucent header. The WhatsApp symbol now uses the recognizable Simple Icons v13.21.0 brand path (CC0); the other interface symbols retain their hand-drawn contours.

Sun refinement: the final Home source is `public/assets/source/hero-refined-sketched-sun.png`, created with the built-in image editor from `hero-refined.png`. Prompt: change only the small filled sun into fine, uneven diagonal ochre/golden-orange pencil strokes with visible white gaps and a delicate broken circular edge; preserve its position/size and all other illustration details exactly; no flat fill, gradients, texture, text or added scenery. The client's latest sketch was used only as a reference for the sun treatment. The pipeline continues to deliver `public/assets/hero-line.jpg` plus its responsive JPEG/WebP variants.

## Artwork

The nine earlier outline illustrations are restored from `public/assets/illustration-originals/`. Their local editable pipeline inputs are `public/assets/source/{name}-minimal.jpg` (hero, aboutHero, servicesHero, workHero, galleryHero, contactHero, journey, storyboard and development).

Six supporting illustrations were generated with the built-in image generator using the supplied camera/clapperboard sketch as a style reference. Sources: `public/assets/source/process-discover-minimal.png`, `process-develop-minimal.png`, `process-create-minimal.png`, `process-deliver-minimal.png`, `notfound-minimal.png` and `success-minimal.png`. Discover and Create received a second edit adding a few facial, clothing and camera contours after the user requested slightly more detail. Responsive delivery files remain in `public/assets/`.

Common generation prompt: standalone landscape 3:2, 1536 × 1024; very minimal light-brown fine line drawing; thin airy contours; few interior lines; no shading, crosshatching, dark filled surfaces or thick strokes; at least 75% empty flat white background; one small muted ochre accent. No text, logo, border, watermark, paper texture or vignette.

Scenes: two people discussing a notebook and cups at a table; a writing desk with lamp and three storyboard panels; a camera operator and boom operator; a projector and screen with three seat outlines; an empty director chair beside a film strip; a kite above a hill and palm.

Refinement prompt for Discover and Create: add just a little interior detail—simple eyes and nose/profile, two or three clothing folds, small hand/finger contours, and lens ring/buttons/reel perforations. Preserve the composition and restrained thin line style. No shading, hatching, heavier outlines, dark fills or extra scenery.

The supplied orange logo is used directly, without regeneration. The horizontal header arrangement displays its original symbol and lettering through SVG viewports. No contact details from the supplied design-reference screenshots were adopted.

## Motion trial

- One gold paper kite follows the pointer or single-finger movement; native scrolling and pinch gestures remain available.
- One transparent red ixora blossom was extracted from the supplied flower photo with the built-in image editor. Source: `public/assets/source/ixora-flower.png`; delivery: `public/assets/ixora-flower.webp`.
- Ixora edit prompt: isolate the single prominent four-petal red blossom, retain its real shape and natural petals with a very short tube, remove paper/wires/other blooms, transparent background, no shadow or text.
- Clicking a button or link briefly moves the flower to the right of the header logo, where it turns as a loading indicator and then clears. Scrolling alone never reveals it. Same-tab navigation carries the feedback to the destination without delaying the link. A real pending enquiry request keeps the indicator active until its response. Pause controls both decorations; reduced motion hides both. Decorations do not intercept taps or clicks.

## Verification and delivery

All 21 unit tests and the seven-page production verification pass. Chromium checked seven routes at 320, 390, 768 and 1440px with no horizontal overflow. Click-only activation, right-of-logo placement, clearing, navigation carryover, reduced motion and a mocked pending/successful enquiry request were checked. No real enquiry or WhatsApp message was sent. Current screenshots are saved in ignored `qa/click-ixora-{width}-{idle,loading}.png`; earlier scroll-trial screenshots are retained separately.

Browser verification served the built files through local request interception and omitted external Google Fonts. Physical devices and remote font delivery were not checked. The interactive local preview is at `http://127.0.0.1:4175/` while the preview server is running.

This work is on `preview/minimal-ixora` for review; the published main branch is unchanged.
