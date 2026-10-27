import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Arrow, Words } from '../components/Motion';
import { site } from '../data/site';

const careTypes = ['Home nursery (East London)', 'Babysitting (North London)', 'Nanny care (North London)', 'Not sure yet'] as const;
const times = ['Mornings', 'Afternoons', 'Evenings', 'Weekends', 'Full day', 'Flexible'] as const;

const schema = z.object({
  careType: z.enum(careTypes, { message: 'Please choose a type of care' }),
  children: z.coerce.number({ message: 'Enter a number' }).int().min(1, 'At least 1').max(10, 'Please use the message box for larger groups'),
  ages: z.string().trim().min(1, 'Tell us your children’s ages'),
  location: z.string().trim().min(2, 'A general area is enough, e.g. “Highbury”'),
  date: z.string().optional(),
  times: z.array(z.string()).default([]),
  name: z.string().trim().min(2, 'Please enter your name'),
  phone: z.string().trim().optional(),
  email: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { message: 'Please tick to confirm' }),
}).refine((d) => (d.phone && d.phone.length >= 7) || (d.email && /^\S+@\S+\.\S+$/.test(d.email)), { path: ['email'], message: 'Add a phone number or a valid email so we can reply' });

type In = z.input<typeof schema>;
type Out = z.output<typeof schema>;

function summary(d: Out) {
  return [`Care type: ${d.careType}`, `Children: ${d.children} (ages: ${d.ages})`, `Area: ${d.location}`, `Preferred date: ${d.date || 'not set'}`, `Preferred times: ${d.times.join(', ') || 'not set'}`, `Name: ${d.name}`, `Phone: ${d.phone || '-'}`, `Email: ${d.email || '-'}`, `Message: ${d.message || '-'}`].join('\n');
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<In, unknown, Out>({ resolver: zodResolver(schema), defaultValues: { times: [] } });
  const [result, setResult] = useState<null | { sent: boolean; text: string; error?: string }>(null);

  const onSubmit = async (d: Out) => {
    const text = summary(d);
    if (!site.formEndpoint) { setResult({ sent: false, text }); return; }
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
      if (!res.ok) throw new Error(String(res.status));
      setResult({ sent: true, text }); reset();
    } catch {
      setResult({ sent: false, text, error: 'Something went wrong sending your enquiry. Nothing has been lost; please try again shortly.' });
    }
  };
  const err = (k: keyof In) => errors[k]?.message as string | undefined;
  const inv = (k: keyof In) => (errors[k] ? true : undefined);

  return (
    <>
      <section className="page-head page-head--yellow">
        <div className="wrap">
          <h1><Words text="Get in touch" immediate /></h1>
          <p className="lead">Tell us about your family and the care you need. We’ll come back to you about availability.</p>
        </div>
      </section>
      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-side">
            <div className="info-list">
              <div className="info-card"><h3>Home nursery</h3><p>{site.nursery.showFullAddress ? `${site.nursery.address.line1}, ${site.nursery.address.area}, ${site.nursery.address.city} ${site.nursery.address.postcode}` : site.nursery.area}. {site.nursery.status}</p></div>
              <div className="info-card"><h3>Babysitting &amp; nannies</h3><p>{site.homeVisits.area}. {site.homeVisits.note}</p></div>
              <div className="info-card"><h3>Phone &amp; email</h3><p>Our contact details are being updated. Please use the enquiry form.</p></div>
            </div>
          </div>
          <div>
            <form className="form-card" onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Childcare enquiry">
              <div className="form-grid">
                <fieldset className="field">
                  <legend>Type of care</legend>
                  <div className="chips">
                    {careTypes.map((c) => (<label className="chip" key={c}><input type="radio" value={c} {...register('careType')} /><span>{c}</span></label>))}
                  </div>
                  {err('careType') && <span className="err" role="alert">{err('careType')}</span>}
                </fieldset>
                <div className="two">
                  <div className="field"><label htmlFor="children">Number of children</label><input id="children" className="input" type="number" inputMode="numeric" min={1} aria-invalid={inv('children')} {...register('children')} />{err('children') && <span className="err" role="alert">{err('children')}</span>}</div>
                  <div className="field"><label htmlFor="ages">Children’s ages</label><input id="ages" className="input" placeholder="e.g. 18 months and 4" aria-invalid={inv('ages')} {...register('ages')} />{err('ages') && <span className="err" role="alert">{err('ages')}</span>}</div>
                </div>
                <div className="two">
                  <div className="field"><label htmlFor="location">General location</label><input id="location" className="input" placeholder="Area or neighbourhood" aria-invalid={inv('location')} {...register('location')} />{err('location') && <span className="err" role="alert">{err('location')}</span>}</div>
                  <div className="field"><label htmlFor="date">Preferred start date</label><input id="date" className="input" type="date" {...register('date')} /></div>
                </div>
                <fieldset className="field">
                  <legend>Preferred times</legend>
                  <div className="chips">{times.map((t) => (<label className="chip" key={t}><input type="checkbox" value={t} {...register('times')} /><span>{t}</span></label>))}</div>
                </fieldset>
                <div className="field"><label htmlFor="name">Your name</label><input id="name" className="input" autoComplete="name" aria-invalid={inv('name')} {...register('name')} />{err('name') && <span className="err" role="alert">{err('name')}</span>}</div>
                <div className="two">
                  <div className="field"><label htmlFor="phone">Phone (optional)</label><input id="phone" className="input" type="tel" autoComplete="tel" {...register('phone')} /></div>
                  <div className="field"><label htmlFor="email">Email (optional)</label><input id="email" className="input" type="email" autoComplete="email" aria-invalid={inv('email')} {...register('email')} />{err('email') && <span className="err" role="alert">{err('email')}</span>}</div>
                </div>
                <div className="field"><label htmlFor="message">Message</label><textarea id="message" className="input" placeholder="Tell us anything that would help" {...register('message')} /></div>
                <div className="field">
                  <label className="chip" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '.9rem' }}>
                    <input type="checkbox" style={{ position: 'static', opacity: 1, width: 20, height: 20, marginTop: 2 }} {...register('consent')} />
                    <span style={{ border: 0, background: 'none', padding: 0, fontWeight: 500 }}>I agree that Kids Castle may use these details to reply to my enquiry.</span>
                  </label>
                  {err('consent') && <span className="err" role="alert">{err('consent')}</span>}
                </div>
                <div><button className="btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send enquiry'}<Arrow /></button></div>
                {result && (
                  <div className={`status ${result.sent ? 'ok' : ''}`} role="status">
                    {result.sent ? <strong>Thank you, your enquiry has been sent.</strong> : result.error ? <strong>{result.error}</strong> : <><strong>Preview only: this form is not connected yet, so nothing has been sent.</strong><span>A delivery address will be added once the verified contact details are confirmed. Your enquiry, ready to send:</span></>}
                    {!result.sent && <pre>{result.text}</pre>}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
