/** Shared objectBoundingBox clip-paths for stickers and image masks. */
type P = [number, number];

function smooth(points: P[]): string {
  const n = points.length;
  let d = `M ${points[0][0].toFixed(4)} ${points[0][1].toFixed(4)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n], p1 = points[i], p2 = points[(i + 1) % n], p3 = points[(i + 2) % n];
    const c1: P = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: P = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(4)} ${c1[1].toFixed(4)} ${c2[0].toFixed(4)} ${c2[1].toFixed(4)} ${p2[0].toFixed(4)} ${p2[1].toFixed(4)}`;
  }
  return d + ' Z';
}
function polar(n: number, r: (t: number) => number): P[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return [0.5 + Math.cos(t) * r(t), 0.5 + Math.sin(t) * r(t)] as P;
  });
}
const scallop = smooth(polar(28, (t) => 0.42 + 0.075 * Math.cos(t * 7 + 0.3)));
const cloud = smooth(polar(30, (t) => 0.43 + 0.06 * Math.cos(t * 5)));
const blob = smooth(polar(20, (t) => 0.42 + 0.05 * Math.sin(t * 3 + 1) + 0.025 * Math.cos(t * 5)));
const blob1 = smooth(polar(24, (t) => 0.46 + 0.045 * Math.sin(t * 3 + 0.4) + 0.02 * Math.cos(t * 5 + 2)));
const blob2 = smooth(polar(24, (t) => 0.46 + 0.05 * Math.cos(t * 2 + 0.5) + 0.025 * Math.sin(t * 4)));
const heart =
  'M0.5 0.97 C0.2 0.74 0.02 0.58 0.02 0.34 C0.02 0.16 0.14 0.03 0.29 0.03 C0.4 0.03 0.47 0.1 0.5 0.19 C0.53 0.1 0.6 0.03 0.71 0.03 C0.86 0.03 0.98 0.16 0.98 0.34 C0.98 0.58 0.8 0.74 0.5 0.97 Z';

export function ShapeDefs() {
  return (
    <svg className="sr-only-defs" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="shape-scallop" clipPathUnits="objectBoundingBox"><path d={scallop} /></clipPath>
        <clipPath id="shape-cloud" clipPathUnits="objectBoundingBox"><path d={cloud} /></clipPath>
        <clipPath id="shape-blob" clipPathUnits="objectBoundingBox"><path d={blob} /></clipPath>
        <clipPath id="mask-blob1" clipPathUnits="objectBoundingBox"><path d={blob1} /></clipPath>
        <clipPath id="mask-blob2" clipPathUnits="objectBoundingBox"><path d={blob2} /></clipPath>
        <clipPath id="mask-heart" clipPathUnits="objectBoundingBox"><path d={heart} /></clipPath>
      </defs>
    </svg>
  );
}
