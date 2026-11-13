import { icon } from './sketch-icons.js';

const activities = [
  ['planning','Writers planning a script and storyboard'],
  ['camera','Camera operator working on a cinema dolly'],
  ['sound','Director and sound recordist holding a boom microphone'],
  ['editing','Editor reviewing footage at an editing desk']
];
const group = duplicate => `<div class="studio-motion-group"${duplicate?' aria-hidden="true"':''}>${activities.map(([name,label])=>`<div class="studio-motion-scene studio-motion-scene--${name}"><img src="./assets/studio-strip-${name}.webp" width="600" height="400" alt="${duplicate?'':label}" decoding="async"></div>`).join('')}</div>`;

export function studioMotion() {
  return `<section class="studio-motion" aria-label="Film production in motion" data-studio-motion><div class="studio-motion-track">${group(false)}${group(true)}</div><button class="studio-motion-toggle" type="button" data-studio-motion-toggle aria-label="Pause scene motion" title="Pause scene motion" aria-pressed="false">${icon('pause')}</button></section>`;
}
export function initStudioMotion() {
  const strip = document.querySelector('[data-studio-motion]');
  if (!strip) return;
  const control = strip.querySelector('[data-studio-motion-toggle]');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let paused = false, globalEnabled = true, visible = true;
  function update() {
    const stopped = paused || !globalEnabled || reduced.matches;
    strip.classList.toggle('is-paused',stopped || !visible || document.hidden);
    control.disabled = reduced.matches || !globalEnabled;
    control.setAttribute('aria-pressed',String(stopped));
    const label = reduced.matches ? 'Reduced motion enabled' : !globalEnabled ? 'Scene motion paused' : paused ? 'Play scene motion' : 'Pause scene motion';
    control.setAttribute('aria-label',label); control.title=label;
    control.innerHTML=icon(stopped?'play':'pause');
  }
  control.addEventListener('click',()=>{paused=!paused;update();});
  addEventListener('studio-motion',event=>{globalEnabled=event.detail;update();});
  reduced.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{rootMargin:'80px'}).observe(strip);
  update();
}
