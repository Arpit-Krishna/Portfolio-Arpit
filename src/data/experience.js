export const experience = [
  {
    company: "Cars24",
    role: "Software Developer, Backend Systems",
    location: "Gurugram, India",
    start: "Aug 2025",
    end: "Present",
    current: true,
    summary:
      "Own backend services for challan payments and B2B insurance integrations, from design doc to staged rollout and on-call.",
    highlights: [
      "Built a Go challan fulfilment service solo that takes 3,000-4,000 requests a day from 4 portals and automates ~80% through a payment bot with idempotent HMAC webhooks.",
      "Shielded the external payment gateway with a 5-layer anti-flooding stack including cooldowns, daily caps and a circuit breaker, plus TAT-based SLA tracking at every stage.",
      "Rebuilt the Acko client integration after auditing request and response flows, taking success rate from 50-60% to 90%+.",
      "Kept latency under 3 seconds for Acko, Policybazaar, Paytm, Zoop and Go Digit workflows, and resolved P0 incidents in production.",
      "Led backend delivery of PRISM, an issue-reporting platform with dashboards and debugging tools for faster root-cause analysis.",
      "Mentored 3 interns and reviewed every Copilot and Claude generated change before it shipped.",
    ],
    tech: ["Go", "REST APIs", "HMAC Webhooks", "Caching", "Web Scraping", "Encryption", "Feature Flags"],
  },
  {
    company: "Pranveer Singh Institute of Technology",
    role: "B.Tech, Computer Science and Artificial Intelligence",
    location: "Kanpur, India",
    start: "Graduated",
    end: "2025",
    current: false,
    summary:
      "CGPA 7.76 / 10. Qualified GATE in both 2024 and 2025 while building Hal-Jivi, Medi-Vault and other projects.",
    highlights: [],
    tech: ["DSA", "System Design", "Machine Learning", "OOP"],
  },
];
