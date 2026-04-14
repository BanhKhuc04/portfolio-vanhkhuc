export interface Project {
  id: string
  title: string
  description: string
  tag: string
  stat: string
  href: string
  color: string
  featured?: boolean
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export const projects: Project[] = [
  {
    id: "taskflow",
    title: "TaskFlow",
    tag: "SaaS Platform",
    description: "Project management rebuilt for speed. Keyboard-first, real-time sync, and designed for teams that ship fast. Features include predictive task sorting and collaborative whiteboards.",
    stat: "2.4K users",
    href: "#",
    color: "from-blue-600 to-indigo-600",
    featured: true
  },
  {
    id: "codecraft",
    title: "CodeCraft",
    tag: "Developer Tool",
    description: "An intelligent code editor with built-in AI assistance. Syntax analysis, auto-refactoring, and a zero-distraction workspace.",
    stat: "1.8K stars",
    href: "#",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: "mailpilot",
    title: "MailPilot",
    tag: "Productivity",
    description: "Email, reimagined. Smart inbox prioritization, scheduled sends, and a lightning-fast reading mode.",
    stat: "3.1K users",
    href: "#",
    color: "from-rose-500/20 to-orange-500/20"
  },
  {
    id: "ai-bot",
    title: "AI Recruiter",
    tag: "Upcoming",
    description: "A context-aware AI bot trained on my portfolio and CV. Ready to answer recruitment queries in real-time.",
    stat: "Development",
    href: "#",
    color: "from-primary/20 to-accent/20"
  }
]

export interface SkillCategory {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & Core",
    skills: ["Node.js", "Go", "PostgreSQL", "Prisma", "Supabase", "REST API", "gRPC", "Microservices"]
  },
  {
    title: "Frontend & UI",
    skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Shadcn UI"]
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "GitHub Actions", "Vercel", "Figma", "Git", "Jest/Cypress"]
  }
]

export interface JourneyMilestone {
  year: string
  title: string
  company: string
  description: string
}

export const journey: JourneyMilestone[] = [
  {
    year: "2026 - Present",
    title: "Lead Fullstack Engineer",
    company: "Personal Lab / HQ",
    description: "Architecting professional digital ecosystems and AI automation tools. Focusing on performance, scalability, and UX."
  },
  {
    year: "2024 - 2026",
    title: "Senior Backend Developer",
    company: "TechNova Solutions",
    description: "Scaled microservices architecture handling 100k+ concurrent users. Optimized database queries and implemented gRPC communication."
  },
  {
    year: "2022 - 2024",
    title: "Fullstack Developer",
    company: "Creative Pulse Agency",
    description: "Built high-end marketing sites and custom SaaS tools for global brands. Mastered the intersection of design and engineering."
  },
  {
    year: "2020 - 2022",
    title: "Junior Web Developer",
    company: "Open Source Contributor",
    description: "Started the journey by contributing to mission-critical libraries and building community-focused web utilities."
  }
]
