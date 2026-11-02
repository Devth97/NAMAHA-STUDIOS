import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { renderDocument, renderBody, resolvePage, pageMeta } from '../public/render.js';
import { fieldError, validateEnquiry } from '../public/enquiry.js';

const template = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');

test('every route prerenders with one h1, unique ids and its own title', () => {
  for (const page of Object.keys(pageMeta)) {
    const html = renderDocument(template, page);
    assert.doesNotMatch(html, /\$\{/, `${page}: no unevaluated template text`);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, page);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${page} ids`);
    assert.equal((html.match(/<title>/g) || []).length, 1, `${page} single title`);
    assert.ok(html.includes(pageMeta[page].title.replace('&', '&amp;')), `${page} title`);
  }
});

test('preview builds stay out of search results; production builds become indexable', () => {
  assert.match(renderDocument(template, 'home'), /noindex,nofollow/);
  const live = renderDocument(template, 'home', { siteUrl: 'https://example.com', allowIndexing: true, instagram: 'https://instagram.com/x' });
  assert.doesNotMatch(live, /noindex/);
  assert.match(live, /<link rel="canonical" href="https:\/\/example\.com\/">/);
  assert.match(live, /og:image" content="https:\/\/example\.com\/assets\/og-image\.jpg"/);
});

test('routes resolve, including unknown paths to the 404 page', () => {
  assert.equal(resolvePage('/'), 'home');
  assert.equal(resolvePage('/index.html'), 'home');
  assert.equal(resolvePage('/work.html'), 'work');
  assert.equal(resolvePage('/nope.html'), '404');
});

test('the mobile menu, showreel and kites canvas are present in the markup', () => {
  const html = renderBody('home');
  assert.match(html, /aria-controls="navigation"/);
  assert.match(html, /showreel/);
  assert.match(html, /<canvas id="kites"/);
});

test('inline validation reports single fields and accepts optional extras', () => {
  assert.equal(fieldError('phone', ''), '');
  assert.ok(fieldError('phone', 'call me'));
  assert.equal(fieldError('phone', '+91 98450 00000'), '');
  assert.ok(fieldError('budget', 'a million dollars'));
  assert.equal(fieldError('budget', ''), '');
  const valid = { name: 'A', email: 'a@example.com', type: 'Digital Content', message: 'Hello', budget: 'Not sure yet', timeline: 'Within 3 months' };
  assert.deepEqual(validateEnquiry(valid), {});
});
