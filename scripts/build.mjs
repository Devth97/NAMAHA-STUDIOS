// Static production build: copies public/ to dist/ and prerenders every route to complete HTML,
// so content, titles and social tags are present before any JavaScript runs.
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { renderDocument, pageMeta } from '../public/render.js';
import { siteConfig } from '../public/config.js';

const source = fileURLToPath(new URL('../public/', import.meta.url));
const target = fileURLToPath(new URL('../dist/', import.meta.url));
try { await rm(target, { recursive: true, force: true }); } catch { /* a locked dist/ is overwritten below */ }
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true, force: true, filter: path => !/[\\/]assets[\\/]source([\\/]|$)/.test(path) && !/(home|about|services|work|gallery|contact)-reference\.jpg$/.test(path) });

const template = await readFile(new URL('../public/index.html', import.meta.url), 'utf8');
for (const page of Object.keys(pageMeta)) {
  const file = page === 'home' ? 'index.html' : `${page}.html`;
  await writeFile(new URL(`../dist/${file}`, import.meta.url), renderDocument(template, page));
}

const origin = siteConfig.siteUrl?.replace(/\/$/, '');
const indexable = Boolean(siteConfig.allowIndexing && origin);
await writeFile(new URL('../dist/robots.txt', import.meta.url), indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
if (indexable) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = Object.entries(pageMeta).filter(([page]) => page !== '404').map(([, meta]) => `  <url><loc>${origin}${meta.path}</loc><lastmod>${today}</lastmod></url>`).join('\n');
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
console.log(`Prerendered ${Object.keys(pageMeta).length} pages (including 404) into dist/. Indexing ${indexable ? 'ENABLED' : 'disabled (preview)'}.`);
