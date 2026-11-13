# Film-crew animation for the header strip

## Latest scrolling and spacing request

Client now explicitly requests left-to-right strip travel on all devices in addition to character animation. Two identical four-scene sets form a continuous translating track. Desktop uses two viewport widths and a 48s loop; mobile uses a 1600px track and a 32s loop so all four activities pass through. The video track runs only during active playback and pauses offscreen or under the global motion control; reduced motion disables travel. Loading posters use identical duplicated framing. Hero top padding is 24px and desktop copy is top-aligned, removing the previously measured ~100px gap. Browser checks at 320/390/768/1440px confirm rightward travel, compact spacing, no overflow and pause/reduced-motion behaviour. Build/site verification passes.

## Full-width scene layout

Four equal-width video windows now position the four source quadrants across the entire desktop width without stretching people. Videos use the same cached v3 media URL. Height is 112% of the strip, offset -6% for another 12% enlargement; checked heads, feet and the boom against the available margins. Phones display the two central workstations and pause the hidden outer videos. Global pause/resume, reduced motion, offscreen pause, responsive 320/390/768/1440px playback and the production verification pass. The strip remains 72–88px tall.

## Larger crew within the same thin strip

`studio-crew-loop-v3.mp4` and matching v3 poster replace v2. Per-scene source crops use y/height 248/208 planning, 258/198 camera, 222/234 sound, 262/194 editing. Relative to v2, planning/camera/editing are about 20–29% larger, with a smaller 7% increase for the tall boom scene to retain the microphone. The four panels, complete timeline, strip dimensions and playback controls are unchanged. Inspected frames across all ten seconds for clipping, and checked browser playback at 320/390/768/1440px, global pause/resume, reduced motion and offscreen pause.

## Replacement clip installed

The user supplied `Film crew header loop (1).mp4` (1280×720, 24fps, 10.04 seconds), a continuous wide scene with changing character poses. Replaced the previous montage with `studio-crew-loop-v2.mp4` (142,558 bytes) and matching v2 poster. Kept the complete source chronology, with no reverse playback or shot repetition. Four spatial crops at x=0/334/634/926, widths 334/300/292/354, y=210 and height=250 remove surrounding blank space; each is scaled to 176px high, padded to 480px width and combined into a 1920×176 strip. White-level/grayscale correction blends the paper background. Existing desktop/mobile framing and reduced-motion/offscreen controls remain in place. The previous installation details below are historical.

## Installed supplied video — 13 November

Source: `C:/Users/KhalandarThameem/Downloads/Film crew header loop.mp4` (1280×720, 24fps, 10.04s, 6.86MB, silent). The source cuts from the whole row into four close-ups; a direct header crop would cut off the figures. Extracted planning at 2–4s, camera at 4–6s, sound at 6–8s, editing at 8–10s. Each full frame is scaled into a 480×176 panel, then stacked into one 1920×176 video. The 2-second sequence is followed by its reverse to avoid an abrupt loop reset. Grayscale/white-level correction lets its background blend into the paper. This preserves the supplied shot content; it does not generate new character motion. Movement within the supplied shots is minimal.

Installed `public/assets/studio-crew-loop-v1.mp4` (145,784 bytes) and `studio-crew-poster-v1.webp`. `studioVideoUrl` points to this clip. Desktop fits all four complete scenes; phones use a centred window on the camera/sound panels. No dedicated pause button or sliding stickers. Browser checks passed at 320, 390, 768 and 1440px: advancing playback, global pause/resume, reduced-motion fallback, offscreen pause, no page errors or horizontal overflow. All 25 tests and the production build/site verification pass. Updates are on the local trial branch pending publication.

The following generation brief is retained for future replacement footage.

Create a genuine character-animation video, not cutout figures drifting sideways. Existing starter artwork: `public/assets/studio-strip-planning.webp`, `studio-strip-camera.webp`, `studio-strip-sound.webp` and `studio-strip-editing.webp`. Use the client's original crew illustrations as the primary style reference when the model accepts them.

## Preferred delivery

- Silent MP4, 8–10 seconds, 24 or 30fps, clean seamless loop, stationary camera.
- Prefer a panoramic 8:1 composition (for example 2560×320) if the model supports it. The header strip is even wider on desktop; final crop is adjusted during integration.
- A 1920×1080 16:9 video can be used, but filling an 88px-high desktop strip cuts away most of its height. For that output, place COMPLETE figures and all important action within the middle 10% of the frame height, with generous plain space above and below. Do not make full-height people and expect their heads and feet to survive the crop.
- For phones, ideally provide an additional 5:1 clip with two activities. Otherwise we will select a suitable crop; all desktop activities cannot remain readable in 72px height on a phone.
- Plain warm ivory background (#f6f0e5), fine charcoal-black ink drawing. No music, captions, logos or camera movement. Export without watermark if your plan permits it.

## Prompt to paste into the video model

Animate this hand-inked film-production illustration as a living scene. Preserve the reference drawing's detailed human anatomy, clothing folds, recognizable professional cinema equipment, fine black pen lines and sparse light hatching. Static locked camera. Keep the people and equipment anchored in their original places. The scriptwriter subtly turns a page; the storyboard artist makes a small natural pointing gesture; the crouching camera operator adjusts the focus ring while the dolly rolls a few centimetres and returns; the seated director gives a restrained hand cue; the sound recordist gently adjusts the boom; the editor's hands type briefly while footage changes subtly on the monitors. Activities happen at different moments, relaxed and natural, with pauses. No synchronized bobbing, no sticker translation, no sliding panorama, no rubbery limbs, no morphing faces, no extra fingers, no new props, no text, no scene cuts, no zoom or pan. Keep the background flat warm ivory. Finish in the same pose as the opening for a seamless 8–10 second silent loop.

For 16:9 output append: All complete people and equipment must sit in a single very narrow horizontal band centred vertically, occupying only the middle 10% of frame height, with plain empty background in the upper and lower 45%. The video will be cropped into a website header-height panoramic strip. Keep the important action centred horizontally for a phone crop.

## Website integration

`siteConfig.studioVideoUrl` in `public/config.js` is empty until an actual animation is supplied. No missing-file URL is installed. Once a clip is provided, put the optimised video in `public/assets/` and configure its relative path. The slot supports muted inline looping playback, pauses offscreen/in background, respects reduced motion and the existing global motion setting, and falls back to still artwork on playback failure. The dedicated strip pause button and all CSS sticker movement have been removed at the user's request. Actual video playback/cropping cannot be approved until a real clip is installed.
