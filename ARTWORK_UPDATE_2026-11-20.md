# Client revision — 20 November 2026

The latest client request selects option 1 (self-hosted DM Mono + Manrope), black-and-white or minimal-colour line art, equipment-led subpage illustrations and internal equipment motion. It supersedes the previous serif combination and video-bar experiments.

## New artwork

Three assets were generated with the built-in imagegen tool, using previous illustrations as style references. Prompts requested delicate fine pencil contours, open interiors, pure white backgrounds, no dominant characters, no text, heavy fills or cartoon style. About: projector/reels, notebook, empty chair and case. Contact: telephone, blank project notebook, adjustable lamp and chai. Gallery: camera/reels, contact sheets, studio light, headphones and slate. Source PNGs are in ignored public/assets/source; the existing asset pipeline produces fresh equipment-v2-line masters and responsive JPEG/WebP variants. In-page rendering is monochrome. Supplied logo and photographic portfolio remain unchanged.

## Motion and composition

Original six-stage ink bar: Idea, Story, On set, Lighting, Edit, Screen. It is inspired by the reference's production flow, not copied from its artwork or typography. Pencil movement, storyboard detail, rotating reels, a camera pivot, gently changing lamp rays, editing playhead and screen detail provide subtle movement. The bar never scrolls. Discovery/Create process cards are character-free equipment drawings. Contact's new planning-desk subject differs from Home's camera/chair.

Circular regions of the actual reel image are re-rendered in clipped SVG sections and rotate around their own centres. The surrounding drawing stays stationary. Other decorative slots use small equipment detail animations. Photographs are excluded. Motion pauses on global pause, reduced motion, hidden document and offscreen states.

## Verification

26 Node tests and production output verification. Browser checks cover seven routes at 320/390/768/1440px; actual font loading, overflow, runtime/network errors, real rotating transform, pause/resume, reduced motion and offscreen suspension.
