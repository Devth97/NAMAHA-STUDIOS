# Coloured cinema artwork — 9 November 2026

Requested changes: cinema objects in coloured hand-drawn linework across the pages; smaller black hero text and larger brown emphasis; slower click splash and bud flight to the supplied logo.

Eight original raster pencil compositions replace the six heroes, Home journey and About storyboard. The client references informed the cinema subjects rather than being reused as vector stock. Generation prompts and source filenames are recorded in `scripts/colour-art-manifest.json`; delivery uses responsive JPEG/WebP variants and fresh URLs. Photos, logo and existing gallery source slots remain unchanged.

Hero emphasis is 1.48 times the black text on desktop and 1.55 times on phones. The complete click feedback lasts 1400 ms on phones / 1520 ms on desktop, including a 1050 / 1150 ms flight. Geometry is read once; only transform and opacity animate. Pause, reduced motion, rapid-click cancellation and visibility cleanup are retained.

Validation:
- 25 Node tests pass, including flight timing and logo docking.
- Production build and local asset/reference verification pass.
- Browser layout checks on all six pages at actual CSS widths 320, 416, 783 and 1483 px show no horizontal overflow; responsive hero images load.
- Gallery reviewed visually at 320 px; proof saved locally in `qa/colour-gallery-mobile.png` (ignored).
- Keyboard activation showed the bud in `animating` state, then `idle` with both bud and scatter hidden at completion.
- Desktop screenshot capture intermittently timed out in the browser tool; desktop DOM sizing and image loading checks completed. Browser console errors observed were from an installed ad-block extension, not site scripts.

The unrelated untracked `line-art-preview.json` is excluded from this update.
