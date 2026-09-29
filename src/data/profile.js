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
    "I build payment and integration backends in Go that stay calm when upstream systems do not. At Cars24 I run a challan fulfilment service that handles 3,000 to 4,000 requests a day, and I ship full-stack side projects in React and Spring Boot.",
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
  responseTime: "I usually reply within one or two working days.",
};

export const stats = [
  { value: 4000, prefix: "", suffix: "", display: "3-4k", label: "payment requests a day through a service I built solo" },
  { value: 80, prefix: "~", suffix: "%", label: "of those payments settled by an automated bot" },
  { value: 90, prefix: "", suffix: "%+", label: "Acko integration success rate, up from 50-60%" },
  { value: 3, prefix: "<", suffix: "s", label: "API latency held for SLA-bound B2B partners" },
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
