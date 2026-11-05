import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Arrow } from '../components/Motion';
import { PhoneIcon, WhatsAppIcon } from '../components/Icons';
import { Cutout } from '../components/Cutout';
import { site } from '../data/site';

const careTypes = ['Nanny care', 'Babysitting', 'Evening & weekend care', 'Full-day childcare', 'Sibling care', 'Not sure yet'] as const;

const schema = z.object({
  careType: z.enum(careTypes, { message: 'Please choose a type of care' }),
  ages: z.string().trim().min(1, 'Tell us your child’s age or ages').max(200, 'Please keep this shorter'),
  area: z.string().trim().min(2, 'A postcode or area is enough, e.g. “N5” or “Highbury”').max(120, 'Please keep this shorter'),
  schedule: z.string().trim().min(2, 'Tell us roughly when you need care').max(500, 'Please keep this under 500 characters'),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().min(1, 'Please enter your email so Mihaela can reply').regex(/^\S+@\S+\.\S+$/, 'That email address doesn’t look right').max(200),
  phone: z.string().trim().max(40).refine((v) => v === '' || v.replace(/\D/g, '').length >= 7, 'That phone number looks too short'),
  message: z.string().trim().max(2000, 'Please keep this under 2,000 characters'),
  consent: z.literal(true, { message: 'Please tick to confirm' }),
  website: z.string().max(0), // honeypot
});
type In = z.input<typeof schema>;
type Out = z.output<typeof schema>;

type Result = { kind: 'sent' } | { kind: 'not-connected' } | { kind: 'busy' } | { kind: 'error' };
const newId = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);

export default function Contact() {
  const [result, setResult] = useState<Result | null>(null);
  const submissionId = useRef('');
  const heading = useRef<HTMLHeadingElement>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm<In, unknown, Out>({
    resolver: zodResolver(schema), mode: 'onTouched', defaultValues: { phone: '', message: '', website: '' },
  });
  useEffect(() => { if (result) heading.current?.focus(); }, [result]);

  const err = (k: keyof In) => errors[k]?.message as string | undefined;
  // Always rendered so an appearing message never shifts the layout.
  const E = ({ k }: { k: keyof In }) => <span className="err" id={`${k}-err`} role={err(k) ? 'alert' : undefined}>{err(k)}</span>;
  const inv = (k: keyof In) => (errors[k] ? true : undefined);

  const onSubmit = async (d: Out) => {
    if (!submissionId.current) submissionId.current = newId(); // one id per enquiry: retries and double-clicks cannot send twice
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...d, submissionId: submissionId.current }) });
      if (res.status === 501 || res.status === 404) return setResult({ kind: 'not-connected' });
      if (res.status === 429) return setResult({ kind: 'busy' });
      if (!res.ok) throw new Error(String(res.status));
      setResult({ kind: 'sent' });
    } catch {
      setResult({ kind: 'error' });
    }
  };
  const keep = () => { const v = getValues(); return [`Type of care: ${v.careType}`, `Child's age or ages: ${v.ages}`, `Area / postcode: ${v.area}`, `Dates or schedule: ${v.schedule}`, `Name: ${v.name}`, `Email: ${v.email}`, `Phone: ${v.phone || '-'}`, `Message: ${v.message || '-'}`].join('\n'); };

  return (
    <>
      <section className="page-head" aria-labelledby="h1">
        <div className="wrap">
          <h1 id="h1" className="h1-xl">Let’s <em className="mark mark--sun">talk.</em></h1>
          <p className="lead">Tell us about your family and the care you need. We will reply to you directly.</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="wrap contact-grid">
          <div className="form-card">
            {result ? (
              <div className="done" role="status">
                {result.kind === 'sent' && (<><h2 ref={heading} tabIndex={-1}>Thank you, your enquiry has been sent.</h2><p>We will reply to you directly at the email address you gave. A confirmation copy is on its way to you.</p><Link to="/" className="btn btn--ink">Back to the home page<Arrow /></Link></>)}
                {result.kind === 'not-connected' && (<><h2 ref={heading} tabIndex={-1}>Your enquiry has not been sent.</h2><p>The enquiry form is not connected yet, so nothing has reached us. Please try again a little later. Here is what you entered:</p><pre>{keep()}</pre><button type="button" className="btn btn--ink" onClick={() => setResult(null)}>Back to the form</button></>)}
                {result.kind === 'busy' && (<><h2 ref={heading} tabIndex={-1}>Too many attempts.</h2><p>Please wait a little and try again. Your enquiry has not been sent.</p><button type="button" className="btn btn--ink" onClick={() => setResult(null)}>Back to the form</button></>)}
                {result.kind === 'error' && (<><h2 ref={heading} tabIndex={-1}>Something went wrong.</h2><p>Your enquiry has not been sent. Nothing you typed has been lost: please try again.</p><button type="button" className="btn btn--ink" onClick={() => setResult(null)}>Back to the form</button></>)}
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Childcare enquiry">
                <fieldset className="field">
                  <legend>What type of childcare?</legend>
                  <div className="chips-field">
                    {careTypes.map((c) => (<label className="chip-opt" key={c}><input type="radio" value={c} aria-describedby="careType-err" {...register('careType')} /><span>{c}</span></label>))}
                  </div>
                  <E k="careType" />
                </fieldset>
                <div className="two">
                  <div className="field"><label htmlFor="ages">Child’s age or age range</label><input id="ages" className="input" placeholder="e.g. 18 months and 4 years" aria-invalid={inv('ages')} aria-describedby="ages-err" {...register('ages')} /><E k="ages" /></div>
                  <div className="field"><label htmlFor="area">Area or postcode</label><input id="area" className="input" placeholder="e.g. N5 or Highbury" autoComplete="postal-code" aria-invalid={inv('area')} aria-describedby="area-err" {...register('area')} /><E k="area" /></div>
                </div>
                <div className="field"><label htmlFor="schedule">Preferred dates or regular schedule</label><input id="schedule" className="input" placeholder="e.g. Tuesday and Thursday evenings from mid-November" aria-invalid={inv('schedule')} aria-describedby="schedule-err" {...register('schedule')} /><E k="schedule" /></div>
                <div className="two">
                  <div className="field"><label htmlFor="name">Your name</label><input id="name" className="input" autoComplete="name" aria-invalid={inv('name')} aria-describedby="name-err" {...register('name')} /><E k="name" /></div>
                  <div className="field"><label htmlFor="email">Email</label><input id="email" className="input" type="email" autoComplete="email" aria-invalid={inv('email')} aria-describedby="email-err" {...register('email')} /><E k="email" /></div>
                </div>
                <div className="field"><label htmlFor="phone">Phone <span className="opt">(optional)</span></label><input id="phone" className="input" type="tel" autoComplete="tel" aria-invalid={inv('phone')} aria-describedby="phone-err" {...register('phone')} /><E k="phone" /></div>
                <div className="field"><label htmlFor="message">Anything else? <span className="opt">(optional)</span></label><textarea id="message" className="input" aria-describedby="message-hint message-err" {...register('message')} /><span id="message-hint" className="hint">Please don’t include medical or other sensitive details here. We can ask about those later if needed.</span><E k="message" /></div>
                <div className="field">
                  <label className="consent"><input type="checkbox" aria-invalid={inv('consent')} aria-describedby="consent-err" {...register('consent')} /><span>I understand Kids Castle will use these details to reply to my enquiry, as explained in the <Link to="/privacy">Privacy Notice</Link>.</span></label>
                  <E k="consent" />
                </div>
                <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
                <button type="submit" className="btn btn--tangerine" disabled={isSubmitting} aria-disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send enquiry'}<Arrow /></button>
              </form>
            )}
          </div>
          <aside className="contact-side" aria-label="Other ways to get in touch">
            <Cutout name="family" w={900} h={592} className="art-contact" />
            <h2 className="h-small">Prefer to call?</h2>
            <p className="call"><a href={`tel:${site.phone.tel}`}><PhoneIcon />{site.phone.display}</a></p>
            <p><a className="btn btn--wa" href={site.phone.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon />Message us on WhatsApp<span className="visually-hidden"> (opens in a new tab)</span></a></p>
            <p className="fine">Or send the form and we will reply to talk through availability, hours and rates. Care takes place in your own home.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
