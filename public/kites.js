// Three paper kites share one decorative, pointer-transparent canvas.
export function bindKiteInput(target, onMove, onEnd) {
  target.addEventListener('pointermove', event => {
    if (event.pointerType !== 'touch') onMove({ x: event.clientX, y: event.clientY });
  }, { passive: true });
  const touch = event => {
    if (event.touches.length !== 1) { onEnd(); return; }
    const finger = event.touches[0];
    onMove({ x: finger.clientX, y: finger.clientY });
  };
  target.addEventListener('touchstart', touch, { passive: true });
  target.addEventListener('touchmove', touch, { passive: true });
  target.addEventListener('touchend', onEnd, { passive: true });
  target.addEventListener('touchcancel', onEnd, { passive: true });
}

const colours = ['#b18a48', '#b76d53', '#77856b'];
export function createFlight(point) {
  return colours.map((colour, i) => ({
    x: point.x - 38 - i * 38, y: point.y + 18 + i * 25,
    angle: -.25, size: 43 - i * 5, colour,
  }));
}

export function advanceFlight(flight, target, elapsed, time) {
  const dt = Math.min(50, elapsed) / 16.667;
  flight.forEach((kite, i) => {
    const dx = target.x - 35 - i * 38 - kite.x;
    const dy = target.y + 20 + i * 25 + Math.sin(time * .002 + i * 2) * 9 - kite.y;
    const ease = 1 - Math.pow(1 - .12 / (1 + i * .6), dt);
    kite.x += dx * ease;
    kite.y += dy * ease;
    const tilt = Math.max(-.65, Math.min(.65, dx * .006)) + Math.sin(time * .0025 + i) * .1;
    kite.angle += (tilt - kite.angle) * (1 - Math.pow(.88, dt));
  });
}

export function initKites(canvas) {
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  const motion = matchMedia('(prefers-reduced-motion:reduce)');
  const finePointer = matchMedia('(pointer:fine)');
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'motion-toggle';
  document.querySelector('.hero-bottom')?.prepend(control);
  let enabled = true, frame = 0, lastTime = 0, lastMove = 0, width = 1, height = 1;
  let flight = [], target = null;
  const sprites = ['gold', 'terracotta', 'sage'].map(colour => {
    const sprite = new Image();
    sprite.src = new URL(`./assets/kite-${colour}.svg`, import.meta.url).href;
    return sprite;
  });
  const allowed = () => enabled && !motion.matches && !document.hidden;
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0; lastTime = 0; flight = []; target = null;
    context.clearRect(0, 0, width, height);
  }
  function availability() {
    if (!allowed()) stop();
    control.hidden = motion.matches;
    control.setAttribute('aria-pressed', String(enabled));
    control.setAttribute('aria-label', enabled ? 'Pause kite animation' : 'Resume kite animation');
    control.textContent = enabled ? 'KITES IN MOTION' : 'KITES PAUSED';
  }
  function resize() {
    stop();
    width = document.documentElement.clientWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, finePointer.matches ? 1.5 : 1);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  control.addEventListener('click', () => { enabled = !enabled; availability(); });
  motion.addEventListener('change', availability);
  document.addEventListener('visibilitychange', availability);
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('blur', stop);
  document.documentElement.addEventListener('pointerleave', stop);
  bindKiteInput(window, point => {
    if (!allowed()) return;
    target = point;
    lastMove = performance.now();
    if (!flight.length) flight = createFlight(point);
    if (!frame) frame = requestAnimationFrame(draw);
  }, stop);

  function draw(time) {
    frame = 0;
    if (!allowed() || !target || time - lastMove >= 2000) { stop(); return; }
    advanceFlight(flight, target, lastTime ? time - lastTime : 16.667, time);
    lastTime = time;
    context.clearRect(0, 0, width, height);
    // A brief arrival and idle fade keep the decoration unobtrusive.
    context.globalAlpha = Math.min(1, (2000 - (time - lastMove)) / 650) * .9;
    flight.forEach((kite, i) => {
      const size = kite.size * (finePointer.matches ? 1 : .8);
      context.save();
      context.translate(kite.x, kite.y);
      context.rotate(kite.angle);
      context.strokeStyle = kite.colour;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(0, size * .62);
      for (let j = 1; j <= 28; j++) {
        const wave = Math.sin(j * .25 - time * .005 + i * 2) * j * .45;
        context.lineTo(wave, size * .62 + j * 2.3);
      }
      context.stroke();
      // Tiny ribbon bows travel with the flowing tail.
      for (const j of [7, 15, 23]) {
        const x = Math.sin(j * .25 - time * .005 + i * 2) * j * .45;
        const y = size * .62 + j * 2.3;
        context.fillStyle = kite.colour;
        context.beginPath();
        context.moveTo(x - 4, y - 3); context.lineTo(x + 4, y + 3);
        context.lineTo(x + 4, y - 3); context.lineTo(x - 4, y + 3);
        context.closePath(); context.fill();
      }
      if (sprites[i].complete && sprites[i].naturalWidth) {
        context.drawImage(sprites[i], -size / 2, -size * .62, size, size * 1.24);
      }
      context.restore();
    });
    context.globalAlpha = 1;
    frame = requestAnimationFrame(draw);
  }
  resize(); availability();
}
