// Fixed illustrations with small, independently mounted mechanical details.
const processKinds = {discover:'idea', develop:'story', create:'camera', deliver:'screen'};
const reels = {
  hero:[[389,307,51,55],[501,272,57,59]],
  aboutHero:[[374,246,109,116]],
  galleryHero:[[326,345,76,82],[486,371,53,62]],
  workHero:[[559,381,122,132],[797,398,88,100]],
  journey:[[218,428,52,57],[329,416,53,57]],
  camera:[[570,214,142,142],[909,211,138,138]],
  screen:[[246,409,122,132],[521,412,113,122]]
};
// The opaque face replaces the static spokes; only the inner wheel rotates.
// A nested SVG makes the centre local (0,0), independent of responsive viewport scale.
function mountedRotor([x,y,rx,ry], index) {
  const holes = Array.from({length:5},(_,i)=>`<path transform="rotate(${i*72})" d="M-13-72Q0-82 13-72L11-39Q0-29-11-39Z"/>`).join('');
  return `<svg class="ink-mounted-rotor" data-reel-x="${x}" data-reel-y="${y}" x="${x-rx}" y="${y-ry}" width="${rx*2}" height="${ry*2}" viewBox="-100 -100 200 200" preserveAspectRatio="none" overflow="visible"><circle r="96" fill="white" stroke="none"/><g class="ink-rotor ${index%2?'ink-rotor-reverse':''}" fill="none" stroke="#68665f" stroke-width="2.1"><circle r="91"/>${holes}<circle r="23"/></g><g fill="white" stroke="#68665f" stroke-width="2"><circle r="10"/><circle r="4"/></g></svg>`;
}
function detailSvg(key, content) {
  return `<svg class="ink-detail ink-detail-${key}" viewBox="0 0 1536 1024" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">${content}</svg>`;
}
function details(key) {
  if (reels[key]) return detailSvg(key,reels[key].map(mountedRotor).join(''));
  if (key === 'idea') return detailSvg(key,`<path class="ink-writing" d="M800 545l160-3m-133 18 150-3"/>`);
  if (key === 'story') return detailSvg(key,`<path class="ink-story-focus" d="M388 291h29m-29 0v23M600 298h-29m29 0v23M400 408h29m-29 0v-23M611 409h-29m29 0v-23"/>`);
  if (key === 'light') return detailSvg(key,`<g class="ink-lamp-breath" stroke-width="2.4"><path d="M907 237l303-87M934 291l326-1M908 346l294 107"/></g>`);
  if (key === 'edit') return detailSvg(key,`<g class="ink-edit-progress"><path d="M500 408h470"/></g>`);
  if (key === 'contactHero') return detailSvg(key,`<g class="ink-lamp-breath"><path d="M877 313l-33 42m86-35-14 50m65-47 6 51"/></g>`);
  if (key === 'servicesHero') return detailSvg(key,`<g class="ink-lamp-breath"><path d="M480 300l96 40m-92-5 93 47m-93-11 74 44"/></g>`);
  if (key === 'storyboard') return detailSvg(key,`<path class="ink-writing" d="M585 684l143 9m-132 14 121 6"/>`);
  return '';
}
export function equipmentDrawing(kind) {
  const name = ['idea','story','camera','light','edit','screen'].includes(kind) ? kind : 'camera';
  return `<span class="studio-plate"><img class="equipment-plate" src="./assets/studio-${name}-ink-v2-line-480.webp" width="1536" height="1024" alt="" aria-hidden="true" decoding="async">${details(name)}</span>`;
}
export function decorateArtwork(key, picture) {
  if (processKinds[key]) return `<span class="ink-art ink-process" data-ink-motion>${equipmentDrawing(processKinds[key])}</span>`;
  const decorative = ['hero','aboutHero','servicesHero','workHero','galleryHero','contactHero','journey','storyboard','notFound','success'];
  if (!decorative.includes(key)) return picture;
  return `<span class="ink-art" data-ink-motion data-artwork="${key}">${picture}${details(key)}</span>`;
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
