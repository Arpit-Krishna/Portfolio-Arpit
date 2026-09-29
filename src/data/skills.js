// Skills straight from the resume. `icon` keys map to entries in components/SkillIcon.jsx.
export const skillGroups = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Go", icon: "go" },
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "C++", icon: "cpp" },
      { name: "C", icon: "c" },
      { name: "JavaScript", icon: "javascript" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Gin", icon: "gin" },
      { name: "Spring Boot", icon: "springboot" },
      { name: "Spring Security", icon: "springsecurity" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Django", icon: "django" },
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "Hono", icon: "hono" },
      { name: "Kafka", icon: "kafka" },
      { name: "JWT", icon: "jwt" },
      { name: "JUnit", icon: "junit" },
      { name: "Maven", icon: "maven" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Vite", icon: "vite" },
      { name: "Chart.js", icon: "chartjs" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "PWA", icon: "pwa" },
    ],
  },
  {
    id: "data-infra",
    label: "Data and DevOps",
    items: [
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB Atlas", icon: "mongodb" },
      { name: "DocumentDB", icon: "documentdb" },
      { name: "Valkey / Redis", icon: "redis" },
      { name: "Prisma", icon: "prisma" },
      { name: "AWS SQS / S3", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "Linux", icon: "linux" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Vercel", icon: "vercel" },
      { name: "Cloudflare Workers", icon: "cloudflare" },
    ],
  },
  {
    id: "ml",
    label: "ML and Data",
    items: [
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Scikit-learn", icon: "sklearn" },
      { name: "OpenCV", icon: "opencv" },
    ],
  },
];

export const coreConcepts = [
  "Distributed Systems",
  "System Design",
  "Idempotency",
  "Caching",
  "Deduplication",
  "Circuit Breakers",
  "Encryption",
  "Web Scraping",
  "Root-Cause Analysis",
  "Data Structures and Algorithms",
];

// Layers used by the stack visualisation in the About section.
export const stackLayers = [
  { layer: "Client", items: ["React", "Tailwind", "PWA offline sync", "Chart.js"] },
  { layer: "API", items: ["Go + Gin", "Spring Boot", "FastAPI", "Hono on Workers"] },
  { layer: "Messaging", items: ["Kafka", "AWS SQS", "HMAC webhooks", "Schedulers"] },
  { layer: "Data", items: ["PostgreSQL", "MongoDB", "Valkey", "Prisma"] },
  { layer: "Runtime", items: ["Docker", "GitHub Actions", "Vercel", "Render"] },
];
