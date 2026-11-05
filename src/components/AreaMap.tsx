import { areas } from '../data/site';

/** Pin positions (% of the image) computed from real coordinates on a Web Mercator crop of OpenStreetMap, zoom 14. */
const pos: Record<string, [number, number, 'left' | 'right' | 'below']> = {
  Angel: [49.26, 84.49, 'left'], Islington: [51.81, 78.94, 'right'], 'Camden borders': [14.16, 75.05, 'right'], Highbury: [51.9, 65.33, 'right'],
  Holloway: [41.52, 55.61, 'left'], 'Finsbury Park': [49.07, 40.33, 'left'], 'Stoke Newington': [80.2, 40.33, 'below'], 'Crouch End': [33.03, 18.09, 'right'],
};
const colour = { teal: '#179A97', tangerine: '#F36C38', sky: '#3468E8', sun: '#F6BE22', mint: '#2FB88B' } as const;

/** A real street map (a pre-rendered OpenStreetMap crop served from this site: no third-party requests, no cookies) with the areas pinned. */
export function AreaMap() {
  return (
    <figure className="areamap">
      <div className="areamap-frame" role="img" aria-label={`Map of North London showing the areas covered: ${areas.map((a) => a.name).join(', ')}.`}>
        <img src="/photos/map.webp" alt="" width={1100} height={1202} loading="lazy" decoding="async" />
        {areas.map((a) => {
          const [x, y, side] = pos[a.name];
          return (
            <span key={a.name} className={`pin pin--${side}`} style={{ left: `${x}%`, top: `${y}%`, ['--c' as string]: colour[a.tone] }} aria-hidden="true">
              <i /><b>{a.name}</b>
            </span>
          );
        })}
      </div>
      <figcaption>Map © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors<span className="visually-hidden"> (opens in a new tab)</span></a>. Pins are approximate.</figcaption>
    </figure>
  );
}
