const clamp = value => Math.max(0, Math.min(1, value));

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
export function initIxora() {
  const flower = document.querySelector('[data-ixora]');
  const scatter = document.querySelector('[data-ixora-scatter]');
  const logo = document.querySelector('.header .supplied-logo');
  if (!flower || !scatter || !logo) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = true, frame = 0, began = 0, start = null;
  const allowed = () => enabled && !motion.matches && !document.hidden;
  function hideScatter() { scatter.hidden = true; }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; start = null;
    flower.hidden = true; flower.dataset.phase = 'idle'; hideScatter();
    scatter.querySelectorAll('img').forEach(image => image.getAnimations().forEach(animation => animation.cancel()));
  }
  function paint(now) {
    frame = 0;
    if (!allowed()) { stop(); return; }
    const elapsed = now - began;
    if (elapsed >= 850) { stop(); return; }
    const progress = clamp((elapsed - 80) / 650);
    const box = logo.getBoundingClientRect();
    const pose = flowerPose(progress, start, flowerDock(box), Math.min(14, box.width * .07));
    flower.hidden = elapsed < 80;
    flower.dataset.phase = elapsed < 80 ? 'splash' : progress < 1 ? 'flying' : 'merging';
    if (elapsed >= 300) hideScatter();
    flower.style.width = `${pose.size}px`; flower.style.height = `${pose.size}px`;
    flower.style.opacity = String(elapsed < 730 ? 1 : clamp((850 - elapsed) / 120));
    flower.style.transform = `translate3d(${pose.x}px,${pose.y}px,0) translate(-50%,-50%) rotate(${pose.rotation}deg)`;
    frame = requestAnimationFrame(paint);
  }
  function play(anchor, age = 0) {
    if (!allowed()) return;
    if (age >= 850) return;
    stop();
    scatter.hidden = false;
    const width = scatter.getBoundingClientRect().width;
    const left = anchor.x - width/2;
    const top = anchor.y - 95;
    scatter.style.left = `${Math.max(8, Math.min(innerWidth - width - 8, left))}px`;
    scatter.style.top = `${Math.max(8, Math.min(innerHeight - 198, top))}px`;
    start = anchor;
    // Each flower bursts out from the click and fades immediately; no static hold.
    scatter.querySelectorAll('img').forEach(image => {
      const rect = image.getBoundingClientRect();
      const dx = anchor.x - (rect.left + rect.width/2);
      const dy = anchor.y - (rect.top + rect.height/2);
      const transform = getComputedStyle(image).transform;
      const animation = image.animate([
        {opacity:0,transform:`translate(${dx}px,${dy}px) scale(.2) ${transform}`,offset:0},
        {opacity:1,offset:.25},
        {opacity:0,transform:`translate(0,0) scale(1.08) ${transform}`,offset:1}
      ], {duration:300,easing:'ease-out',fill:'both'});
      animation.currentTime = age;
    });
    began = performance.now() - age; frame = requestAnimationFrame(paint);
  }
  document.addEventListener('click', event => {
    // The menu replaces its icon during the same click; use the original event path.
    const control = event.composedPath().find(element => element.matches?.('button,a[href]'));
    if (!control || control.matches('.motion-toggle,[disabled]') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
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
