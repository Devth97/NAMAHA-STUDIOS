# Namaha Studios — artwork generation pack

**2 November 2026 update:** the site's line drawings have been replaced with detailed pen-and-ink illustrations. Use `ILLUSTRATION_PROMPTS.md` for their current direction; its prompts supersede the older minimalist D/E prompts below. B1–B4 have also been generated and installed.

18 images to generate in ChatGPT. Every slot on the site already shows a **placeholder copy** of an existing image. Nothing is broken while you work, and each new image replaces its placeholder automatically.

## How to do it (5 steps)

1. Open ChatGPT image generation. For **every** prompt, ask for **landscape 3:2, 1536 × 1024**. (The prompts say this too, so it is fine if you paste them as they are.)
2. Copy one prompt block below exactly as written. Generate it, and regenerate until it passes the checklist at the bottom.
3. Download the PNG and save it into:
   `D:\NAMAHA\website\public\assets\source\`
   using the **exact file name** shown on the prompt (for example `project-01.png`).
4. Repeat for as many as you like. You can do them in any order and over several sessions.
5. Tell Claude "artwork added". Claude runs `npm run assets`, which crops to 3:2, resizes, matches line drawings to the site paper, builds 480/960/1536 px JPEG and WebP versions, and reports which slots are still placeholders.
   (If you have Python + Pillow + NumPy yourself, run `npm run assets` and then `npm run assets:status` in `D:\NAMAHA\website`.)

Tip: start each image in a **new chat** so the style of one image doesn't carry over into the next. Each prompt is self-contained.

### Priority order
1. **B1–B6 project covers** — the Work page and Home currently repeat the service photos.
2. **A1 showreel poster** — the biggest image on the Home page.
3. **C1–C5 gallery** — removes the remaining repeats in the gallery.
4. **E2 success, E1 404, D1–D4 process drawings** — finishing touches.

---

## A. Showreel

### A1 · `showreel.png` — Home "Feel it in motion" band (full-width, text sits bottom-left)
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic editorial photograph for a premium Indian film studio website. A night exterior film shoot on a rain-washed old street in coastal Karnataka: heritage buildings with Mangalore clay-tile roofs, warm tungsten practical lamps and glowing shopfronts, wet stone reflecting amber light. On the right two-thirds of the frame, a small film crew works around a cinema camera on a camera crane, a cinematographer at the eyepiece, a boom operator and a director watching a monitor, all candid and mid-action. Gentle rain visible in the light beams, soft atmospheric haze. The LEFT THIRD and the BOTTOM THIRD of the frame stay calm and dark (deep charcoal shadow, wet street) to leave clean space for a headline. Realistic anatomy, hands and professional equipment, excellent photographic detail, warm amber/gold highlights with deep charcoal and muted teal shadows, refined cinematic colour grade, anamorphic feel, shallow depth of field. No text, letters, signage with readable words, logos, watermarks, borders, collage or website interface.
```

---

## B. Work project covers (Work page + Home "Stories in every frame")
These represent finished films and campaigns, so they should look like **frames from the finished work**, not behind-the-scenes shots. Captions sit **bottom-left**, so keep that area slightly darker and uncluttered.

### B1 · `project-01.png` — Films · "The art of a new beginning"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic film still for a premium Indian film studio website, looking like a frame from a contemporary Indian feature film. At dawn, a young Indian woman in a simple handloom cotton saree pushes open the tall carved wooden doors of an old Mangalore-tiled ancestral home; soft golden morning light floods in around her, faint mist over coconut palms and a courtyard tulsi planter behind. Quiet, hopeful mood of a new beginning. Subject placed right of centre; the lower-left of the frame falls into soft shadow. Realistic anatomy and hands, natural skin texture, authentic architecture, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade, 35mm film grain, shallow depth of field. No text, logos, watermark, borders, collage or website interface. Not a poster.
```

### B2 · `project-02.png` — Television · "Conversations that connect"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic photograph of an elegant Indian television talk-show set during recording, seen from behind a broadcast studio camera that is softly out of focus in the left foreground. On set, two Indian guests (a woman and an older man) sit in warm armchairs, mid-conversation, laughing naturally; a low table with brass cups between them; behind them a tasteful backdrop of warm wood slats, plants and soft bokeh practical lights. Premium broadcast lighting, intimate and human. Realistic anatomy, hands and equipment, excellent photographic detail, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade. No text, on-screen graphics, logos, watermark, borders, collage or website interface.
```

### B3 · `project-03.png` — Brand films · "A taste of tradition"
```
Standalone high-resolution landscape 3:2 (1536x1024) premium brand-film still for an Indian film studio website. Close, intimate shot inside a traditional South Indian kitchen: an elderly woman's hands pouring frothy filter coffee from a height between a brass tumbler and dabarah, steam curling upward, a stone grinder, banana leaf and fresh jasmine nearby, morning sunlight cutting through a small wooden window. Tactile textures of brass, stone and wood; sensory and nostalgic, like a high-end food commercial. Hands and vessels right of centre, lower-left in gentle shadow. Realistic hands and anatomy, macro-level detail, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade, shallow depth of field. No text, labels, packaging, brand names, logos, watermark, borders, collage or website interface.
```

### B4 · `project-04.png` — Events · "When the lights come alive"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic live-event photograph for a premium Indian film studio website. View from the side wings of a grand open-air stage at night: a Yakshagana performer in a full, authentic ornate costume and towering headdress mid-leap, lit by dramatic golden spotlights and haze, musicians with chende drums at the edge of the stage, and a vast audience as silhouettes and phone-light bokeh beyond. Energy, colour and spectacle with a respectful, documentary authenticity. Realistic anatomy and costume detail, warm amber/gold and deep red highlights with charcoal shadows, refined cinematic colour grade. No text, banners with words, logos, watermark, borders, collage or website interface.
```

### B5 · `project-05.png` — Digital · "Stories, beyond the screen"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic photograph for a premium Indian film studio website: a modern digital-series shoot in a vibrant Mangaluru street market at golden hour (coastal Karnataka). A young Indian content creator in casual contemporary clothes speaks expressively towards a compact cinema camera on a gimbal held by a camera operator in the foreground (back and shoulder visible, soft focus), a second crew member holds a small LED panel. Flower stalls, fruit carts and strings of marigolds blur into warm bokeh behind. Youthful, authentic, social-first energy. Realistic anatomy, hands and equipment, excellent photographic detail, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade. No text, readable signs, phone screens with UI, logos, watermark, borders, collage or website interface.
```

### B6 · `project-06.png` — Films · "Somewhere along the way"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic road-movie film still for a premium Indian film studio website. A vintage cream Hindustan Ambassador car pulled over on a winding Western Ghats mountain road during the monsoon; low clouds drifting through dense green valleys; two friends in their late twenties stand at the roadside railing looking out over the view, seen from behind, one pointing into the distance. Small human figures in a vast landscape, sense of journey and possibility. Lower-left road in soft shadow. Realistic anatomy and vehicle detail, wet tarmac reflections, warm amber light breaking through clouds, deep charcoal-green shadows, refined cinematic colour grade, 35mm grain. No text, number plates, road signs with words, logos, watermark, borders, collage or website interface.
```

---

## C. Gallery (behind the scenes — the people and process)

### C1 · `gallery-01.png` — On location · "Chasing the first light"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic behind-the-scenes photograph for a premium Indian film studio website. Sunrise on a quiet coastal Karnataka beach: a small film crew sets up a cinema camera on a tripod beside colourful wooden fishing boats pulled up on the sand, one crew member reading the light with a light meter, another carrying a reflector; soft pink-gold sky, gentle waves, long shadows. Candid, unposed, real working moment. Realistic anatomy, hands and professional equipment, excellent photographic detail, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade. No text, boat names, logos, watermark, borders, collage or website interface.
```

### C2 · `gallery-02.png` — On set · "Between takes"
```
Standalone high-resolution landscape 3:2 (1536x1024) candid behind-the-scenes photograph for a premium Indian film studio website. On a warmly lit interior film set between takes, an Indian actor in costume sits in a canvas director-style chair laughing at something off-camera while a make-up artist touches up his face with a brush; a script supervisor with a folder and a coffee cup stands nearby; lighting stands, flags and cables visible at the edges. Relaxed, human, joyful moment. Realistic anatomy, hands and equipment, natural skin texture, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade, shallow depth of field. No text, readable script pages, logos, watermark, borders, collage or website interface.
```

### C3 · `gallery-03.png` — Events · "The energy of a live audience"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic behind-the-scenes photograph for a premium Indian film studio website. At a night music festival in India, a camera operator with a shoulder-mounted cinema camera stands in the foreground (back three-quarter view, soft rim light) filming a joyful crowd with raised hands; golden confetti in the air, warm stage light beams and haze, a large stage glowing beyond. Captures the crew documenting the moment. Realistic anatomy, hands and equipment, excellent photographic detail, warm amber/gold highlights with deep charcoal and soft blue shadows, refined cinematic colour grade. No text, banners with words, logos, watermark, borders, collage or website interface.
```

### C4 · `gallery-04.png` — On set · "Details tell a story"
```
Standalone high-resolution landscape 3:2 (1536x1024) close-up behind-the-scenes photograph for a premium Indian film studio website, celebrating production design. A beautifully dressed period-film set table: a lit brass oil lamp, an old wooden radio, folded handwritten letters tied with string (no readable words), round spectacles, a ceramic cup of tea and dried jasmine; a production designer's hand gently adjusts one letter. A soft film light and a camera are just visible, blurred, at the frame edge. Tactile, intimate and crafted. Realistic hands, rich texture, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade, shallow depth of field. No legible text, logos, watermark, borders, collage or website interface.
```

### C5 · `gallery-05.png` — Behind the scenes · "Where the pieces come together"
```
Standalone high-resolution landscape 3:2 (1536x1024) cinematic behind-the-scenes photograph for a premium Indian film studio website. A Foley sound studio: an Indian Foley artist kneels on a surface of gravel and wooden boards, creating footstep sounds with shoes in her hands, focused and playful, in front of a large studio microphone on a boom; shelves of props (coconut shells, bells, fabric, a bicycle wheel) behind; a sound recordist visible through the control-room glass, lit by a warm screen glow. Craft and detail. Realistic anatomy, hands and equipment, excellent photographic detail, warm amber/gold highlights with deep charcoal shadows, refined cinematic colour grade. No text, readable screens, logos, watermark, borders, collage or website interface.
```

---

## D. Process drawings (Services → "Made with you, every step of the way")
These must match the existing minimalist line drawings exactly. Keep them sparse.

### D1 · `process-discover.png` — Discover
```
Create a standalone landscape 3:2 (1536x1024) illustration for a refined film studio website. Two people seated across a small round café table in friendly conversation, two cups of coffee and an open notebook between them, one gesturing as if describing an idea. STRICT STYLE: extremely minimalist LINE DRAWING, clean thin black contour strokes, very little detail, only essential silhouettes and contours, 80 percent empty plain flat warm ivory background #f6f0e5 with no paper texture and no vignette, a single small flat muted gold circle (#c9a061) as the only accent, placed like a small sun or lamp glow. Sparse airy composition with objects centred and inset well away from the edges. NO crosshatching, NO engraving, NO texture, NO shading, NO dense scenery, NO photorealism, NO filled black areas, NO typography, NO logos, NO text or watermark, NO borders. Elegant restrained editorial monoline drawing, deliberately simple, closer to a quick confident architectural outline than a detailed illustration.
```

### D2 · `process-develop.png` — Develop
```
Create a standalone landscape 3:2 (1536x1024) illustration for a refined film studio website. A writer's desk seen from the front: an angled desk lamp, a short stack of script pages with blank lines, a pencil, and above the desk five small blank storyboard frames pinned along a single string with tiny clips. STRICT STYLE: extremely minimalist LINE DRAWING, clean thin black contour strokes, very little detail, only essential silhouettes and contours, 80 percent empty plain flat warm ivory background #f6f0e5 with no paper texture and no vignette, a single small flat muted gold circle (#c9a061) as the only accent, used as the lamp's glow. Sparse airy composition with objects centred and inset well away from the edges. NO crosshatching, NO engraving, NO texture, NO shading, NO dense scenery, NO photorealism, NO filled black areas, NO typography, NO logos, NO text or watermark, NO borders. Elegant restrained editorial monoline drawing, deliberately simple, closer to a quick confident architectural outline than a detailed illustration.
```

### D3 · `process-create.png` — Create
```
Create a standalone landscape 3:2 (1536x1024) illustration for a refined film studio website. A cinema camera on a short dolly track with a camera operator behind it, a boom microphone held over the scene, and a clapperboard (completely blank, no writing) held up in the foreground by a hand. STRICT STYLE: extremely minimalist LINE DRAWING, clean thin black contour strokes, very little detail, only essential silhouettes and contours, 80 percent empty plain flat warm ivory background #f6f0e5 with no paper texture and no vignette, a single small flat muted gold circle (#c9a061) as the only accent. Sparse airy composition with objects centred and inset well away from the edges. NO crosshatching, NO engraving, NO texture, NO shading, NO dense scenery, NO photorealism, NO filled black areas, NO typography, NO logos, NO text or watermark, NO borders. Elegant restrained editorial monoline drawing, deliberately simple, closer to a quick confident architectural outline than a detailed illustration.
```

### D4 · `process-deliver.png` — Deliver
```
Create a standalone landscape 3:2 (1536x1024) illustration for a refined film studio website. A small vintage film projector on a stand at left casting a long soft beam, drawn only as two thin diverging lines, towards a modest blank screen at right; three simple theatre seats seen from behind in front of the screen. STRICT STYLE: extremely minimalist LINE DRAWING, clean thin black contour strokes, very little detail, only essential silhouettes and contours, 80 percent empty plain flat warm ivory background #f6f0e5 with no paper texture and no vignette, a single small flat muted gold circle (#c9a061) as the only accent, on the screen as a glowing moon. Sparse airy composition with objects centred and inset well away from the edges. NO crosshatching, NO engraving, NO texture, NO shading, NO dense scenery, NO photorealism, NO filled black areas, NO typography, NO logos, NO text or watermark, NO borders. Elegant restrained editorial monoline drawing, deliberately simple, closer to a quick confident architectural outline than a detailed illustration.
```

---

## E. Spot illustrations

### E1 · `notfound.png` — 404 page ("This scene didn't make the final cut")
```
Create a standalone landscape 3:2 (1536x1024) illustration for a refined film studio website. An empty director's chair alone on a bare stage floor under a single spotlight, the light cone drawn only as two thin lines, and a strip of film unspooled loosely on the floor beside the chair, curling away. Gentle, witty, a little wistful. STRICT STYLE: extremely minimalist LINE DRAWING, clean thin black contour strokes, very little detail, only essential silhouettes and contours, 80 percent empty plain flat warm ivory background #f6f0e5 with no paper texture and no vignette, a single small flat muted gold circle (#c9a061) as the only accent, as the spotlight lamp. Sparse airy composition with objects centred and inset well away from the edges. NO crosshatching, NO engraving, NO texture, NO shading, NO dense scenery, NO photorealism, NO filled black areas, NO typography, NO logos, NO text or watermark, NO borders. Elegant restrained editorial monoline drawing, deliberately simple, closer to a quick confident architectural outline than a detailed illustration.
```

### E2 · `success.png` — enquiry sent ("Your story is in good hands")
```
Create a standalone landscape 3:2 (1536x1024) illustration for a refined film studio website. A single diamond-shaped paper kite flying high on the right, its long tail ribbon with three small bows curving gracefully through the air; its string descends to a tiny figure standing on a gentle hill on the lower left, two soft hill contours and one distant palm. Joyful, light and hopeful. STRICT STYLE: extremely minimalist LINE DRAWING, clean thin black contour strokes, very little detail, only essential silhouettes and contours, 80 percent empty plain flat warm ivory background #f6f0e5 with no paper texture and no vignette, a single small flat muted gold circle (#c9a061) as the only accent, as the sun. Sparse airy composition with objects centred and inset well away from the edges. NO crosshatching, NO engraving, NO texture, NO shading, NO dense scenery, NO photorealism, NO filled black areas, NO typography, NO logos, NO text or watermark, NO borders. Elegant restrained editorial monoline drawing, deliberately simple, closer to a quick confident architectural outline than a detailed illustration.
```

---

## Quality checklist (regenerate if any fail)
- [ ] Landscape 3:2. If it comes back square or portrait, ask: "Regenerate as landscape 1536x1024."
- [ ] **No text anywhere**: no signs, letters, numbers, logos or watermarks. If any appear, ask: "Remove all text and lettering, keep everything else identical."
- [ ] Hands, fingers, faces and equipment look real (count fingers; camera parts make sense).
- [ ] Photos: warm amber highlights and deep charcoal shadows, consistent with the existing site. Avoid neon, oversaturated or HDR looks.
- [ ] Project covers and the showreel: the caption or headline area (bottom-left) stays calm and darker.
- [ ] Line drawings: thin black outlines only, mostly empty background, one small gold circle, no shading or texture.
- [ ] People portrayed respectfully and authentically, with no recognisable celebrities.
- [ ] File saved with the exact name in `website\public\assets\source\`.

## Do NOT generate with AI — request these from the studio
- **The original logo file** (SVG, AI, EPS or PDF). The site currently uses a cleaned extraction of the hand-lettered mark from a screenshot, with STUDIOS and the descriptor set in type. AI tools distort lettering, so please don't recreate the logo with ChatGPT.
- **Showreel video link** (YouTube or Vimeo). Paste it into `showreelUrl` in `public/config.js` and the "Premiering soon" label becomes a working play button.
- **Real project stills, titles and credits** to replace the illustrative concepts before launch.
- **Verified receiving email** (for the Web3Forms key) and the final **domain** (for `siteUrl`, canonical links and the sitemap).
