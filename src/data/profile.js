// Single source of truth for personal details. Edit here to customise the site.
export const profile = {
  name: "Arpit Krishna",
  firstName: "Arpit",
  headline: "Software Engineer, Backend Systems",
  roles: [
    "Backend Engineer",
    "Full-Stack Developer",
    "Distributed Systems Builder",
    "API Integration Engineer",
  ],
  intro:
    "I build payment and integration backends in Go that stay calm when upstream systems do not. At Cars24 I work on challan payments and partner integrations, and outside work I ship full-stack side projects in React and Spring Boot.",
  location: "Gurugram, India",
  email: "krishnaarpit930@gmail.com",
  resume: "/Arpit_Krishna_Resume.pdf",
  current: {
    company: "Cars24",
    role: "Software Developer, Backend Systems",
    since: "2025-08-01",
  },
  site: "https://portfolio-fs-sde.vercel.app",
  githubUser: "Arpit-Krishna",
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/Arpit-Krishna" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/arpit-krishna-028107209" },
    { id: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/ArpitKrishna98" },
  ],
  responseTime: "I read and answer every message myself.",
};

// Personal highlights only. Work numbers live in src/data/experience.js.
export const stats = [
  { value: 1852, prefix: "AIR ", suffix: "", display: "AIR 1852", label: "GATE 2025 in CS and IT, after AIR 3234 in 2024" },
  { value: 5, prefix: "top ", suffix: "%", label: "LeetCode Knight badge, ranked globally" },
  { value: 6, prefix: "", suffix: " star", label: "HackerRank problem solving, plus 5 stars in Python and C++" },
  { value: 3, prefix: "", suffix: "", label: "personal and academic projects shipped end to end" },
];

export const achievements = [
  { title: "GATE 2025, AIR 1852", detail: "Also qualified GATE 2024 with AIR 3234 in CS and IT." },
  { title: "LeetCode Knight", detail: "Top 5% globally. HackerRank 6-star problem solving, 5-star Python and C++." },
  { title: "GFG Hackathon", detail: "Regional qualifier, run with Google Cloud and AMD." },
  { title: "TCS iON NQT", detail: "90%+ in IT and psychometric assessments." },
];

export const certifications = [
  "JP Morgan Chase Software Engineering Simulation (Forage)",
  "AWS APAC Solutions Architecture (Forage)",
  "DSA using Python and OOP in Python (Infosys Springboard)",
  "NLP Embeddings (Hasso Plattner Institute)",
  "Responsive Web Design (freeCodeCamp)",
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "open-source", label: "GitHub" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
