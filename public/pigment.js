// Bounded canvas pigment simulation: curling filaments and diffusing colour blooms.
// It is decorative, follows movement across the page and never captures pointer input.
export function initPigment(canvas) {
  if(!canvas) return;
  const motion=matchMedia('(prefers-reduced-motion:reduce)');
  const finePointer=matchMedia('(pointer:fine)');
  const context=canvas.getContext('2d');
  if(!context) return;
  const host=document.documentElement;
  const control=document.createElement('button');
  control.type='button'; control.className='motion-toggle'; control.setAttribute('aria-pressed','true'); control.textContent='INK IN MOTION';
  host.querySelector('.hero-bottom').insertBefore(control,host.querySelector('.hero-bottom a'));
  let enabled=true, frame=0, idleTimer=0, lastTime=0, previous=null, particles=[], width=1, height=1, scale=1;
  const sprites=['167,124,66','58,60,47','194,156,95'].map(colour=>{
    const sprite=document.createElement('canvas');sprite.width=96;sprite.height=96;
    const brush=sprite.getContext('2d');
    const gradient=brush.createRadialGradient(48,48,0,48,48,47);
    gradient.addColorStop(0,`rgba(${colour},.24)`);gradient.addColorStop(.3,`rgba(${colour},.12)`);gradient.addColorStop(.7,`rgba(${colour},.035)`);gradient.addColorStop(1,`rgba(${colour},0)`);
    brush.fillStyle=gradient;brush.fillRect(0,0,96,96);return sprite;
  });
  const allowed=()=>enabled && !motion.matches && finePointer.matches && !document.hidden;
  function size(){width=host.clientWidth;height=window.innerHeight;scale=Math.min(1,960/width);canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);context.setTransform(scale,0,0,scale,0,0);particles=[];previous=null;}
  window.addEventListener('resize',size,{passive:true});
  function stop(){cancelAnimationFrame(frame);clearTimeout(idleTimer);frame=0;lastTime=0;previous=null;particles=[];context.clearRect(0,0,width,height);}
  function updateAvailability(){if(!allowed())stop();control.hidden=!finePointer.matches||motion.matches;}
  document.addEventListener('visibilitychange',updateAvailability);
  motion.addEventListener('change',updateAvailability);finePointer.addEventListener('change',updateAvailability);
  control.addEventListener('click',()=>{enabled=!enabled;control.setAttribute('aria-pressed',String(enabled));control.textContent=enabled?'INK IN MOTION':'INK PAUSED';updateAvailability();});
  host.addEventListener('pointerleave',()=>{previous=null;});
  window.addEventListener('pointermove',event=>{
    if(!allowed() || event.pointerType==='touch')return;
    clearTimeout(idleTimer);
    idleTimer=setTimeout(stop,1600);
    const x=event.clientX, y=event.clientY;
    const dx=previous?x-previous.x:0,dy=previous?y-previous.y:0;
    const steps=Math.min(7,Math.max(1,Math.ceil(Math.hypot(dx,dy)/12)));
    for(let i=0;i<steps;i++) {
      const t=(i+1)/steps;
      particles.push({x:x-dx*(1-t),y:y-dy*(1-t),vx:dx*.025+(Math.random()-.5)*1.4,vy:dy*.025+(Math.random()-.5)*1.4,born:performance.now(),life:1,seed:Math.random()*15,r:12+Math.random()*22,tone:Math.random()>.3?0:1});
    }
    if(particles.length>180)particles.splice(0,particles.length-180);
    previous={x,y};
    if(!frame)frame=requestAnimationFrame(draw);
  });
  function draw(time) {
    frame=0;if(!allowed())return;
    const dt=lastTime?Math.min(2,(time-lastTime)/16.667):1;lastTime=time;
    context.globalCompositeOperation='destination-out';context.fillStyle=`rgba(0,0,0,${1-Math.pow(.952,dt)})`;context.fillRect(0,0,width,height);
    context.globalCompositeOperation='source-over';
    for(const particle of particles){
      const oldX=particle.x,oldY=particle.y;
      const swirl=Math.sin(particle.x*.012+particle.y*.009+time*.0005+particle.seed);
      particle.vx+=(Math.cos(swirl*5)*.045)*dt;particle.vy+=(Math.sin(swirl*5)*.045)*dt;
      particle.vx*=Math.pow(.986,dt);particle.vy*=Math.pow(.986,dt);
      particle.x+=particle.vx*dt;particle.y+=particle.vy*dt;particle.life=Math.max(0,1-(time-particle.born)/1400);particle.r+=.13*dt;
      context.globalAlpha=Math.max(0,particle.life)*.36;
      context.drawImage(sprites[particle.tone],particle.x-particle.r,particle.y-particle.r,particle.r*2,particle.r*2);
      context.globalAlpha=Math.max(0,particle.life)*.1;context.strokeStyle=particle.tone===0?'#a77c42':'#363b2c';context.lineWidth=.7;
      context.beginPath();context.moveTo(oldX,oldY);context.quadraticCurveTo(particle.x+swirl*4,particle.y-swirl*3,particle.x,particle.y);context.stroke();
    }
    context.globalAlpha=1;
    particles=particles.filter(particle=>particle.life>0);
    if(particles.length)frame=requestAnimationFrame(draw);else{context.clearRect(0,0,width,height);lastTime=0;}
  }
  size();updateAvailability();
}
