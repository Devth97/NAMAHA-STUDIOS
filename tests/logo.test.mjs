import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { logo } from '../public/components.js';
test('supplied logo uses scalable paths instead of a filtered raster', () => {
  const html = logo();
  assert.match(html, /namaha-logo-vector-v3\.svg#symbol/);
  assert.match(html, /namaha-logo-vector-v3\.svg#wordmark/);
  assert.doesNotMatch(html, /<image\b|<filter\b|\.jpe?g|data:image/);
  const vector = readFileSync(new URL('../public/assets/namaha-logo-vector-v3.svg',import.meta.url),'utf8');
  assert.match(vector, /<path\b/);
  assert.doesNotMatch(vector, /<image\b|<filter\b|data:image/);
  for (const color of ['#BF1E2E','#EA6B04','#E84F3F']) assert.ok(vector.toUpperCase().includes(color));
});
