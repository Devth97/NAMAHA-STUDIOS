"""Ingest the approved coloured cinema line drawings using the existing asset slots."""
import json
import shutil
from pathlib import Path

root = Path(__file__).resolve().parents[1]
manifest_path = root / 'scripts' / 'colour-art-manifest.json'
entries = json.loads(manifest_path.read_text(encoding='utf-8'))
slots_path = root / 'scripts' / 'asset-slots.json'
slots = json.loads(slots_path.read_text(encoding='utf-8'))
data_path = root / 'public' / 'data.js'
data = data_path.read_text(encoding='utf-8')
for i, entry in enumerate(entries, 1):
    key = entry['key']
    name = f'{key}-colour-pencil'
    destination = root / 'public' / 'assets' / 'source' / f'{name}.png'
    destination.parent.mkdir(parents=True, exist_ok=True)
    if 'path' in entry:
        shutil.copyfile(entry['path'], destination)
        entry['generated_file'] = Path(entry.pop('path')).name
    slot = dict(id=f'COLOUR{i}', source=f'{name}.png', file=f'{name}-line.jpg',
                placeholder=f'{key}-consistent-line.jpg', use=f'Coloured hand-sketched cinema artwork: {key}')
    slots['slots'] = [item for item in slots['slots'] if item['id'] != slot['id']]
    slots['slots'].append(slot)
    data = data.replace(f"{key}: './assets/{key}-consistent-line.jpg'", f"{key}: './assets/{name}-line.jpg'")
    entry['delivery'] = f'public/assets/{name}-line.jpg'
    entry['generator'] = 'built-in image_gen'
data_path.write_text(data, encoding='utf-8')
slots_path.write_text(json.dumps(slots, indent=2)+'\n', encoding='utf-8')
manifest_path.write_text(json.dumps(entries, indent=2)+'\n', encoding='utf-8')
print('Registered eight coloured-pencil assets with fresh delivery URLs.')
