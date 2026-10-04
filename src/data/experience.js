export const experience = [
  {
    company: "Cars24",
    role: "Software Developer, Backend Systems",
    location: "Gurugram, India",
    start: "Aug 2025",
    end: "Present",
    current: true,
    summary:
      "Own backend services for B2B partner integrations and vehicle data orchestration, from design doc to staged rollout and on-call.",
    highlights: [
      "Worked on a config-driven orchestration engine that fans each request out to multiple upstream data providers in parallel (lightweight virtual threads, deadline-based timeouts), merges results by priority and validates required fields into one unified response for B2B partners.",
      "Helped make partner onboarding a config change rather than a code change: per-partner rule sets define provider priority, parallel vs. fallback steps, timeouts, rollout percentages, rate limits and mandatory fields.",
      "Contributed to the resilience layer around provider calls: circuit breakers, failure thresholds, per-partner rate limits and daily quotas, gradual rollouts and fallback through backup steps.",
      "Worked on cross-provider caching in Redis, where a cached result from a higher-priority provider can serve lower-priority requests, cutting live upstream calls and cost.",
      "Rebuilt the Acko client integration after auditing request and response flows, taking success rate from 50-60% to 90%+.",
      "Kept latency under 3 seconds for Acko, Policybazaar, Paytm, Zoop and Go Digit workflows, and resolved P0 incidents in production.",
      "Led backend delivery of PRISM, an issue-reporting platform with dashboards and debugging tools for faster root-cause analysis.",
      "Mentored 3 interns and reviewed every Copilot and Claude generated change before it shipped.",
    ],
    tech: ["Java", "Virtual Threads", "CompletableFuture", "Redis", "MongoDB", "Resilience4j", "Elasticsearch", "AWS Athena", "Feature Flags"],
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
