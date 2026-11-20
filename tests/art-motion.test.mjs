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
