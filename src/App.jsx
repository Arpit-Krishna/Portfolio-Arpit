import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));

// Scrolls to #hash targets on navigation, or to the top for new pages.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function CaseStudyFallback() {
  return (
    <div className="mx-auto max-w-shell px-4 pt-36 sm:px-6" aria-busy="true" aria-label="Loading case study">
      <div className="skeleton h-4 w-32 rounded-full" />
      <div className="skeleton mt-6 h-12 w-3/4 max-w-xl rounded-2xl" />
      <div className="skeleton mt-4 h-5 w-full max-w-2xl rounded-full" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-24 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 100, damping: 20 }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Nav />
      <main id="main">
        <Suspense fallback={<CaseStudyFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <div aria-hidden="true" className="grain" />
    </MotionConfig>
  );
}
