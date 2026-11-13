// Shared by the build (static prerender), the preview server and the browser fallback.
import { header, footer, closing, dialogShell, esc, whatsappButton } from './components.js';
import { pages } from './pages.js';
import { movingFilmStrip } from './film-strip.js';
import { art } from './data.js';
import { siteConfig } from './config.js';
import { studioMotion } from './studio-motion.js';

export const pageMeta = {
  home: { path: '/', title: 'Namaha Studios — Stories that move the world', description: 'Namaha Studios is a film, television and entertainment studio — from the first spark of an idea to stories that stay with people.', image: 'hero' },
  about: { path: '/about.html', title: 'Our Story — Namaha Studios', description: 'Meet Namaha Studios: the belief, values and creative approach behind our film, television and entertainment work.', image: 'aboutHero' },
  services: { path: '/services.html', title: 'Services — Film, Television & Brand Films | Namaha Studios', description: 'Film production, television content, entertainment projects, creative development, commercials, brand films and digital content.', image: 'servicesHero' },
  work: { path: '/work.html', title: 'Work — Namaha Studios', description: 'Explore Namaha Studios concepts across film, television, brand films, live events and digital storytelling.', image: 'workHero' },
  gallery: { path: '/gallery.html', title: 'Behind the Lens — Namaha Studios', description: 'The people, places and moments between the takes at Namaha Studios.', image: 'galleryHero' },
  contact: { path: '/contact.html', title: 'Contact — Start a Project | Namaha Studios', description: 'Tell Namaha Studios about your film, series, brand story or event. We read every enquiry personally.', image: 'contactHero' },
  '404': { path: '/404.html', title: 'Page not found — Namaha Studios', description: 'This scene didn’t make the final cut. Find your way back to Namaha Studios.', image: 'notFound' }
};

export const resolvePage = pathname => {
  const slug = pathname.split('/').filter(Boolean).pop()?.replace(/\.html$/, '') || 'home';
  if (slug === 'index') return 'home';
  return Object.hasOwn(pages, slug) ? slug : '404';
};

export function renderBody(page) {
  const film = page === 'work' ? movingFilmStrip() : '';
  const end = page === '404' ? '' : closing(page);
  const flower = `<div class="ixora-scatter" data-ixora-scatter aria-hidden="true" hidden>${Array.from({length:6},(_,i)=>`<img class="scatter-flower scatter-flower-${i}" src="./assets/ixora-orange-open.webp" alt="" width="40" height="40">`).join('')}${Array.from({length:5},(_,i)=>`<img class="scatter-bud scatter-bud-${i}" src="./assets/ixora-orange-bud.webp" alt="" width="48" height="48">`).join('')}</div><img class="ixora-flight" data-ixora src="./assets/ixora-orange-bud.webp" width="34" height="34" alt="" aria-hidden="true" hidden>`;
  return `<div id="top"></div><canvas id="kites" aria-hidden="true"></canvas>${header(page)}${flower}<main id="main" tabindex="-1">${page === 'home' ? studioMotion() : ''}${pages[page]()}${film}${end}</main>${footer()}${page === 'contact' ? '' : whatsappButton(true)}${dialogShell()}`;
}

export function renderHead(page, config = siteConfig) {
  const meta = pageMeta[page];
  const origin = config.siteUrl?.replace(/\/$/, '') || '';
  const absolute = path => origin ? origin + path : path.replace(/^\//, './');
  const share = absolute('/assets/og-image.jpg');
  const indexable = Boolean(config.allowIndexing && origin) && page !== '404';
  const hero = art[meta.image].replace(/\.jpg$/, '');
  const organisation = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Namaha Studios', description: pageMeta.home.description, ...(config.email ? {email:config.email} : {}), ...(config.phoneNumber ? {telephone:'+'+config.phoneNumber} : {}), sameAs: [config.instagram], ...(config.location ? { address: { '@type': 'PostalAddress', addressLocality: config.location.split(',')[0].trim(), addressRegion: config.location.split(',')[1]?.trim() || undefined, addressCountry: 'IN' } } : {}), ...(origin ? { url: origin, logo: origin + '/assets/icon-512.png' } : {}) };
  return [
    page === '404' ? '<base href="/">' : '',
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
    indexable ? '' : '<meta name="robots" content="noindex,nofollow">',
    origin ? `<link rel="canonical" href="${origin}${meta.path === '/' ? '/' : meta.path}">` : '',
    '<meta property="og:site_name" content="Namaha Studios">',
    '<meta property="og:type" content="website">',
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:image" content="${share}">`,
    '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Namaha Studios — Stories that move the world">',
    origin ? `<meta property="og:url" content="${origin}${meta.path}">` : '',
    '<meta property="og:locale" content="en_IN">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<link rel="preload" as="image" type="image/webp" imagesrcset="${hero}-480.webp 480w, ${hero}-960.webp 960w, ${hero}.webp 1536w" imagesizes="(max-width: 760px) calc(100vw - 48px), 70vw" fetchpriority="high">`,
    page === 'home' ? `<script type="application/ld+json">${JSON.stringify(organisation).replace(/</g, '\\u003c')}</script>` : ''
  ].filter(Boolean).join('\n  ');
}

export function renderDocument(template, page, config = siteConfig) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--head-->', renderHead(page, config))
    .replace('<div id="app"></div>', `<div id="app" data-page="${page}" data-prerendered>${renderBody(page)}</div>`);
}
