// Site-wide settings. Public values only: never place mailbox passwords or private API secrets here.
export const siteConfig = {
  // Optional generated film-crew animation. MP4/WebM, silent, landscape; blank keeps a still art strip.
  studioVideoUrl: './assets/studio-crew-loop-v2.mp4',
  // Owner-verified Web3Forms access key. Leave blank for the demo (no email is sent).
  web3formsAccessKey: '',
  // Final production origin without a trailing slash, e.g. 'https://namahastudios.com'.
  // Enables canonical URLs, absolute social-share images and sitemap.xml.
  siteUrl: '',
  // Keep false for previews. Set true only for the approved production launch (requires siteUrl).
  allowIndexing: false,
  // Showreel link: a YouTube or Vimeo URL, or a self-hosted .mp4 path. Blank shows "premiering soon".
  showreelUrl: '',
  // Preview location from the supplied brief summary; confirm with the client before launch.
  location: 'Mangalore, Karnataka',
  phoneNumber: '917022833448',
  phoneDisplay: '+91 70228 33448',
  email: 'namahastudios.in@gmail.com',
  whatsappNumber: '917022833448',
  whatsappDemo: false,
  whatsappMessage: 'Hello Namaha Studios! I would like to discuss a project.',
  instagram: 'https://www.instagram.com/namaha_studios/'
};
