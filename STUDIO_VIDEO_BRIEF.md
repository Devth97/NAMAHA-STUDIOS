# Film-crew animation for the header strip

## 20 November — original monochrome equipment timeline

The client's new production-process reference is directional only. The header now uses original hand-drawn SVG equipment scenes rather than the earlier video panels: concept notes, storyboard, cinema camera, studio light, editing desk and final screen. Small mechanical actions happen inside each scene. Desktop has one row of six; phones have two rows of three without horizontal scrolling. Mostly black-and-white and no dominant human figures. Existing global pause, reduced-motion preference, visibility and offscreen controls stop motion. No external video generation or new video footage was used. Earlier video experiments below are historical.


## Latest request — fill header with spacing, then blend paper colour

User authorized spacing between activities to fill the same compact header without squashing figures. Prepared five proportionally scaled spatial groups (van, storyboard, director/camera, tea/lighting, editing) across a 2880 x 176 video. Original chronology retained. Then normalized the source and added paper to neutral white, removing the source's peach tint and rectangular panels. Existing multiply blending lets the site's paper show through. Latest files: `namaha-letterhead-blended-v4.mp4` and matching first-frame WebP. No stretch or new character motion. This replaces earlier requests to keep the unmodified composition.


## Latest correction — remove stretched people

The user identified stretched/squashed people as the defect. Restored object-fit:contain for video and poster. The source remains unchanged, the full frame remains visible, and the compact band stays 88–120px high. Side space is retained as necessary to preserve natural proportions; no cropping, stretching or splitting.


## Latest explicit request — stretch to fill the whole header section

The user explicitly requested stretching the video across the full header section. Both video and first-frame poster now use width:100%, height:100%, object-fit:fill. This removes side space, shows the complete original frame, and intentionally changes its proportions to fit the existing 88–120px band. No scene splitting or media-file edits. This supersedes the earlier no-stretch/contain instructions below.


## Latest request — complete supplied frame in slim strip

The supplied `Namaha silent letterhead (1).mp4` is already installed byte-for-byte (SHA-256 checked). Removed all vertical crop offsets. Both video and poster now occupy the band with object-fit:contain, showing the complete source frame at native proportions without any splitting, stretching or cropping. The header remains 88–120px high. Side space is inherent to fitting this 16:9 source inside the wide slim band.


## Latest source — Namaha silent letterhead (1).mp4

Installed the new supplied file unchanged as `namaha-silent-letterhead-v2.mp4`, with its own first-frame poster. One uninterrupted video loops on all routes. Header band is 88–120px high. The full-width source crew scene is displayed at native proportions in a centred 16:5 window, removing only blank paper above/below (source y=240–840). No groups are split, repositioned, duplicated or stretched. The original source itself already cuts the extreme left van/right editing desk at its frame edges; the site adds no horizontal crop. Because this file remains 16:9, a slim band necessarily has side space when retaining full-scene natural proportions. This limitation was stated before applying the update; it is not a full-width panoramic replacement. Earlier framing notes below are superseded.


## Latest instruction — increase height and restore natural proportions

The user now requests a taller full-width strip, all heads and feet visible, no distortion, no splitting and no added gaps. The original source MP4 remains unchanged. The stage uses width:100% and aspect-ratio:32/9, corresponding to the source's full-width 1920 x 540 active scene. The original full-frame video and matching poster occupy 200% of the stage height at width:100%, preserving their native 16:9 proportions exactly; top:-55% clips blank source paper outside y=297–837. Strip height now scales with viewport width (405px at 1440px, about 110px at 390px), with no maximum-height cap that could reintroduce cropping or compression. This supersedes the earlier thin-strip and compressed layouts below. All pages retain looping, global pause and reduced-motion support.


## Latest approved framing — compress the complete scene into the thin strip

The user explicitly selected: keep the thin strip and compress the full scene vertically. The original video remains byte-for-byte unchanged, unsplit and uninterrupted. Video and poster fill the full strip width with `object-fit:fill`, `height:200%` and `top:-55%`. This maps the complete active crew band (source y=297–837) into the existing 72–88px strip; only blank paper above and below falls outside the viewport. All heads and feet remain visible, with no added spacing. The deliberate vertical compression supersedes the preceding proportional cover crop.


## Latest correction — play the original video unchanged

The user rejected the spacing between separated activity groups. `studio-film-set-original-v1.mp4` is a byte-for-byte copy of the supplied Telegram video (SHA-256 verified), with its original composition, colour, timing and audio track. HTML playback is muted and loops the complete 4.96-second source. One continuous video is used on every route. No group extraction, recomposition, padding or added spacing. The original 72–88px strip remains; CSS fills the strip edge to edge with object-fit:cover and object-position:50% 35%, preserving the original proportions while cropping the upper/lower frame to the existing thin band. Both video and poster use width:100% and identical framing; there are no separate scene panels, stretched figures or added gaps. The full-frame first-frame poster uses identical CSS geometry. Earlier recomposed assets and instructions below are superseded.


## 14 November â€” final supplied thin-banner footage

Latest instruction: use `Animating_film-production_bannerâ€¦_7897032d_1080p.mp4` from the user's Telegram Desktop downloads, retaining the original thin strip. This supersedes the taller-band trial below. The source is 1920 x 1080, 24 fps, 119 frames / 4.9583 seconds. All frames are retained in chronological order, with silent normal forward looping. No reversed playback or artificial new motion.

Installed `studio-indian-film-set-banner-v1.mp4` (2560 x 160, fast-start H.264) and its matching first-frame WebP poster. Remove blank source paper with a 540px-tall crop starting at y=300, then retain four interacting spatial groups: x=0â€“440 (van), 440â€“740 (storyboard), 740â€“1344 (director/camera/tea), 1344â€“1920 (lighting/editing). Each group scales proportionally to 160px high and is centred within a 640px-wide slot. Camera and tea interactions remain together. Monochrome paper/contrast normalization blends the source into the site's paper without rectangular backgrounds. No figures are stretched.

The stationary stage remains 72â€“88px high on every page and scales the panoramic image proportionally, keeping all activities visible on phones. Global pause, reduced motion, document visibility and offscreen suspension remain supported. The earlier footage and taller-band trial below are historical only.

## 14 November â€” supplied film-set animation, first five seconds only

Latest user instruction replaces the earlier four-scene footage. Source: `C:/Users/KhalandarThameem/Downloads/Animation_of_film_production_set_3fe2b3d3_1080p.mp4` (1920 x 1080, 24 fps, 14.93 seconds). Installed `public/assets/studio-film-set-first-5s-v1.mp4`: exactly 120 frames / 5.00 seconds, silent H.264, fast-start MP4. No later footage, reverse playback, transition or crossfade is included. Normal HTML video looping returns directly to the opening frame.

The user selected a taller responsive band to preserve the complete 16:9 scene. One video replaces the four cropped players on every route. The stage is at most 960px wide, retains its 16:9 proportions, and scales down to the phone width. Its first-frame poster has identical geometry. Preserve global pause, reduced-motion fallback and offscreen suspension. Earlier missing-footage notes below are historical and superseded by this supplied animation.


## Latest scrolling and spacing request

Client now explicitly requests left-to-right strip travel on all devices in addition to character animation. Two identical four-scene sets form a continuous translating track. Desktop uses two viewport widths and a 48s loop; mobile uses a 1600px track and a 32s loop so all four activities pass through. The video track runs only during active playback and pauses offscreen or under the global motion control; reduced motion disables travel. Loading posters use identical duplicated framing. Hero top padding is 24px and desktop copy is top-aligned, removing the previously measured ~100px gap. Browser checks at 320/390/768/1440px confirm rightward travel, compact spacing, no overflow and pause/reduced-motion behaviour. Build/site verification passes.

## Full-width scene layout

Four equal-width video windows now position the four source quadrants across the entire desktop width without stretching people. Videos use the same cached v3 media URL. Height is 112% of the strip, offset -6% for another 12% enlargement; checked heads, feet and the boom against the available margins. Phones display the two central workstations and pause the hidden outer videos. Global pause/resume, reduced motion, offscreen pause, responsive 320/390/768/1440px playback and the production verification pass. The strip remains 72â€“88px tall.

## Larger crew within the same thin strip

`studio-crew-loop-v3.mp4` and matching v3 poster replace v2. Per-scene source crops use y/height 248/208 planning, 258/198 camera, 222/234 sound, 262/194 editing. Relative to v2, planning/camera/editing are about 20â€“29% larger, with a smaller 7% increase for the tall boom scene to retain the microphone. The four panels, complete timeline, strip dimensions and playback controls are unchanged. Inspected frames across all ten seconds for clipping, and checked browser playback at 320/390/768/1440px, global pause/resume, reduced motion and offscreen pause.

## Replacement clip installed

The user supplied `Film crew header loop (1).mp4` (1280Ã—720, 24fps, 10.04 seconds), a continuous wide scene with changing character poses. Replaced the previous montage with `studio-crew-loop-v2.mp4` (142,558 bytes) and matching v2 poster. Kept the complete source chronology, with no reverse playback or shot repetition. Four spatial crops at x=0/334/634/926, widths 334/300/292/354, y=210 and height=250 remove surrounding blank space; each is scaled to 176px high, padded to 480px width and combined into a 1920Ã—176 strip. White-level/grayscale correction blends the paper background. Existing desktop/mobile framing and reduced-motion/offscreen controls remain in place. The previous installation details below are historical.

## Installed supplied video â€” 13 November

Source: `C:/Users/KhalandarThameem/Downloads/Film crew header loop.mp4` (1280Ã—720, 24fps, 10.04s, 6.86MB, silent). The source cuts from the whole row into four close-ups; a direct header crop would cut off the figures. Extracted planning at 2â€“4s, camera at 4â€“6s, sound at 6â€“8s, editing at 8â€“10s. Each full frame is scaled into a 480Ã—176 panel, then stacked into one 1920Ã—176 video. The 2-second sequence is followed by its reverse to avoid an abrupt loop reset. Grayscale/white-level correction lets its background blend into the paper. This preserves the supplied shot content; it does not generate new character motion. Movement within the supplied shots is minimal.

Installed `public/assets/studio-crew-loop-v1.mp4` (145,784 bytes) and `studio-crew-poster-v1.webp`. `studioVideoUrl` points to this clip. Desktop fits all four complete scenes; phones use a centred window on the camera/sound panels. No dedicated pause button or sliding stickers. Browser checks passed at 320, 390, 768 and 1440px: advancing playback, global pause/resume, reduced-motion fallback, offscreen pause, no page errors or horizontal overflow. All 25 tests and the production build/site verification pass. Updates are on the local trial branch pending publication.

## 14 November â€” latest client feedback

The supplied Kannada transcription supersedes the earlier request to scroll the strip. Keep a stationary full-width stage on every route, including phones, with crew actions taking place inside it. The current implementation displays all four existing activities without a marquee or duplicated scene sets; video and first-frame poster use matching geometry. Global pause, reduced motion and offscreen suspension remain supported.

New footage is still required for the client's complete film-set concept: a production van arriving, a camera operator interacting with a director, a tea assistant carrying cups and serving the crew, storyboard discussions and a lighting technician walking in with a light. Actions should overlap naturally and may enter, leave or change within the fixed stage. The existing v3 footage contains planning, camera, sound and editing actions only; do not describe it as delivering the additional interactions. Supply a panoramic desktop clip and a phone composition that keeps all actions readable, using the same lightly detailed hand-drawn style.

The following earlier generation brief is retained for future replacement footage; the latest feedback above takes precedence.

Create a genuine character-animation video, not cutout figures drifting sideways. Existing starter artwork: `public/assets/studio-strip-planning.webp`, `studio-strip-camera.webp`, `studio-strip-sound.webp` and `studio-strip-editing.webp`. Use the client's original crew illustrations as the primary style reference when the model accepts them.

## Preferred delivery

- Silent MP4, 8â€“10 seconds, 24 or 30fps, clean seamless loop, stationary camera.
- Prefer a panoramic 8:1 composition (for example 2560Ã—320) if the model supports it. The header strip is even wider on desktop; final crop is adjusted during integration.
- A 1920Ã—1080 16:9 video can be used, but filling an 88px-high desktop strip cuts away most of its height. For that output, place COMPLETE figures and all important action within the middle 10% of the frame height, with generous plain space above and below. Do not make full-height people and expect their heads and feet to survive the crop.
- For phones, ideally provide an additional 5:1 clip with two activities. Otherwise we will select a suitable crop; all desktop activities cannot remain readable in 72px height on a phone.
- Plain warm ivory background (#f6f0e5), fine charcoal-black ink drawing. No music, captions, logos or camera movement. Export without watermark if your plan permits it.

## Prompt to paste into the video model

Animate this hand-inked film-production illustration as a living scene. Preserve the reference drawing's detailed human anatomy, clothing folds, recognizable professional cinema equipment, fine black pen lines and sparse light hatching. Static locked camera. Keep the people and equipment anchored in their original places. The scriptwriter subtly turns a page; the storyboard artist makes a small natural pointing gesture; the crouching camera operator adjusts the focus ring while the dolly rolls a few centimetres and returns; the seated director gives a restrained hand cue; the sound recordist gently adjusts the boom; the editor's hands type briefly while footage changes subtly on the monitors. Activities happen at different moments, relaxed and natural, with pauses. No synchronized bobbing, no sticker translation, no sliding panorama, no rubbery limbs, no morphing faces, no extra fingers, no new props, no text, no scene cuts, no zoom or pan. Keep the background flat warm ivory. Finish in the same pose as the opening for a seamless 8â€“10 second silent loop.

For 16:9 output append: All complete people and equipment must sit in a single very narrow horizontal band centred vertically, occupying only the middle 10% of frame height, with plain empty background in the upper and lower 45%. The video will be cropped into a website header-height panoramic strip. Keep the important action centred horizontally for a phone crop.

## Website integration

`siteConfig.studioVideoUrl` in `public/config.js` is empty until an actual animation is supplied. No missing-file URL is installed. Once a clip is provided, put the optimised video in `public/assets/` and configure its relative path. The slot supports muted inline looping playback, pauses offscreen/in background, respects reduced motion and the existing global motion setting, and falls back to still artwork on playback failure. The dedicated strip pause button and all CSS sticker movement have been removed at the user's request. Actual video playback/cropping cannot be approved until a real clip is installed.
