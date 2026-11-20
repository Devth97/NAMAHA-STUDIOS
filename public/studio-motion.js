import { equipmentDrawing } from './art-motion.js';
const stages = [['idea','Idea'],['story','Story'],['camera','On set'],['light','Lighting'],['edit','Edit'],['screen','Screen']];
export function studioMotion() {
  return `<section class="studio-motion" aria-label="From the first idea to the final screen" data-studio-motion><ol class="studio-stages">${stages.map(([kind,label],i)=>`<li class="studio-stage" data-ink-motion>${equipmentDrawing(kind)}<span class="studio-stage-label"><small>0${i+1}</small>${label}</span></li>`).join('')}</ol></section>`;
}
