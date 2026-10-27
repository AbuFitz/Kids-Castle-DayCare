"""
Rebuilds the Kids Castle logo as clean vector paths from the client's raster reference.

Run:  PYTHONPATH=<dir with potracer, scipy, numpy, pillow> python3 trace.py <reference.png> <out.json>

Why this exists: the supplied SVGs were pixel-stepped polylines with yellow/navy fringe fragments caused by
anti-aliased edge pixels being matched to the wrong colour. Here each colour is only allowed in the region where
it genuinely occurs, labels are decided on an upscaled, smoothed score field, specks are removed, and layers
overlap slightly so no cream slivers show at joins. Output is real cubic Bezier curves.
"""
import json, sys
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
import potrace

SRC, OUT = sys.argv[1], sys.argv[2]
S = 4  # working upscale
img = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
H, W, _ = img.shape

PAL = {  # sampled from solid interiors of the reference
    'bg': (254, 254, 242), 'teal': (78, 181, 160), 'orange': (240, 100, 38),
    'yellow': (254, 221, 89), 'blue': (82, 113, 252), 'navy': (24, 56, 100),
}

def box(x0, y0, x1, y1):
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).rectangle([x0, y0, x1, y1], fill=255); return np.asarray(m) > 0
def poly(pts):
    m = Image.new('L', (W, H), 0); ImageDraw.Draw(m).polygon(pts, fill=255); return np.asarray(m) > 0

R = {  # where each colour may exist
    'teal_plank': poly([(195, 12), (312, 8), (448, 300), (332, 306), (196, 70)]),
    'teal_word': box(8, 398, 752, 532),
    'orange_l': box(70, 145, 322, 385),
    'orange_r': box(490, 250, 672, 390),
    'yellow': box(412, 150, 598, 296),
    'blue': box(272, 246, 512, 390),
    'navy_holes': box(240, 58, 392, 280),
    'navy_underline': box(420, 276, 592, 298),
    'navy_desc': box(262, 528, 518, 584),
    'navy_frame': box(128, 112, 652, 625),
}
allowed = {
    'teal': R['teal_plank'] | R['teal_word'], 'orange': R['orange_l'] | R['orange_r'], 'yellow': R['yellow'],
    'blue': R['blue'], 'navy': R['navy_holes'] | R['navy_underline'] | R['navy_desc'] | R['navy_frame'],
}
names = ['bg', 'teal', 'orange', 'yellow', 'blue', 'navy']

# score = negative colour distance; ink colours are impossible outside their regions
scores = []
for n in names:
    d = np.linalg.norm(img - np.array(PAL[n], np.float32), axis=2)
    if n == 'bg': d = d * 1.0
    else:
        d = np.where(allowed[n], np.minimum(d, 300), 300)
        if n == 'navy': d = d * 0.82  # thin dark strokes are anti-aliased light: favour ink over bg
    scores.append(-d)
sc = np.stack(scores)
big = np.stack([ndi.zoom(s, S, order=1) for s in sc])
big = np.stack([ndi.gaussian_filter(s, 1.6) for s in big])
lab = big.argmax(0)

def clean(mask, min_area, hole_area=60):
    l, n = ndi.label(mask)
    if n:
        a = ndi.sum(mask, l, range(1, n + 1)); keep = np.isin(l, [i + 1 for i, v in enumerate(a) if v >= min_area]); mask = keep
    inv = ~mask; l, n = ndi.label(inv)
    if n:
        a = ndi.sum(inv, l, range(1, n + 1)); fill = np.isin(l, [i + 1 for i, v in enumerate(a) if v < hole_area]); mask = mask | fill
    return mask

masks = {n: (lab == i) for i, n in enumerate(names)}
BIG = lambda m: np.kron(m.astype(np.uint8), np.ones((S, S), np.uint8)).astype(bool)
reg = {k: BIG(v) for k, v in R.items()}

parts = {}
def add(name, mask, min_area, overlap=0, hole_area=60):
    m = clean(mask, min_area, hole_area)
    if overlap: m = ndi.binary_dilation(m, iterations=overlap)
    parts[name] = m

add('teal_plank', masks['teal'] & reg['teal_plank'], 4000, overlap=3)
add('yellow', masks['yellow'], 3000, overlap=3)
add('orange_l', masks['orange'] & reg['orange_l'], 3000, overlap=2)
add('orange_r', masks['orange'] & reg['orange_r'], 3000, overlap=2)
add('blue', masks['blue'], 3000, overlap=2)
add('teal_word', masks['teal'] & reg['teal_word'], 700, hole_area=30)
nv = masks['navy']
add('navy_holes', nv & reg['navy_holes'] & ndi.binary_dilation(ndi.binary_fill_holes(parts['teal_plank']), iterations=2), 150, hole_area=10)
add('navy_underline', nv & reg['navy_underline'] & ~reg['navy_holes'], 200)
add('navy_desc', nv & reg['navy_desc'], 60, hole_area=10)
add('navy_frame', nv & reg['navy_frame'] & ~reg['navy_desc'] & ~reg['navy_holes'] & ~reg['navy_underline'], 400)

def to_path(mask, scale=1 / S, turd=20, alphamax=1.1, tol=0.6):
    bm = potrace.Bitmap(~mask)
    pl = bm.trace(turdsize=turd, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=alphamax, opticurve=True, opttolerance=tol)
    d = []
    f = lambda p: f'{p.x * scale:.2f} {p.y * scale:.2f}'
    for c in pl:
        d.append('M' + f(c.start_point))
        for seg in c.segments:
            if seg.is_corner: d.append('L' + f(seg.c) + 'L' + f(seg.end_point))
            else: d.append('C' + f(seg.c1) + ' ' + f(seg.c2) + ' ' + f(seg.end_point))
        d.append('Z')
    return ''.join(d)

out = {'viewBox': [0, 0, W, H], 'palette': {k: '#%02x%02x%02x' % v for k, v in PAL.items()}, 'paths': {}}
for k, m in parts.items():
    out['paths'][k] = to_path(m)
    print(k, int(m.sum()), len(out['paths'][k]))
json.dump(out, open(OUT, 'w'))
