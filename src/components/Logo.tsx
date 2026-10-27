/**
 * PROVISIONAL logo built from clean vector primitives (no tracing).
 * The supplied logo files were not available in this workspace; replace with the repaired master SVGs when received.
 */
const N = '#1E293B';
const sw = 3;

export function CastleMark({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={N} strokeWidth={sw} strokeLinejoin="round">
      <rect x="4" y="40" width="34" height="38" rx="6" fill="#179A97" />
      <rect x="43" y="22" width="34" height="56" rx="6" fill="#F36C38" />
      <rect x="82" y="40" width="34" height="38" rx="6" fill="#3468E8" />
      <rect x="6" y="24" width="14" height="13" rx="4" fill="#F6BE22" />
      <rect x="45" y="6" width="14" height="13" rx="4" fill="#2FB88B" />
      <rect x="61" y="6" width="14" height="13" rx="4" fill="#F6BE22" />
      <rect x="84" y="24" width="14" height="13" rx="4" fill="#F6BE22" />
      <rect x="53" y="48" width="14" height="30" rx="7" fill="#FFF3CF" />
    </g>
  );
}

type Props = { variant?: 'horizontal' | 'full' | 'icon' | 'mono'; className?: string; title?: string };

export function Logo({ variant = 'horizontal', className, title = 'Kids Castle Daycare & Home Nursery' }: Props) {
  const font = "'Fredoka Variable', 'Fredoka', system-ui, sans-serif";
  const ink = variant === 'mono' ? N : N;
  if (variant === 'icon')
    return (
      <svg className={className} viewBox="0 0 120 84" role="img" aria-label={title}>
        <CastleMark />
      </svg>
    );
  if (variant === 'full')
    return (
      <svg className={className} viewBox="0 0 320 220" role="img" aria-label={title}>
        <rect x="3" y="3" width="314" height="214" rx="34" fill="none" stroke={N} strokeWidth="2.5" />
        <CastleMark x={100} y={20} s={1.0} />
        <text x="160" y="150" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="56" fill={ink} letterSpacing="-1">Kids Castle</text>
        <text x="160" y="184" textAnchor="middle" fontFamily={font} fontWeight="600" fontSize="15" fill={ink} letterSpacing="3.4">DAYCARE &amp; HOME NURSERY</text>
      </svg>
    );
  return (
    <svg className={className} viewBox="0 0 250 60" role="img" aria-label={title}>
      <CastleMark x={0} y={2} s={0.68} />
      <text x="88" y="35" fontFamily={font} fontWeight="700" fontSize="31" fill={ink} letterSpacing="-.5">Kids Castle</text>
      <text x="89" y="52" fontFamily={font} fontWeight="600" fontSize="9.2" fill={ink} letterSpacing="1.9">DAYCARE &amp; HOME NURSERY</text>
    </svg>
  );
}
