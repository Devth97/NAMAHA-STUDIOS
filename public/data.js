export const references = {
  home: './assets/home-reference.jpg', about: './assets/about-reference.jpg',
  services: './assets/services-reference.jpg', work: './assets/work-reference.jpg',
  gallery: './assets/gallery-reference.jpg', contact: './assets/contact-reference.jpg'
};
// Standalone high-resolution assets; the supplied references are retained for the original logo.
export const art = {
  hero: './assets/hero-line.jpg',
  aboutHero: './assets/aboutHero-line.jpg',
  servicesHero: './assets/servicesHero-line.jpg',
  workHero: './assets/workHero-line.jpg',
  galleryHero: './assets/galleryHero-line.jpg',
  contactHero: './assets/contactHero-line.jpg',
  journey: './assets/journey-line.jpg',
  storyboard: './assets/storyboard-line.jpg',
  banner: './assets/banner-hq.jpg',
  film: './assets/film-hq.jpg',
  television: './assets/television-hq.jpg',
  event: './assets/event-hq.jpg',
  brand: './assets/brand-hq.jpg',
  digital: './assets/digital-hq.jpg',
  portrait: './assets/portrait-hq.jpg',
  crew: './assets/crew-hq.jpg',
  location: './assets/location-hq.jpg',
  green: './assets/green-hq.jpg',
  camera: './assets/camera-hq.jpg',
  slate: './assets/slate-hq.jpg',
  set: './assets/set-hq.jpg',
  development: './assets/development-line.jpg',
  // Slots awaiting newly generated artwork. Each currently holds a placeholder copy of an
  // existing image so the site never shows a broken image. See ASSET_PROMPTS.md.
  showreel: './assets/showreel-hq.jpg',
  project01: './assets/project-01-hq.jpg',
  project02: './assets/project-02-hq.jpg',
  project03: './assets/project-03-hq.jpg',
  project04: './assets/project-04-hq.jpg',
  project05: './assets/project-05-hq.jpg',
  project06: './assets/project-06-hq.jpg',
  gallery01: './assets/gallery-01-hq.jpg',
  gallery02: './assets/gallery-02-hq.jpg',
  gallery03: './assets/gallery-03-hq.jpg',
  gallery04: './assets/gallery-04-hq.jpg',
  gallery05: './assets/gallery-05-hq.jpg',
  discover: './assets/process-discover-line.jpg',
  develop: './assets/process-develop-line.jpg',
  create: './assets/process-create-line.jpg',
  deliver: './assets/process-deliver-line.jpg',
  notFound: './assets/notfound-line.jpg',
  success: './assets/success-line.jpg'
};
export const services = [
  { name: 'Film Production', short: 'Film', icon: 'reel', image: 'film', description: 'From the first page to the final frame. Films rooted in emotion, brought to life with care.', items: ['Feature & short films', 'Script-to-screen production', 'Production management'] },
  { name: 'Television Content', short: 'Television', icon: 'tv', image: 'television', description: 'Compelling stories and engaging formats that find a place in everyday lives.', items: ['Television shows', 'Non-fiction & documentary', 'Talk & reality formats'] },
  { name: 'Entertainment Projects', short: 'Entertainment', icon: 'spark', image: 'event', description: 'Shared moments with a lasting impression. Experiences built around people and possibility.', items: ['Live entertainment', 'Cultural & creative events', 'Event production'] },
  { name: 'Creative Development', short: 'Creative', icon: 'bulb', image: 'development', description: 'Every great story starts somewhere. We help shape a spark into a vision worth making.', items: ['Concept & story development', 'Script writing', 'Creative direction'] },
  { name: 'Commercials & Brand Films', short: 'Brand films', icon: 'camera', image: 'brand', description: 'Your brand has a story. Let’s tell it with clarity, character and a little unexpected magic.', items: ['Brand storytelling', 'Commercials & digital ads', 'Product & corporate films'] },
  { name: 'Digital Content', short: 'Digital', icon: 'screen', image: 'digital', description: 'Fresh perspectives for a connected world. Content that makes people pause, feel and connect.', items: ['Digital series', 'Social & short-form content', 'Creator collaborations'] }
];
// Add `link: 'https://…'` to any project once its film or video is available ("content to be linked later").
export const projects = [
  { title: 'The art of a new beginning', category: 'Films', image: 'project01', note: 'A cinematic exploration of place, light and possibility.' },
  { title: 'Conversations that connect', category: 'Television', image: 'project02', note: 'People, perspectives and the stories between them.' },
  { title: 'A taste of tradition', category: 'Brand films', image: 'project03', note: 'An intimate look at the craft behind a familiar flavour.' },
  { title: 'When the lights come alive', category: 'Events', image: 'project04', note: 'A shared experience, felt long after the final encore.' },
  { title: 'Stories, beyond the screen', category: 'Digital', image: 'project05', note: 'A closer view of the people who give stories their heart.' },
  { title: 'Somewhere along the way', category: 'Films', image: 'project06', note: 'Finding a different perspective on the journey.' }
];
export const gallery = [
  { image: 'gallery01', title: 'Chasing the first light', category: 'On location' },
  { image: 'set', title: 'A world within a frame', category: 'On set' },
  { image: 'portrait', title: 'Finding the moment', category: 'People' },
  { image: 'gallery02', title: 'Between takes', category: 'On set' },
  { image: 'camera', title: 'A different perspective', category: 'Behind the scenes' },
  { image: 'gallery03', title: 'The energy of a live audience', category: 'Events' },
  { image: 'gallery04', title: 'Details tell a story', category: 'On set' },
  { image: 'crew', title: 'Made together', category: 'People' },
  { image: 'gallery05', title: 'Where the pieces come together', category: 'Behind the scenes' },
  { image: 'location', title: 'The world is our location', category: 'On location' },
  { image: 'green', title: 'Room for imagination', category: 'On set' },
  { image: 'slate', title: 'Ready for another story', category: 'Behind the scenes' }
];
