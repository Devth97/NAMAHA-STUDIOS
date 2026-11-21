import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decorateArtwork } from '../public/art-motion.js';

test('reel animation does not overlay rotating copies of the complete raster drawing', () => {
  const picture = '<picture><img src="hero.jpg" alt="A camera"></picture>';
  const result = decorateArtwork('hero', picture, './assets/hero-colour-pencil-line.jpg');
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
  for (const key of ['hero','galleryHero','contactHero']) {
    assert.doesNotMatch(decorateArtwork(key, '<picture></picture>'), /data-artwork-video|services-dolly-loop/);
  }
});
