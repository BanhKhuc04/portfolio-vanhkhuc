# 🏛️ Architecture Blueprint: vanhkhuc.dev ecosystem

## 1. Core Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS 4 + Framer Motion
- **Database:** PostgreSQL (Hosted on Supabase)
- **ORM:** Prisma Client
- **AI Integration:** Vercel AI SDK + Google Gemini 1.5 Flash

## 2. System Modules
### A. The Public Face (Frontend)
- `src/app/page.tsx`: The main landing hub. Heavy on Server Components. Uses `<ScrollReveal>` for cinematic entrance.
- `src/app/projects/*`: Dynamic routing for project showcases.
- `src/app/blog/*`: Content hub reading from Postgres.

### B. The Command Center (Admin)
- `src/app/admin/`: Protected layout. Currently moving towards JWT Middleware protection to secure API routes.
- `src/app/api/admin/*`: CRUD endpoints. MUST use Next.js Cache Revalidation (`revalidatePath`) on mutations to sync SSR pages.

### C. The AI Dimension (Recruiter Bot)
- `src/app/api/chat/recruiter/`: The endpoint serving standard AI queries, wrapped with Vercel Streaming Text. Ingests local Portfolio context dynamically.

## 3. Data Flow
1. User accesses site -> Next.js SSR fetches initial state from Prisma.
2. Form Submissions -> API Routes -> Validation -> Transactional write via Prisma -> Revalidate Cache -> Respond.

## 4. Key Decisions & Trade-offs
- *Why Prisma over raw SQL?* Type-safety is more valuable for this scale than raw microsecond performance.
- *Why custom JWT auth over NextAuth?* To keep the package lightweight and tailored exclusively to a single-admin use case without OAuth bloat.
