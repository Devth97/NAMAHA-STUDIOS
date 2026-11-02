const clamp = value => Math.max(0, Math.min(1, value));

export function flowerPose(progress, start, end) {
  const p = clamp(progress);
  const t = p * p * (3 - 2 * p);
  const arc = p === 0 || p === 1 ? 0 : Math.sin(Math.PI * p);
  return {
    x: start.x + (end.x - start.x) * t + arc * 20,
    y: start.y + (end.y - start.y) * t - arc * 45,
    size: 28 - 6 * t,
    rotation: -22 + 112 * t
  };
}

export function flowerDock(brand, viewportWidth, nextControlLeft = viewportWidth) {
  return {x:Math.min(brand.right+20,nextControlLeft-16,viewportWidth-18), y:brand.top+brand.height/2};
}

export function initIxora() {
  const flower=document.querySelector('[data-ixora]');
  const brand=document.querySelector('.header .brand');
  if (!flower || !brand) return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let enabled=true, frame=0, began=0, from=null, pending=false, endAt=0;
  const allowed=()=>enabled&&!motion.matches&&!document.hidden;
  function stop() {
    cancelAnimationFrame(frame); frame=0; from=null;
    flower.hidden=true; flower.dataset.phase='idle';
  }
  function dock() {
    const rect=brand.getBoundingClientRect();
    const next=[...document.querySelectorAll('.header .social,.header .menu-toggle,.header-cta,.header nav')]
      .map(el=>el.getBoundingClientRect()).filter(box=>box.width&&box.left>rect.right);
    return flowerDock(rect,innerWidth,Math.min(innerWidth,...next.map(box=>box.left)));
  }
  function paint(now) {
    frame=0;
    if (!allowed()||(!pending&&now>=endAt)) { stop(); return; }
    const elapsed=now-began;
    const pose=flowerPose(elapsed/420,from,dock());
    flower.hidden=false;
    flower.dataset.phase=elapsed<420?'flying':'loading';
    const rotation=pose.rotation+(elapsed>420?(elapsed-420)*.32:0);
    flower.style.width=`${pose.size}px`;flower.style.height=`${pose.size}px`;
    flower.style.opacity=String(pending?1:Math.min(1,(endAt-now)/180));
    flower.style.transform=`translate3d(${pose.x}px,${pose.y}px,0) translate(-50%,-50%) rotate(${rotation}deg)`;
    frame=requestAnimationFrame(paint);
  }
  function start(point) {
    if (!allowed()) return;
    began=performance.now();endAt=began+1450;
    from=point||dock();
    if (!frame) frame=requestAnimationFrame(paint);
  }
  // No scroll handler: the flower appears only after an activation.
  document.addEventListener('click',event=>{
    const control=event.target.closest('button,a[href]');
    if (!control||control.matches('.motion-toggle,[disabled]')) return;
    const rect=control.getBoundingClientRect();
    const point={x:rect.left+rect.width/2,y:rect.top+rect.height/2};
    start(point);
    if (control.matches('a[href]')&&control.target!=='_blank'&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey) {
      const url=new URL(control.href,location.href);
      if (url.origin===location.origin&&url.pathname!==location.pathname&&!event.defaultPrevented) {
        try { sessionStorage.setItem('namaha-click-flight',JSON.stringify({at:Date.now(),point})); } catch {}
      }
    }
  });
  document.addEventListener('submit',()=>{if(!from)start();});
  addEventListener('studio-request',event=>{
    pending=event.detail===true;
    if (pending) { if (!from) start(); }
    else if (from) endAt=Math.max(began+700,performance.now()+250);
  });
  addEventListener('studio-motion',event=>{enabled=event.detail;if(!enabled)stop();});
  motion.addEventListener('change',()=>{if(motion.matches)stop();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  addEventListener('pagehide',stop);
  try {
    const recent=JSON.parse(sessionStorage.getItem('namaha-click-flight')||'null');
    sessionStorage.removeItem('namaha-click-flight');
    if (recent&&Date.now()-recent.at<4000&&Number.isFinite(recent.point?.x)&&Number.isFinite(recent.point?.y)) start(recent.point);
  } catch {}
}
