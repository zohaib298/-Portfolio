"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SocialRow from "@/components/SocialRow";
import { submitContactForm, type ContactFormState } from "@/lib/actions";

const inputClasses =
  "w-full rounded-xl bg-surface/80 px-4 py-3 text-sm text-ink placeholder:text-muted/70 ring-1 ring-line-strong outline-none transition-shadow focus:ring-2 focus:ring-accent";

const errorInputClasses = "ring-2 ring-red-500/70 focus:ring-red-500/70";

const initialState: ContactFormState = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 self-start rounded-full bg-accent-strong px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-glow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
    >
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <Reveal className="max-w-2xl">
        <SectionHeading eyebrow="Contact" title="Let's build something together" number="04" />
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          Have a project in mind? Send a few details and I&apos;ll get back
          to you shortly.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 max-w-xl">
        {state.success ? (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl bg-surface/80 p-6 ring-1 ring-line-strong"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
            <p className="text-sm leading-relaxed text-ink">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} noValidate className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                aria-invalid={!!state.errors?.name}
                aria-describedby={state.errors?.name ? "name-error" : undefined}
                className={`${inputClasses} ${state.errors?.name ? errorInputClasses : ""}`}
              />
              {state.errors?.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                  {state.errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!state.errors?.email}
                aria-describedby={state.errors?.email ? "email-error" : undefined}
                className={`${inputClasses} ${state.errors?.email ? errorInputClasses : ""}`}
              />
              {state.errors?.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!state.errors?.message}
                aria-describedby={state.errors?.message ? "message-error" : undefined}
                className={`${inputClasses} resize-none ${state.errors?.message ? errorInputClasses : ""}`}
              />
              {state.errors?.message && (
                <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                  {state.errors.message}
                </p>
              )}
            </div>

            {state.message && !state.success && (
              <p role="alert" className="text-sm text-red-400">
                {state.message}
              </p>
            )}

            <SubmitButton />
          </form>
        )}

        <SocialRow className="mt-10" />
      </Reveal>
    </section>
  );
}
