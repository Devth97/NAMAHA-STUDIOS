const clamp = value => Math.max(0, Math.min(1, value));

// Aim at the existing bud inside the supplied symbol, rather than the wordmark.
export function budDock(symbol) {
  return { x: symbol.left + symbol.width * .58, y: symbol.top + symbol.height * .79 };
}
export function budPose(progress, start, end) {
  const p = clamp(progress), t = p * p * (3 - 2 * p);
  const arc = p === 0 || p === 1 ? 0 : Math.sin(Math.PI * p);
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t - arc * 55,
    size: 46 - 34 * t,
    rotation: -18 + 18 * t
  };
}
export function initIxora() {
  const bud = document.querySelector('[data-ixora]');
  const bunch = document.querySelector('[data-ixora-bunch]');
  const symbol = document.querySelector('.header .brand-symbol');
  if (!bud || !bunch || !symbol) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = true, frame = 0, began = 0, start = null;
  const allowed = () => enabled && !motion.matches && !document.hidden;
  const menuOpen = () => document.documentElement.classList.contains('menu-open');
  function stop() {
    cancelAnimationFrame(frame); frame = 0;
    bud.hidden = true; bud.dataset.phase = 'idle'; bunch.hidden = true;
  }
  function paint(now) {
    frame = 0;
    if (!allowed()) { stop(); return; }
    const elapsed = now - began;
    if (elapsed >= 1800) {
      bud.hidden = true; bud.dataset.phase = 'joined';
      bunch.hidden = !menuOpen(); return;
    }
    const progress = clamp((elapsed - 420) / 1100);
    const pose = budPose(progress, start, budDock(symbol.getBoundingClientRect()));
    bud.hidden = elapsed < 420;
    bud.dataset.phase = elapsed < 420 ? 'bunch' : progress < 1 ? 'flying' : 'joining';
    bud.style.width = `${pose.size}px`; bud.style.height = `${pose.size}px`;
    bud.style.opacity = String(progress < .85 ? 1 : (1 - progress) / .15);
    bud.style.transform = `translate3d(${pose.x}px,${pose.y}px,0) translate(-50%,-50%) rotate(${pose.rotation}deg)`;
    if (!menuOpen()) bunch.style.opacity = String(Math.max(0, 1 - elapsed / 700));
    frame = requestAnimationFrame(paint);
  }
  function play(point) {
    if (!allowed()) return;
    cancelAnimationFrame(frame);
    bunch.hidden = false; bunch.style.opacity = '1';
    bunch.getAnimations().forEach(animation => animation.cancel());
    bunch.animate([{opacity:0,transform:'scale(.7) translateY(12px)'},{opacity:1,transform:'scale(1) translateY(0)'}], {duration:360,easing:'cubic-bezier(.16,1,.3,1)'});
    const rect = bunch.getBoundingClientRect();
    start = point || {x:rect.left + rect.width * .5,y:rect.top + rect.height * .32};
    began = performance.now(); frame = requestAnimationFrame(paint);
  }
  addEventListener('studio-menu', event => { if (event.detail) play(); else stop(); });
  // Carry menu navigation feedback to the next page without delaying the link.
  document.querySelector('#navigation')?.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin) return;
    play();
    if (url.pathname !== location.pathname) {
      try { sessionStorage.setItem('namaha-menu-bud', JSON.stringify({at:Date.now(),point:start})); } catch {}
    }
  });
  addEventListener('studio-motion', event => { enabled = event.detail; if (!enabled) stop(); });
  motion.addEventListener('change', () => { if (motion.matches) stop(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  addEventListener('pagehide', stop); addEventListener('resize', stop);
  try {
    const recent = JSON.parse(sessionStorage.getItem('namaha-menu-bud') || 'null');
    sessionStorage.removeItem('namaha-menu-bud');
    if (recent && Date.now() - recent.at < 4000 && Number.isFinite(recent.point?.x) && Number.isFinite(recent.point?.y)) play(recent.point);
  } catch {}
}
