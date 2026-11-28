import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decorateArtwork } from '../public/art-motion.js';

test('reel animation does not overlay rotating copies of the complete raster drawing', () => {
  const picture = '<picture><img src="hero.jpg" alt="A camera"></picture>';
  const result = decorateArtwork('aboutHero', picture, './assets/aboutHero-equipment-v2-line.jpg');
  assert.doesNotMatch(result, /<image\b/, 'a rotated full raster can expose duplicate reels');
  assert.equal((result.match(/<picture>/g) || []).length, 1, 'keep one accessible source drawing');
  assert.match(result, /ink-mounted-rotor/, 'animate the wheel inside a fixed mounting');
});

test('photographic content is never given decorative motion', () => {
  const picture = '<picture><img src="portrait.jpg" alt="Studio portrait"></picture>';
  assert.equal(decorateArtwork('portrait', picture, './assets/portrait-hq.jpg'), picture);
});


test('Services uses the supplied silent looping video with its accessible still fallback', () => {
  const picture = '<picture><img src="services.jpg" alt="Camera on dolly tracks"></picture>';
  const html = decorateArtwork('servicesHero', picture);
  assert.match(html, /data-artwork-video/);
  assert.match(html, /muted loop playsinline/);
  assert.match(html, /services-dolly-loop-v1\.mp4/);
  assert.ok(html.includes(picture));
  assert.doesNotMatch(html, /ink-detail-servicesHero/, 'do not add simulated motion over the supplied video');
});

test('supplied Services video is not added to other page illustrations', () => {
  for (const key of ['aboutHero','workHero']) {
    assert.doesNotMatch(decorateArtwork(key, '<picture></picture>'), /data-artwork-video|services-dolly-loop/);
  }
});

test('Gallery uses its own supplied video and still without simulated reel overlays', () => {
  const picture = '<picture><img alt="Hanging contact sheets and studio light"></picture>';
  const html = decorateArtwork('galleryHero', picture);
  assert.match(html, /gallery-papers-loop-v1\.mp4/);
  assert.match(html, /gallery-papers-v1-line\.webp/);
  assert.match(html, /muted loop playsinline/);
  assert.ok(html.includes(picture));
  assert.doesNotMatch(html, /ink-mounted-rotor|services-dolly/);
});

test('Contact uses its supplied desk video with a still fallback and no simulated light overlay', () => {
  const picture = '<picture><img alt="Telephone, notebook and desk lamp"></picture>';
  const html = decorateArtwork('contactHero', picture);
  assert.match(html, /contact-desk-loop-v1\.mp4/);
  assert.match(html, /contact-desk-v1-line\.webp/);
  assert.match(html, /muted loop playsinline/);
  assert.ok(html.includes(picture));
  assert.doesNotMatch(html, /ink-detail-contactHero|services-dolly|gallery-papers/);
});

test('Home tells the expanded story with twelve sketches and a blank-book fallback', () => {
  const picture = '<picture><img alt="Indian film production journey"></picture>';
  const html = decorateArtwork('hero', picture);
  assert.match(html, /data-home-story/);
  assert.match(html, /data-opening="blank-book"/);
  assert.equal((html.match(/class="story-scene"/g) || []).length, 12);
  const keys = ['walk','river','writing','planning','vans','lighting','tea','acting','dolly','editing','cinema','watching'];
  let previous = -1;
  for (const key of keys) {
    const position = html.indexOf(`data-story-scene="${key}"`);
    assert.ok(position > previous, key + ' must follow the previous stage');
    previous = position;
  }
  assert.ok(html.includes(picture));
  assert.doesNotMatch(html, /<video|home-production-loop|ink-mounted-rotor|\sstyle=/, 'scene timing must work under the production CSP');
});
