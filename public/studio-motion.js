const scene = (name, drawing) => `<svg class="studio-vignette" viewBox="0 0 250 180" role="img" aria-label="${name}" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">${drawing}</svg>`;

export function studioMotion() {
  return `<section class="studio-motion" aria-label="A little life behind the scenes" data-studio-motion>
    <div class="studio-motion-scenes">
    ${scene('A writer planning frames on a storyboard', `
      <path class="studio-ground" d="M18 158Q77 155 120 158M161 159q31-3 66-1"/>
      <path d="M139 52l67 3-3 67-68-3ZM144 59l54 2-2 49-55-2M140 121l-12 36M196 123l10 35M151 84l43 2M169 61l-1 46M145 78l6-7 6 6 7-6M176 78l8-11 8 10M145 101l6-8 12 9M176 101q6-14 16-6"/>
      <path d="M77 49q-10-6-14 3l-1 10 7 10 11-3 5-14-8-6M65 50q1-9 12-7l8 8M66 72l-9 21-2 31 28 2 5-31-10-20M58 92l-12 20 13 7M58 124l-2 31-13 2M71 127l8 28 13 2M56 155l8 2M78 154l-1 5M58 89l16 7"/>
      <g class="studio-pencil-arm"><path d="M81 82l18 8 20-13 3 6-20 17-17-6M119 78l7-2 2 4-7 3M127 77l8-4"/></g>
      <g class="studio-idea" stroke="#aa7b46"><path d="M30 47q-10-12-2-20 14-9 19 4 3 9-7 17l-1 7-9-1ZM30 58l8 .5M35 48l-2-11 5 1 3-5M16 25l-5-4M38 16l1-6M53 27l7-3"/></g>`)}
    ${scene('A camera operator slowly moving a camera dolly', `
      <path class="studio-ground" d="M14 157q110-3 222 0M25 164l194-1"/>
      <g class="studio-dolly">
      <path d="M51 139l137-1 9 8-148 1ZM61 148q-7 1-5 7 5 6 10-1 1-5-5-6M174 147q-7 0-6 6 5 8 11 0-1-6-5-6M130 92l-22 45M133 94l23 43M133 96l-1 38M120 84l29 1-1 9-29-2"/>
      <path d="M115 59l42 1-1 23-41-1ZM159 64l12-4 2 22-15-4M123 60l-1-7 19 1 4 6M121 70l10 1M145 65l5 1M146 77l4 .3M173 62l9-4 1 25-10-2"/>
      <path d="M79 73q-11-5-13 4-4 11 8 15 12-1 11-12l-6-7M66 77q0-10 13-9l7 7M68 92l-15 25 26 13 17-7-10-24-10-5M59 116l22 1 20-27M83 101l18-13 16 2M99 90l7-5 10 2M72 130l-10 9M88 131l12 7M52 113l-8-6"/>
      <path stroke="#a98153" d="M118 60l-1 19M123 58l15 .7M109 134l7-17M57 142l65-1"/>
      </g>`)}
    ${scene('A sound recordist adjusting a boom microphone', `
      <path class="studio-ground" d="M14 158q35-3 76 0M124 158l109-1"/>
      <path d="M158 66q-9-8-15 1l1 13 10 5 8-9-4-10M142 68q-2-12 11-10l10 7M141 84l-10 28 8 17 26-1 3-35-12-10M140 128l-10 28-11 2M154 130l12 25 12 2M131 157l6 1M164 155l-1 4M145 90l10 14M159 85l15-13 5 3-13 22M164 111l9 7-4 15-13-4"/>
      <g class="studio-boom"><path d="M141 91l-14-21-5-15M156 85l-18-20-7-15M124 56l-4-9 5-4 7 9M127 47L51 25M54 23l-14-5-5 14 15 5ZM38 24l13 4M37 29l12 4"/><path stroke="#a98153" d="M40 23l9 3M39 27l10 3"/></g>
      <path d="M201 79l20 1-1 30-20-1ZM204 109l-9 45M216 111l10 44M206 88l11 .5"/>
      <g class="studio-sound" stroke="#aa7b46"><path d="M30 43q-5 5-2 10M23 40q-7 10-2 17M16 36q-10 14-3 25"/></g>`)}
    ${scene('An editor reviewing a film at an editing desk', `
      <path class="studio-ground" d="M12 158l52-1M124 157q58-2 112 1"/>
      <path d="M81 95l140 1M87 98l-4 58M214 97l7 59M151 52l65 2-1 36-66-1ZM155 58l55 1-1 25-56-1M177 91l-1 5M193 90l1 5M116 92l28 .3M165 91l40 1"/>
      <path d="M92 68q-11-6-15 4l2 14 10 4 8-9-5-13M78 71q-1-9 12-8l8 7M81 89l-12 18 2 23 28 1 5-24-10-16M98 98l15 11 18-12M127 98l10-1M73 130l-1 12 26 1 5-12M82 144l-10 10-11 2M95 145l10 9 12 1M65 112l-8 2 3 24 11 3M62 143l-3 13M62 144l24 13"/>
      <g class="studio-edit-lines" stroke="#a98153"><path d="M158 67l12-1M174 67l22 .4M161 72l26 .3M191 72l13-.2M157 78l9 .2M170 78l29-.3"/></g>
      <g class="studio-slate"><path d="M26 113l29 1-1 26-30-1ZM25 113l2-8 29 1-1 8M30 106l6 7M40 107l6 7M49 107l5 5M29 121l20 .5M30 129l14 .4"/></g>`)}
    </div>
    <div class="studio-motion-caption"><span>A LITTLE LIFE BEHIND THE SCENES</span><button type="button" class="text-button studio-motion-toggle" aria-pressed="false" data-studio-motion-toggle>Pause scene motion</button></div>
  </section>`;
}

export function initStudioMotion() {
  const strip = document.querySelector('[data-studio-motion]');
  if (!strip) return;
  const control = strip.querySelector('[data-studio-motion-toggle]');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let paused = false, globalEnabled = true, visible = true;
  function update() {
    const stopped = paused || !globalEnabled || reduced.matches;
    strip.classList.toggle('is-paused',stopped || !visible || document.hidden);
    control.disabled = reduced.matches || !globalEnabled;
    control.setAttribute('aria-pressed',String(stopped));
    control.textContent = reduced.matches ? 'Reduced motion enabled' : !globalEnabled ? 'Scene motion paused' : paused ? 'Play scene motion' : 'Pause scene motion';
  }
  control.addEventListener('click',()=>{paused=!paused;update();});
  addEventListener('studio-motion',event=>{globalEnabled=event.detail;update();});
  reduced.addEventListener('change',update);
  document.addEventListener('visibilitychange',update);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{rootMargin:'80px'}).observe(strip);
  update();
}
