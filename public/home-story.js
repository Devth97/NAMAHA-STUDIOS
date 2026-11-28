// Separate scenes share one 15-second cycle, with a blank page between stories.
export const homeStoryStages = ['thinking','preproduction','production','postproduction','release','watching'];
export function homeStory(picture) {
  const scenes = homeStoryStages.map(key => {
    const base = `./assets/home-story-${key}-v1-line`;
    const sizes = '(max-width:760px) calc(100vw - 48px), (max-width:1200px) 55vw, 740px';
    return `<picture class="story-scene" data-story-scene="${key}"><source type="image/webp" srcset="${base}-480.webp 480w, ${base}-960.webp 960w, ${base}.webp 1536w" sizes="${sizes}"><img src="${base}.jpg" srcset="${base}-480.jpg 480w, ${base}-960.jpg 960w, ${base}.jpg 1536w" sizes="${sizes}" width="1536" height="864" alt="" decoding="async"></picture>`;
  }).join('');
  return `<span class="ink-art ink-story" data-ink-motion data-home-story data-artwork="hero">${picture}<span class="story-scenes" aria-hidden="true">${scenes}</span></span>`;
}
export function prepareHomeStories() {
  document.querySelectorAll('[data-home-story]').forEach(element => {
    // A failed scene leaves the accessible still in place rather than an empty stage.
    Promise.all([...element.querySelectorAll('.story-scene img')].map(img => img.decode()))
      .then(() => element.classList.add('story-ready'))
      .catch(() => {});
  });
}
