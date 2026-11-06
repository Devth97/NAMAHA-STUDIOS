import { projects, gallery } from './data.js';
import { crop, button, icon, arrow } from './components.js';
import { validateEnquiry, submitEnquiry, serviceTypes, fieldError, validatedFields } from './enquiry.js';
import { siteConfig } from './config.js';

const reducedMotion = () => matchMedia('(prefers-reduced-motion:reduce)').matches;

export function setupInteractions() {
  setupHeader();
  setupMenu();
  setupReveal();
  setupFilters();
  setupServiceIndex();
  setupDialog();
  setupForm();
}

// The header condenses once the visitor scrolls, giving content more room.
function setupHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  let ticking = false;
  const update = () => { header.classList.toggle('is-condensed', scrollY > 24); ticking = false; };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

function setupMenu() {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!menu || !navigation) return;
  const outside = () => [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.brand'), document.querySelector('.header .social'), document.querySelector('.header-cta')].filter(Boolean);
  const label = menu.querySelector('.sr-only');
  const setOpen = open => {
    menu.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close menu' : 'Open menu';
    menu.querySelector('.menu-lines').innerHTML = icon(open ? 'close' : 'menu');
    navigation.classList.toggle('open', open);
    document.documentElement.classList.toggle('menu-open', open);
    outside().forEach(element => { element.inert = open; });
    if (open) navigation.querySelector('a')?.focus({ preventScroll: true });
  };
  menu.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) { setOpen(false); menu.focus(); }
    // Keep keyboard focus inside the open menu panel and its toggle.
    if (event.key === 'Tab' && navigation.classList.contains('open')) {
      const focusable = [menu, ...navigation.querySelectorAll('a, button')];
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); focusable.at(-1).focus(); }
      else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); focusable[0].focus(); }
    }
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  matchMedia('(min-width:761px)').addEventListener('change', () => setOpen(false));
}

// Only content that starts below the fold animates in, so the first view never flickers.
function setupReveal() {
  if (reducedMotion() || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    entry.target.classList.remove('pending-reveal');
    observer.unobserve(entry.target);
  }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight * 0.92) return;
    element.classList.add('pending-reveal');
    observer.observe(element);
  });
  // Safety net: never leave content hidden if the observer is interrupted.
  addEventListener('load', () => setTimeout(() => document.querySelectorAll('.pending-reveal').forEach(element => {
    if (element.getBoundingClientRect().top < innerHeight) { element.classList.add('is-visible'); element.classList.remove('pending-reveal'); }
  }), 1500));
}

function setupFilters() {
  const controls = document.querySelectorAll('[data-filter]');
  controls.forEach(control => control.addEventListener('click', () => {
    const selected = control.dataset.filter;
    controls.forEach(item => { item.classList.toggle('active', item === control); item.setAttribute('aria-pressed', String(item === control)); });
    const apply = () => {
      let visible = 0;
      document.querySelectorAll('.filter-item').forEach(item => {
        item.hidden = selected !== 'All' && item.dataset.category !== selected;
        if (!item.hidden) { visible++; item.querySelector('.reveal')?.classList.add('is-visible'); item.querySelector('.reveal')?.classList.remove('pending-reveal'); }
      });
      document.querySelector('#filter-status').textContent = `${visible} ${visible === 1 ? 'item' : 'items'} shown${selected === 'All' ? '' : ` in ${selected}`}.`;
    };
    // Smoothly re-flow the grid where the browser supports view transitions.
    if (document.startViewTransition && !reducedMotion()) document.startViewTransition(apply); else apply();
  }));
}

// Highlights the service currently in view within the sticky service index.
function setupServiceIndex() {
  const links = [...document.querySelectorAll('.service-index a')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.toggleAttribute('aria-current', link.hash === `#${entry.target.id}`));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('.service-detail').forEach(section => observer.observe(section));
}

function embed(url) {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return `<iframe src="https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0" title="Namaha Studios showreel" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `<iframe src="https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1" title="Namaha Studios showreel" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  return `<video src="${url}" controls autoplay playsinline preload="metadata"></video>`;
}

function setupDialog() {
  const dialog = document.querySelector('#preview-dialog');
  if (!dialog) return;
  const content = dialog.querySelector('#dialog-content');
  let trigger = null;
  let galleryIndex = null;
  const show = (html, source, variant = '') => {
    trigger = source;
    content.innerHTML = html;
    dialog.className = variant;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.classList.add('modal-open');
    dialog.querySelector('.dialog-close').focus();
  };
  const close = () => dialog.close();
  dialog.querySelector('.dialog-close').addEventListener('click', close);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    galleryIndex = null;
    content.innerHTML = ''; // stops any playing video
    trigger?.focus({ preventScroll: true });
  });

  document.querySelectorAll('[data-project]').forEach(control => control.addEventListener('click', () => {
    const project = projects[Number(control.dataset.project)];
    show(`<div class="dialog-image">${crop(project.image, `${project.title} — illustrative concept`, '', '(max-width: 760px) 100vw, 840px')}</div><div class="dialog-copy"><p class="eyebrow">${project.category} · CONCEPT PREVIEW</p><h2 id="dialog-title">${project.title}</h2><p>${project.note}</p>${project.link ? `<p><a class="button outline" href="${project.link}" target="_blank" rel="noopener noreferrer"><span class="button-label">Watch the film</span>${arrow}<span class="sr-only">(opens in a new tab)</span></a></p>` : ''}<p class="dialog-disclaimer">This is an illustrative concept for the website demo, rather than a credited Namaha production. Real projects, credits and film links will be added with the studio.</p>${button('Create a story with us', './contact.html')}</div>`, control);
  }));

  const visibleGallery = () => [...document.querySelectorAll('[data-gallery]')].filter(item => !item.closest('.filter-item').hidden).map(item => Number(item.dataset.gallery));
  function showGallery(index, source) {
    galleryIndex = index;
    const item = gallery[index], visible = visibleGallery();
    show(`<div class="dialog-image">${crop(item.image, item.title, '', '(max-width: 760px) 100vw, 840px')}</div><div class="dialog-copy"><p class="eyebrow">${item.category} · ILLUSTRATIVE IMAGE</p><h2 id="dialog-title">${item.title}</h2><p>An AI-created scene illustrating the creative world, rather than a documented Namaha production.</p></div><div class="dialog-nav"><button type="button" data-previous>${icon('left')}Previous<span class="sr-only"> image</span></button><span aria-live="polite">${visible.indexOf(index) + 1} / ${visible.length}</span><button type="button" data-next>Next<span class="sr-only"> image</span>${icon('right')}</button></div>`, source ?? trigger, 'is-gallery');
    content.querySelector('[data-previous]').addEventListener('click', () => advance(-1));
    content.querySelector('[data-next]').addEventListener('click', () => advance(1));
  }
  function advance(direction) {
    const visible = visibleGallery();
    const focused = direction < 0 ? '[data-previous]' : '[data-next]';
    showGallery(visible[(visible.indexOf(galleryIndex) + direction + visible.length) % visible.length]);
    content.querySelector(focused).focus({ preventScroll: true });
  }
  document.querySelectorAll('[data-gallery]').forEach(control => control.addEventListener('click', () => showGallery(Number(control.dataset.gallery), control)));
  dialog.addEventListener('keydown', event => {
    if (galleryIndex !== null && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); advance(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  // Swipe between gallery images on touch screens.
  let touchStart = null;
  dialog.addEventListener('touchstart', event => { touchStart = event.touches.length === 1 ? event.touches[0].clientX : null; }, { passive: true });
  dialog.addEventListener('touchend', event => {
    if (galleryIndex === null || touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 60) advance(distance > 0 ? -1 : 1);
  }, { passive: true });

  document.querySelectorAll('[data-showreel]').forEach(control => control.addEventListener('click', () => {
    show(`<h2 id="dialog-title" class="sr-only">Namaha Studios showreel</h2><div class="video-frame">${embed(siteConfig.showreelUrl)}</div>`, control, 'is-video');
  }));

  const live = Boolean(siteConfig.web3formsAccessKey);
  document.querySelectorAll('[data-privacy]').forEach(control => control.addEventListener('click', () => show(`<div class="dialog-copy"><p class="eyebrow">YOUR INFORMATION</p><h2 id="dialog-title">A note on privacy.</h2>${live
    ? '<p>When you send an enquiry, the details you enter are processed by our form provider, Web3Forms, and emailed to the studio so we can reply. We use them only to respond to your enquiry and do not add you to any mailing list.</p><p>To ask about or remove your enquiry details, contact the studio through the email address you receive our reply from.</p>'
    : '<p>This design preview does not send enquiry details or store them in a database. Information you type remains in the current page and is lost when you leave or reload it.</p><p>Once the studio activates the contact form, submitted details will be processed by the selected form provider and emailed to the studio to respond to your enquiry. The final privacy notice will identify the provider and studio contact details before launch.</p>'}<p>There are no analytics or advertising trackers on this site. Fonts are served by Google Fonts. Instagram and WhatsApp links open their respective services in a separate tab. WhatsApp messages are handled by WhatsApp.</p></div>`, control)));
}

function setupForm() {
  const form = document.querySelector('#enquiry-form');
  if (!form) return;
  const status = form.querySelector('#form-status');
  const submit = form.querySelector('[type=submit]');
  const success = document.querySelector('#form-success');
  const counter = form.querySelector('[data-counter]');
  const live = Boolean(siteConfig.web3formsAccessKey);
  const service = new URLSearchParams(location.search).get('service');
  if (serviceTypes.includes(service)) form.elements.type.value = service;

  const touched = new Set();
  const showError = (field, message) => {
    const control = form.elements[field];
    const slot = form.querySelector(`#${field}-error`);
    if (!control || !slot) return;
    control.setAttribute('aria-invalid', String(Boolean(message)));
    control.closest('.field')?.classList.toggle('is-valid', !message && Boolean(control.value.trim()));
    slot.textContent = message;
  };
  // "Reward early, flag late": errors appear after leaving a field, and clear as soon as it is fixed.
  for (const field of validatedFields) {
    const control = form.elements[field];
    if (!control) continue;
    control.addEventListener('blur', () => {
      if (!control.value && !touched.has(field) && !control.required) return;
      if (control.value || touched.has(field)) { touched.add(field); showError(field, fieldError(field, control.value)); }
    });
    control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'input', () => {
      status.textContent = ''; status.className = '';
      if (touched.has(field) || control.getAttribute('aria-invalid') === 'true') showError(field, fieldError(field, control.value));
    });
  }
  const updateCounter = () => {
    const length = form.elements.message.value.length;
    counter.textContent = `${length.toLocaleString('en-IN')} / 5,000`;
    counter.classList.toggle('is-near', length > 4500);
  };
  form.elements.message.addEventListener('input', updateCounter);
  updateCounter();

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled || form.elements.website.value) return;
    const data = Object.fromEntries(new FormData(form));
    const errors = validateEnquiry(data);
    validatedFields.forEach(field => { touched.add(field); showError(field, errors[field] || ''); });
    const invalid = Object.keys(errors);
    if (invalid.length) {
      status.className = 'error';
      status.textContent = invalid.length === 1 ? 'Please check the highlighted field.' : `Please check the ${invalid.length} highlighted fields.`;
      form.elements[invalid[0]].focus();
      return;
    }
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    window.dispatchEvent(new CustomEvent('studio-request', { detail: true }));
    submit.classList.add('is-loading');
    submit.querySelector('.button-label').textContent = live ? 'Sending…' : 'Preparing preview…';
    status.textContent = ''; status.className = '';
    try {
      const result = await submitEnquiry(data, siteConfig.web3formsAccessKey);
      success.querySelector('[data-success-copy]').textContent = result.status === 'demo'
        ? `Thank you, ${data.name.trim().split(' ')[0]}. This is a design preview, so no email has been sent — please email or WhatsApp the studio to send your brief. Your details are still in the form.`
        : `Thank you, ${data.name.trim().split(' ')[0]}. Your enquiry has reached the studio and we’ll reply to ${data.email.trim()} soon.`;
      if (result.status === 'sent') { form.reset(); touched.clear(); updateCounter(); form.querySelectorAll('.is-valid').forEach(field => field.classList.remove('is-valid')); }
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      status.className = 'error';
      status.textContent = error.name === 'TimeoutError' ? 'The request timed out. Your details are still here — please try again.' : error.message;
      status.focus();
    } finally {
      form.removeAttribute('aria-busy');
      window.dispatchEvent(new CustomEvent('studio-request', { detail: false }));
      submit.disabled = false;
      submit.classList.remove('is-loading');
      submit.querySelector('.button-label').textContent = live ? 'Send enquiry' : 'Try the enquiry form';
    }
  });
  success.querySelector('[data-new-enquiry]').addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
}
