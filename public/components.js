import { art, services } from './data.js';
import { siteConfig } from './config.js';
import { whatsappHref } from './contact-options.js';
import { icon } from './sketch-icons.js';
export { icon } from './sketch-icons.js';

export const esc = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
export const arrow = `<span class="sketch-arrow" aria-hidden="true">${icon('arrow')}</span>`;

export const navigation = [['home','Home'],['about','About'],['services','Services'],['work','Work'],['gallery','Gallery'],['contact','Contact']];
export const pageHref = key => key === 'home' ? './' : `./${key}.html`;

// Responsive artwork: WebP first, progressive JPEG fallback, intrinsic size to prevent layout shift.
export function crop(key, label = '', className = '', sizes = '(max-width: 760px) 100vw, 50vw', priority = false) {
  const source = art[key];
  if (!source) throw new Error(`Unknown artwork key: ${key}`);
  const base = source.replace(/\.jpg$/, '');
  const eager = priority || key === 'hero' || key.endsWith('Hero');
  const finalSizes = eager && sizes === '(max-width: 760px) 100vw, 50vw' ? '(max-width: 760px) calc(100vw - 48px), 70vw' : sizes;
  return `<picture><source type="image/webp" srcset="${base}-480.webp 480w, ${base}-960.webp 960w, ${base}.webp 1536w" sizes="${finalSizes}"><img class="crop ${className}" src="${source}" srcset="${base}-480.jpg 480w, ${base}-960.jpg 960w, ${source} 1536w" sizes="${finalSizes}" alt="${esc(label)}" width="1536" height="1024" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

// Display the supplied symbol and lettering directly, arranged horizontally for the header.
export const logo = (placement = 'header') => `<svg class="logo supplied-logo" viewBox="0 0 240 75" aria-hidden="true" focusable="false"><defs><filter id="logo-paper-${placement}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 -1 0 1"/><feComponentTransfer><feFuncA type="linear" slope="1.6" intercept="-0.12"/></feComponentTransfer><feComposite in2="SourceAlpha" operator="in"/></filter></defs><g filter="url(#logo-paper-${placement})"><svg class="brand-symbol" x="0" y="1" width="54" height="70" viewBox="215 180 700 945"><image href="./assets/namaha-client-logo.jpg" width="1131" height="1600"/></svg><svg x="66" y="16" width="170" height="47" viewBox="178 1150 800 255"><image href="./assets/namaha-client-logo.jpg" width="1131" height="1600"/></svg></g></svg>`;
export const button = (label, href, style = '') => `<a class="button ${style}" href="${href}"><span class="button-label">${label}</span>${arrow}</a>`;
export function whatsappButton(floating = false) {
  const href = whatsappHref(siteConfig.whatsappNumber, siteConfig.whatsappMessage);
  if (!href) return '';
  const demo = siteConfig.whatsappDemo;
  return `<a class="whatsapp-button ${floating ? 'whatsapp-float' : 'whatsapp-inline'}" href="${esc(href)}" target="_blank" rel="noopener noreferrer" aria-label="${demo ? 'WhatsApp demo number — not monitored' : 'Chat with Namaha Studios on WhatsApp'} (opens in a new tab)">${icon('whatsapp')}<span>WhatsApp${demo ? '<small>Demo number</small>' : ''}</span>${arrow}</a>`;
}
export const sectionHead = (eyebrow, title, extra = '') => `<div class="section-head reveal"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${extra}</div>`;

export function header(page) {
  const instagram = `<a class="social" href="${siteConfig.instagram}" aria-label="Namaha Studios on Instagram (opens in a new tab)" target="_blank" rel="noopener noreferrer">${icon('instagram')}</a>`;
  return `<header class="header" data-header><div class="header-inner"><a href="./" class="brand" aria-label="Namaha Studios — home">${logo()}</a><nav id="navigation" class="site-nav" aria-label="Main"><ul>${navigation.map(([key, name], index) => `<li><a ${page === key ? 'aria-current="page"' : ''} href="${pageHref(key)}"><span class="nav-index" aria-hidden="true">0${index + 1}</span>${name}</a></li>`).join('')}</ul><div class="nav-extra"><p>Have a story in mind?</p>${button('Start a conversation', page === 'contact' ? '#next' : './contact.html', 'light')}<a class="nav-social" href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>@namaha_studios</span></a></div></nav>${page === 'contact' ? '' : button('Let’s talk', './contact.html', 'header-cta')}${instagram}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation"><span class="menu-word" aria-hidden="true">Menu</span><span class="menu-lines" aria-hidden="true">${icon('menu')}</span><span class="sr-only">Open menu</span></button></div></header>`;
}

export function hero({ eyebrow = 'FILM · TELEVISION · ENTERTAINMENT', title, copy, artwork = 'hero', artLabel = '', home = false, cta = './contact.html' }) {
  const lines = title.split('<br>').map(line => `<span class="line"><span>${line}</span></span>`).join(' ');
  return `<section class="hero ${home ? 'home-hero' : 'inner-hero'}"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow hero-eyebrow">${eyebrow}</p><h1 class="kinetic">${lines}</h1><div class="gold-rule"></div><p class="hero-description">${copy}</p><div class="hero-actions">${button(home ? 'Let’s create' : 'Discuss your project', cta)}${home ? `<a class="quiet-link" href="./work.html">Explore our work ${arrow}</a>` : ''}</div></div><div class="hero-art">${crop(artwork, artLabel)}</div><span class="hero-note" aria-hidden="true">Ideas. People. Stories.<br><em>Always.</em></span></div><div class="hero-bottom"><span>INDEPENDENT SPIRIT. SHARED VISION.</span><a href="#next" class="scroll-cue">SCROLL TO EXPLORE ${icon('down')}</a></div></section>`;
}
export function serviceStrip() {
  return `<div class="service-strip">${services.map((service, i) => `<a href="./services.html#service-${i}" class="service-link reveal">${icon(service.icon)}<h3>${service.name.replace(' & ', ' &amp; ')}</h3><span class="service-line"></span></a>`).join('')}</div>`;
}
export function closing(page = '') {
  return `<section class="closing" aria-labelledby="closing-title"><div class="closing-image">${crop('banner', '', '', '(max-width: 760px) 100vw, 50vw')}</div><div class="closing-copy"><p class="eyebrow">EVERY GREAT STORY STARTS SOMEWHERE</p><h2 id="closing-title">Let’s create<br>something <em>meaningful.</em></h2><p>Have a story in mind? We’d love to be part of it.</p>${button('Start a conversation', page === 'contact' ? '#next' : './contact.html', 'light')}</div><span class="closing-mark" aria-hidden="true">N.</span></section>`;
}
export function footer() {
  return `<footer class="footer"><div class="footer-top"><div class="footer-brand"><a href="./" aria-label="Namaha Studios — home">${logo('footer')}</a><p>Ideas to images.<br>Stories to remember.</p></div><nav class="footer-nav" aria-label="Footer"><p class="footer-label">Explore</p><ul>${navigation.map(([key, name]) => `<li><a href="${pageHref(key)}">${name}</a></li>`).join('')}</ul></nav><div class="footer-connect"><p class="footer-label">Connect</p><a class="footer-social" href="${siteConfig.instagram}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>@namaha_studios</span><span class="sr-only">(opens in a new tab)</span></a><a class="footer-social contact-email" href="mailto:${esc(siteConfig.email)}">${icon('mail')}<span>${esc(siteConfig.email)}</span></a><a class="footer-social" href="tel:+${siteConfig.phoneNumber}">${icon('phone')}<span>${esc(siteConfig.phoneDisplay)}</span></a><p class="footer-location">${icon('pin')}<span>${siteConfig.location}</span></p><a class="footer-talk" href="./contact.html">Start a project ${arrow}</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Namaha Studios</span><span class="demo-label">DESIGN PREVIEW · Illustrative project imagery</span><button class="text-button" type="button" data-privacy>Privacy</button><a href="#top" class="back-to-top">Back to top ${icon('up')}</a></div></footer>`;
}
export function dialogShell() {
  return `<dialog id="preview-dialog" aria-labelledby="dialog-title"><div class="dialog-bar"><span>THE NAMAHA NOTEBOOK</span><button class="dialog-close" type="button" aria-label="Close">${icon('close')}</button></div><div id="dialog-content"></div></dialog>`;
}
