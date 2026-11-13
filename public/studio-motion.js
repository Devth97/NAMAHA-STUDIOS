import { siteConfig } from './config.js';
import { esc } from './components.js';

const activities = [
  ['planning','Writers planning a script and storyboard'],
  ['camera','Camera operator working on a cinema dolly'],
  ['sound','Director and sound recordist holding a boom microphone'],
  ['editing','Editor reviewing footage at an editing desk']
];

export function studioMotion() {
  const fallback = `<div class="studio-motion-group">${activities.map(([name,label])=>`<div class="studio-motion-scene"><img src="./assets/studio-strip-${name}.webp" width="600" height="400" alt="${label}" decoding="async"></div>`).join('')}</div>`;
  return `<section class="studio-motion" aria-label="Film production artwork" data-studio-motion>${fallback}${siteConfig.studioVideoUrl ? `<video class="studio-activity-video" data-studio-video muted loop playsinline preload="none" poster="./assets/studio-crew-poster-v3.webp" aria-hidden="true" tabindex="-1"><source src="${esc(siteConfig.studioVideoUrl)}"></video>` : ''}</section>`;
}

export function initStudioMotion() {
  const strip = document.querySelector('[data-studio-motion]');
  const video = strip?.querySelector('[data-studio-video]');
  if (!video) return;
  video.muted = true;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let enabled = true, visible = true;
  function update() {
    if (!enabled || !visible || reduced.matches || document.hidden) {
      video.pause(); strip.classList.remove('is-playing'); return;
    }
    video.play().then(()=>{
      if (enabled && visible && !reduced.matches && !document.hidden) strip.classList.add('is-playing');
      else { video.pause(); strip.classList.remove('is-playing'); }
    }).catch(()=>strip.classList.remove('is-playing'));
  }
  video.addEventListener('error',()=>strip.classList.remove('is-playing'));
  addEventListener('studio-motion',event=>{enabled=event.detail;update();});
  reduced.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{rootMargin:'80px'}).observe(strip);
  update();
}
