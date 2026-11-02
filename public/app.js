import { renderBody, resolvePage, pageMeta } from './render.js';
import { setupInteractions } from './interactions.js';
import { initKites } from './kites.js';
import { setupFilmStrip } from './film-strip.js';

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
initKites(document.querySelector('#kites'));
