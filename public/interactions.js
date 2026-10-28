import { projects, gallery } from './data.js';
import { crop, button, esc } from './components.js';
import { validateEnquiry, submitEnquiry, serviceTypes } from './enquiry.js';
import { siteConfig } from './config.js';

export function setupInteractions() {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { menu.setAttribute('aria-expanded','false'); navigation.classList.remove('open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
    navigation.classList.toggle('open',open);
  });
  document.addEventListener('keydown', event => { if(event.key==='Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
  matchMedia('(min-width:761px)').addEventListener('change',closeMenu);

  if (!matchMedia('(prefers-reduced-motion:reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); entry.target.classList.remove('pending-reveal'); observer.unobserve(entry.target); }
    }), {threshold:.08});
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('pending-reveal'); observer.observe(element); });
  }

  document.querySelectorAll('[data-filter]').forEach(control => control.addEventListener('click', () => {
    const selected = control.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active',item===control); item.setAttribute('aria-pressed',String(item===control)); });
    let visible = 0;
    document.querySelectorAll('.filter-item').forEach(item => { item.hidden = selected!=='All' && item.dataset.category!==selected; if(!item.hidden) visible++; });
    document.querySelector('#filter-status').textContent = `${visible} ${visible===1?'item':'items'} shown${selected==='All'?'':` in ${selected}`}.`;
  }));

  setupDialog();
  setupForm();
}

function setupDialog() {
  const dialog = document.querySelector('#preview-dialog');
  const content = dialog.querySelector('#dialog-content');
  let trigger = null;
  let galleryIndex = null;
  const open = (html, source) => {
    trigger = source;
    content.innerHTML = html;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    dialog.querySelector('.dialog-close').focus();
  };
  const close = () => dialog.close();
  dialog.querySelector('.dialog-close').addEventListener('click',close);
  dialog.addEventListener('click',event => { if(event.target===dialog) { const box=dialog.getBoundingClientRect(); if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom) close(); } });
  dialog.addEventListener('close',() => { document.body.classList.remove('modal-open'); galleryIndex=null; trigger?.focus({preventScroll:true}); });
  document.querySelectorAll('[data-project]').forEach(control => control.addEventListener('click',() => {
    const project = projects[Number(control.dataset.project)];
    open(`<div class="dialog-image">${crop(project.image,project.title+' illustrative concept')}</div><div class="dialog-copy"><p class="eyebrow">${project.category} · CONCEPT PREVIEW</p><h2 id="dialog-title">${project.title}</h2><p>${project.note}</p><p class="dialog-disclaimer">This is an illustrative concept for the website demo, rather than a credited Namaha production. Real projects, credits and film links will be added with the studio.</p>${button('Create a story with us','./contact.html')}</div>`,control);
  }));
  const visibleGallery = () => Array.from(document.querySelectorAll('[data-gallery]')).filter(item => !item.closest('.filter-item').hidden).map(item=>Number(item.dataset.gallery));
  function showGallery(index) {
    galleryIndex=index;
    const item=gallery[index], visible=visibleGallery();
    content.innerHTML=`<div class="dialog-image">${crop(item.image,item.title)}</div><div class="dialog-copy"><p class="eyebrow">${item.category} · ILLUSTRATIVE IMAGE</p><h2 id="dialog-title">${item.title}</h2><p>A moment from the creative world, shown using the supplied visual references.</p></div><div class="dialog-nav"><button data-previous aria-label="Previous image">← Previous</button><span>${visible.indexOf(index)+1} / ${visible.length}</span><button data-next aria-label="Next image">Next →</button></div>`;
    content.querySelector('[data-previous]').addEventListener('click',()=>advance(-1));
    content.querySelector('[data-next]').addEventListener('click',()=>advance(1));
  }
  function advance(direction) {
    const visible=visibleGallery();
    const focused=direction<0?'[data-previous]':'[data-next]';
    showGallery(visible[(visible.indexOf(galleryIndex)+direction+visible.length)%visible.length]);
    content.querySelector(focused).focus({preventScroll:true});
  }
  document.querySelectorAll('[data-gallery]').forEach(control=>control.addEventListener('click',()=>{
    trigger=control; showGallery(Number(control.dataset.gallery)); dialog.showModal(); document.body.classList.add('modal-open'); dialog.querySelector('.dialog-close').focus();
  }));
  dialog.addEventListener('keydown',event=>{if(galleryIndex!==null && ['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();advance(event.key==='ArrowLeft'?-1:1);}});
  document.querySelectorAll('[data-privacy]').forEach(control=>control.addEventListener('click',()=>open(`<div class="dialog-copy"><p class="eyebrow">YOUR INFORMATION</p><h2 id="dialog-title">A note on privacy.</h2><p>This design preview does not send enquiry details or store them in a database. Information you type remains in the current page and is lost when you leave or reload it.</p><p>Once the studio activates the contact form, submitted details will be processed by the selected form provider and emailed to the studio to respond to your enquiry. The final privacy notice will identify the provider and studio contact details before launch.</p><p>There are no analytics or advertising trackers in this demo. Instagram links open Instagram in a separate tab.</p></div>`,control)));
}

function setupForm() {
  const form=document.querySelector('#enquiry-form');
  if(!form) return;
  const status=form.querySelector('#form-status');
  const submit=form.querySelector('[type=submit]');
  const service = new URLSearchParams(location.search).get('service');
  if(serviceTypes.includes(service)) form.elements.type.value=service;
  if(siteConfig.web3formsAccessKey){submit.firstChild.textContent='Send enquiry ';document.querySelector('.contact-note p').textContent='Your enquiry will be emailed to the studio. Please share only the information needed to discuss your project.';}
  for(const field of ['name','email','type','message']) form.elements[field].addEventListener('input',()=>{
    form.elements[field].removeAttribute('aria-invalid');
    form.querySelector(`#${field}-error`).textContent='';
    status.textContent='';
  });
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(submit.disabled || form.elements.website.value) return;
    const data=Object.fromEntries(new FormData(form));
    const errors=validateEnquiry(data);
    for(const field of ['name','email','type','message']) {
      form.elements[field].setAttribute('aria-invalid',String(Boolean(errors[field])));
      form.querySelector(`#${field}-error`).textContent=errors[field] || '';
    }
    if(Object.keys(errors).length){status.textContent='Please check the highlighted fields.';status.className='error';form.elements[Object.keys(errors)[0]].focus();return;}
    submit.disabled=true;
    status.textContent=siteConfig.web3formsAccessKey?'Sending your enquiry…':'Preparing your preview…';
    status.className='';
    try {
      const result=await submitEnquiry(data,siteConfig.web3formsAccessKey);
      status.className='demo-success';
      status.textContent=result.status==='demo'?'Your enquiry preview is complete. No email has been sent — delivery will be activated once the studio’s receiving address is verified.':'Thank you. Your enquiry has been sent to the studio.';
      if(result.status==='sent') form.reset();
      status.focus();
    } catch(error) {status.className='error';status.textContent=error.name==='TimeoutError'?'The request timed out. Your details are still here — please try again.':error.message;status.focus();}
    finally {submit.disabled=false;}
  });
}
