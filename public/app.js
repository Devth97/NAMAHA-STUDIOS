import { header, footer, closing, dialogShell } from './components.js';
import { pages } from './pages.js';
import { setupInteractions } from './interactions.js';
import { initPigment } from './pigment.js';

const slug = location.pathname.split('/').filter(Boolean).pop()?.replace('.html','') || 'home';
const page = Object.hasOwn(pages,slug) ? slug : 'home';
const titles = {home:'Stories that move the world',about:'Our Story',services:'From Ideas to Impact',work:'Our Work',gallery:'Behind the Lens',contact:'Let’s Create Together'};
document.title = `Namaha Studios — ${titles[page]}`;
document.querySelector('#app').innerHTML = `<div id="top"></div>${header(page)}<main id="main">${pages[page]()}${closing(page)}</main>${footer()}${dialogShell()}`;
// One viewport overlay follows the visitor across the entire page.
document.body.prepend(document.querySelector('#pigment'));
if (page === 'contact') document.querySelector('.hero-actions a').setAttribute('href', '#next');
setupInteractions();
initPigment(document.querySelector('#pigment'));
