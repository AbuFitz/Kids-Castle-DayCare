import { WhatsAppIcon } from './Icons';
import { site } from '../data/site';

/** Floating chat button, bottom right on every page. */
export function WhatsAppFab() {
  return (
    <aside className="fab-wrap" aria-label="Chat with us">
      <a className="fab" href={site.phone.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)">
        <WhatsAppIcon />
      </a>
    </aside>
  );
}
