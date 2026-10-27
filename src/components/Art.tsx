import { useId } from 'react';

/**
 * Original illustrated placeholders. Each ImageSlot marks a place where genuine Kids Castle photography
 * should replace the artwork (see IMAGES.md). None of this depicts the real nursery or real children.
 */
const palettes = [
  ['#BFE9E5', '#FFF3CF', '#179A97', '#2FB88B'],
  ['#FFD9C7', '#FFF3CF', '#F36C38', '#F6BE22'],
  ['#CFE0FF', '#E8F0FF', '#3468E8', '#179A97'],
  ['#FFE9A8', '#FFF8E0', '#F6BE22', '#F36C38'],
  ['#C9F0DF', '#F0FFF8', '#2FB88B', '#3468E8'],
  ['#D3EEF0', '#FFF3CF', '#179A97', '#F36C38'],
];
const BLOCKS = ['#179A97', '#F36C38', '#F6BE22', '#3468E8', '#2FB88B'];

export function Scene({ i = 0, big = false }: { i?: number; big?: boolean }) {
  const id = useId().replace(/:/g, '');
  const [a, b, h1, h2] = palettes[i % palettes.length];
  const n = '#1E293B';
  const cx = 150 + (i % 3) * 50;
  const blocks = big
    ? [[330,230,70,70,0],[410,230,70,70,1],[490,230,70,70,3],[370,160,70,70,2],[450,160,70,70,4],[410,90,70,70,0]]
    : [[cx-60,200,56,56,(i)%5],[cx,200,56,56,(i+1)%5],[cx+60,200,56,56,(i+3)%5],[cx-30,144,56,56,(i+2)%5],[cx+30,144,56,56,(i+4)%5]];
  return (
    <svg viewBox={big ? '0 0 800 340' : '0 0 400 300'} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect width={big ? 800 : 400} height="340" fill={`url(#${id})`} />
      {big && (
        <g strokeLinejoin="round">
          <g fill="#fff"><path d="M560 56 q10-26 36-14 q22-14 34 8 q18 2 14 20 h-86 q-8-8 2-14z" /><path d="M640 130 q8-18 28-10 q16-8 24 8 q12 2 10 14 h-60 q-6-6-2-12z" /></g>
          <circle cx="700" cy="70" r="0" />
          {[[40,236,52,0],[96,236,52,3],[68,184,52,2],[690,236,52,1],[746,236,52,4],[718,184,52,0]].map(([x,y,w,c],k)=>(<g key={k} transform={`translate(${x} ${y})`}><rect width={w} height={w} rx="10" fill={BLOCKS[c as number]} /><circle cx={(w as number)/2} cy={(w as number)/2} r="8" fill="none" opacity=".45" /></g>))}
        </g>
      )}
      <circle cx={big ? 120 : i % 2 ? 330 : 70} cy="60" r="34" fill="#F6BE22" />
      <g fill="#fff">
        <path d="M250 70 q10-26 36-14 q22-14 34 8 q18 2 14 20 h-86 q-8-8 2-14z" />
        <path d="M30 120 q8-18 28-10 q16-8 24 8 q12 2 10 14 h-60 q-6-6-2-12z" />
      </g>
      <path d={big ? 'M-10 280 Q200 200 420 262 T820 240 V360 H-10Z' : 'M-10 270 Q100 190 220 245 T420 230 V310 H-10Z'} fill={h1} />
      <path d={big ? 'M-10 310 Q260 250 520 300 T820 285 V360 H-10Z' : 'M-10 290 Q130 235 260 280 T420 270 V310 H-10Z'} fill={h2} />
      <g strokeLinejoin="round">
        {blocks.map(([x, y, w, h, c], k) => (
          <g key={k} transform={`translate(${x} ${y + (big ? 0 : 20)})`}>
            <rect width={w} height={h} rx="10" fill={BLOCKS[c as number]} />
            <circle cx={(w as number) / 2} cy={(h as number) / 2} r={(w as number) / 6} fill="none" opacity=".45" />
          </g>
        ))}
        {big && <path d="M442 90 V48 l42 12 -42 12" fill="#F36C38" />}
      </g>
    </svg>
  );
}

export function ImageSlot({ scene = 0, mask, className = '', big, label, src, alt = '' }: { scene?: number; mask?: 'blob1' | 'blob2' | 'heart' | 'round'; className?: string; big?: boolean; label?: string; src?: string; alt?: string }) {
  return (
    <div className={`slot ${className}`} data-replace-with={label ?? 'client-photo'}>
      <div className={`mask ${mask ? `mask-${mask}` : ''}`} style={{ height: '100%' }}>
        {src ? <img src={src} alt={alt} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Scene i={scene} big={big} />}
      </div>
    </div>
  );
}

export function Stack({ className = '' }: { className?: string }) {
  const n = '#1E293B';
  return (
    <svg className={className} viewBox="0 0 300 300" aria-hidden="true" strokeLinejoin="round">
      <rect x="30" y="200" width="80" height="100" rx="12" fill="#179A97" />
      <rect x="110" y="140" width="80" height="160" rx="12" fill="#F36C38" />
      <rect x="190" y="200" width="80" height="100" rx="12" fill="#3468E8" />
      <rect x="38" y="170" width="30" height="26" rx="8" fill="#F6BE22" />
      <rect x="118" y="108" width="30" height="26" rx="8" fill="#2FB88B" />
      <rect x="156" y="108" width="30" height="26" rx="8" fill="#F6BE22" />
      <rect x="198" y="170" width="30" height="26" rx="8" fill="#F6BE22" />
      <rect x="132" y="214" width="36" height="86" rx="18" fill="#FFF3CF" />
      <path d="M150 108 V56 l44 14 -44 14" fill="#F36C38" />
    </svg>
  );
}

export function Doodle({ className = '' }: { className?: string }) {
  return (
    <svg className={`doodle ${className}`} viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
      <path d="M40 140 C 80 60 130 40 170 70 M210 20 C 240 60 250 90 240 130 M820 60 C 870 20 940 70 950 140 M900 180 L 960 200 M60 300 C 30 380 60 440 110 460" />
    </svg>
  );
}
