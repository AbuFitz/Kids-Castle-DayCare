type Props = { variant?: 'nav' | 'nav-white' | 'full'; className?: string };
const ALT = 'Kids Castle Daycare & Home Nursery';
const files = { nav: '/brand/13-wordmark-descriptor.svg', 'nav-white': '/brand/14-wordmark-descriptor-white.svg', full: '/brand/02-full-daycare-and-home-nursery.svg' } as const;

/** The logo carries the full business name; the lead variant loads eagerly because it is the first thing painted. */
export function Logo({ variant = 'nav', className }: Props) {
  const lead = variant === 'nav';
  return <img className={className} src={files[variant]} alt={ALT} decoding={lead ? 'sync' : 'async'} {...(lead ? { fetchPriority: 'high' as const } : {})} />;
}
