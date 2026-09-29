# Arpit Krishna — Developer Portfolio

Live: https://portfolio-fs-sde.vercel.app

A dark, terminal-flavoured portfolio built with **Vite + React 18**, **Tailwind CSS 3**, **Framer Motion** and **React Router**. Content comes from my resume and lives in plain data files, so updating the site rarely means touching components.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where things live

```
src/
  data/            <- edit these to customise the site
    profile.js     name, roles for the typing effect, intro, links, stats, achievements
    projects.js    featured projects + full case-study content, other public repos
    skills.js      skill groups (icon grid), core concepts, stack layers
    experience.js  timeline entries
  components/
    Hero.jsx               split hero, typing roles, magnetic CTAs, terminal
    ProjectGrid.jsx        asymmetric grid of ProjectCard
    ProjectCard.jsx        reusable card: visual on top, content below, hover lift
    CaseStudyPreview.jsx   teaser linking to another case study
    SkillsCloud.jsx        filterable icon grid (no progress bars)
    ExperienceTimeline.jsx vertical timeline, line fills on scroll
    ContactCTA.jsx         inquiry type switcher + validated Formspree form
    ...                    small leaf components (TerminalCard, TypingRoles, CountUp, Marquee, etc.)
  pages/
    Home.jsx, CaseStudy.jsx (/work/:slug), NotFound.jsx
```

## Implementation notes

- **Reusable project cards.** `ProjectCard` takes one entry from `projects.js`. `visual.kind` picks the image: `image` (a screenshot URL), `terminal` (scripted log lines) or `budget` (a drawn UI mock). Set `repo: "owner/name"` to show a live GitHub star count; leave it `null` for private work.
- **Case-study routing.** Every project gets `/work/<slug>` from the same data entry, lazy-loaded with `React.lazy`. `vercel.json` rewrites all paths to `index.html` so deep links work on refresh. Unknown slugs render a 404 state.
- **Image optimisation.** The portrait is a 16 KB WebP (down from a 290 KB PNG), the 2.2 MB background image is gone, and all images use `loading="lazy"`, `decoding="async"` and fixed aspect ratios to avoid layout shift. Broken screenshots fall back to an inline error state.
- **Metadata.** `index.html` carries the description, keywords, Open Graph, Twitter card and a JSON-LD `Person` record. `usePageMeta` updates the title and description per route. `public/sitemap.xml` and `robots.txt` are included; add a new case study to the sitemap when you add a project.
- **Motion.** Framer Motion springs everywhere, `MotionConfig reducedMotion="user"` respects the OS setting, and perpetual animations (typing, terminal, marquee) are isolated memoised leaf components so they never re-render the page.
- **Accessibility.** Skip link, semantic sections with `aria-labelledby`, keyboard-operable tabs (arrow keys), Escape closes the mobile menu, visible focus rings, labels above inputs with inline errors.
- **Contact form.** Posts to Formspree form `xpwldayp` (the same one the old site used) with client-side validation, loading, success and error states.

## Themes and interactions

- **Themes.** Four palettes live in `src/themes.css` (Terminal, Amber CRT, Deep Ocean, Paper). Every Tailwind colour reads a CSS variable, so a theme is just a new `[data-theme]` block plus an entry in `src/data/themes.js`. The choice persists in `localStorage`, an inline script in `index.html` applies it before first paint, and switching uses a View Transitions circular reveal where supported.
- **Interactive terminal.** `CommandConsole` opens with Ctrl/Cmd+K, `/` or the nav button. It supports `help`, `projects`, `open <slug>`, `cd <section>`, `theme <name>`, `resume`, `contact`, tab completion and history. Press `t` anywhere to cycle themes.
- **Text motion.** `ScrambleText` decodes labels on view and on hover, `SplitWords` raises headings word by word, `ScrollLitText` lights a statement as you scroll, and the name in the hero drops in letter by letter. The marquee reacts to scroll speed and direction.
- **Boot screen.** `BootSequence` plays once per browser session on the home page and skips on any key, click, or reduced-motion setting.

## Deploy

Vercel picks up the Vite preset automatically (`npm run build`, output `dist`). Pushing to `main` deploys production; every PR gets a preview URL.
