const clamp = value => Math.max(0, Math.min(1, value));

// Leave enough time to see the splash, flight and final connection at the logo.
export const ixoraTiming = phone => phone
  ? { delay: 150, flight: 1050, total: 1400, splash: 430 }
  : { delay: 170, flight: 1150, total: 1520, splash: 470 };

// Root viewBox coordinates of the bud; nested SVG bounds include clipped JPEG space.
export function flowerDock(logo) {
  return { x: logo.left + logo.width * (29.6 / 240), y: logo.top + logo.height * (55.4 / 75) };
}
export function flowerPose(progress, start, end, dockSize = 14) {
  const p = clamp(progress), t = p * p * (3 - 2 * p);
  const arc = p === 0 || p === 1 ? 0 : Math.sin(Math.PI * p);
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t - arc * 55,
    size: 34 + (dockSize - 34) * t,
    rotation: -8 + 8 * t
  };
}

export function flightKeyframes(start, end, dockSize, timing) {
  const transform = pose => `translate3d(${pose.x}px,${pose.y}px,0) translate(-50%,-50%) rotate(${pose.rotation}deg) scale(${pose.size/34})`;
  const first = transform(flowerPose(0,start,end,dockSize));
  const frames = [{offset:0,opacity:0,transform:first}, {offset:(timing.delay-1)/timing.total,opacity:0,transform:first}];
  for (let i=0;i<=24;i++) {
    const p=i/24;
    frames.push({offset:(timing.delay+timing.flight*p)/timing.total,opacity:1,transform:transform(flowerPose(p,start,end,dockSize))});
  }
  frames.push({offset:1,opacity:0,transform:frames.at(-1).transform});
  return frames;
}

export function initIxora() {
  const flower = document.querySelector('[data-ixora]');
  const scatter = document.querySelector('[data-ixora-scatter]');
  const logo = document.querySelector('.header .supplied-logo');
  if (!flower || !scatter || !logo) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const images = [...scatter.querySelectorAll('img')];
  let enabled = true, flight = null, cleanup = 0;
  const allowed = () => enabled && !motion.matches && !document.hidden;
  function hideScatter() { scatter.hidden = true; }
  function stop() {
    clearTimeout(cleanup); cleanup = 0;
    if (flight) { flight.onfinish = null; flight.cancel(); flight = null; }
    flower.hidden = true; flower.dataset.phase = 'idle'; hideScatter();
    images.forEach(image => image.getAnimations().forEach(animation => animation.cancel()));
  }
  function play(anchor, age = 0) {
    if (!allowed()) return;
    const phone = matchMedia('(max-width:760px)').matches;
    const timing = ixoraTiming(phone);
    if (age >= timing.total) return;
    stop();
    scatter.hidden = false;
    const width = scatter.getBoundingClientRect().width;
    const left = anchor.x - width/2;
    const top = anchor.y - 95;
    scatter.style.left = `${Math.max(8, Math.min(innerWidth - width - 8, left))}px`;
    scatter.style.top = `${Math.max(8, Math.min(innerHeight - 198, top))}px`;
    // Batch all geometry/style reads before starting any animations.
    const box = logo.getBoundingClientRect();
    const sprites = images.map(image => {
      const rect = image.getBoundingClientRect();
      return {image,dx:anchor.x-(rect.left+rect.width/2),dy:anchor.y-(rect.top+rect.height/2),transform:getComputedStyle(image).transform,visible:rect.width>0};
    }).filter(sprite => sprite.visible);
    const splashDuration = timing.splash;
    sprites.forEach(({image,dx,dy,transform}) => {
      const animation = image.animate([
        {opacity:0,transform:`translate(${dx}px,${dy}px) scale(.2) ${transform}`,offset:0},
        {opacity:1,offset:.25},
        {opacity:0,transform:`translate(0,0) scale(1.08) ${transform}`,offset:1}
      ], {duration:splashDuration,easing:'ease-out',fill:'both'});
      animation.currentTime = age;
    });
    flower.hidden = false; flower.dataset.phase = 'animating';
    flight = flower.animate(flightKeyframes(anchor,flowerDock(box),Math.min(14,box.width*.07),timing), {duration:timing.total,fill:'both'});
    flight.currentTime = age;
    flight.onfinish = stop;
    cleanup = setTimeout(hideScatter,Math.max(0,splashDuration-age));
  }
  document.addEventListener('click', event => {
    // The menu replaces its icon during the same click; use the original event path.
    const control = event.composedPath().find(element => element.matches?.('button,a[href]'));
    if (!control || control.matches('.motion-toggle,[data-studio-motion-toggle],[disabled]') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (control.matches('.menu-toggle[aria-expanded="false"]')) return;
    const box = control.getBoundingClientRect();
    const anchor = event.detail > 0 ? {x:event.clientX,y:event.clientY} : {x:box.left + box.width/2,y:box.top + box.height/2};
    play(anchor);
    if (allowed() && control.matches('a[href]') && control.target !== '_blank' && !event.defaultPrevented) {
      const url = new URL(control.href, location.href);
      if (url.origin === location.origin && url.pathname !== location.pathname) {
        try { sessionStorage.setItem('namaha-ixora-splash', JSON.stringify({at:Date.now(),anchor})); } catch {}
      }
    }
  });
  addEventListener('studio-motion', event => { enabled = event.detail; if (!enabled) stop(); });
  motion.addEventListener('change', () => { if (motion.matches) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  addEventListener('pagehide', stop);
  addEventListener('resize', stop);
  try {
    const recent = JSON.parse(sessionStorage.getItem('namaha-ixora-splash') || 'null');
    sessionStorage.removeItem('namaha-ixora-splash');
    if (recent && Number.isFinite(recent.anchor?.x) && Number.isFinite(recent.anchor?.y)) play(recent.anchor, Math.max(0,Date.now() - recent.at));
  } catch {}
}
