import { siteConfig } from './config.js';
import { esc } from './components.js';

const activities = [
  ['planning','Writers planning a script and storyboard'],
  ['camera','Camera operator working on a cinema dolly'],
  ['sound','Director and sound recordist holding a boom microphone'],
  ['editing','Editor reviewing footage at an editing desk']
];

export function studioMotion() {
  const stills = activities.map(([,label])=>`<div class="studio-video-panel"><img class="studio-activity-poster" src="./assets/studio-crew-poster-v3.webp" width="1920" height="176" alt="${label}" decoding="async"></div>`).join('');
  const fallback = `<div class="studio-motion-group studio-motion-track"><div class="studio-motion-set">${stills}</div><div class="studio-motion-set" aria-hidden="true">${stills}</div></div>`;
  const clips = activities.map(()=>`<div class="studio-video-panel"><video class="studio-activity-video" data-studio-video muted loop playsinline preload="none" tabindex="-1"><source src="${esc(siteConfig.studioVideoUrl)}"></video></div>`).join('');
  const scenes = siteConfig.studioVideoUrl ? `<div class="studio-video-scenes studio-motion-track" aria-hidden="true"><div class="studio-motion-set">${clips}</div><div class="studio-motion-set">${clips}</div></div>` : '';
  return `<section class="studio-motion" aria-label="Film production artwork" data-studio-motion>${fallback}${scenes}</section>`;
}

export function initStudioMotion() {
  const strip = document.querySelector('[data-studio-motion]');
  const videos = [...(strip?.querySelectorAll('[data-studio-video]') || [])];
  if (!videos.length) return;
  videos.forEach(video=>{video.muted=true;});
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let enabled = true, visible = true;
  let generation = 0;
  async function update() {
    const current = ++generation;
    if (!enabled || !visible || reduced.matches || document.hidden) {
      videos.forEach(video=>video.pause()); strip.classList.remove('is-playing'); return;
    }
    const active = videos.filter(video=>video.parentElement.getClientRects().length);
    videos.filter(video=>!active.includes(video)).forEach(video=>video.pause());
    const results = await Promise.allSettled(active.map(video=>video.play()));
    if (current !== generation) return;
    const playing = results.length > 0 && results.every(result=>result.status==='fulfilled');
    strip.classList.toggle('is-playing',playing);
    if (!playing) videos.forEach(video=>video.pause());
  }
  videos.forEach(video=>video.addEventListener('error',()=>strip.classList.remove('is-playing')));
  addEventListener('studio-motion',event=>{enabled=event.detail;update();});
  reduced.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
  matchMedia('(max-width:760px)').addEventListener('change',update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{rootMargin:'80px'}).observe(strip);
  update();
}
