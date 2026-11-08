/**
 * Agency preview banner, the same one used on the Graceful Divine Melts preview: "Design preview · Created by OneSimpleSite".
 * Preview layer only. Remove this component (and its line in App.tsx) when the demo phase ends,
 * or hide it by building with VITE_PREVIEW_BANNER=0.
 */
export function PreviewBanner() {
  if (import.meta.env.VITE_PREVIEW_BANNER === '0') return null;
  return (
    <aside id="osp-banner" aria-label="Design preview" style={{ background: '#1F5C3F', color: '#fff', font: "500 13px/1.35 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif", padding: '8px 14px', display: 'flex', flexWrap: 'wrap', gap: '2px 14px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', letterSpacing: '.01em' }}>
      <strong style={{ fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', fontSize: '11.5px', background: 'rgb(255 255 255 / .16)', padding: '3px 9px', borderRadius: 99 }}>Design preview</strong>
      <span>Created by OneSimpleSite</span>
      <a href="https://onesimplesite.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontWeight: 650, textUnderlineOffset: 3, display: 'inline-block', padding: '6px 2px' }}>onesimplesite.co.uk<span className="visually-hidden"> (opens in a new tab)</span></a>
    </aside>
  );
}
