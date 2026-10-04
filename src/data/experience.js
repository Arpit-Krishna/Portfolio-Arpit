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
      "Built the Partner Config Parser, a config-driven engine that fans each vehicle RC lookup out to multiple upstream sources in parallel on Java virtual threads, merges results by source priority and validates partner-specific mandatory fields.",
      "Moved source order, parallel vs serial grouping, timeouts, rollout and rate limits into per-partner JSON ladders, so onboarding a B2B partner or reshuffling sources needs a config change, not a deploy.",
      "Added a Redis advance cache that lets a cached higher-priority source answer a lower-priority request, cutting live upstream calls.",
      "Layered graceful degradation with Resilience4j circuit breakers, per-vehicle failure thresholds, rate limits and fallback ladder steps, with every source call logged async to Athena and Elasticsearch.",
      "Rebuilt the Acko client integration after auditing request and response flows, fixing the failure paths that were dragging down its success rate.",
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
