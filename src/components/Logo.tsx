/** Production logo set lives in /public/brand (rebuilt as clean vector curves from the client's artwork; see scripts/logo). */
type Props = { variant?: 'horizontal' | 'full' | 'icon' | 'horizontal-white' | 'full-white'; className?: string };
const files = {
  horizontal: '/brand/03-horizontal.svg',
  'horizontal-white': '/brand/10-horizontal-white.svg',
  full: '/brand/02-full-daycare-and-home-nursery.svg',
  'full-white': '/brand/07-full-white.svg',
  icon: '/brand/04-icon.svg',
} as const;
export function Logo({ variant = 'horizontal', className }: Props) {
  return <img className={className} src={files[variant]} alt="Kids Castle Daycare & Home Nursery" decoding="async" />;
}
