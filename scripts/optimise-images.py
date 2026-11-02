"""Namaha Studios image pipeline.

    python scripts/optimise-images.py            # ingest new artwork + build all variants
    python scripts/optimise-images.py --status   # list which artwork slots are still placeholders

1. Any artwork saved in public/assets/source/ under a slot's `source` name (png, jpg or webp,
   see scripts/asset-slots.json) is centre-cropped to its optional `size` (default 1536x1024)
   and exported as the slot's delivery JPEG.
2. Line drawings (*-line.jpg) have their paper tone mapped to white for seamless blending.
3. Empty slots receive a copy of their placeholder so the site never shows a broken image.
4. Every *-hq.jpg and *-line.jpg gets 480px and 960px JPEG variants plus WebP versions of all
   three widths. Variants are rebuilt whenever they are missing or older than their master.
"""
from pathlib import Path
import json
import shutil
import sys
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
assets = root / 'public' / 'assets'
source_dir = assets / 'source'
slots = json.loads((root / 'scripts' / 'asset-slots.json').read_text(encoding='utf-8'))['slots']
WIDTH, HEIGHT = 1536, 1024


def same_bytes(a: Path, b: Path) -> bool:
    return a.exists() and b.exists() and a.stat().st_size == b.stat().st_size and a.read_bytes() == b.read_bytes()


def find_source(name: str):
    stem = Path(name).stem
    for ext in ('.png', '.jpg', '.jpeg', '.webp', '.PNG', '.JPG', '.JPEG', '.WEBP'):
        candidate = source_dir / f'{stem}{ext}'
        if candidate.exists():
            return candidate
    return None


def status() -> int:
    waiting = 0
    for slot in slots:
        target, placeholder = assets / slot['file'], assets / slot['placeholder']
        state = 'PLACEHOLDER' if same_bytes(target, placeholder) else ('MISSING' if not target.exists() else 'ready')
        waiting += state != 'ready'
        print(f"{slot['id']:>3}  {state:<11} {slot['file']:<28} {slot['use']}")
    print(f'\n{len(slots) - waiting} of {len(slots)} generated artwork slots are filled.')
    return waiting


def ingest() -> None:
    source_dir.mkdir(exist_ok=True)
    for slot in slots:
        target = assets / slot['file']
        source = find_source(slot['source'])
        if source and (not target.exists() or source.stat().st_mtime > target.stat().st_mtime or same_bytes(target, assets / slot['placeholder'])):
            with Image.open(source) as image:
                image = ImageOps.exif_transpose(image).convert('RGB')
                image = ImageOps.fit(image, tuple(slot.get('size', (WIDTH, HEIGHT))), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
                image.save(target, quality=90, optimize=True, progressive=True)
            print(f"Ingested {source.name} -> {slot['file']}")
        elif not target.exists():
            shutil.copyfile(assets / slot['placeholder'], target)
            print(f"Placeholder {slot['placeholder']} -> {slot['file']}")


def neutralise_line_art() -> None:
    """Map each line drawing's paper tone and texture to pure white so `mix-blend-mode: multiply`
    blends seamlessly into the site background (no visible rectangle). Ink and the gold accent are
    preserved. Idempotent: already-neutral drawings are skipped."""
    import numpy as np
    for master in sorted(assets.glob('*-line.jpg')):
        with Image.open(master) as image:
            pixels = np.asarray(image.convert('RGB')).astype('float32') / 255
        luminance = pixels @ np.array([.2126, .7152, .0722], dtype='float32')
        # Detailed ink scenes can occupy most of the lower luminance quartile.
        # Detect the paper in the upper quartile so repeat builds preserve their ink.
        if np.percentile(luminance, 75) >= 254 / 255:
            continue
        paper = np.percentile(pixels.reshape(-1, 3), 75, axis=0)
        pixels = np.clip(pixels / np.maximum(paper, 1e-3), 0, 1)
        luminance = pixels @ np.array([.2126, .7152, .0722], dtype='float32')
        knee = np.clip((luminance - .80) / (.93 - .80), 0, 1)
        knee = (knee * knee * (3 - 2 * knee))[..., None]
        pixels = pixels + (1 - pixels) * knee
        Image.fromarray((pixels * 255 + .5).astype('uint8')).save(master, quality=92, optimize=True, progressive=True)
        print(f'Neutralised paper tone of {master.name}')


def variants() -> None:
    built = 0
    masters = sorted([*assets.glob('*-hq.jpg'), *assets.glob('*-line.jpg')])
    for master in masters:
        outputs = {
            master.with_name(f'{master.stem}-{w}.jpg'): w for w in (480, 960)
        } | {
            master.with_name(f'{master.stem}-{w}.webp'): w for w in (480, 960)
        } | {master.with_suffix('.webp'): None}
        stale = [path for path in outputs if not path.exists() or path.stat().st_mtime < master.stat().st_mtime]
        if not stale:
            continue
        with Image.open(master) as image:
            image = image.convert('RGB')
            for path in stale:
                width = outputs[path]
                frame = image if width is None else image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
                if path.suffix == '.webp':
                    frame.save(path, 'WEBP', quality=80, method=6)
                else:
                    frame.save(path, quality=82, optimize=True, progressive=True)
                built += 1
    print(f'Checked {len(masters)} master images; wrote {built} delivery variants (JPEG + WebP).')


if __name__ == '__main__':
    if '--status' in sys.argv:
        status()
    else:
        ingest()
        neutralise_line_art()
        variants()
        status()
