import assert from 'node:assert/strict';
import { access, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pages } from '../public/pages.js';
import { header, footer, closing, dialogShell } from '../public/components.js';
import { movingFilmStrip } from '../public/film-strip.js';
import { art } from '../public/data.js';

const root = new URL('../dist/', import.meta.url);
let references = 0;
for (const [name, render] of Object.entries(pages)) {
  const filename = name === 'home' ? 'index.html' : `${name}.html`;
  await access(new URL(filename, root));
  const template = await readFile(new URL(filename, root), 'utf8');
  const html = `${header(name)}<main>${render()}${name === 'work' ? movingFilmStrip() : ''}${closing(name)}</main>${footer()}${dialogShell()}`;
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${name}: exactly one main heading`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${name}: unique element ids`);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(match[0], /\balt="[^"]*"/, `${name}: image alternative text`);
    assert.match(match[0], /\bsrcset="[^"]*480w[^\"]*960w/, `${name}: responsive image sources`);
  }
  for (const match of (template + html).matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    const path = match[1] === './' ? 'index.html' : match[1];
    await access(new URL(path, root));
    references++;
  }
}
let originalBytes = 0, phoneBytes = 0;
for (const image of Object.values(art)) {
  originalBytes += (await stat(new URL(image, root))).size;
  phoneBytes += (await stat(new URL(image.replace('.jpg', '-480.jpg'), root))).size;
  await access(new URL(image.replace('.jpg', '-960.jpg'), root));
}
console.log(`PASS: six built routes, unique IDs, headings, responsive image markup, ${references} local references, and all 66 image files.`);
console.log(`480px image set: ${(phoneBytes/1024/1024).toFixed(2)} MB versus ${(originalBytes/1024/1024).toFixed(2)} MB full-size (${Math.round((1-phoneBytes/originalBytes)*100)}% smaller). Actual transfer depends on screen size, pixel density and lazy loading.`);
