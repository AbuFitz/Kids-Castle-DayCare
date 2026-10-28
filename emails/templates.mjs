// Email templates for Kids Castle. Pure functions: (data, options) -> { subject, html, text }.
// Table-based layout with inline styles so they survive Outlook, Gmail and Apple Mail. All user input is escaped.
const C = { ink: '#1E293B', paper: '#FFF8EC', sun: '#F6BE22', tangerine: '#F36C38', teal: '#0E6F6C', sky: '#3468E8', muted: '#4B5870' };
const FONT = "'Plus Jakarta Sans','Nunito Sans',Segoe UI,Helvetica,Arial,sans-serif";

export const esc = (v = '') => String(v).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const nl2br = (v) => esc(v).replace(/\r?\n/g, '<br>');
const row = (label, value) => value ? `<tr><td style="padding:10px 0;border-bottom:2px solid #F0E6D2;font:700 13px ${FONT};color:${C.muted};width:38%;vertical-align:top">${esc(label)}</td><td style="padding:10px 0;border-bottom:2px solid #F0E6D2;font:600 15px/1.5 ${FONT};color:${C.ink};vertical-align:top">${value}</td></tr>` : '';

export function enquiryRows(d) {
  return [
    ['Type of care', esc(d.careType)],
    ['Children', esc(`${d.children} (ages: ${d.ages})`)],
    ['Area', esc(d.location)],
    ['Preferred start date', d.date ? esc(d.date) : ''],
    ['Preferred times', d.times?.length ? esc(d.times.join(', ')) : ''],
    ['Name', esc(d.name)],
    ['Phone', d.phone ? esc(d.phone) : ''],
    ['Email', d.email ? esc(d.email) : ''],
    ['Best way to reach you', d.contactPref ? esc(d.contactPref) : ''],
    ['Message', d.message ? nl2br(d.message) : ''],
  ];
}

function button(href, label) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0"><tr><td style="background:${C.ink};border:3px solid ${C.ink};border-radius:999px;box-shadow:3px 3px 0 ${C.tangerine}"><a href="${esc(href)}" style="display:inline-block;padding:14px 28px;font:800 16px ${FONT};color:#ffffff;text-decoration:none">${esc(label)}</a></td></tr></table>`;
}

function layout({ preheader, heading, body, siteUrl, address, footerNote, art = 'teddy', sub = '' }) {
  const logo = `${siteUrl}/brand/03-horizontal-1024.png`;
  const artSrc = `${siteUrl}/art/email-${art}.png`;
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>${esc(heading)}</title></head>
<body style="margin:0;padding:0;background:#F6EBD3;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6EBD3"><tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:3px solid ${C.ink};border-radius:24px;overflow:hidden">
    <tr><td style="background:${C.paper};padding:22px 28px;border-bottom:3px solid ${C.ink}"><img src="${esc(logo)}" width="250" alt="Kids Castle Daycare &amp; Home Nursery" style="display:block;width:250px;max-width:100%;height:auto;border:0"></td></tr>
    <tr><td style="background:${C.sun};padding:0 0 0 28px;border-bottom:3px solid ${C.ink}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" style="padding:30px 8px 30px 0"><h1 style="margin:0;font:800 34px/1.05 ${FONT};letter-spacing:-1px;color:${C.ink}">${esc(heading)}</h1>${sub ? `<p style="margin:12px 0 0;font:600 16px/1.45 ${FONT};color:${C.ink}">${esc(sub)}</p>` : ''}</td>
        <td valign="bottom" align="right" width="190" style="width:190px;padding:14px 12px 0 0;line-height:0"><img src="${esc(artSrc)}" width="170" alt="" role="presentation" style="display:block;width:170px;height:auto;border:0"></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:28px 28px 32px;font:400 16px/1.6 ${FONT};color:${C.ink}">${body}</td></tr>
    <tr><td style="background:${C.paper};padding:22px 28px;border-top:3px solid ${C.ink};font:400 13px/1.6 ${FONT};color:${C.muted}">
      <strong style="color:${C.ink}">Kids Castle Daycare &amp; Home Nursery</strong><br>Home nursery in East London &middot; Babysitting and nanny care in North London${address ? `<br>${esc(address)}` : ''}
      ${footerNote ? `<br><br>${footerNote}` : ''}
      <br><br><a href="${esc(siteUrl)}/privacy" style="color:${C.teal}">Privacy notice</a>
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

const plainRows = (d) => enquiryRows(d).filter(([, v]) => v).map(([k, v]) => `${k}: ${v.replace(/<br>/g, '\n  ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")}`).join('\n');
const table = (d) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;border-top:2px solid #F0E6D2">${enquiryRows(d).map(([k, v]) => row(k, v)).join('')}</table>`;

/** Sent to the parent after they submit the enquiry form. */
export function parentConfirmation(d, { siteUrl = '', address = '' } = {}) {
  const first = esc((d.name || '').split(' ')[0] || 'there');
  const body = `<p style="margin:0 0 14px">Hi ${first},</p>
<p style="margin:0 0 6px;font:800 18px ${FONT}">What you sent us</p>${table(d)}
<p style="margin:22px 0 6px;font:800 18px ${FONT}">What happens next</p>
<ol style="margin:0;padding-left:20px"><li style="margin-bottom:6px">We check availability against what you need.</li><li style="margin-bottom:6px">We talk through rates, hours and any sibling arrangement with you.</li><li>If it is a good fit, we agree the arrangement together.</li></ol>
<p style="margin:18px 0 0;color:${C.muted};font-size:14px">Bookings depend on your family&rsquo;s requirements and our availability, so nothing is agreed until we have spoken.</p>
${button(`${siteUrl}/services`, 'See our services and rates')}`;
  return {
    subject: 'We have your enquiry | Kids Castle',
    html: layout({ preheader: 'Thanks for your enquiry. Here is what you sent us and what happens next.', heading: 'We have your enquiry', sub: 'Thanks for getting in touch. We will be in touch about availability.', art: 'teddy', body, siteUrl, address, footerNote: 'You are receiving this because you sent an enquiry through our website. If this was not you, you can ignore this email.' }),
    text: `Hi ${(d.name || '').split(' ')[0] || 'there'},\n\nThank you for getting in touch. We have your enquiry and will reply to you directly to talk through availability.\n\nWHAT YOU SENT US\n${plainRows(d)}\n\nWHAT HAPPENS NEXT\n1. We check availability against what you need.\n2. We talk through rates, hours and any sibling arrangement with you.\n3. If it is a good fit, we agree the arrangement together.\n\nBookings depend on your family's requirements and our availability, so nothing is agreed until we have spoken.\n\nKids Castle Daycare & Home Nursery\n${siteUrl}/privacy`,
  };
}

/** Sent to the business when an enquiry arrives. */
export function businessNotification(d, { siteUrl = '', address = '' } = {}) {
  const body = `${table(d)}
${d.email ? button(`mailto:${d.email}?subject=${encodeURIComponent('Your enquiry to Kids Castle')}`, `Reply to ${(d.name || 'parent').split(' ')[0]}`) : ''}`;
  return {
    subject: `New enquiry: ${d.careType} (${d.name})`,
    html: layout({ preheader: `${d.name} is asking about ${d.careType}.`, heading: 'New enquiry', sub: `${d.name} is asking about ${d.careType}.`, art: 'castle', body, siteUrl, address, footerNote: 'Parent details are shared only to reply to this enquiry.' }),
    text: `New enquiry from the website\n\n${plainRows(d)}\n`,
  };
}

/** Manual follow-up for staff to send when they need more detail. {placeholders} are filled in by hand. */
export function followUp(d, { siteUrl = '', address = '' } = {}) {
  const first = esc((d.name || '').split(' ')[0] || 'there');
  const body = `<p style="margin:0 0 14px">Hi ${first},</p>
<p style="margin:0 0 14px">Thanks again for your enquiry about ${esc(d.careType)}. To check availability properly, could you tell us a little more?</p>
<ul style="margin:0 0 14px;padding-left:20px"><li style="margin-bottom:6px">The days and times you would need care</li><li style="margin-bottom:6px">Your children&rsquo;s ages and any needs we should know about</li><li>Your preferred start date</li></ul>
<p style="margin:0">Just reply to this email and we will pick it up from there.</p>`;
  return {
    subject: 'A little more detail, please | Kids Castle',
    html: layout({ preheader: 'A few quick questions so we can check availability.', heading: 'A little more detail', sub: 'A few quick questions so we can check availability.', art: 'teddy', body, siteUrl, address, footerNote: 'You are receiving this because you sent an enquiry through our website.' }),
    text: `Hi ${(d.name || '').split(' ')[0] || 'there'},\n\nThanks again for your enquiry about ${d.careType}. To check availability properly, could you tell us:\n- The days and times you would need care\n- Your children's ages and any needs we should know about\n- Your preferred start date\n\nJust reply to this email and we will pick it up from there.\n\nKids Castle Daycare & Home Nursery`,
  };
}

export const templates = { parentConfirmation, businessNotification, followUp };
