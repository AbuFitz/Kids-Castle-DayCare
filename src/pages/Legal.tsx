import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';

const email = site.contact.email;
const Mail = () => <a href={`mailto:${email}`}>{email}</a>;
const Ext = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noreferrer">{children}<span className="visually-hidden"> (opens in a new tab)</span></a>;

function Legal({ title, updated, children, draft = false }: { title: string; updated: string; children: ReactNode; draft?: boolean }) {
  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1 id="h1" className="h1-md">{title}</h1>
          <p className="fine">Last updated {updated}</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="wrap legal">
          <aside className="note note--warn" aria-label="Review status">
            <p><strong>{draft ? 'Draft for approval.' : 'Draft for owner approval.'}</strong> {draft ? 'These booking terms are a draft. Items in [square brackets] are decisions only Mihaela can make. ' : ''}This document has been prepared for Mihaela Oliva to approve and has not yet been reviewed by a UK legal professional. It should not be treated as final, or as legally certified, until it has been.</p>
          </aside>
          <div className="prose">{children}</div>
          <nav aria-label="Other legal documents" className="legal-links">
            <Link to="/privacy">Privacy Notice</Link><Link to="/cookies">Cookie Notice</Link><Link to="/terms">Terms of Use</Link><Link to="/accessibility">Accessibility</Link><Link to="/complaints">Complaints</Link><Link to="/booking-terms">Booking Terms (draft)</Link>
          </nav>
        </div>
      </section>
    </>
  );
}
const UPDATED = '4 November 2026';

export function Privacy() {
  return (
    <Legal title="Privacy Notice" updated={UPDATED}>
      <p>This notice explains how personal information is used when you contact Kids Castle through this website.</p>
      <h2>Who is responsible for your information</h2>
      <p>Mihaela Oliva, trading as Kids Castle, is the data controller. {site.ofsted.statement}</p>
      <address>{site.registeredAddress.map((l) => <span key={l}>{l}<br /></span>)}Email: <Mail /></address>
      <h2>What we collect</h2>
      <p>When you send an enquiry we collect what you type into the form: your name, email address, optional phone number, the type of childcare you are asking about, your child’s age or age range, your area or postcode, your preferred dates or schedule, and any message you add. Please do not include medical or other sensitive details in the form.</p>
      <p>Our hosting provider also keeps standard technical logs (such as IP address and the pages requested) for security and to keep the site running. We do not run analytics or advertising on this website.</p>
      <h2>Why we use it, and our lawful basis</h2>
      <ul>
        <li><strong>To reply to your enquiry and discuss childcare</strong>, including steps you ask us to take before entering an arrangement (UK GDPR Article 6(1)(b)), and our legitimate interest in responding to people who contact us (Article 6(1)(f)).</li>
        <li><strong>To keep the website secure and prevent spam</strong>, in our legitimate interests (Article 6(1)(f)). The form includes a hidden spam trap and limits repeated submissions from one address.</li>
      </ul>
      <h2>Who receives it</h2>
      <p>We use these service providers to run the website and handle enquiries. They act on our instructions:</p>
      <ul>
        <li><strong>Vercel Inc.</strong>: hosts the website and runs the form’s server function.</li>
        <li><strong>Resend</strong>: delivers the enquiry email to Mihaela and the confirmation email to you.</li>
        <li><strong>Google (Gmail)</strong>: provides the email inbox where enquiries are received.</li>
      </ul>
      <p>We do not sell your information or share it for marketing.</p>
      <h2>Transfers outside the UK</h2>
      <p>These providers may process information in the United States or other countries outside the UK. Where that happens, it should be protected by a recognised transfer mechanism such as the UK’s approved safeguards. [Owner to confirm the current transfer terms with each provider before this notice is finalised.]</p>
      <h2>How long we keep it</h2>
      <p>[Owner to confirm retention periods. No retention period has been decided yet.] We will not keep enquiry details for longer than we need them for the purpose they were given.</p>
      <h2>Security</h2>
      <p>The website uses HTTPS. Enquiries are sent by email to a single mailbox. Access to that mailbox is limited to Mihaela.</p>
      <h2>Your rights</h2>
      <p>You can ask us to give you a copy of your information, correct it, delete it, restrict or object to how we use it, and in some cases receive it in a portable format. To use any of these rights, email <Mail />. We will reply within one month.</p>
      <h2>Complaints</h2>
      <p>If you are unhappy with how we use your information, please tell us first. You can also complain to the Information Commissioner’s Office (ICO) at <Ext href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</Ext>.</p>
      <h2>Children’s information</h2>
      <p>This website is for parents and carers. We do not knowingly collect information from children through it.</p>
      <h2>Changes</h2>
      <p>If we change how we use information, we will update this page and the date above.</p>
    </Legal>
  );
}

export function Cookies() {
  return (
    <Legal title="Cookie Notice" updated={UPDATED}>
      <p>This website does <strong>not</strong> use cookies, and it does not use analytics, advertising or tracking tools. Because of that, it does not show a cookie banner.</p>
      <h2>What we checked</h2>
      <ul>
        <li>No cookies are set by the website or its enquiry form.</li>
        <li>The website does not store anything in your browser’s local storage or session storage.</li>
        <li>Fonts are served from the website itself, not from Google Fonts or another third party.</li>
        <li>There are no embedded maps, videos, social media widgets or advertising scripts.</li>
      </ul>
      <h2>Links to other sites</h2>
      <p>Some links take you to other websites, for example to Google reviews, Facebook or Ofsted. Those sites have their own cookie and privacy practices, which we do not control.</p>
      <h2>If this changes</h2>
      <p>If we ever add anything that is not strictly necessary, such as analytics, we will update this notice and ask for your consent before it runs, with a way to change your mind.</p>
      <p>For how we use the details you send in an enquiry, see the <Link to="/privacy">Privacy Notice</Link>.</p>
    </Legal>
  );
}

export function Terms() {
  return (
    <Legal title="Website Terms of Use" updated={UPDATED}>
      <p>By using this website you agree to these terms. They apply to the website only. Childcare arrangements are covered separately by any booking terms agreed with Mihaela.</p>
      <h2>About this website</h2>
      <p>The website is operated by Mihaela Oliva, trading as Kids Castle. {site.ofsted.statement} Contact: <Mail />.</p>
      <h2>Information on the site</h2>
      <p>We try to keep the information accurate, but it is general and may change. Nothing on the website is a contract or an offer of childcare. Availability and arrangements are confirmed with you directly. Rates are discussed individually and are not published on this website.</p>
      <h2>Registration</h2>
      <p>Ofsted registration on the voluntary part of the Childcare Register is a registration, not an inspection grade, and does not mean Ofsted endorses or accredits the service.</p>
      <h2>Reviews</h2>
      <p>Reviews shown on this website are quoted from the Kids Castle Google Business Profile as posted. They are the opinions of the reviewers.</p>
      <h2>Using the enquiry form</h2>
      <p>Please give accurate information and use the form only for genuine enquiries. Do not submit sensitive or medical information through it. How we use what you send is explained in the <Link to="/privacy">Privacy Notice</Link>.</p>
      <h2>Intellectual property</h2>
      <p>The Kids Castle name, logo, illustrations and text belong to Kids Castle or are used with permission. You may not copy them for commercial use without our written consent.</p>
      <h2>Links to other sites</h2>
      <p>We are not responsible for the content of other websites we link to.</p>
      <h2>Liability</h2>
      <p>We do not exclude liability that cannot lawfully be excluded, including for death or personal injury caused by negligence or for fraud. Otherwise, the website is provided as it is and we are not liable for loss arising from your use of it. [To be confirmed by a legal professional.]</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the law of England and Wales.</p>
    </Legal>
  );
}

export function Accessibility() {
  return (
    <Legal title="Accessibility Statement" updated={UPDATED}>
      <p>We want everyone to be able to use this website. It is designed to meet the Web Content Accessibility Guidelines (WCAG) 2.2 level AA.</p>
      <h2>What we have done</h2>
      <ul>
        <li>Pages use a clear heading structure, landmarks and a “skip to content” link.</li>
        <li>The site works with a keyboard alone, and focus is always visible.</li>
        <li>Text and controls are designed for sufficient colour contrast and resize without losing content.</li>
        <li>The enquiry form has labelled fields and error messages that are announced by screen readers.</li>
        <li>Animations are gentle, nothing moves automatically in the reviews, and animations are reduced or removed when your device is set to “reduce motion”.</li>
        <li>Decorative illustrations are hidden from screen readers; meaningful images have text alternatives.</li>
      </ul>
      <h2>How it was tested</h2>
      <p>The pages were checked with automated accessibility testing (axe) at phone and desktop widths, and by hand with a keyboard. This is not a substitute for testing with disabled users, and it does not guarantee that every issue has been found. [Owner: update this section if an independent audit is carried out.]</p>
      <h2>Known limitations</h2>
      <p>The Google reviews link and the Ofsted website open third-party sites, whose accessibility we do not control.</p>
      <h2>Tell us about a problem</h2>
      <p>If you find something hard to use, or need information in another format, email <Mail />. We will try to reply within a few working days and to fix the problem.</p>
      <h2>If you are not happy with our reply</h2>
      <p>The Equality Advisory and Support Service (EASS) can advise you at <Ext href="https://www.equalityadvisoryservice.com/">equalityadvisoryservice.com</Ext>.</p>
    </Legal>
  );
}

export function Complaints() {
  return (
    <Legal title="Complaints Information" updated={UPDATED}>
      <p>We want to know if something is not right. Raising a concern will never affect how your family is treated.</p>
      <h2>Speak to Mihaela first</h2>
      <p>Mihaela is the only childcare provider, so the quickest way to put something right is to talk to her directly, in person or by email at <Mail />. Please say what happened and what you would like to see changed.</p>
      <h2>What happens next</h2>
      <p>[Owner to confirm how quickly complaints are acknowledged and answered, and how they are recorded.] Mihaela will look into the concern, reply to you in writing, and tell you what she has done.</p>
      <h2>Contacting Ofsted</h2>
      <p>{site.ofsted.statement} If you are not satisfied, or you have a concern about a child’s safety or welfare, you can contact Ofsted at any time. Their contact details are on <Ext href="https://www.gov.uk/government/organisations/ofsted">GOV.UK</Ext>. You can also check the registration on <Ext href={site.ofsted.searchUrl}>Ofsted’s website</Ext>.</p>
      <p>If you think a child is at immediate risk of harm, call 999.</p>
      <h2>Data protection complaints</h2>
      <p>Complaints about how we use personal information are covered in the <Link to="/privacy">Privacy Notice</Link>.</p>
    </Legal>
  );
}

export function BookingTerms() {
  const Own = ({ children }: { children: ReactNode }) => <p className="own">[Owner decision needed: {children}]</p>;
  return (
    <Legal title="Childcare Booking Terms (draft)" updated={UPDATED} draft>
      <p>These draft terms would apply between Mihaela Oliva (trading as Kids Castle) and the parent or carer who books childcare. They are not in force until Mihaela has approved them, filled in the bracketed items and had them reviewed by a UK legal professional. No fees or policies have been invented here.</p>
      <h2>1. The service</h2>
      <p>Mihaela provides nanny and babysitting care for children aged {site.ages} in the family’s own home. {site.ofsted.statement}</p>
      <h2>2. Booking arrangements</h2>
      <p>Care is arranged directly with Mihaela after an enquiry. Days, hours and routines are agreed with the parent before care begins. Nothing is a booking until Mihaela has confirmed it.</p>
      <Own>how bookings are confirmed (email, message, signed form) and whether a trial session is offered.</Own>
      <h2>3. Payment</h2>
      <Own>rates, how and when payment is made, and what is included.</Own>
      <h2>4. Cancellation</h2>
      <Own>notice required from the parent, any charge for short-notice cancellation, and what happens if Mihaela has to cancel.</Own>
      <h2>5. Rescheduling</h2>
      <Own>how and by when a session can be moved.</Own>
      <h2>6. Late hours</h2>
      <Own>whether returning later than agreed is charged and at what rate.</Own>
      <h2>7. Parent responsibilities</h2>
      <p>The parent should give accurate information about the children, tell Mihaela about anything relevant to their care, and provide a way to be reached during care. [Owner to confirm the full list, including information to be provided before the first session.]</p>
      <h2>8. Emergencies</h2>
      <p>If a child needs urgent medical help, Mihaela will call emergency services and then contact the parent. [Owner to confirm emergency contacts, medical consent and first-aid arrangements.]</p>
      <h2>9. Complaints</h2>
      <p>See <Link to="/complaints">Complaints Information</Link>.</p>
      <h2>10. Ending the arrangement</h2>
      <Own>notice period for either side, and any circumstances in which care can end immediately.</Own>
      <h2>11. Personal information</h2>
      <p>How information about your family is used is explained in the <Link to="/privacy">Privacy Notice</Link>.</p>
    </Legal>
  );
}
