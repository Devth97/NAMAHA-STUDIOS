"""Create responsive delivery variants without changing image composition."""
from pathlib import Path
from PIL import Image

assets = Path(__file__).resolve().parents[1] / 'public' / 'assets'
for source in sorted(assets.glob('*-hq.jpg')):
    with Image.open(source) as image:
        for width in (480, 960):
            height = round(image.height * width / image.width)
            target = source.with_name(source.stem + f'-{width}.jpg')
            image.resize((width, height), Image.Resampling.LANCZOS).save(
                target, quality=82, optimize=True, progressive=True
            )
print('Created 480px and 960px delivery variants for all 22 images.')
