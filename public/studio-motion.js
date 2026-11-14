import { siteConfig } from './config.js';
import { esc } from './components.js';

export function studioMotion() {
  const poster = './assets/studio-indian-film-set-poster-v1.webp';
  const fallback = `<img class="studio-activity-poster" src="${poster}" width="2560" height="160" alt="Line drawing of a film set with a production van, storyboard discussion, camera crew, tea service, lighting and editing." decoding="async">`;
  const scene = siteConfig.studioVideoUrl ? `<video class="studio-activity-video" data-studio-video muted loop playsinline preload="none" poster="${poster}" tabindex="-1" aria-hidden="true"><source src="${esc(siteConfig.studioVideoUrl)}" type="video/mp4"></video>` : '';
  return `<section class="studio-motion" aria-label="Film production artwork" data-studio-motion><div class="studio-scene">${fallback}${scene}</div></section>`;
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
