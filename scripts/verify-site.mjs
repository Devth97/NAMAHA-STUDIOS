// Post-build checks on the real prerendered output in dist/.
import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import { pageMeta } from '../public/render.js';
import { art } from '../public/data.js';

const root = new URL('../dist/', import.meta.url);
const exists = async path => { try { await access(new URL(path, root)); return true; } catch { return false; } };
let references = 0;
for (const page of Object.keys(pageMeta)) {
  const file = page === 'home' ? 'index.html' : `${page}.html`;
  const html = await readFile(new URL(file, root), 'utf8');
  assert.ok(html.includes('data-prerendered'), `${page}: prerendered markup`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page}: exactly one h1`);
  assert.match(html, /<title>[^<]{10,}<\/title>/, `${page}: title`);
  assert.match(html, /<meta name="description" content="[^"]{50,}">/, `${page}: meta description`);
  assert.match(html, /<meta property="og:image" content="[^"]+og-image\.jpg">/, `${page}: social image`);
  assert.match(html, /<main id="main"/, `${page}: main landmark`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: unique element ids (${ids.filter((id, i) => ids.indexOf(id) !== i)})`);
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(img, /\balt="[^"]*"/, `${page}: image alternative text`);
    assert.match(img, /\bwidth="\d+" height="\d+"/, `${page}: intrinsic image size`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    const path = match[1] === './' ? 'index.html' : match[1].replace(/^\.\//, '');
    assert.ok(await exists(path), `${page}: missing ${path}`);
    references++;
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const path = candidate.trim().split(/\s+/)[0].replace(/^\.\//, '');
      assert.ok(await exists(path), `${page}: missing responsive image ${path}`);
    }
  }
}
let stale = 0, phoneBytes = 0, fullBytes = 0;
for (const image of Object.values(art)) {
  const master = (await stat(new URL(image, root))).mtimeMs;
  for (const variant of ['-480.webp', '-960.webp', '.webp']) {
    const path = new URL(image.replace('.jpg', variant), root);
    if ((await stat(path)).mtimeMs + 1000 < master) { stale++; console.warn(`STALE: ${image.replace('.jpg', variant)} is older than ${image} — run npm run assets`); }
  }
  phoneBytes += (await stat(new URL(image.replace('.jpg', '-480.webp'), root))).size;
  fullBytes += (await stat(new URL(image, root))).size;
}
assert.equal(stale, 0, 'image variants are out of date');
for (const path of ['robots.txt', 'site.webmanifest', 'assets/og-image.jpg', 'assets/apple-touch-icon.png', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/namaha-script-ink.png']) assert.ok(await exists(path), `missing ${path}`);
console.log(`PASS: ${Object.keys(pageMeta).length} prerendered pages, one h1 each, unique IDs, meta + social tags, ${references} local references, ${Object.keys(art).length} artworks × 6 variants.`);
console.log(`Phone (480px WebP) artwork set: ${(phoneBytes / 1024 / 1024).toFixed(2)} MB versus ${(fullBytes / 1024 / 1024).toFixed(2)} MB of full-size JPEG masters.`);
