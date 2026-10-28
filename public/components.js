import { references, art, services } from './data.js';

export const esc = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
export const arrow = '<span aria-hidden="true">↗</span>';

const paths = {
  reel: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="3"/><circle cx="24" cy="13" r="4"/><circle cx="14" cy="24" r="4"/><circle cx="34" cy="24" r="4"/><circle cx="24" cy="35" r="4"/><path d="M35 37q5 8 10 2"/>',
  tv: '<rect x="7" y="12" width="34" height="27" rx="4"/><rect x="11" y="16" width="23" height="18" rx="3"/><path d="m17 5 7 7 8-8M15 43h18M37 20h1m-1 6h1"/>',
  spark: '<path d="m24 4 5 13 14 2-11 9 3 15-11-8-12 8 3-15-10-9 14-2zM5 3l3 4M43 5l-3 4"/>',
  bulb: '<path d="M17 32c0-7-6-7-6-16a13 13 0 0 1 26 0c0 9-6 9-6 16M17 33h14m-13 5h12m-10 5h8M24 32V20m-5-4 5 4 5-4M3 17H0m48 0h-3M7 4 4 1m37 3 3-3"/>',
  camera: '<path d="M7 15h8l3-6h12l4 6h7v25H7z"/><circle cx="25" cy="27" r="9"/><circle cx="25" cy="27" r="5"/><path d="M10 19h4m21 0h3M7 11h7"/>',
  screen: '<rect x="5" y="7" width="38" height="28" rx="2"/><path d="m20 15 11 6-11 6zM24 35v7M14 43h20"/>',
  instagram: '<rect x="6" y="6" width="36" height="36" rx="10"/><circle cx="24" cy="24" r="9"/><circle cx="35" cy="13" r="1"/>',
  people: '<circle cx="24" cy="15" r="7"/><path d="M11 41v-7a13 13 0 0 1 26 0v7M8 12a6 6 0 0 0 0 12m32-12a6 6 0 0 1 0 12M3 40v-9m42 9v-9"/>',
  heart: '<path d="M24 41 6 24C-6 10 13-2 24 12 35-2 54 10 42 24z"/>',
  leaf: '<path d="M7 42C4 22 14 8 40 5c4 26-8 37-26 32M10 38l24-25M21 27l-1-11m1 11 12-1"/>',
  mail: '<rect x="5" y="10" width="38" height="28" rx="2"/><path d="m5 11 19 15 19-15"/>',
  pin: '<path d="M39 20c0 12-15 25-15 25S9 32 9 20a15 15 0 0 1 30 0Z"/><circle cx="24" cy="20" r="5"/>'
};
export const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;

export function crop(key, label = '', className = '') {
  const [source, x, y, width, height] = art[key];
  return `<svg class="crop ${className}" viewBox="${x} ${y} ${width} ${height}" preserveAspectRatio="xMidYMid slice" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'}><image href="${references[source]}" width="853" height="1280"/></svg>`;
}
export const logo = () => `<svg class="logo" viewBox="55 5 240 91" role="img" aria-label="Namaha Studios — Film, Television, Entertainment"><image href="${references.home}" width="853" height="1280"/></svg>`;
export const button = (label, href, style = '') => `<a class="button ${style}" href="${href}">${label}${arrow}</a>`;
export const sectionHead = (eyebrow, title, extra = '') => `<div class="section-head reveal"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${extra}</div>`;

export function header(page) {
  const pages = [['home','Home'],['about','About'],['services','Services'],['work','Work'],['gallery','Gallery'],['contact','Contact']];
  return `<header class="header"><div class="header-inner"><a href="./" class="brand" aria-label="Namaha Studios home">${logo()}</a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation"><span></span><span></span><span class="sr-only">Open menu</span></button><nav id="navigation" aria-label="Main navigation">${pages.map(([key,name]) => `<a ${page === key ? 'aria-current="page"' : ''} href="${key === 'home' ? './' : `./${key}.html`}">${name}</a>`).join('')}</nav><a class="social" href="https://www.instagram.com/namaha_studios/" aria-label="Namaha Studios on Instagram" target="_blank" rel="noopener noreferrer">${icon('instagram')}</a></div></header>`;
}
export function hero({ eyebrow = 'FILM · TELEVISION · ENTERTAINMENT', title, copy, artwork = 'hero', home = false }) {
  return `<section class="hero ${home ? 'home-hero' : 'inner-hero'}"><canvas id="pigment" aria-hidden="true"></canvas><div class="hero-inner"><div class="hero-copy"><p class="eyebrow hero-eyebrow">${eyebrow}</p><h1>${title}</h1><div class="gold-rule"></div><p class="hero-description">${copy}</p><div class="hero-actions">${button(home ? 'Let’s create' : 'Discuss your project', './contact.html')}${home ? '<a class="quiet-link" href="./work.html">Explore our work <span aria-hidden="true">↗</span></a>' : ''}</div></div><div class="hero-art">${crop(artwork, 'Ink illustration of a filmmaking crew, camera and director’s chair in a sweeping landscape')}</div><span class="hero-note">Ideas. People. Stories.<br><em>Always.</em></span></div><div class="hero-bottom"><span>INDEPENDENT SPIRIT. SHARED VISION.</span><a href="#next">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div></section>`;
}
export function serviceStrip() {
  return `<div class="service-strip">${services.map((service, i) => `<a href="./services.html#service-${i}" class="service-link reveal">${icon(service.icon)}<h3>${service.name.replace(' & ', ' &amp; ')}</h3><span class="service-line"></span></a>`).join('')}</div>`;
}
export function closing(page = '') {
  return `<section class="closing"><div class="closing-image">${crop('banner', 'A film crew working in golden evening light')}</div><div class="closing-copy"><p class="eyebrow">EVERY GREAT STORY STARTS SOMEWHERE</p><h2>Let’s create<br>something <em>meaningful.</em></h2><p>Have a story in mind? We’d love to be part of it.</p>${button('Start a conversation', page === 'contact' ? '#next' : './contact.html', 'light')}</div><span class="closing-mark" aria-hidden="true">N.</span></section>`;
}
export function footer() {
  return `<footer class="footer"><div class="footer-top"><a href="./" aria-label="Namaha Studios home">${logo()}</a><p>Ideas to images.<br>Stories to remember.</p><a class="footer-social" href="https://www.instagram.com/namaha_studios/" target="_blank" rel="noopener noreferrer">Follow our journey ${icon('instagram')}</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Namaha Studios</span><span class="demo-label">DESIGN PREVIEW · Illustrative project imagery</span><button class="text-button" data-privacy>Privacy</button><a href="#top">Back to top ↑</a></div></footer>`;
}
export function dialogShell() {
  return `<dialog id="preview-dialog" aria-labelledby="dialog-title"><div class="dialog-bar"><span>THE NAMAHA NOTEBOOK</span><button class="dialog-close" aria-label="Close preview">✕</button></div><div id="dialog-content"></div></dialog>`;
}
