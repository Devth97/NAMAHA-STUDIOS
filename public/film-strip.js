import { crop, sectionHead } from './components.js';

const frames = [
  ['film', 'A story takes shape', 'ON LOCATION'],
  ['portrait', 'A moment becomes a feeling', 'IN THE FRAME'],
  ['crew', 'Many minds. One vision.', 'MADE TOGETHER'],
  ['event', 'An energy that stays', 'LIVE & ALIVE'],
  ['brand', 'The beauty in the details', 'BRAND STORIES'],
  ['digital', 'The final piece of the picture', 'IN THE EDIT']
];

export function movingFilmStrip() {
  const cards = () => frames.map(([image, title, category], index) => `<div class="motion-card"><div class="motion-card-image">${crop(image, '', '', '(max-width: 760px) 255px, 310px')}</div><div class="motion-card-caption"><span>0${index + 1} / ${category}</span><p>${title}</p></div></div>`).join('');
  return `<section class="moving-films" aria-labelledby="moving-films-title"><div class="section moving-films-heading">${sectionHead('THE WORLD IN MOTION', '<span id="moving-films-title">Never standing still.</span>', '<button type="button" class="film-motion-toggle" aria-pressed="false">Pause motion <span aria-hidden="true">Ⅱ</span></button>')}<p>People. Places. Possibilities. A glimpse into the art of making stories.</p></div><div class="film-marquee"><div class="film-marquee-track"><div class="film-marquee-group">${cards()}</div><div class="film-marquee-group" aria-hidden="true">${cards()}</div></div></div><p class="moving-films-note">ILLUSTRATIVE STUDIO MOMENTS · IMAGINATION IN EVERY FRAME</p></section>`;
}

export function setupFilmStrip() {
  document.querySelectorAll('.moving-films').forEach(section => {
    const button = section.querySelector('.film-motion-toggle');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        section.classList.toggle('motion-offscreen', !entries[0].isIntersecting);
      }).observe(section);
    }
    const updateVisibility = () => section.classList.toggle('motion-hidden-tab', document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    updateVisibility();
    button.addEventListener('click', () => {
      const paused = section.classList.toggle('motion-paused');
      button.setAttribute('aria-pressed', String(paused));
      button.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    });
  });
}
