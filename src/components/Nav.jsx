import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { List, X, DownloadSimple } from "@phosphor-icons/react";
import { navLinks, profile } from "../data/profile";

// Tracks which home-page section is on screen so the nav can highlight it.
function useActiveSection(enabled) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((current) => (current === entry.target.id ? null : current));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);
  return active;
}

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(pathname === "/");
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div id="top-sentinel" className="absolute top-0 h-4 w-full" aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-shell items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 sm:px-4 ${
            scrolled || open
              ? "border-white/[0.08] bg-ink-900/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link to="/" className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3" aria-label="Arpit Krishna, home">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 font-mono text-sm text-accent ring-1 ring-accent/25">
              ak
            </span>
            <span className="font-mono text-sm text-zinc-300 transition-colors group-hover:text-white">
              arpit<span className="text-accent">.</span>dev
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <Link
                  to={`/#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`relative z-10 block rounded-full px-3.5 py-2 text-sm transition-colors ${
                    active === link.id ? "text-white" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-200 transition-colors hover:border-accent/40 hover:text-white active:scale-[0.98] sm:inline-flex"
            >
              <DownloadSimple size={16} aria-hidden="true" />
              Resume
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-200 active:scale-[0.96] lg:hidden"
            >
              {open ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto mt-2 max-w-shell rounded-[1.75rem] border border-white/[0.08] bg-ink-900/95 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                className="flex flex-col"
              >
                {navLinks.map((link, i) => (
                  <motion.li key={link.id} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      to={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg text-zinc-200 hover:bg-white/[0.04]"
                    >
                      {link.label}
                      <span className="font-mono text-xs text-zinc-600">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                  <a
                    href={profile.resume}
                    download
                    className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3.5 font-medium text-ink-950"
                  >
                    <DownloadSimple size={18} aria-hidden="true" />
                    Download resume
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
