type Props = { variant?: 'nav' | 'nav-white' | 'icon' | 'lockup'; className?: string };
const ALT = 'Kids Castle';
const files = { nav: '/brand/05-wordmark.svg', 'nav-white': '/brand/11-wordmark-white.svg', icon: '/brand/04-icon.svg' } as const;

/** Logo files carry no descriptor line: the public positioning is "Nanny & Babysitting Services", set in text beside it. */
export function Logo({ variant = 'nav', className }: Props) {
  if (variant === 'lockup') {
    return (
      <span className={`lockup ${className ?? ''}`}>
        <img src={files.icon} alt="" aria-hidden="true" width={70} height={60} decoding="async" />
        <img src={files.nav} alt={ALT} width={160} height={34} decoding="async" />
      </span>
    );
  }
  const lead = variant === 'nav';
  return <img className={className} src={files[variant]} alt={ALT} decoding={lead ? 'sync' : 'async'} {...(lead ? { fetchPriority: 'high' as const } : {})} />;
}
