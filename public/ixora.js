const clamp = value => Math.max(0, Math.min(1, value));

// A scroll-position function makes the flower retrace the same path on scroll-up.
export function flowerPose(progress, start, end) {
  const p = clamp(progress);
  const t = p * p * (3 - 2 * p);
  const arc = p === 0 || p === 1 ? 0 : Math.sin(Math.PI * p);
  return {
    x: start.x + (end.x - start.x) * t + arc * 35,
    y: start.y + (end.y - start.y) * t - arc * 80,
    size: 54 - 38 * t,
    rotation: -22 + 112 * t
  };
}

export function initIxora() {
  const flower = document.querySelector('[data-ixora]');
  const hero = document.querySelector('.hero');
  const symbol = document.querySelector('.brand .brand-symbol');
  if (!flower || !hero || !symbol) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = true, frame = 0;
  function paint() {
    frame = 0;
    const hidden = motion.matches || !enabled || document.hidden;
    flower.hidden = hidden;
    if (hidden) return;
    const rect = symbol.getBoundingClientRect();
    const progress = clamp(scrollY / Math.max(300, hero.offsetHeight * .85));
    const pose = flowerPose(progress,
      {x: Math.min(innerWidth - 42, innerWidth * .82), y: Math.min(innerHeight - 100, 510)},
      {x: rect.left + rect.width * .5, y: rect.top + rect.height * .44});
    flower.style.width = `${pose.size}px`;
    flower.style.height = `${pose.size}px`;
    flower.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) translate(-50%, -50%) rotate(${pose.rotation}deg)`;
    flower.dataset.landed = String(progress >= 1);
  }
  const update = () => { if (!frame) frame = requestAnimationFrame(paint); };
  addEventListener('scroll', update, {passive:true});
  addEventListener('resize', update, {passive:true});
  addEventListener('studio-motion', event => { enabled = event.detail; update(); });
  document.addEventListener('visibilitychange', update);
  motion.addEventListener('change', update);
  paint();
}
