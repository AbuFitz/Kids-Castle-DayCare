"""Compose the traced parts (trace.py output) into the SVG master set. Usage: build_pack.py logo.json outdir"""
import json, re, sys, os
sys.path.insert(0, os.environ.get('PYLIB', ''))
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

J = json.load(open(sys.argv[1])); OUT = sys.argv[2]; os.makedirs(OUT, exist_ok=True)
P, C = J['paths'], J['palette']
def bbox(*names):
    xs, ys = [], []
    for n in names:
        nums = [float(v) for v in re.findall(r'-?\d+\.?\d*', P[n])]
        xs += nums[0::2]; ys += nums[1::2]
    return min(xs), min(ys), max(xs), max(ys)
SYM = ['teal_plank', 'yellow', 'orange_l', 'orange_r', 'blue', 'navy_holes', 'navy_underline']
sb, wb = bbox(*SYM), bbox('teal_word')

def text_path(text, font_path, weight, size, tracking):
    f = TTFont(font_path); f = instancer.instantiateVariableFont(f, {'wght': weight}); gs = f.getGlyphSet(); cmap = f.getBestCmap()
    upm = f['head'].unitsPerEm; sc = size / upm; x = 0; d = []
    for ch in text:
        g = cmap[ord(ch)]; pen = SVGPathPen(gs); gs[g].draw(TransformPen(pen, (sc, 0, 0, -sc, x, 0))); d.append(pen.getCommands())
        x += gs[g].width * sc + tracking
    return ' '.join(d), x - tracking
FONT = os.environ['NUNITO']
DESC_NEW, DESC_W = text_path('DAYCARE & HOME NURSERY', FONT, 800, 1, 0)  # measured below, unit size

def desc(text, width, cx, y):
    d, w = text_path(text, FONT, 800, 100, 6)
    s = width / w
    return f'<path fill="{C["navy"]}" transform="translate({cx - width/2:.2f} {y}) scale({s:.5f})" d="{d}"/>', s * 72  # (cap height ≈ .72em)

def shapes(mono=None, mask_ids=True):
    fill = lambda n: mono or C[{'teal_plank':'teal','yellow':'yellow','orange_l':'orange','orange_r':'orange','blue':'blue','navy_holes':'navy','navy_underline':'navy'}[n]]
    out, defs = [], []
    order = ['teal_plank', 'yellow', 'orange_l', 'orange_r', 'blue']
    above = {'teal_plank': ['yellow','orange_l','orange_r','blue'], 'yellow': ['orange_l','orange_r','blue'], 'orange_l': ['blue'], 'orange_r': ['blue'], 'blue': []}
    for n in order:
        if mono:
            m = f'm_{n}'
            cut = ''.join(f'<path d="{P[a]}" fill="#000" stroke="#000" stroke-width="3.6" stroke-linejoin="round"/>' for a in above[n])
            cut += f'<path d="{P["navy_holes"]}" fill="#000"/><path d="{P["navy_underline"]}" fill="#000"/>'
            defs.append(f'<mask id="{m}" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="622"><rect width="760" height="622" fill="#fff"/>{cut}</mask>')
            out.append(f'<path fill="{mono}" fill-rule="evenodd" mask="url(#{m})" d="{P[n]}"/>')
        else:
            out.append(f'<path fill="{fill(n)}" fill-rule="evenodd" d="{P[n]}"/>')
    if not mono:
        out.append(f'<path fill="{C["navy"]}" fill-rule="evenodd" d="{P["navy_holes"]}"/><path fill="{C["navy"]}" fill-rule="evenodd" d="{P["navy_underline"]}"/>')
    return ''.join(out), ''.join(defs)

def build(kind, mono=None, descriptor='DAYCARE'):
    ink = mono or C['navy']; word = mono or C['teal']
    sym, defs = shapes(mono)
    frame = f'<path fill="{ink}" fill-rule="evenodd" d="{P["navy_frame"]}"/>'
    wordm = f'<path fill="{word}" fill-rule="evenodd" d="{P["teal_word"]}"/>'
    if descriptor == 'DAYCARE':
        dsc = f'<path fill="{ink}" fill-rule="evenodd" d="{P["navy_desc"]}"/>'
    else:
        dsc, _ = desc(descriptor, 330, 380, 573); dsc = dsc.replace(C['navy'], ink)
    if kind == 'full':
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 622" role="img" aria-label="Kids Castle Daycare"><title>Kids Castle</title><defs>{defs}</defs>{frame}{sym}{wordm}{dsc}</svg>'
    if kind == 'icon':
        x0, y0, x1, y1 = sb; pad = 10
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0-pad:.1f} {y0-pad:.1f} {x1-x0+2*pad:.1f} {y1-y0+2*pad:.1f}" role="img" aria-label="Kids Castle symbol"><title>Kids Castle</title><defs>{defs}</defs>{sym}</svg>'
    if kind == 'wordmark':
        x0, y0, x1, y1 = wb; pad = 8
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0-pad:.1f} {y0-pad:.1f} {x1-x0+2*pad:.1f} {y1-y0+2*pad:.1f}" role="img" aria-label="Kids Castle"><title>Kids Castle</title>{wordm}</svg>'
    if kind == 'stacked':
        # wordmark with the descriptor beneath, no icon; descriptor width matches the wordmark
        wx0, wy0, wx1, wy1 = wb; ww = wx1 - wx0; wh = wy1 - wy0; pad = 6; gap = 20
        d, w = text_path('DAYCARE & HOME NURSERY', FONT, 800, 100, 7)
        sc = ww / w; capH = 72 * sc
        H = wh + gap + capH + pad * 2; W = ww + pad * 2
        dtext = f'<path fill="{ink}" transform="translate({pad} {pad + wh + gap + capH:.2f}) scale({sc:.5f})" d="{d}"/>'
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {H:.1f}" role="img" aria-label="Kids Castle Daycare &amp; Home Nursery"><title>Kids Castle Daycare &amp; Home Nursery</title>'
                f'<g transform="translate({pad - wx0:.2f} {pad - wy0:.2f})">{wordm}</g>{dtext}</svg>')
    if kind == 'horizontal':
        # symbol left (scaled to ~110 tall), wordmark + descriptor right
        sx0, sy0, sx1, sy1 = sb; wx0, wy0, wx1, wy1 = wb
        ss = 124 / (sy1 - sy0); ws = 64 / (wy1 - wy0)
        symw = (sx1 - sx0) * ss; gap = 22
        wmw = (wx1 - wx0) * ws
        ty = 8 + 38  # wordmark top
        dsc_h, _ = desc(descriptor if descriptor != 'DAYCARE' else 'DAYCARE & HOME NURSERY', wmw * 0.98, 0, 0)
        d, w = text_path(descriptor if descriptor != 'DAYCARE' else 'DAYCARE & HOME NURSERY', FONT, 800, 100, 6)
        dscale = (wmw * 0.98) / w
        dx = symw + gap + (wmw * 0.01); dy = ty + 64 + 8 + 72 * dscale
        dtext = f'<path fill="{ink}" transform="translate({dx:.2f} {dy:.2f}) scale({dscale:.5f})" d="{d}"/>'
        W = symw + gap + wmw + 8; Hh = 140
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.1f} {Hh}" role="img" aria-label="Kids Castle Daycare &amp; Home Nursery"><title>Kids Castle Daycare &amp; Home Nursery</title><defs>{defs}</defs>'
                f'<g transform="translate({-sx0*ss:.2f} {8-sy0*ss:.2f}) scale({ss:.5f})">{sym}</g>'
                f'<g transform="translate({symw+gap-wx0*ws:.2f} {ty-wy0*ws:.2f}) scale({ws:.5f})">{wordm}</g>{dtext}</svg>')

files = {
 '01-full-original-descriptor': build('full'),
 '02-full-daycare-and-home-nursery': build('full', descriptor='DAYCARE & HOME NURSERY'),
 '03-horizontal': build('horizontal', descriptor='DAYCARE & HOME NURSERY'),
 '04-icon': build('icon'),
 '05-wordmark': build('wordmark'),
 '06-full-navy': build('full', mono=C['navy'], descriptor='DAYCARE & HOME NURSERY'),
 '07-full-white': build('full', mono='#ffffff', descriptor='DAYCARE & HOME NURSERY'),
 '08-icon-navy': build('icon', mono=C['navy']),
 '09-icon-white': build('icon', mono='#ffffff'),
 '10-horizontal-white': build('horizontal', mono='#ffffff', descriptor='DAYCARE & HOME NURSERY'),
 '11-wordmark-white': build('wordmark', mono='#ffffff'),
 '12-wordmark-navy': build('wordmark', mono=C['navy']),
 '13-wordmark-descriptor': build('stacked'),
 '14-wordmark-descriptor-white': build('stacked', mono='#ffffff'),
}
for k, v in files.items(): open(f'{OUT}/{k}.svg', 'w').write(v); print(k, len(v))
