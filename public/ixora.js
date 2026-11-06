const clamp = value => Math.max(0, Math.min(1, value));

// Root viewBox coordinates of the bud; nested SVG bounds include clipped JPEG space.
export function flowerDock(logo) {
  return { x: logo.left + logo.width * (29.6 / 240), y: logo.top + logo.height * (55.4 / 75) };
}
export function flowerPose(progress, start, end, dockSize = 22) {
  const p = clamp(progress), t = p * p * (3 - 2 * p);
  const arc = p === 0 || p === 1 ? 0 : Math.sin(Math.PI * p);
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t - arc * 55,
    size: 40 + (dockSize - 40) * t,
    rotation: -8 + 188 * t
  };
}
export function initIxora() {
  const flower = document.querySelector('[data-ixora]');
  const scatter = document.querySelector('[data-ixora-scatter]');
  const pick = scatter?.querySelector('.scatter-pick');
  const logo = document.querySelector('.header .supplied-logo');
  if (!flower || !scatter || !pick || !logo) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = true, frame = 0, began = 0, start = null;
  const allowed = () => enabled && !motion.matches && !document.hidden;
  function hideScatter() { scatter.hidden = true; }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; start = null;
    flower.hidden = true; flower.dataset.phase = 'idle'; hideScatter();
  }
  function paint(now) {
    frame = 0;
    if (!allowed()) { stop(); return; }
    const elapsed = now - began;
    const progress = clamp((elapsed - 420) / 1000);
    const box = logo.getBoundingClientRect();
    const pose = flowerPose(progress, start, flowerDock(box), Math.min(22, box.width * .105));
    flower.hidden = elapsed < 420;
    flower.dataset.phase = elapsed < 420 ? 'scattered' : progress < 1 ? 'flying' : 'docked';
    scatter.classList.toggle('is-separated', elapsed >= 420);
    scatter.style.opacity = String(clamp((1600 - elapsed) / 350));
    if (elapsed >= 1600) hideScatter();
    const rotation = pose.rotation + Math.max(0, elapsed - 1420) * .09;
    flower.style.width = `${pose.size}px`; flower.style.height = `${pose.size}px`;
    flower.style.opacity = '1';
    flower.style.transform = `translate3d(${pose.x}px,${pose.y}px,0) translate(-50%,-50%) rotate(${rotation}deg)`;
    frame = requestAnimationFrame(paint);
  }
  function play(anchor) {
    if (!allowed()) return;
    cancelAnimationFrame(frame);
    scatter.hidden = false; scatter.style.opacity = '1'; scatter.classList.remove('is-separated');
    const header = document.querySelector('.header').getBoundingClientRect();
    const width = scatter.getBoundingClientRect().width;
    const left = anchor ? anchor.x - width/2 : innerWidth - width - 18;
    const top = anchor ? anchor.y - 95 : header.bottom + 145;
    scatter.style.left = `${Math.max(8, Math.min(innerWidth - width - 8, left))}px`;
    scatter.style.top = `${Math.max(header.bottom + 8, Math.min(innerHeight - 198, top))}px`;
    scatter.getAnimations().forEach(animation => animation.cancel());
    const rect = pick.getBoundingClientRect();
    start = {x:rect.left + rect.width/2,y:rect.top + rect.height/2};
    scatter.animate([{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'scale(1)'}], {duration:300,easing:'ease-out'});
    began = performance.now(); frame = requestAnimationFrame(paint);
  }
  addEventListener('studio-menu', event => { if (event.detail) play(); else hideScatter(); });
  document.addEventListener('click', event => {
    const control = event.target.closest('button,a[href]');
    if (!control || control.matches('.menu-toggle,.motion-toggle,[disabled]') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const box = control.getBoundingClientRect();
    const anchor = {x:box.left + box.width/2,y:box.top + box.height/2};
    play(anchor);
    if (allowed() && control.matches('a[href]') && control.target !== '_blank' && !event.defaultPrevented) {
      const url = new URL(control.href, location.href);
      if (url.origin === location.origin && url.pathname !== location.pathname) {
        try { sessionStorage.setItem('namaha-scattered-flower', JSON.stringify({at:Date.now(),anchor})); } catch {}
      }
    }
  });
  addEventListener('studio-motion', event => { enabled = event.detail; if (!enabled) stop(); });
  motion.addEventListener('change', () => { if (motion.matches) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  addEventListener('pagehide', stop);
  addEventListener('resize', hideScatter);
  try {
    const recent = JSON.parse(sessionStorage.getItem('namaha-scattered-flower') || 'null');
    sessionStorage.removeItem('namaha-scattered-flower');
    if (recent && Date.now() - recent.at < 4000 && Number.isFinite(recent.anchor?.x) && Number.isFinite(recent.anchor?.y)) play(recent.anchor);
  } catch {}
}
