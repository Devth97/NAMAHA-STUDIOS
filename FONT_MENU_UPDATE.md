# Client font and ixora menu update — 6 November 2026

Uses the exact George Williams Monospace family linked by the client: https://www.1001fonts.com/monospace-font.html. Downloaded unmodified Medium, Bold and Oblique TTF files are self-hosted in `public/assets/fonts/`, with their copyright notice and SIL Open Font License in `OFL.txt`. Heading sizes and responsive spacing accommodate the wider letterforms. The supplied logo remains artwork.

Latest client correction supersedes the earlier rotating-flower request: opening the phone menu or activating a button/link creates a brief outward flower splash at the clicked point, with no static hold. Individual flowers and buds burst outward and fade within 300ms. After 80ms, one closed bud flies for 650ms to the bud inside the supplied logo, aligns without spinning and fades into it over 120ms. The full effect stops and clears at 850ms. Nothing remains rotating or visible at the logo. Navigation carries only the remaining animation time to the destination without delaying the link or replaying the splash. Scrolling never starts it. Reduced motion, the existing pause control, resizing and backgrounding stop the effect.

The landing point uses (29.6, 55.4) in the root logo's 240×75 viewBox, so it follows the responsive and condensed logo sizes. Nested symbol SVG bounds include clipped JPEG space and must not be used for docking. All decoration is non-interactive and hidden from assistive technology; the menu retains focus trapping, Escape dismissal and its accessible expanded state.

7 November mobile performance correction: the flight is now a browser-managed animation of transform/opacity only, with a fixed 34px image scaled to the destination. Geometry is measured once per activation rather than every frame, and all initial reads are batched before animations start. Phone timings are 220ms for the splash and 600ms total (40ms delay, 480ms flight, 80ms merge). Desktop timings are 260ms for the splash and 730ms total (60ms delay, 570ms flight, 100ms merge). Phones show seven splash sprites instead of eleven. Rapid activations cancel previous animations and timers; finishing cancels all animation objects. Buttons use touch-action manipulation to avoid double-tap click delay while preserving scrolling and pinch zoom.

## Generated assets

Generated using the built-in image generator with the client's 5 November orange-ixora photograph as reference. Assets have real alpha transparency. Current delivery:

- `public/assets/ixora-orange-open.webp` (240px, individually positioned splash blossoms)
- `public/assets/ixora-orange-bud.webp` (splash buds and the single bud that travels into the logo)

The older compact bunch asset is retained for cached pages, but current pages do not reference it.

### Current open-flower prompt

Create exactly one orange ixora blossom viewed straight from above, matching the supplied client's orange ixora photograph: four slender natural petals in a cross, tiny central opening, warm vermilion-orange with subtle natural petal texture. Fully OPEN flower, not a closed bud. Photographic botanical cutout. No stem, no leaves, no buds, no other flowers, no paper, no grid, no shadow, no text. True transparent background. Blossom centered and occupying about 85 percent of a square canvas. Used as a small rotating website flower and in a loose scattered arrangement.

### Earlier compact-bunch prompt (superseded)

Use the attached orange ixora flowers as a botanical colour and shape reference. Create a single isolated compact natural bunch of orange ixora: 9 delicate four-petalled flowers, 3 slender closed tapered buds and short fine orange stems converging below. Photographic botanical cutout, warm vermilion orange petals, soft natural lighting, no leaves, no vase, no ground shadow, no paper, no grid, no text. Entire bunch centered, generous transparent margin on all sides, square image. Transparent background. This is a decorative website menu animation asset.

### Bud prompt

Use attached orange ixora as botanical colour and shape reference. Create exactly ONE isolated CLOSED ixora flower bud, not an open flower. Long elegant tapered vermilion-orange closed bud pointing diagonally toward upper left, with a thin short gently curved orange stem continuing down to the lower right. Match the orange bud inside the supplied Namaha logo in spirit: elongated teardrop closed petals with subtly visible natural seam. Photographic botanical cutout, warm natural light, no leaves, no background, no shadow, no text. Single bud centered with generous transparent margins, square image. Transparent background, website decorative animation asset.
