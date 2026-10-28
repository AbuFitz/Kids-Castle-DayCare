import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, m } from 'motion/react';
import { Arrow, Words } from '../components/Motion';
import { Cutout } from '../components/Cutout';
import { GoogleTrust } from '../components/GoogleTrust';
import { site } from '../data/site';

const careTypes = ['Home nursery (East London)', 'Babysitting (North London)', 'Nanny care (North London)', 'Not sure yet'] as const;
const times = ['Mornings', 'Afternoons', 'Evenings', 'Weekends', 'Full day', 'Flexible'] as const;
const pref = [['either', 'Either'], ['phone', 'Phone'], ['email', 'Email']] as const;

const schema = z.object({
  careType: z.enum(careTypes, { message: 'Please choose a type of care' }),
  children: z.coerce.number({ message: 'Enter a number' }).int('Enter a whole number').min(1, 'At least 1').max(10, 'Please use the message box for larger groups'),
  ages: z.string().trim().min(1, 'Tell us your children’s ages').max(200),
  location: z.string().trim().min(2, 'A general area is enough, e.g. “Highbury”').max(120),
  date: z.string().optional(),
  times: z.array(z.string()).default([]),
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  phone: z.string().trim().max(40).optional(),
  email: z.string().trim().max(200).optional(),
  contactPref: z.enum(['either', 'phone', 'email']).default('either'),
  message: z.string().trim().max(2000, 'Please keep this under 2,000 characters').optional(),
  consent: z.literal(true, { message: 'Please tick to confirm' }),
  website: z.string().max(0).optional(), // honeypot
}).refine((d) => (d.phone && d.phone.replace(/\D/g, '').length >= 7) || (d.email && /^\S+@\S+\.\S+$/.test(d.email)), { path: ['email'], message: 'Add a phone number or a valid email so we can reply' })
  .refine((d) => !d.email || /^\S+@\S+\.\S+$/.test(d.email), { path: ['email'], message: 'That email address doesn’t look right' });

type In = z.input<typeof schema>;
type Out = z.output<typeof schema>;
type Field = keyof In;

const STEPS: { title: string; short: string; fields: Field[] }[] = [
  { title: 'What care do you need?', short: 'Care', fields: ['careType'] },
  { title: 'Tell us about your children', short: 'Children', fields: ['children', 'ages'] },
  { title: 'Where and when?', short: 'When', fields: ['location', 'date', 'times'] },
  { title: 'How can we reach you?', short: 'You', fields: ['name', 'phone', 'email', 'contactPref', 'message', 'consent'] },
  { title: 'Check and send', short: 'Send', fields: [] },
];

function summary(d: Out) {
  return [`Type of care: ${d.careType}`, `Children: ${d.children} (ages: ${d.ages})`, `Area: ${d.location}`, `Preferred start date: ${d.date || 'not set'}`, `Preferred times: ${d.times.join(', ') || 'not set'}`, `Name: ${d.name}`, `Phone: ${d.phone || '-'}`, `Email: ${d.email || '-'}`, `Best way to reach you: ${d.contactPref}`, `Message: ${d.message || '-'}`].join('\n');
}

type Result = { kind: 'sent' } | { kind: 'not-connected'; text: string } | { kind: 'error'; text: string };

export default function Contact() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  const { register, handleSubmit, trigger, getValues, formState: { errors, isSubmitting } } = useForm<In, unknown, Out>({
    resolver: zodResolver(schema), mode: 'onTouched', defaultValues: { times: [], contactPref: 'either', website: '' },
  });

  useEffect(() => { if (first.current) { first.current = false; return; } heading.current?.focus(); }, [step, result]);

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };
  // trigger() with a schema resolver reports failure if *any* field is invalid (including later steps),
  // so decide per step from the schema issues that belong to this step's own fields.
  const next = async () => {
    await trigger(STEPS[step].fields); // surfaces this step's messages
    const r = schema.safeParse(getValues());
    const blocked = !r.success && r.error.issues.some((i) => STEPS[step].fields.includes(i.path[0] as Field));
    if (!blocked) go(step + 1);
  };
  const err = (k: Field) => errors[k]?.message as string | undefined;
  const inv = (k: Field) => (errors[k] ? true : undefined);
  // Always rendered so an appearing message never shifts the layout (a shift between mousedown and mouseup swallows the click).
  const E = ({ k }: { k: Field }) => <span className="err" id={`${k}-err`} role={err(k) ? 'alert' : undefined}>{err(k)}</span>;

  const onSubmit = async (d: Out) => {
    const text = summary(d);
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
      if (res.status === 501 || res.status === 404) return setResult({ kind: 'not-connected', text });
      if (!res.ok) throw new Error(String(res.status));
      setResult({ kind: 'sent' });
    } catch {
      setResult({ kind: 'error', text });
    }
  };

  const v = getValues();
  const pct = ((step + 1) / STEPS.length) * 100;
  const body = {
    0: (
      <fieldset className="field">
        <legend className="visually-hidden">Type of care</legend>
        <div className="chips-field big">
          {careTypes.map((c) => (<label className="chip-opt" key={c}><input type="radio" value={c} {...register('careType', { onChange: () => void trigger('careType') })} /><span>{c}</span></label>))}
        </div>
        <E k="careType" />
        <p className="hint">We’ll check availability against what you need and reply to you directly.</p>
      </fieldset>
    ),
    1: (
      <>
        <div className="field"><label htmlFor="children">How many children?</label><input id="children" className="input" type="number" inputMode="numeric" min={1} max={10} aria-invalid={inv('children')} aria-describedby="children-err" {...register('children')} /><E k="children" /></div>
        <div className="field"><label htmlFor="ages">Their ages</label><input id="ages" className="input" placeholder="e.g. 18 months and 4 years" aria-invalid={inv('ages')} aria-describedby="ages-err" {...register('ages')} /><E k="ages" /></div>
      </>
    ),
    2: (
      <>
        <div className="field"><label htmlFor="location">General area</label><input id="location" className="input" placeholder="Area or neighbourhood" autoComplete="address-level2" aria-invalid={inv('location')} aria-describedby="location-err" {...register('location')} /><E k="location" /></div>
        <div className="field"><label htmlFor="date">Preferred start date <span className="opt">(optional)</span></label><input id="date" className="input" type="date" {...register('date')} /></div>
        <fieldset className="field"><legend>Preferred times <span className="opt">(optional)</span></legend>
          <div className="chips-field">{times.map((t) => (<label className="chip-opt" key={t}><input type="checkbox" value={t} {...register('times')} /><span>{t}</span></label>))}</div>
        </fieldset>
      </>
    ),
    3: (
      <>
        <div className="field"><label htmlFor="name">Your name</label><input id="name" className="input" autoComplete="name" aria-invalid={inv('name')} aria-describedby="name-err" {...register('name')} /><E k="name" /></div>
        <div className="two">
          <div className="field"><label htmlFor="phone">Phone <span className="opt">(optional)</span></label><input id="phone" className="input" type="tel" autoComplete="tel" {...register('phone')} /></div>
          <div className="field"><label htmlFor="email">Email <span className="opt">(optional)</span></label><input id="email" className="input" type="email" autoComplete="email" aria-invalid={inv('email')} aria-describedby="email-err" {...register('email')} /><E k="email" /></div>
        </div>
        <fieldset className="field"><legend>Best way to reach you</legend>
          <div className="chips-field">{pref.map(([val, label]) => (<label className="chip-opt" key={val}><input type="radio" value={val} {...register('contactPref')} /><span>{label}</span></label>))}</div>
        </fieldset>
        <div className="field"><label htmlFor="message">Anything else? <span className="opt">(optional)</span></label><textarea id="message" className="input" placeholder="Tell us anything that would help" {...register('message')} /><E k="message" /></div>
        <div className="field">
          <label className="consent"><input type="checkbox" aria-invalid={inv('consent')} aria-describedby="consent-err" {...register('consent', { onChange: () => void trigger('consent') })} /><span>I agree that Kids Castle may use these details to reply to my enquiry. <Link to="/privacy">Privacy notice</Link></span></label>
          <E k="consent" />
        </div>
        <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
      </>
    ),
    4: (
      <dl className="review">
        {([['Care', v.careType, 0], ['Children', `${v.children} (ages: ${v.ages})`, 1], ['Area', v.location, 2], ['Start date', v.date || 'Not set', 2], ['Times', (v.times ?? []).join(', ') || 'Not set', 2], ['Name', v.name, 3], ['Phone', v.phone || '-', 3], ['Email', v.email || '-', 3], ['Reach you by', v.contactPref, 3], ['Message', v.message || '-', 3]] as const).map(([k, val, s]) => (
          <div key={k} className="review-row"><dt>{k}</dt><dd>{val}</dd><button type="button" className="edit" onClick={() => go(s)} aria-label={`Edit ${k}`}>Edit</button></div>
        ))}
      </dl>
    ),
  }[step];

  return (
    <>
      <section className="page-head page-head--yellow">
        <div className="wrap">
          <h1><Words text="Get in touch" immediate /></h1>
          <p className="lead">Tell us about your family and the care you need. We’ll come back to you about availability.</p>
          <div style={{ marginTop: 20 }}><GoogleTrust /></div>
        </div>
      </section>
      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-side">
            <Cutout name="family" w={900} h={592} className="art-contact" />
            <div className="info-list">
              <div className="info-card"><h3>Home nursery</h3><p>{site.nursery.showFullAddress ? `${site.nursery.address.line1}, ${site.nursery.address.area}, ${site.nursery.address.city} ${site.nursery.address.postcode}` : site.nursery.area}</p></div>
              <div className="info-card"><h3>Babysitting &amp; nannies</h3><p>{site.homeVisits.area}. {site.homeVisits.note}</p></div>
              <div className="info-card"><h3>Email</h3><p>{site.contact.email ? <a href={`mailto:${site.contact.email}`} style={{ textDecoration: 'underline', fontWeight: 700 }}>{site.contact.email}</a> : 'Please use the enquiry form.'}</p></div>
            </div>
          </div>

          <div className="form-card">
            {result ? (
              <div className="done" role="status">
                {result.kind === 'sent' && (<><h2 ref={heading} tabIndex={-1}>Thank you, we have your enquiry.</h2><p>We’ll reply to you directly to talk through availability. If you gave an email address, a copy is on its way.</p><Link to="/" className="btn btn--navy">Back to the home page<Arrow /></Link></>)}
                {result.kind === 'not-connected' && (<><h2 ref={heading} tabIndex={-1}>Preview only: nothing has been sent.</h2><p>This form isn’t connected to an inbox yet, so your enquiry has not reached Kids Castle. Here is what you entered, ready to send once it is connected:</p><pre>{result.text}</pre><button type="button" className="btn btn--ghost" onClick={async () => { try { await navigator.clipboard.writeText(result.text); setCopied(true); } catch { /* clipboard unavailable */ } }}>{copied ? 'Copied' : 'Copy enquiry'}</button></>)}
                {result.kind === 'error' && (<><h2 ref={heading} tabIndex={-1}>Something went wrong.</h2><p>Your enquiry was not sent. Nothing has been lost, so please check your connection and try again.</p><pre>{result.text}</pre><button type="button" className="btn btn--navy" onClick={() => setResult(null)}>Try again</button></>)}
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Childcare enquiry">
                <div className="progress-form">
                  <div className="pf-top"><span className="pf-count">Step {step + 1} of {STEPS.length}</span><span className="pf-name">{STEPS[step].short}</span></div>
                  <div className="pf-bar" role="progressbar" aria-label="Enquiry progress" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].title}`}>
                    <m.span className="pf-fill" initial={false} animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
                  </div>
                  <ol className="pf-steps">
                    {STEPS.map((s, i) => (
                      <li key={s.short} className={i === step ? 'is-now' : i < step ? 'is-done' : ''}>
                        {i < step ? <button type="button" onClick={() => go(i)} aria-label={`Back to step ${i + 1}: ${s.title}`}>{s.short}</button> : <span aria-current={i === step ? 'step' : undefined}>{s.short}</span>}
                      </li>
                    ))}
                  </ol>
                </div>
                <h2 className="step-title" ref={heading} tabIndex={-1}>{STEPS[step].title}</h2>
                <AnimatePresence mode="wait" initial={false}>
                  <m.div key={step} className="form-grid" initial={{ opacity: 0, x: dir * 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -28 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                    {body}
                  </m.div>
                </AnimatePresence>
                <div className="form-nav">
                  {step > 0 ? <button type="button" className="btn btn--ghost" onClick={() => go(step - 1)}>Back</button> : <span />}
                  {step < STEPS.length - 1
                    ? <button key="continue" type="button" className="btn btn--navy" onClick={next}>Continue<Arrow /></button>
                    : <button key="send" type="submit" className="btn" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send enquiry'}<Arrow /></button>}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
