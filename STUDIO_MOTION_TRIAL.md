# Airy studio activity trial — 13 November 2026

The client's dense reference pictures are examples of activities, not a request to reproduce a packed illustration. The handwritten layout places moving illustrations beneath the header. This trial adds a Home-only strip beneath the header and above the existing hero, with four spaced scenes: storyboard planning, camera dolly operation, boom recording and editing.

Drawings are repository-native SVG paths so the actual objects can move independently. Thin warm-brown strokes, open interiors, restrained ochre accents and generous gaps follow the established drawing direction. No bitmap or video generation was needed. Desktop has four columns; phone has two rows of two scenes, without clipping or horizontal scrolling. Animation is restrained: 14px camera travel, a few degrees of arm/boom rotation, subtle screen/sound opacity and slate tilt. No sliding panorama or dense crowd.

CSS animates transforms and opacity. A local pause/play control and the existing global motion preference govern it. Reduced motion shows static scenes. Intersection/visibility handling pauses work offscreen and in background tabs. The supplied logo, existing coloured cinema art, brief ixora feedback and current typography are preserved.

Validation: all 25 existing tests and production verification pass (7 pages, 379 local references). Chromium checks at 320/390/768/1440px verified four scenes, actual camera movement, pause/resume, global pause, reduced motion, offscreen pause, Home-only placement, no overflow or browser errors. Desktop/phone screenshots reviewed in ignored `qa/studio-motion-*`. This is a first visual trial for client feedback.
