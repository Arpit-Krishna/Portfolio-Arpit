import { useState } from "react";
import { useForm } from "@formspree/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, EnvelopeSimple, PaperPlaneTilt, WarningCircle, Clock } from "@phosphor-icons/react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import SocialIcon from "./SocialIcon";

// Formspree form id carried over from the previous site.
const FORMSPREE_ID = "xpwldayp";

const inquiries = [
  {
    id: "full-time",
    label: "Full-time",
    copy: "Hiring for a backend or full-stack role? Tell me about the team, the stack and the problems on the roadmap.",
    placeholder: "We're hiring a backend engineer to own our payments integrations...",
  },
  {
    id: "freelance",
    label: "Freelance",
    copy: "Need an API, an integration or a full-stack MVP built? Share the scope and timeline and I will reply with an approach.",
    placeholder: "We need a Spring Boot API and React dashboard for...",
  },
  {
    id: "consulting",
    label: "Consulting",
    copy: "Stuck on flaky third-party APIs, retries or duplicate payments? I can review the design and suggest fixes.",
    placeholder: "Our webhook handler sometimes double-processes events when...",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) errors.email = "Please add an email so I can reply.";
  else if (!emailPattern.test(values.email.trim())) errors.email = "That email address looks incomplete.";
  if (values.message.trim().length < 20) errors.message = "A little more detail helps. At least 20 characters.";
  return errors;
}

function Field({ id, label, helper, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm text-zinc-300">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-rose-300" role="alert">
          <WarningCircle size={14} aria-hidden="true" />
          {error}
        </p>
      ) : (
        helper && (
          <p id={`${id}-help`} className="text-xs text-zinc-600">
            {helper}
          </p>
        )
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border bg-ink-950 px-4 py-3 text-[15px] text-zinc-100 placeholder:text-zinc-600 transition-colors duration-300 focus:outline-none focus:ring-0 focus-visible:ring-0";

export default function ContactCTA() {
  const [state, submitToFormspree] = useForm(FORMSPREE_ID);
  const [inquiry, setInquiry] = useState(inquiries[0]);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    submitToFormspree(e);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const borderFor = (field) =>
    errors[field] ? "border-rose-400/60" : "border-white/[0.08] hover:border-white/15 focus:border-accent/60";

  const serverError = state.errors && !state.succeeded;

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-white/15" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="mt-4 text-3xl font-medium leading-[1.05] tracking-tighter text-zinc-50 md:text-5xl">
            Interested in working together?
          </h2>

          <div className="mt-8" role="radiogroup" aria-label="What are you reaching out about?">
            <div className="flex w-fit gap-1 rounded-full border border-white/[0.07] bg-ink-900 p-1">
              {inquiries.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  role="radio"
                  aria-checked={inquiry.id === q.id}
                  onClick={() => setInquiry(q)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    inquiry.id === q.id ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  {inquiry.id === q.id && (
                    <motion.span
                      layoutId="inquiry-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{q.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={inquiry.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-5 max-w-[46ch] leading-relaxed text-zinc-400"
                aria-live="polite"
              >
                {inquiry.copy}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-10 border-t border-white/[0.06] pt-8">
            <p className="eyebrow">Email me directly</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-xl text-zinc-50 underline decoration-white/15 underline-offset-[6px] transition-colors hover:decoration-accent md:text-2xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100 active:scale-[0.97]"
                aria-live="polite"
              >
                {copied ? <Check size={13} className="text-accent" aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
              <Clock size={15} aria-hidden="true" />
              {profile.responseTime}
            </p>
            <ul className="mt-6 flex gap-2" aria-label="Social profiles">
              {profile.socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <SocialIcon id={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="panel p-6 md:p-10 lg:col-span-7">
          <AnimatePresence mode="wait">
            {state.succeeded ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[420px] flex-col items-start justify-center"
                role="status"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <Check size={22} weight="bold" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-medium tracking-tight text-zinc-50">Message sent. Thank you.</h3>
                <p className="mt-2 max-w-[44ch] leading-relaxed text-zinc-400">
                  It landed in my inbox. {profile.responseTime}
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} noValidate className="flex flex-col gap-6" exit={{ opacity: 0 }}>
                <input type="hidden" name="inquiry" value={inquiry.label} />
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="contact-name" label="Name" error={errors.name}>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={onChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      placeholder="Meera Raghavan"
                      className={`${inputClass} ${borderFor("name")}`}
                    />
                  </Field>
                  <Field id="contact-email" label="Email" error={errors.email}>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={onChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      placeholder="meera@studio.dev"
                      className={`${inputClass} ${borderFor("email")}`}
                    />
                  </Field>
                </div>

                <Field id="contact-message" label="Message" helper={`About a ${inquiry.label.toLowerCase()} opportunity.`} error={errors.message}>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={onChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : "contact-message-help"}
                    placeholder={inquiry.placeholder}
                    className={`${inputClass} resize-y ${borderFor("message")}`}
                  />
                </Field>

                {serverError && (
                  <p className="flex items-start gap-2 rounded-2xl border border-rose-400/30 bg-rose-400/[0.06] px-4 py-3 text-sm text-rose-200" role="alert">
                    <WarningCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                    The message did not go through. Please try again, or email me at {profile.email}.
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="flex items-center gap-2 text-xs text-zinc-600">
                    <EnvelopeSimple size={14} aria-hidden="true" />
                    Goes straight to my inbox. No newsletters.
                  </p>
                  <MagneticButton type="submit" disabled={state.submitting} strength={0.18}>
                    {state.submitting ? (
                      <>
                        <span className="relative h-2 w-10 overflow-hidden rounded-full bg-ink-950/20" aria-hidden="true">
                          <span className="absolute inset-0 animate-shimmer bg-ink-950/50" />
                        </span>
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <PaperPlaneTilt size={16} aria-hidden="true" />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
