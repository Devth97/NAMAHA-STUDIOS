import { art, services } from './data.js';
import { siteConfig } from './config.js';
import { whatsappHref } from './contact-options.js';

export const esc = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
export const arrow = '<span aria-hidden="true">↗</span>';

export const navigation = [['home','Home'],['about','About'],['services','Services'],['work','Work'],['gallery','Gallery'],['contact','Contact']];
export const pageHref = key => key === 'home' ? './' : `./${key}.html`;

const paths = {
  whatsapp: '<path d="M41 23a17 17 0 0 1-25 15L6 41l3-10A17 17 0 1 1 41 23Z"/><path d="M17 14c-4 3-1 10 4 14s10 6 13 2l-6-4-3 2c-3-1-6-4-7-7l2-2-3-5Z"/>',
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
  pin: '<path d="M39 20c0 12-15 25-15 25S9 32 9 20a15 15 0 0 1 30 0Z"/><circle cx="24" cy="20" r="5"/>',
  play: '<path d="M17 11v26l21-13z"/>'
};
export const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name] || paths.spark}</svg>`;

// Responsive artwork: WebP first, progressive JPEG fallback, intrinsic size to prevent layout shift.
export function crop(key, label = '', className = '', sizes = '(max-width: 760px) 100vw, 50vw', priority = false) {
  const source = art[key];
  if (!source) throw new Error(`Unknown artwork key: ${key}`);
  const base = source.replace(/\.jpg$/, '');
  const eager = priority || key === 'hero' || key.endsWith('Hero');
  const finalSizes = eager && sizes === '(max-width: 760px) 100vw, 50vw' ? '(max-width: 760px) calc(100vw - 48px), 70vw' : sizes;
  return `<picture><source type="image/webp" srcset="${base}-480.webp 480w, ${base}-960.webp 960w, ${base}.webp 1536w" sizes="${finalSizes}"><img class="crop ${className}" src="${source}" srcset="${base}-480.jpg 480w, ${base}-960.jpg 960w, ${source} 1536w" sizes="${finalSizes}" alt="${esc(label)}" width="1536" height="1024" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

// Brand lockup: the hand-lettered Namaha mark (extracted from the supplied logo) with crisp, live
// set type for STUDIOS and the descriptor. Replace with the studio's original vector when supplied.
export const logo = () => `<svg class="logo supplied-logo" viewBox="0 0 240 75" aria-hidden="true" focusable="false"><svg class="brand-symbol" x="0" y="1" width="54" height="70" viewBox="215 180 700 945"><image href="./assets/namaha-client-logo.jpg" width="1131" height="1600"/></svg><svg x="66" y="16" width="170" height="47" viewBox="178 1150 800 255"><image href="./assets/namaha-client-logo.jpg" width="1131" height="1600"/></svg></svg>`;
export const button = (label, href, style = '') => `<a class="button ${style}" href="${href}"><span class="button-label">${label}</span>${arrow}</a>`;
export function whatsappButton(floating = false) {
  const href = whatsappHref(siteConfig.whatsappNumber, siteConfig.whatsappMessage);
  if (!href) return '';
  const demo = siteConfig.whatsappDemo;
  return `<a class="whatsapp-button ${floating ? 'whatsapp-float' : 'whatsapp-inline'}" href="${esc(href)}" target="_blank" rel="noopener noreferrer" aria-label="${demo ? 'WhatsApp demo number — not monitored' : 'Chat with Namaha Studios on WhatsApp'} (opens in a new tab)">${icon('whatsapp')}<span>WhatsApp${demo ? '<small>Demo number</small>' : ''}</span><span aria-hidden="true">↗</span></a>`;
}
export const sectionHead = (eyebrow, title, extra = '') => `<div class="section-head reveal"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${extra}</div>`;

export function header(page) {
  const instagram = `<a class="social" href="${siteConfig.instagram}" aria-label="Namaha Studios on Instagram (opens in a new tab)" target="_blank" rel="noopener noreferrer">${icon('instagram')}</a>`;
  return `<header class="header" data-header><div class="header-inner"><a href="./" class="brand" aria-label="Namaha Studios — home">${logo()}</a><nav id="navigation" class="site-nav" aria-label="Main"><ul>${navigation.map(([key, name], index) => `<li><a ${page === key ? 'aria-current="page"' : ''} href="${pageHref(key)}"><span class="nav-index" aria-hidden="true">0${index + 1}</span>${name}</a></li>`).join('')}</ul><div class="nav-extra"><p>Have a story in mind?</p>${button('Start a conversation', page === 'contact' ? '#next' : './contact.html', 'light')}<a class="nav-social" href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>@namaha_studios</span></a></div></nav>${page === 'contact' ? '' : button('Let’s talk', './contact.html', 'header-cta')}${instagram}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span class="menu-word" aria-hidden="true">Menu</span><span class="menu-lines" aria-hidden="true"><span></span><span></span></span><span class="sr-only">Open menu</span></button></div></header>`;
}

export function hero({ eyebrow = 'FILM · TELEVISION · ENTERTAINMENT', title, copy, artwork = 'hero', artLabel = '', home = false, cta = './contact.html' }) {
  const lines = title.split('<br>').map(line => `<span class="line"><span>${line}</span></span>`).join(' ');
  return `<section class="hero ${home ? 'home-hero' : 'inner-hero'}"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow hero-eyebrow">${eyebrow}</p><h1 class="kinetic">${lines}</h1><div class="gold-rule"></div><p class="hero-description">${copy}</p><div class="hero-actions">${button(home ? 'Let’s create' : 'Discuss your project', cta)}${home ? '<a class="quiet-link" href="./work.html">Explore our work <span aria-hidden="true">↗</span></a>' : ''}</div></div><div class="hero-art">${crop(artwork, artLabel)}</div><span class="hero-note" aria-hidden="true">Ideas. People. Stories.<br><em>Always.</em></span></div><div class="hero-bottom"><span>INDEPENDENT SPIRIT. SHARED VISION.</span><a href="#next" class="scroll-cue">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div></section>`;
}
export function serviceStrip() {
  return `<div class="service-strip">${services.map((service, i) => `<a href="./services.html#service-${i}" class="service-link reveal">${icon(service.icon)}<h3>${service.name.replace(' & ', ' &amp; ')}</h3><span class="service-line"></span></a>`).join('')}</div>`;
}
export function closing(page = '') {
  return `<section class="closing" aria-labelledby="closing-title"><div class="closing-image">${crop('banner', '', '', '(max-width: 760px) 100vw, 50vw')}</div><div class="closing-copy"><p class="eyebrow">EVERY GREAT STORY STARTS SOMEWHERE</p><h2 id="closing-title">Let’s create<br>something <em>meaningful.</em></h2><p>Have a story in mind? We’d love to be part of it.</p>${button('Start a conversation', page === 'contact' ? '#next' : './contact.html', 'light')}</div><span class="closing-mark" aria-hidden="true">N.</span></section>`;
}
export function footer() {
  return `<footer class="footer"><div class="footer-top"><div class="footer-brand"><a href="./" aria-label="Namaha Studios — home">${logo()}</a><p>Ideas to images.<br>Stories to remember.</p></div><nav class="footer-nav" aria-label="Footer"><p class="footer-label">Explore</p><ul>${navigation.map(([key, name]) => `<li><a href="${pageHref(key)}">${name}</a></li>`).join('')}</ul></nav><div class="footer-connect"><p class="footer-label">Connect</p><a class="footer-social" href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>@namaha_studios</span><span class="sr-only">(opens in a new tab)</span></a><p class="footer-location">${icon('pin')}<span>${siteConfig.location}</span></p><a class="footer-talk" href="./contact.html">Start a project <span aria-hidden="true">↗</span></a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Namaha Studios</span><span class="demo-label">DESIGN PREVIEW · Illustrative project imagery</span><button class="text-button" type="button" data-privacy>Privacy</button><a href="#top" class="back-to-top">Back to top <span aria-hidden="true">↑</span></a></div></footer>`;
}
export function dialogShell() {
  return `<dialog id="preview-dialog" aria-labelledby="dialog-title"><div class="dialog-bar"><span>THE NAMAHA NOTEBOOK</span><button class="dialog-close" type="button" aria-label="Close">✕</button></div><div id="dialog-content"></div></dialog>`;
}
