'use client';

import { useId, useState, type FormEvent } from 'react';

import { Action } from '@/components/ui/Action';
import { Reveal } from '@/components/ui/Reveal';
import { CONTACT, SITE_URL, type Locale } from '@/i18n/config';
import type { Dict } from '@/i18n/dictionaries';
import { cn } from '@/lib/cn';
import { sendForm } from '@/lib/sendForm';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * The reply slip at the foot of the dossier.
 *
 * Set as a printed form is set: a tracked label over a ruled line, no boxes, no fills,
 * no placeholder text standing in for a label. The rule under each field is the same
 * hairline as everywhere else on the plate and thickens to the signal colour on focus,
 * so the affordance is the document's own vocabulary rather than an input widget
 * borrowed from somewhere else.
 *
 * It is a real `<form>` with a real `action`, so it still posts without JavaScript;
 * `_next` sends those readers back to this chapter. With JavaScript the submit is
 * intercepted and relayed over fetch, which keeps the reader on the page.
 */
export function ContactForm({ dict, locale }: { dict: Dict; locale: Locale }) {
  const copy = dict.contact.form;
  const uid = useId();
  const [status, setStatus] = useState<Status>('idle');

  const field = (name: string) => `${uid}-${name}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    /* FormSubmit's own honeypot. A bot fills every input it finds; a reader cannot
       see this one, so anything in it is not a reader. */
    if (String(data.get('_honey') ?? '')) {
      setStatus('sent');
      form.reset();
      return;
    }

    setStatus('sending');

    const ok = await sendForm(CONTACT.email, {
      _subject: copy.subject,
      [copy.nameLabel]: String(data.get('name') ?? ''),
      [copy.companyLabel]: String(data.get('company') ?? ''),
      [copy.emailLabel]: String(data.get('email') ?? ''),
      [copy.messageLabel]: String(data.get('message') ?? ''),
    });

    setStatus(ok ? 'sent' : 'error');
    if (ok) form.reset();
  }

  const line =
    'w-full border-0 border-b border-[color:var(--hairline)] bg-transparent pb-2.5 pt-1 ' +
    'text-body text-bone outline-none transition-colors duration-300 ease-out-expo ' +
    'placeholder:text-bone-3 hover:border-[color:var(--color-pine-line)] ' +
    'focus:border-[color:var(--signal)] focus-visible:outline-none';

  return (
    <Reveal delay={110} className="mt-12">
      <form
        action={`https://formsubmit.co/${CONTACT.email}`}
        method="POST"
        onSubmit={handleSubmit}
        noValidate={false}
      >
        <p className="label border-t border-[color:var(--hairline)] pt-4">{copy.legend}</p>

        {/* No-JS path. FormSubmit reads these and returns the reader to this chapter. */}
        <input type="hidden" name="_subject" value={copy.subject} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_next" value={`${SITE_URL}/${locale}/#contact`} />
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <Field id={field('name')} name="name" label={copy.nameLabel} required>
            <input
              id={field('name')}
              name="name"
              type="text"
              required
              autoComplete="name"
              className={line}
            />
          </Field>

          <Field id={field('company')} name="company" label={copy.companyLabel}>
            <input
              id={field('company')}
              name="company"
              type="text"
              autoComplete="organization"
              className={line}
            />
          </Field>

          <Field
            id={field('email')}
            name="email"
            label={copy.emailLabel}
            required
            className="sm:col-span-2"
          >
            <input
              id={field('email')}
              name="email"
              type="email"
              required
              autoComplete="email"
              dir="ltr"
              className={cn(line, 'ltr')}
            />
          </Field>

          <Field
            id={field('message')}
            name="message"
            label={copy.messageLabel}
            required
            className="sm:col-span-2"
          >
            <textarea
              id={field('message')}
              name="message"
              rows={3}
              required
              className={cn(line, 'resize-y leading-relaxed')}
            />
          </Field>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Action type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? copy.sending : copy.submit}
          </Action>

          {/* One line, announced when it changes, never a layout jump. */}
          <p aria-live="polite" className="measure-tight text-small text-bone-2">
            {status === 'sent' && copy.sent}
            {status === 'error' && (
              <span className="text-[color:var(--signal)]">{copy.error}</span>
            )}
          </p>
        </div>
      </form>
    </Reveal>
  );
}

function Field({
  id,
  label,
  required,
  className,
  children,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label mb-2 block">
        {label}
        {required && (
          <span aria-hidden="true" className="ms-1 text-[color:var(--signal)]">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
