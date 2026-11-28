"""Rebuild vector outlines from the supplied logo. Requires Pillow, numpy and vtracer.
Run with these tools installed locally; generated SVGs are committed, so deployment needs none.
"""
from pathlib import Path
import re
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageFilter
import vtracer

assets = Path(__file__).resolve().parents[1] / 'public' / 'assets'
im = Image.open(assets / 'namaha-client-logo-v2.jpg').convert('RGB')
rgb = np.asarray(im).astype(float)
colors = np.array([[191, 30, 46], [234, 107, 4], [232, 79, 63]])
normal = rgb / np.maximum(rgb.sum(axis=2, keepdims=True), 1)
chromatic = colors / colors.sum(axis=1, keepdims=True)
labels = np.argmin(((normal[:, :, None, :] - chromatic[None, None, :, :]) ** 2).sum(axis=3), axis=2)
matched = colors[labels]
coverage = (rgb * matched).sum(axis=2) / (matched * matched).sum(axis=2)
rgba = np.zeros((im.height, im.width, 4), dtype=np.uint8)
for i, color in enumerate(colors):
    mask = Image.fromarray(((labels == i) & (coverage > .5) & (rgb[:, :, 0] > 1.25 * rgb[:, :, 1])).astype(np.uint8) * 255)
    fine = np.asarray(mask.filter(ImageFilter.GaussianBlur(.55))).copy()
    # Smooth compression noise in the large symbol while retaining the finer lettering.
    fine[240:950] = np.asarray(mask.filter(ImageFilter.GaussianBlur(2)))[240:950]
    selected = fine >= 128
    rgba[selected, :3] = color
    rgba[selected, 3] = 255
svg = vtracer.convert_pixels_to_svg([tuple(p) for p in rgba.reshape(-1, 4)], im.size,
    colormode='color', hierarchical='cutout', mode='spline', filter_speckle=5,
    color_precision=8, layer_difference=1, corner_threshold=120, length_threshold=8,
    max_iterations=20, splice_threshold=45, path_precision=2)
ET.register_namespace('', 'http://www.w3.org/2000/svg')
groups = {'symbol': [], 'wordmark': []}
for element in ET.fromstring(svg):
    fill = element.get('fill')
    actual = tuple(int(fill[i:i+2], 16) for i in (1, 3, 5))
    exact = min(colors, key=lambda color: sum((actual[j] - color[j]) ** 2 for j in range(3)))
    element.set('fill', '#' + ''.join(f'{int(c):02X}' for c in exact))
    xy = [float(n) for n in re.findall(r'-?\d+(?:\.\d+)?', element.get('transform', 'translate(0,0)'))]
    key = 'symbol' if xy[1] < 950 else 'wordmark'
    groups[key].append(ET.tostring(element, encoding='unicode').replace(' xmlns="http://www.w3.org/2000/svg"', ''))
paths = {key: ''.join(value) for key, value in groups.items()}
vector = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1500">' + ''.join(f'<g id="{key}">{value}</g>' for key, value in paths.items()) + '</svg>'
(assets / 'namaha-logo-vector-v3.svg').write_text(vector, encoding='utf-8')
icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#f6f0e5"/><svg x="14" y="4" width="36" height="56" viewBox="512 160 480 750">' + paths['symbol'] + '</svg></svg>'
(assets / 'favicon-logo-v3.svg').write_text(icon, encoding='utf-8')
print('Wrote vector logo and favicon:', len(vector), 'bytes')
