// Small mechanical actions within line drawings; photographs are never animated.
const drawings = {
  idea: `<path d="M30 78l3-49 61-3 5 50-65 3m-1-43 62-3M43 47l39-2M42 56l30-1M42 65l35-2M37 25l2-4 44-2 4 6"/><g class="ink-pencil"><path d="M104 72l25-46 6 3-25 46-8 6 2-9m5 1 5 3m12-43 6 3"/></g><path d="M98 83l39-1M22 84l71-2"/>`,
  story: `<path d="M29 67l5-45 92 2-3 44-94-1m8-36 24 1-1 12-24-1zm30 1 24 1-1 12-24-1zm30 1 21 1-1 12-21-1zM35 49l24 1-1 12-24-1zm30 1 24 1-1 12-24-1zm30 1 21 1-1 12-21-1zM58 68l-7 20m47-20 8 20M76 68v23"/><path class="ink-trace" d="M39 39l6-5 6 5 5-3m15 3 5-3 8 5m15-1 6-5 8 5M38 57l12-4 5 5m14-1 7-4 6 5m16-1 10-3 4 4"/>`,
  camera: `<g class="ink-camera"><path d="M36 47l66-2 2 31-68 2zm66 7 17-5 1 21-17-4M47 50l-1 20 45-1-1-20M109 52l1 16m6-17 1 18M48 42l43-1m-37-4v7m29-8v7M41 80h59"/><g class="ink-reel" style="transform-origin:51px 28px"><circle cx="51" cy="28" r="15"/><circle cx="51" cy="28" r="3"/><path d="M49 14l1 10m14-2-9 4m6 13-7-8m-15 6 9-7m-7-13 7 7"/></g><g class="ink-reel ink-reverse" style="transform-origin:85px 27px"><circle cx="85" cy="27" r="16"/><circle cx="85" cy="27" r="3"/><path d="M85 12v11m14-3-10 5m5 15-7-9m-14 7 9-8m-10-13 10 7"/></g></g><path d="M69 78v8m-4-1-17 10m27-10 20 10M71 85l1 10"/>`,
  light: `<path d="M55 29l27-9 23 10-2 28-31 7-19-12zm5 4 13-5 23 7-2 19-21 6-13-11zM57 28l-12-9 27-8 10 10M104 31l20-10-3 29-17 8M72 65v20m-2-1-19 11m23-11 19 11M82 64v7H70M63 40q10-11 21-3t-1 16q-14 8-20-5z"/><g class="ink-light-rays"><path d="M128 30l14-5m-14 14 20 2m-22 8 17 9M40 47l-14 3m19-16-12-7"/></g>`,
  edit: `<path d="M28 20l104 1-1 50-102-1zm6 6 91 1-1 38-90-1zM72 72v10m-18 2 40-1M20 88l120 1-2 5H22zm18 2 84 1M39 32h28v17H39zm33 1h47M72 40h43M72 47h46M39 55h79M42 60h21m5 0h23m5 0h21"/><path class="ink-playhead" d="M78 51v14m-3-14h6"/><path d="M144 79q9 0 10 8-1 8-11 7-8-1-7-8 0-6 8-7zm0 1v5"/>`,
  screen: `<path d="M21 17l117 1-1 63-114-1zm6 6 104 1-1 50-102-1zM40 84l-6 11m85-11 7 11M79 82v13"/><g class="ink-screen-frame"><path d="M42 35l22-6 19 9 20-5 13 7M41 61l21-18 17 14 18-12 19 17M35 68h88"/></g><path d="M17 83h126"/>`
};
export function equipmentDrawing(kind) {
  return `<svg class="equipment-drawing" viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${drawings[kind] || drawings.camera}</svg>`;
}
const processKinds = {discover:'idea', develop:'story', create:'camera', deliver:'screen'};
// Circular source regions are re-rendered above the matching still and rotate at their real centres.
const reelRegions = {
  hero:[[389,307,57],[501,272,62]],
  aboutHero:[[372,247,121],[245,482,125]],
  galleryHero:[[326,345,83],[486,371,61]],
  workHero:[[559,381,136],[797,398,93]],
  journey:[[218,436,61],[329,421,59]]
};
let instance = 0;
export function decorateArtwork(key, picture, source) {
  if (processKinds[key]) return `<span class="ink-art ink-process" data-ink-motion>${equipmentDrawing(processKinds[key])}</span>`;
  const decorative = ['hero','aboutHero','servicesHero','workHero','galleryHero','contactHero','journey','storyboard','notFound','success'];
  if (!decorative.includes(key)) return picture;
  const id = `ink-${++instance}`;
  let detail = '';
  if (reelRegions[key]) {
    detail = `<svg class="ink-detail" viewBox="0 0 1536 1024" aria-hidden="true" focusable="false">${reelRegions[key].map(([x,y,r],i)=>`<defs><clipPath id="${id}-${i}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath></defs><g class="ink-reel" style="transform-origin:${x}px ${y}px"><image href="${source.replace(/\.jpg$/,'.webp')}" width="1536" height="1024" clip-path="url(#${id}-${i})"/></g>`).join('')}</svg>`;
  } else if (key === 'contactHero') {
    detail = `<svg class="ink-detail" viewBox="0 0 1536 1024" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><g class="ink-light-rays"><path d="M875 310l-38 48m93-37-15 56m66-53 6 59"/></g></svg>`;
  } else {
    detail = `<span class="ink-corner-detail">${equipmentDrawing(key === 'servicesHero' ? 'light' : key === 'storyboard' ? 'story' : 'camera')}</span>`;
  }
  return `<span class="ink-art" data-ink-motion data-artwork="${key}">${picture}${detail}</span>`;
}
export function initArtMotion() {
  const elements = [...document.querySelectorAll('[data-ink-motion]')];
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  const visible = new Set();
  let enabled = true;
  function update() { elements.forEach(element=>element.classList.toggle('is-animating', enabled && !reduced.matches && !document.hidden && visible.has(element))); }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries=>{entries.forEach(entry=>entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));update();},{rootMargin:'40px'});
    elements.forEach(element=>observer.observe(element));
  } else elements.forEach(element=>visible.add(element));
  addEventListener('studio-motion',event=>{enabled=event.detail;update();});
  document.addEventListener('visibilitychange',update);
  reduced.addEventListener('change',update);
  update();
}
