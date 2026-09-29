// Featured projects and their case studies. Each entry renders a card on the
// home page and a full page at /work/:slug. `repo` (owner/name) enables the
// live GitHub star count; leave it null for private work.
export const projects = [
  {
    slug: "challan-payments",
    title: "Challan Payment Fulfilment",
    org: "Cars24",
    period: "2025 - Present",
    tagline: "A Go service that pays traffic challans on autopilot without flooding the gateway.",
    description:
      "Solo-built backend that collects challan payment requests from four portals, pays them through a bot, and tracks every stage against an SLA.",
    outcome: "~80% of 3,000-4,000 daily requests now settle without a human touching them.",
    stack: ["Go", "REST APIs", "HMAC Webhooks", "Circuit Breaker", "Idempotency"],
    repo: null,
    github: null,
    live: null,
    visibility: "Internal system",
    visual: {
      kind: "terminal",
      title: "challan-svc / logs",
      lines: [
        { t: "dim", v: "12:04:11  intake   portal=3  req=ch_81f2  queued" },
        { t: "dim", v: "12:04:11  idem     key=ch_81f2  first-seen" },
        { t: "ok", v: "12:04:12  bot      paid  amount=2000  tat=1.4s" },
        { t: "dim", v: "12:04:12  webhook  hmac=valid  status=settled" },
        { t: "warn", v: "12:04:19  guard    cooldown  gateway=busy  retry=+30s" },
        { t: "ok", v: "12:04:49  bot      paid  amount=500  tat=0.9s" },
      ],
    },
    metrics: [
      { value: "3-4k", label: "requests a day" },
      { value: "~80%", label: "automated" },
      { value: "4", label: "source portals" },
      { value: "5", label: "anti-flood layers" },
    ],
    caseStudy: {
      problem:
        "Traffic challans for cars in the Cars24 pipeline arrived from four different portals and had to be paid before a vehicle could move forward. Paying them by hand was slow, hard to audit, and every delay pushed a car further from sale. The external payment gateway was also fragile: a burst of retries could knock it over for everyone.",
      users:
        "Operations teams waiting on cleared vehicles, and downstream services that need a trustworthy paid or failed status for every challan.",
      constraints: [
        "Built and owned by one engineer, so the design had to be simple enough to operate alone.",
        "A payment must never go out twice, even when a portal resends or a webhook is delivered again.",
        "The gateway is shared and rate sensitive, so the service had to protect it from its own retries.",
        "Every lifecycle stage needed a turnaround-time budget so SLA breaches show up before customers notice.",
      ],
      tradeoffs: [
        {
          chose: "Idempotency keys plus HMAC-signed webhooks",
          over: "Polling the gateway for status",
          why: "Webhooks give near-instant settlement, and HMAC verification with idempotent handlers makes duplicate deliveries harmless.",
        },
        {
          chose: "Layered guards (cooldowns, daily caps, circuit breaker)",
          over: "A single global rate limit",
          why: "Different failure modes need different brakes. A circuit breaker stops cascades, while caps and cooldowns keep steady load predictable.",
        },
        {
          chose: "Staged rollout behind feature flags",
          over: "One big switch-over",
          why: "Portals were moved one at a time with a rollback plan, so a bad day on one portal never blocked the others.",
        },
      ],
      architecture: {
        caption: "Simplified request flow. Internal names are omitted.",
        nodes: [
          { label: "4 portals", sub: "challan intake" },
          { label: "Intake API", sub: "validate + dedupe" },
          { label: "Payment bot", sub: "idempotent jobs" },
          { label: "Flood guard", sub: "5 layers" },
          { label: "Gateway", sub: "external" },
          { label: "Webhook", sub: "HMAC verified" },
          { label: "TAT tracker", sub: "SLA per stage" },
        ],
      },
      states: [
        { label: "Queued", note: "Request accepted and deduplicated by challan id." },
        { label: "Cooling down", note: "Guard paused calls after gateway stress, with a scheduled retry." },
        { label: "Settled", note: "Signed webhook confirmed payment and closed the TAT clock." },
        { label: "Escalated", note: "SLA budget exceeded, surfaced for manual follow-up." },
      ],
      results: [
        "Roughly 80% of 3,000-4,000 daily requests are now paid automatically.",
        "Gateway overload no longer cascades into the rest of the payment flow.",
        "TAT tracking at every stage makes SLA risk visible before it becomes an incident.",
      ],
      lessons: [
        "Idempotency is a product feature, not a database detail. Designing for duplicate delivery up front removed a whole class of incidents.",
        "Writing the design doc first, with explicit downstream impact, made solo ownership sustainable.",
      ],
    },
  },
  {
    slug: "expensify",
    title: "Expensify",
    org: "Personal project",
    period: "2025",
    tagline: "An installable expense tracker with budgets, overspending alerts and offline sync.",
    description:
      "Full-stack PWA with category budgets. Expenses logged offline queue up and sync on reconnect, and recurring bills post themselves.",
    outcome: "Rent, EMI and bills post exactly once, even when the scheduler runs again.",
    stack: ["React", "Spring Boot", "Spring Security", "MongoDB Atlas", "JWT", "Docker", "JUnit"],
    repo: "Arpit-Krishna/Expense_Api",
    github: "https://github.com/Arpit-Krishna/Expense_Api",
    githubSecondary: { label: "Frontend", href: "https://github.com/Arpit-Krishna/Expense_frontend" },
    live: "https://expensify-psi.vercel.app",
    visibility: "Open source",
    visual: { kind: "budget" },
    metrics: [
      { value: "15 min", label: "recurring job cadence" },
      { value: "429", label: "after repeated bad logins" },
      { value: "0", label: "duplicate recurring posts" },
      { value: "PWA", label: "installable, offline-first" },
    ],
    caseStudy: {
      problem:
        "Most expense apps stop being useful the moment you are offline or forget to log a monthly bill. I wanted a tracker that works on a phone with no signal, warns before a category budget is blown, and handles recurring payments on its own.",
      users: "People who track spending on their phone and pay the same bills every month.",
      constraints: [
        "Expenses entered offline must survive a closed tab and sync once the network is back.",
        "A scheduler that runs every 15 minutes must never post the same rent or EMI twice.",
        "Auth had to resist credential stuffing without adding friction for real users.",
      ],
      tradeoffs: [
        {
          chose: "Atomic findAndModify to claim each recurring payment",
          over: "Read-then-write in application code",
          why: "The claim and the update happen in one MongoDB operation, so overlapping job runs cannot both post the same bill.",
        },
        {
          chose: "Service worker queue for offline writes",
          over: "Blocking the UI until online",
          why: "Users keep logging expenses, and the queue replays in order when connectivity returns.",
        },
        {
          chose: "Login lockout returning HTTP 429",
          over: "Captcha on every login",
          why: "Blocks brute force after repeated failures while normal logins stay one step.",
        },
      ],
      architecture: {
        caption: "Client and API are deployed separately.",
        nodes: [
          { label: "React PWA", sub: "service worker" },
          { label: "Offline queue", sub: "sync on reconnect" },
          { label: "Spring Boot API", sub: "JWT + BCrypt" },
          { label: "Scheduler", sub: "every 15 min" },
          { label: "MongoDB Atlas", sub: "findAndModify" },
        ],
      },
      states: [
        { label: "Offline", note: "Expense saved locally and marked pending sync." },
        { label: "Over budget", note: "Category crosses its limit and the alert fires." },
        { label: "Locked out", note: "API answers 429 after repeated failed logins." },
        { label: "Consistent errors", note: "A global exception handler returns the same JSON shape everywhere." },
      ],
      results: [
        "Recurring payments post without duplicates across overlapping scheduler runs.",
        "Brute-force logins are blocked with a 429 lockout.",
        "Unit and integration tests in JUnit cover the API error contract.",
      ],
      lessons: [
        "Offline-first changes the data model. Every write needs an identity that survives a retry.",
        "A single error format from day one made the frontend far simpler to build.",
      ],
    },
  },
  {
    slug: "hal-jivi",
    title: "Hal-Jivi",
    org: "Academic project",
    period: "Feb - May 2025",
    tagline: "Crop MSP transparency and a tamper-evident supply chain for farmers.",
    description:
      "Distributed platform combining FastAPI services, Ethereum smart contracts and ML pipelines so farmers can see how Minimum Support Price is derived.",
    outcome: "Cut fraud risk by 30% by putting price and handover records on-chain.",
    stack: ["FastAPI", "REST APIs", "Ethereum", "Scikit-learn", "Pandas"],
    repo: "Arpit-Krishna/Hal-Jivi",
    github: "https://github.com/Arpit-Krishna/Hal-Jivi",
    live: null,
    visibility: "Open source",
    visual: {
      kind: "image",
      src: "https://i.ibb.co/XkkL52Sp/Screenshot-2025-07-24-172302.png",
      alt: "Hal-Jivi dashboard showing crop MSP predictions",
    },
    metrics: [
      { value: "30%", label: "lower fraud risk" },
      { value: "Real-time", label: "MSP prediction" },
      { value: "3", label: "layers: API, chain, ML" },
    ],
    caseStudy: {
      problem:
        "Farmers rarely see how the Minimum Support Price for their crop is calculated, and paper handovers between middlemen are easy to alter. That opacity invites underpayment and fraud.",
      users: "Farmers, procurement agents and auditors who need to agree on price and custody.",
      constraints: [
        "Government price data is messy and needs cleaning before any model can use it.",
        "Blockchain writes are slow and costly, so only records that need tamper evidence go on-chain.",
        "Predictions had to come back fast enough to use during a sale.",
      ],
      tradeoffs: [
        {
          chose: "Smart contracts for custody and price records only",
          over: "Putting all data on-chain",
          why: "Keeps gas costs down while the records that matter for disputes stay tamper-evident.",
        },
        {
          chose: "Modular FastAPI services with clear boundaries",
          over: "A single monolith",
          why: "The ML, chain and API pieces could be built and tested independently.",
        },
      ],
      architecture: {
        caption: "Three cooperating layers behind one REST surface.",
        nodes: [
          { label: "Govt. data", sub: "MSP history" },
          { label: "Pandas ETL", sub: "clean + feature" },
          { label: "Scikit-learn", sub: "MSP model" },
          { label: "FastAPI", sub: "REST gateway" },
          { label: "Smart contract", sub: "custody ledger" },
        ],
      },
      states: [
        { label: "Prediction", note: "Real-time MSP estimate for a crop and region." },
        { label: "Handover", note: "Custody change signed and written on-chain." },
        { label: "Audit", note: "Full price and custody trail for a lot." },
      ],
      results: [
        "Fraud risk reduced by 30% in project evaluation.",
        "Farmers get a readable explanation of the price they are offered.",
      ],
      lessons: [
        "Blockchain earns its place only where parties do not trust each other. Everything else belongs in a normal database.",
      ],
    },
  },
  {
    slug: "medium-clone",
    title: "Medium Clone",
    org: "Personal project",
    period: "Feb 2025",
    tagline: "A serverless blogging platform running on Cloudflare Workers.",
    description:
      "Hono API at the edge with PostgreSQL through Prisma, JWT sign-up and sign-in, and full blog CRUD with a React frontend.",
    outcome: "Runs at the edge with no server to provision or keep warm.",
    stack: ["Hono", "Cloudflare Workers", "PostgreSQL", "Prisma", "React", "JWT"],
    repo: "Arpit-Krishna/Medium-Serverless_frontend",
    github: "https://github.com/Arpit-Krishna/Medium-Serverless_frontend",
    live: "https://medium-clone-arpit-krishnas-projects.vercel.app/",
    visibility: "Open source",
    visual: {
      kind: "image",
      src: "https://i.ibb.co/hFFgCh0v/medium.png",
      alt: "Medium clone feed with blog post cards",
    },
    metrics: [
      { value: "Edge", label: "Cloudflare Workers" },
      { value: "JWT", label: "stateless auth" },
      { value: "CRUD", label: "posts and drafts" },
    ],
    caseStudy: {
      problem:
        "I wanted to learn how far a serverless edge runtime can go for a real, database-backed product, and what breaks when there is no long-lived Node process.",
      users: "Writers publishing posts and readers browsing a feed.",
      constraints: [
        "Workers have no persistent TCP connections, so the database layer had to work over a pooled connection.",
        "Auth must be stateless because every request can hit a different edge node.",
      ],
      tradeoffs: [
        {
          chose: "Hono on Cloudflare Workers",
          over: "Express on a VM",
          why: "Tiny cold starts and global distribution, at the cost of a restricted runtime.",
        },
        {
          chose: "JWT in headers",
          over: "Server-side sessions",
          why: "Any edge node can verify a request without a shared session store.",
        },
      ],
      architecture: {
        caption: "Frontend on Vercel, API at the edge.",
        nodes: [
          { label: "React SPA", sub: "Vercel" },
          { label: "Hono API", sub: "Workers" },
          { label: "JWT verify", sub: "per request" },
          { label: "Prisma", sub: "pooled client" },
          { label: "PostgreSQL", sub: "posts + users" },
        ],
      },
      states: [
        { label: "Feed", note: "Paginated list of published posts." },
        { label: "Editor", note: "Create and update posts after sign-in." },
        { label: "Unauthorised", note: "Requests with a missing or invalid JWT are rejected before touching the database." },
      ],
      results: [
        "Sign-up, sign-in and blog CRUD all run on the edge.",
        "No servers to patch or scale for the API.",
      ],
      lessons: [
        "Edge runtimes reward small dependencies. Picking Hono over heavier frameworks kept the bundle inside Worker limits.",
      ],
    },
  },
];

// Other public repositories shown in the Open Source section.
export const publicRepos = [
  {
    name: "Expense_frontend",
    repo: "Arpit-Krishna/Expense_frontend",
    description: "React PWA client for Expensify with offline sync and budget alerts.",
    language: "JavaScript",
  },
  {
    name: "MediVault",
    repo: "Arpit-Krishna/MediVault",
    description: "Blockchain-based health records with patient-controlled sharing via smart contracts.",
    language: "Solidity",
  },
  {
    name: "mini-url-shortener",
    repo: "Arpit-Krishna/mini-url-shortener",
    description: "Node and Express URL shortener with CRUD, fully containerised with Docker.",
    language: "JavaScript",
  },
  {
    name: "Habot-Learning-Support-Provider",
    repo: "Arpit-Krishna/Habot-Learning-Support-Provider",
    description: "React module for browsing and filtering learning providers, built for Habot Connect DMCC.",
    language: "JavaScript",
  },
  {
    name: "ClimaTikka",
    repo: "Arpit-Krishna/ClimaTikka",
    description: "Django weather app with location-based real-time forecasts.",
    language: "Python",
  },
];
