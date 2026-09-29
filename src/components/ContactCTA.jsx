import { useState } from "react";
import { useForm } from "@formspree/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Clock } from "@phosphor-icons/react";
import { profile } from "../data/profile";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import ScrambleText from "./ScrambleText";
import SocialIcon from "./SocialIcon";

// Formspree form id carried over from the previous site.
const FORMSPREE_ID = "xpwldayp";

const inquiries = [
  {
    id: "full-time",
    label: "Full-time",
    copy: "Hiring for a backend or full-stack role? Tell me about the team, the stack and the problems on the roadmap.",
    placeholder: "the role, the team and what they are building",
  },
  {
    id: "freelance",
    label: "Freelance",
    copy: "Need an API, an integration or a full-stack MVP built? Share the scope and timeline and I will reply with an approach.",
    placeholder: "what you need built, rough scope and timeline",
  },
  {
    id: "consulting",
    label: "Consulting",
    copy: "Stuck on flaky third-party APIs, retries or duplicate payments? I can review the design and suggest fixes.",
    placeholder: "the system, what is going wrong and what you have tried",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "name is required";
  if (!values.email.trim()) errors.email = "email is required so I can reply";
  else if (!emailPattern.test(values.email.trim())) errors.email = "that email address looks incomplete";
  if (values.message.trim().length < 20) errors.message = "message needs at least 20 characters";
  return errors;
}

// One prompt line of the terminal form: "? name ›" followed by a borderless input.
function Field({ id, label, error, children, multiline = false }) {
  return (
    <div className="group">
      <div
        className={`flex gap-3 border-b border-dashed pb-2 transition-colors duration-300 ${
          error ? "border-danger/60" : "border-white/[0.12] focus-within:border-accent/70"
        } ${multiline ? "flex-col" : "items-center"}`}
      >
        <label htmlFor={id} className="flex shrink-0 items-center gap-2 font-mono text-sm">
          <span className={error ? "text-danger" : "text-accent"}>?</span>
          <span className="text-zinc-300">{label}</span>
          <span className="text-zinc-600 transition-colors group-focus-within:text-accent">›</span>
        </label>
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 font-mono text-xs text-danger" role="alert">
          error: {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full min-w-0 bg-transparent font-mono text-[15px] text-zinc-100 caret-accent placeholder:text-zinc-600 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0";

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

  const serverError = state.errors && !state.succeeded;

  return (
    <section id="contact" aria-labelledby="contact-title" className="shell py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">06</span>
            <span className="h-px w-8 bg-white/15" aria-hidden="true" />
            <ScrambleText text="Contact" />
          </p>
          <h2 id="contact-title" className="mt-4 text-3xl font-medium leading-[1.05] tracking-tighter text-zinc-50 md:text-5xl">
            <SplitWords text="Interested in working together?" />
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
                  className={`relative whitespace-nowrap rounded-full px-3 py-2 font-mono text-[12px] sm:px-4 sm:text-[13px] transition-colors ${
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
                  <span className="relative">--{q.id}</span>
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

        <Reveal delay={0.1} className="panel overflow-hidden lg:col-span-7">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-warn/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" aria-hidden="true" />
            <span className="ml-3 font-mono text-[11px] text-zinc-500">mail / ~/arpit</span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
              <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-accent" aria-hidden="true" />
              inbox open
            </span>
          </div>

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              {state.succeeded ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[360px] flex-col justify-center space-y-2 font-mono text-sm"
                  role="status"
                >
                  <p>
                    <span className="text-accent">$</span> <span className="text-zinc-100">mail arpit --type {inquiry.id}</span>
                  </p>
                  <p className="text-zinc-500">connecting to inbox... done</p>
                  <p className="text-zinc-500">sending... done</p>
                  <p className="text-accent">200 OK: message delivered</p>
                  <p className="pt-4 font-sans text-2xl font-medium tracking-tight text-zinc-50">Thanks, {values.name.split(" ")[0] || "friend"}.</p>
                  <p className="font-sans text-zinc-400">{profile.responseTime}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate className="flex flex-col gap-7" exit={{ opacity: 0 }}>
                  <input type="hidden" name="inquiry" value={inquiry.label} />
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  <p className="font-mono text-sm text-zinc-500">
                    <span className="text-accent">$</span> <span className="text-zinc-100">mail arpit --type {inquiry.id}</span>
                    <span className="mt-1 block text-zinc-600"># fill in the prompts below, then press enter or send</span>
                  </p>

                  <Field id="contact-name" label="name" error={errors.name}>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={onChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      placeholder="your name"
                      className={inputClass}
                    />
                  </Field>
                  <Field id="contact-email" label="email" error={errors.email}>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={onChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      placeholder="where I can reply"
                      className={inputClass}
                    />
                  </Field>
                  <Field id="contact-message" label="message" error={errors.message} multiline>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={onChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) e.currentTarget.form?.requestSubmit();
                      }}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      placeholder={inquiry.placeholder}
                      className={`${inputClass} resize-y leading-relaxed`}
                    />
                  </Field>

                  {serverError && (
                    <p className="font-mono text-sm text-danger" role="alert">
                      error: the message did not go through. Try again, or email {profile.email}.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="font-mono text-xs text-zinc-600"># goes straight to my inbox, no newsletters</p>
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="group inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-2.5 font-mono text-sm text-accent transition-all duration-300 hover:bg-accent hover:text-ink-950 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
                    >
                      <span aria-hidden="true">$</span>
                      {state.submitting ? (
                        <>
                          sending
                          <span className="inline-block w-4 animate-blink" aria-hidden="true">_</span>
                        </>
                      ) : (
                        <>
                          send --to arpit
                          <span className="text-[11px] opacity-60 group-hover:opacity-80" aria-hidden="true">
                            ↵
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
