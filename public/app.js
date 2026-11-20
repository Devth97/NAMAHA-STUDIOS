import { renderBody, resolvePage, pageMeta } from './render.js';
import { setupInteractions } from './interactions.js';
import { initCursorFlower } from './cursor-flower.js';
import { setupFilmStrip } from './film-strip.js';
import { initIxora } from './ixora.js';
import { initArtMotion } from './art-motion.js';

const root = document.querySelector('#app');
// Production pages arrive fully prerendered; render in the browser only as a fallback.
if (!root.hasAttribute('data-prerendered')) {
  const page = resolvePage(location.pathname);
  document.title = pageMeta[page].title;
  root.innerHTML = renderBody(page);
}
document.documentElement.classList.add('js');
setupInteractions();
setupFilmStrip();
initCursorFlower(document.querySelector('#cursor-flower'));
initIxora();
initArtMotion();
