export const references = {
  home: './assets/home-reference.jpg', about: './assets/about-reference.jpg',
  services: './assets/services-reference.jpg', work: './assets/work-reference.jpg',
  gallery: './assets/gallery-reference.jpg', contact: './assets/contact-reference.jpg'
};
// Coordinates identify artwork within the supplied references; originals remain intact.
export const art = {
  hero: ['home', 318, 61, 535, 375],
  aboutHero: ['about', 260, 52, 593, 292],
  servicesHero: ['services', 245, 53, 608, 344],
  workHero: ['work', 300, 53, 553, 310],
  galleryHero: ['gallery', 300, 54, 553, 286],
  contactHero: ['contact', 324, 54, 529, 385],
  journey: ['home', 397, 869, 456, 228],
  storyboard: ['about', 344, 353, 318, 239],
  banner: ['contact', 0, 1005, 485, 229],
  film: ['gallery', 22, 384, 305, 124],
  television: ['gallery', 22, 520, 278, 112],
  event: ['gallery', 558, 520, 275, 112],
  brand: ['gallery', 22, 642, 249, 112],
  digital: ['gallery', 22, 765, 277, 108],
  portrait: ['gallery', 602, 384, 230, 124],
  crew: ['gallery', 278, 642, 274, 112],
  location: ['gallery', 307, 765, 261, 108],
  green: ['gallery', 579, 765, 253, 108],
  camera: ['gallery', 310, 520, 238, 112],
  slate: ['gallery', 303, 886, 265, 108],
  set: ['gallery', 558, 642, 274, 112],
  development: ['services', 438, 889, 244, 176]
};
export const services = [
  { name: 'Film Production', short: 'Film', icon: 'reel', image: 'film', description: 'From the first page to the final frame. Films rooted in emotion, brought to life with care.', items: ['Feature & short films', 'Script-to-screen production', 'Production management'] },
  { name: 'Television Content', short: 'Television', icon: 'tv', image: 'television', description: 'Compelling stories and engaging formats that find a place in everyday lives.', items: ['Television shows', 'Non-fiction & documentary', 'Talk & reality formats'] },
  { name: 'Entertainment Projects', short: 'Entertainment', icon: 'spark', image: 'event', description: 'Shared moments with a lasting impression. Experiences built around people and possibility.', items: ['Live entertainment', 'Cultural & creative events', 'Event production'] },
  { name: 'Creative Development', short: 'Creative', icon: 'bulb', image: 'development', description: 'Every great story starts somewhere. We help shape a spark into a vision worth making.', items: ['Concept & story development', 'Script writing', 'Creative direction'] },
  { name: 'Commercials & Brand Films', short: 'Brand films', icon: 'camera', image: 'brand', description: 'Your brand has a story. Let’s tell it with clarity, character and a little unexpected magic.', items: ['Brand storytelling', 'Commercials & digital ads', 'Product & corporate films'] },
  { name: 'Digital Content', short: 'Digital', icon: 'screen', image: 'digital', description: 'Fresh perspectives for a connected world. Content that makes people pause, feel and connect.', items: ['Digital series', 'Social & short-form content', 'Creator collaborations'] }
];
export const projects = [
  { title: 'The art of a new beginning', category: 'Films', image: 'film', note: 'A cinematic exploration of place, light and possibility.' },
  { title: 'Conversations that connect', category: 'Television', image: 'television', note: 'People, perspectives and the stories between them.' },
  { title: 'A taste of tradition', category: 'Brand films', image: 'brand', note: 'An intimate look at the craft behind a familiar flavour.' },
  { title: 'When the lights come alive', category: 'Events', image: 'event', note: 'A shared experience, felt long after the final encore.' },
  { title: 'Stories, beyond the screen', category: 'Digital', image: 'portrait', note: 'A closer view of the people who give stories their heart.' },
  { title: 'Somewhere along the way', category: 'Films', image: 'location', note: 'Finding a different perspective on the journey.' }
];
export const gallery = [
  { image: 'film', title: 'Chasing the first light', category: 'On location' },
  { image: 'set', title: 'A world within a frame', category: 'On set' },
  { image: 'portrait', title: 'Finding the moment', category: 'People' },
  { image: 'television', title: 'Between takes', category: 'On set' },
  { image: 'camera', title: 'A different perspective', category: 'Behind the scenes' },
  { image: 'event', title: 'The energy of a live audience', category: 'Events' },
  { image: 'brand', title: 'Details tell a story', category: 'On set' },
  { image: 'crew', title: 'Made together', category: 'People' },
  { image: 'digital', title: 'Where the pieces come together', category: 'Behind the scenes' },
  { image: 'location', title: 'The world is our location', category: 'On location' },
  { image: 'green', title: 'Room for imagination', category: 'On set' },
  { image: 'slate', title: 'Ready for another story', category: 'Behind the scenes' }
];
