// All site content lives here. Replace the sample projects, experience and links with your own.

export type ProjectVisual = 'flow' | 'terminal' | 'dashboard' | 'chat'

export interface Project {
  title: string
  category: 'AI Automation' | 'Web App' | 'Full-stack'
  year: string
  summary: string
  result: string
  stack: string[]
  visual: ProjectVisual
  liveUrl?: string
  codeUrl?: string
}

export interface Role {
  role: string
  company: string
  period: string
  points: string[]
}

export const profile = {
  name: 'Lyle Daniel',
  initials: 'ld',
  email: 'hello@example.com', // your real email
  availability: 'Available for new projects',
  location: 'Remote worldwide',
  timezone: 'UTC', // your IANA timezone, e.g. 'Europe/London'
  resumeUrl: '', // put resume.pdf in /public and set this to 'resume.pdf' to show the download button
  headline: { lead: 'I build software', accent: 'that runs itself.' },
  roles: ['AI automation', 'full-stack', 'workflow', 'web app'],
  sub: "I design web apps and AI-driven workflows that take repetitive work off your team's plate, so people can spend their time on the work that matters.",
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'X', href: 'https://x.com/' },
  ],
}

export const about = {
  text: 'I sit where product engineering meets automation. I ship fast, typed web apps, then wire them into the tools a business already uses, with LLM agents doing the reading, sorting and drafting that used to eat whole afternoons. My work is judged by one question: did it give people their time back?',
  highlights: ['product', 'automation', 'time'],
  stats: [
    { value: 40, suffix: '+', label: 'Projects shipped' },
    { value: 25, suffix: '+', label: 'Workflows automated' },
    { value: 1200, suffix: 'h', label: 'Manual hours saved / yr' },
    { value: 4, suffix: 'y', label: 'Building for the web' },
  ],
}

export const projects: Project[] = [
  {
    title: 'Inbox Triage Agent',
    category: 'AI Automation',
    year: '2026',
    summary: 'An LLM agent that reads a support inbox, tags intent and urgency, drafts replies and routes edge cases to a human.',
    result: 'First-response time cut from 6 hours to 9 minutes.',
    stack: ['Python', 'Claude API', 'n8n', 'Postgres'],
    visual: 'flow',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Ledgerline',
    category: 'Full-stack',
    year: '2026',
    summary: 'An invoicing dashboard that pulls bank feeds, matches payments to invoices and chases late payers automatically.',
    result: 'Month-end reconciliation went from 2 days to 40 minutes.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
    visual: 'dashboard',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Docs Copilot',
    category: 'AI Automation',
    year: '2025',
    summary: 'A retrieval-augmented assistant over an internal knowledge base, embedded in Slack and the company wiki.',
    result: 'Answers 70% of internal questions without a human.',
    stack: ['TypeScript', 'Embeddings', 'pgvector', 'Slack API'],
    visual: 'chat',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'Shipfast CLI',
    category: 'Web App',
    year: '2025',
    summary: 'A command-line tool and web console that scaffolds, tests and deploys client sites from a single config file.',
    result: 'New client sites go live in under an hour.',
    stack: ['Node.js', 'React', 'GitHub Actions', 'Netlify'],
    visual: 'terminal',
    codeUrl: '#',
  },
]

export const stack = {
  rows: [
    ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Tailwind', 'Postgres', 'Three.js'],
    ['Claude API', 'OpenAI', 'n8n', 'Zapier', 'LangGraph', 'pgvector', 'Playwright', 'Docker'],
  ],
  groups: [
    { title: 'Frontend', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Motion & GSAP', 'Three.js'] },
    { title: 'Backend', items: ['Node.js', 'Python / FastAPI', 'Postgres & Prisma', 'REST & webhooks', 'Docker'] },
    { title: 'AI & Automation', items: ['LLM agents & tool use', 'RAG & embeddings', 'n8n / Zapier / Make', 'Browser automation', 'Prompt evaluation'] },
    { title: 'Tooling', items: ['Git & GitHub Actions', 'Vercel / Netlify', 'Supabase', 'Figma', 'Linear'] },
  ],
}

export const experience: Role[] = [
  {
    role: 'AI Automation Engineer',
    company: 'Freelance',
    period: '2025 — Now',
    points: [
      'Design and ship agent workflows for support, finance and ops teams.',
      'Own delivery end to end: discovery, build, evaluation and handover.',
    ],
  },
  {
    role: 'Full-stack Developer',
    company: 'Northwind Labs',
    period: '2023 — 2025',
    points: [
      'Built customer dashboards in Next.js and TypeScript used by 8k+ accounts.',
      'Led the move to typed APIs and automated end-to-end tests.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Studio Parallel',
    period: '2022 — 2023',
    points: [
      'Shipped marketing sites and interactive campaigns for agency clients.',
      'Introduced a shared component library that halved build time.',
    ],
  },
]

export const contact = {
  lead: "Let's automate",
  accent: 'the boring part.',
  sub: 'Tell me what eats your week. I reply within one working day with a first idea of how to fix it.',
}
