// AI Team roster — 10 AI agents on a software dev / DevOps pipeline.

export type PipelineId =
  | "Orchestrator"
  | "Planning"
  | "Quality Gate"
  | "Testing"
  | "Performance";

export interface AgentWorkflow {
  inputs: string[];
  handsOffTo: string[];
  receivesFrom: string[];
  role: string;
}

export interface AgentStats {
  handled: string;
  uptime: string;
  avgRouting: string;
}

export interface Agent {
  id: string;
  handle: string;
  file: string;
  title: string;
  pipeline: PipelineId;
  pronoun: string;
  tagline: string;
  summary: string;
  personality: string[];
  workflow: AgentWorkflow;
  tools: string[];
  stats: AgentStats;
}

export interface Pipeline {
  id: PipelineId;
  label: string;
  dot: string;
}

export interface ExampleTask {
  id: string;
  label: string;
  kind: string;
}

export const TEAM: Agent[] = [
  {
    id: "palm",
    handle: "palm",
    file: "chief-dispatcher.md",
    title: "Chief Dispatcher",
    pipeline: "Orchestrator",
    pronoun: "they",
    tagline: "Every commit has a destination.\nI just point the way.",
    summary:
      "Receives every incoming task and routes it to the right specialist. Owns the queue, manages parallelism, and decides when a task is finally ready to ship.",
    personality: [
      "Calm under load",
      "Decisive, never indecisive",
      "Traffic-cop energy",
      "Speaks in present tense",
    ],
    workflow: {
      inputs: ["user request", "webhook", "cron"],
      handsOffTo: ["utahime"],
      receivesFrom: ["performante-optimizer"],
      role: "Bookends the entire pipeline — first to touch a task, last to approve the merge.",
    },
    tools: ["Claude Opus 4.1", "GitHub API", "Linear API", "Task queue (Redis)"],
    stats: { handled: "12.4K", uptime: "99.98%", avgRouting: "420ms" },
  },
  {
    id: "utahime",
    handle: "utahime",
    file: "planner.md",
    title: "Planner",
    pipeline: "Planning",
    pronoun: "she",
    tagline: "Plans aren’t promises.\nThey’re commitments minus the ego.",
    summary:
      "Breaks a task into a dependency graph of small, verifiable subtasks. Writes the ticket spec the rest of the team works off of.",
    personality: [
      "Methodical to a fault",
      "Loves a dependency graph",
      "Refuses ambiguous tickets",
      "Atomic-subtask evangelist",
    ],
    workflow: {
      inputs: ["palm"],
      handsOffTo: ["nitta", "code-viview"],
      receivesFrom: ["palm"],
      role: "Second step. Turns a vague request into an executable plan with explicit hand-offs.",
    },
    tools: ["Claude Sonnet 4.5", "Linear", "Mermaid", "Spec templates"],
    stats: { handled: "8.7K", uptime: "99.94%", avgRouting: "6.2s" },
  },
  {
    id: "nitta",
    handle: "nitta",
    file: "tdd-guide.md",
    title: "TDD Guide",
    pipeline: "Testing",
    pronoun: "he",
    tagline: "Red, green, refactor.\nIn that order. Always.",
    summary:
      "Writes the failing test before any feature code exists. Refuses to let an implementation start until a test fails for the right reason.",
    personality: [
      "Patient mentor",
      "Religious about red-green",
      "“What’s the test for that?”",
      "Believes coverage is a vibe, not a number",
    ],
    workflow: {
      inputs: ["utahime"],
      handsOffTo: ["code-viview", "fondy", "benji"],
      receivesFrom: ["utahime"],
      role: "Writes the failing spec the implementers code against.",
    },
    tools: ["Vitest", "Jest", "Playwright (component)", "Claude Sonnet 4.5"],
    stats: { handled: "8.1K", uptime: "99.91%", avgRouting: "11.4s" },
  },
  {
    id: "code-viview",
    handle: "viview",
    file: "code-reviewer.md",
    title: "Code Reviewer",
    pipeline: "Quality Gate",
    pronoun: "she",
    tagline: "Readability is a feature.\nUnreadable code is a bug.",
    summary:
      "Reads every diff. Comments inline. Blocks the merge if the code smell is sharp enough. Cares about names more than you do.",
    personality: [
      "Pedantic in the good way",
      "Loves a clean diff",
      "Will die on consistent-naming hill",
      "Quotes the style guide from memory",
    ],
    workflow: {
      inputs: ["nitta"],
      handsOffTo: ["fondy"],
      receivesFrom: ["nitta", "utahime"],
      role: "First of four quality gates. Runs on every PR.",
    },
    tools: ["Claude Sonnet 4.5", "ESLint", "semgrep", "AST-grep"],
    stats: { handled: "7.6K", uptime: "99.96%", avgRouting: "4.8s" },
  },
  {
    id: "fondy",
    handle: "fondy",
    file: "typescript-reviewer.md",
    title: "TypeScript Reviewer",
    pipeline: "Quality Gate",
    pronoun: "he",
    tagline: "The compiler is a friend\nyou haven’t listened to yet.",
    summary:
      "Hunts every `any`. Pushes for discriminated unions, narrows over assertions, and will absolutely refactor your generics on sight.",
    personality: [
      "Generics maximalist",
      "Allergic to `as any`",
      "Has opinions about `unknown`",
      "Treats `strict: true` as the floor",
    ],
    workflow: {
      inputs: ["code-viview"],
      handsOffTo: ["benji"],
      receivesFrom: ["code-viview"],
      role: "Second quality gate. Type-system review.",
    },
    tools: ["tsc", "ts-morph", "type-coverage", "Claude Sonnet 4.5"],
    stats: { handled: "6.9K", uptime: "99.97%", avgRouting: "3.1s" },
  },
  {
    id: "benji",
    handle: "benji",
    file: "database-reviewer.md",
    title: "Database Reviewer",
    pipeline: "Quality Gate",
    pronoun: "he",
    tagline: "Today’s index is\ntomorrow’s incident prevented.",
    summary:
      "Reviews every schema migration and query. Asks “what happens at 10M rows?” until you have an answer. Will find your N+1.",
    personality: [
      "Tactical pessimist",
      "Reads EXPLAIN like poetry",
      "N+1 hunter",
      "Migration-safety obsessive",
    ],
    workflow: {
      inputs: ["fondy"],
      handsOffTo: ["ieiri"],
      receivesFrom: ["fondy"],
      role: "Third quality gate. SQL, schema, and query review.",
    },
    tools: ["Postgres EXPLAIN", "sqlfluff", "pganalyze", "Claude Sonnet 4.5"],
    stats: { handled: "4.2K", uptime: "99.95%", avgRouting: "5.7s" },
  },
  {
    id: "ieiri",
    handle: "ieiri",
    file: "security-reviewer.md",
    title: "Security Reviewer",
    pipeline: "Quality Gate",
    pronoun: "they",
    tagline: "Threats are details.\nI’m in the details.",
    summary:
      "Scans for leaked secrets, missing auth, and injection vectors. Quiet most of the time. When they speak, the merge stops.",
    personality: [
      "Quiet, watchful",
      "Three steps ahead of attackers",
      "Reads CVEs at breakfast",
      "Doesn’t speak unless it matters",
    ],
    workflow: {
      inputs: ["benji"],
      handsOffTo: ["the-end"],
      receivesFrom: ["benji"],
      role: "Final quality gate. Last line before the test suite.",
    },
    tools: ["semgrep", "trivy", "gitleaks", "Claude Sonnet 4.5"],
    stats: { handled: "4.0K", uptime: "99.99%", avgRouting: "8.9s" },
  },
  {
    id: "the-end",
    handle: "the-end",
    file: "e2e-runner.md",
    title: "E2E Runner",
    pipeline: "Testing",
    pronoun: "it",
    tagline: "If it doesn’t survive me,\nit doesn’t ship.",
    summary:
      "Runs the full end-to-end suite against a real browser. Captures traces, videos, and the exact network log on failure.",
    personality: [
      "Theatrical",
      "“The end of the line”",
      "Treats every run as a final boss",
      "No flake left behind",
    ],
    workflow: {
      inputs: ["ieiri"],
      handsOffTo: ["silent-hunter"],
      receivesFrom: ["ieiri"],
      role: "Full browser-level integration coverage.",
    },
    tools: [
      "Playwright",
      "Chrome DevTools Protocol",
      "Trace Viewer",
      "Video capture",
    ],
    stats: { handled: "5.5K", uptime: "99.88%", avgRouting: "3.2min" },
  },
  {
    id: "silent-hunter",
    handle: "silent-hunter",
    file: "silent-failure-hunter.md",
    title: "Silent Failure Hunter",
    pipeline: "Testing",
    pronoun: "she",
    tagline: "The worst bug is\nthe one that looks like success.",
    summary:
      "Scans for try/catch that swallow errors, awaited promises that aren’t, empty arrays from broken queries. Catches the bugs tests never trip.",
    personality: [
      "Productively paranoid",
      "Distrusts every catch block",
      "Awaits everything",
      "Empty-array skeptic",
    ],
    workflow: {
      inputs: ["the-end"],
      handsOffTo: ["performante-optimizer"],
      receivesFrom: ["the-end"],
      role: "Post-test anti-pattern sweep.",
    },
    tools: ["AST analysis", "Log replay", "Sentry hooks", "Claude Sonnet 4.5"],
    stats: { handled: "3.6K", uptime: "99.92%", avgRouting: "14s" },
  },
  {
    id: "performante-optimizer",
    handle: "performante-optimizer",
    file: "performance-optimizer.md",
    title: "Performance Optimizer",
    pipeline: "Performance",
    pronoun: "she",
    tagline: "p99 or it didn’t happen.",
    summary:
      "Profiles before & after every merge. Flags regressions in latency, bundle size, and memory. Suggests cache, index, or batch fixes.",
    personality: [
      "Stopwatch in one hand",
      "Flamegraph in the other",
      "Speaks fluent percentile",
      "Will inline for 2ms",
    ],
    workflow: {
      inputs: ["silent-hunter"],
      handsOffTo: ["palm"],
      receivesFrom: ["silent-hunter"],
      role: "Final stage. Performance sign-off before palm ships.",
    },
    tools: ["Lighthouse", "perf", "Chrome tracing", "Bundle analyzer"],
    stats: { handled: "5.1K", uptime: "99.93%", avgRouting: "46s" },
  },
];

export const PIPELINES: Pipeline[] = [
  { id: "Orchestrator", label: "Orchestrator", dot: "#C2410C" },
  { id: "Planning", label: "Planning", dot: "#B45309" },
  { id: "Quality Gate", label: "Quality Gate", dot: "#991B1B" },
  { id: "Testing", label: "Testing", dot: "#1E40AF" },
  { id: "Performance", label: "Performance", dot: "#5B21B6" },
];

// Sequential flow order for the Pipeline page
export const FLOW_ORDER: string[] = [
  "palm",
  "utahime",
  "nitta",
  "code-viview",
  "fondy",
  "benji",
  "ieiri",
  "the-end",
  "silent-hunter",
  "performante-optimizer",
  "palm",
];

// Example tasks for the animated pipeline page
export const EXAMPLE_TASKS: ExampleTask[] = [
  { id: "t1", label: "feat: add user CSV export", kind: "feat" },
  { id: "t2", label: "fix: race condition in token refresh", kind: "fix" },
  { id: "t3", label: "perf: cache org-membership lookup", kind: "perf" },
  { id: "t4", label: "chore: bump @types/node to 22", kind: "chore" },
  { id: "t5", label: "feat: webhook retry with backoff", kind: "feat" },
];

// Deterministic portrait gradient per agent (cream-compatible warm/cool palettes).
export const PORTRAIT_GRADIENTS: Record<string, [string, string, string]> = {
  palm: ["#3a2418", "#7a4126", "#c97a3f"],
  utahime: ["#2a1f3a", "#5c3e7a", "#b08fc7"],
  nitta: ["#1f2e3a", "#3e6b7a", "#8fb3c7"],
  "code-viview": ["#3a1f1f", "#7a3e3e", "#c78f8f"],
  fondy: ["#1f3a2e", "#3e7a6b", "#8fc7b3"],
  benji: ["#3a2e1f", "#7a6b3e", "#c7b38f"],
  ieiri: ["#1a1a1a", "#2e2e3a", "#5c5c6b"],
  "the-end": ["#3a1f2a", "#7a3e5c", "#c78fa8"],
  "silent-hunter": ["#1f2a3a", "#3e5c7a", "#8fa8c7"],
  "performante-optimizer": ["#3a2e1f", "#a85c1f", "#e8a85c"],
};

export const AGENT_IMAGES: Record<string, string> = {
  palm: "/teams/palm.png",
  utahime: "/teams/utahime.png",
  nitta: "/teams/nitta.png",
  "code-viview": "/teams/viview.png",
  fondy: "/teams/fondy.jpeg",
  benji: "/teams/benji.png",
  ieiri: "/teams/ieiri.png",
  "the-end": "/teams/the-end.png",
  "silent-hunter": "/teams/silent-hunter.png",
  "performante-optimizer": "/teams/performante.png",
};
