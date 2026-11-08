// The "design preview has expired" page. Same layer as the Graceful Divine Melts preview: agency-only, never part of the client's real site.
// Used by scripts/prerender.mjs when the preview is expired (see isExpired).
const mail = 'hello@onesimplesite.co.uk';
const subject = encodeURIComponent('Kids Castle Daycare website preview');

/** Expired on Vercel unless PREVIEW_EXPIRED=0 is set in the project's environment variables. Local builds are never expired. */
export const isExpired = () => Boolean(process.env.VERCEL) && process.env.PREVIEW_EXPIRED !== '0';

export const expiredHtml = `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Design preview expired</title>
<style>*{box-sizing:border-box;margin:0}html,body{min-height:100%}body{display:grid;place-items:center;min-height:100svh;padding:1.5rem;background:#1F5C3F;color:#10201A;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.5}
main{width:min(36rem,100%);background:#fff;border-radius:2rem;padding:clamp(1.6rem,5vw,3rem);box-shadow:0 30px 70px -34px rgba(0,0,0,.5)}
.tag{display:inline-block;background:#E3F0E8;color:#1F5C3F;border-radius:99px;padding:.3rem .9rem;font-size:.75rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:1.2rem}
h1{font-size:clamp(2.2rem,8vw,3.4rem);letter-spacing:-.05em;line-height:.98;margin-bottom:1rem}p{margin-bottom:1.4rem;font-size:1.05rem}
a.btn{display:inline-flex;align-items:center;min-height:3.2rem;padding:.6rem 1.6rem;border-radius:99px;background:#1F5C3F;color:#fff;font-weight:700;text-decoration:none}a.btn:focus-visible{outline:3px solid #10201A;outline-offset:3px}
p a{color:#1F5C3F;font-weight:650;overflow-wrap:anywhere}small{display:block;margin-top:1.6rem;font-size:.85rem;opacity:.7}small a{color:inherit}</style></head>
<body><main role="main"><span class="tag">Design preview</span><h1>This preview has expired.</h1>
<p>The review period for this website design has ended, so it is no longer available to view.</p>
<p>To see the latest version or to arrange access again, please email <a href="mailto:${mail}?subject=${subject}">${mail}</a>.</p>
<a class="btn" href="mailto:${mail}?subject=${subject}">Send an email</a>
<small>Created by <a href="https://onesimplesite.co.uk" rel="noopener">OneSimpleSite</a></small></main></body></html>`;
