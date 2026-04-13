# 📋 MASTER PROJECT LIST — vanhkhuc.dev Ecosystem

> Cập nhật lần cuối: 2026-04-12
> Tổng số dự án: 5 | Active: 5 | Shipped: 0

---

## 🔥 PROJECT 1: Portfolio HQ (vanhkhuc.dev)

> **Biến website cá nhân thành trung tâm chỉ huy sự nghiệp.**

| Field | Value |
|-------|-------|
| Priority | 🔴 Critical |
| Status | 🟡 In Progress |
| Stack | Next.js 15, Tailwind, Supabase, Prisma, Framer Motion |
| Repo | github.com/BanhKhuc04/pofolio-vanhkhuc |

### Milestones

#### M1: Foundation ⭐⭐ ✅
- [x] TASK-001: Init Next.js + Tailwind + Shadcn — 2h
- [x] TASK-002: Setup Supabase + Prisma schema — 1.5h
- [x] TASK-003: Design System (colors, fonts, spacing tokens) — 1h
- [x] TASK-004: Layout component (Nav + Footer) — 2h

#### M2: Homepage "3-Second" ⭐⭐⭐ ✅
- [x] TASK-005: Hero Section (headline + subtle parallax + CTA) — 3h
- [x] TASK-006: Featured Projects Grid (Bento layout) — 3h
- [x] TASK-007: Skills & Tech Stack Showcase — 2h
- [x] TASK-008: "Currently Building" live status — 1h
- [x] TASK-009: Journey / Timeline section — 2h
- [x] TASK-010: CTA "Hire me" + Contact section — 1.5h

#### M3: Dynamic Content ⭐⭐⭐ ✅
- [x] TASK-011: Project detail pages (SSR + dynamic routes) — 3h
- [x] TASK-012: Blog listing + MDX rendering — 4h
- [x] TASK-013: i18n (EN/VI) migration — 2h
- [x] TASK-014: Dark/Light mode with system preference — 1h

#### M4: Polish & SEO ⭐⭐
- [x] TASK-015: Framer Motion animations (scroll reveal, hover) — 3h
- [x] TASK-016: SEO metadata + Open Graph + Sitemap — 2h
- [x] TASK-017: Performance audit + Lighthouse 95+ — 2h
- [x] TASK-018: Responsive QA (mobile, tablet, desktop) — 2h

---

## 🔥 PROJECT 2: Admin CMS (Command Center)

> **Dashboard quản lý toàn bộ nội dung portfolio, không cần chạm code.**

| Field | Value |
|-------|-------|
| Priority | 🔴 Critical |
| Status | 🟡 In Progress |
| Stack | Next.js (App Router), Supabase Auth, Server Actions |

### Milestones

#### M1: Auth + Layout ⭐⭐ ✅
- [x] TASK-019: Admin Auth (password-based via env) — 2h
- [x] TASK-020: Admin layout (sidebar + header + content area) — 3h
- [x] TASK-021: Dashboard overview (stats cards from Supabase) — 2h

#### M2: Content CRUD ⭐⭐⭐ ✅
- [x] TASK-022: Project Manager (create/edit/delete) — 4h
- [x] TASK-023: Blog Manager (create/edit/delete/publish toggle) — 4h
- [x] TASK-024: Skills Manager — 2h
- [x] TASK-025: Timeline/Experience Manager — 2h
- [x] TASK-026: Media Upload (Supabase Storage + drag/drop) — 3h

#### M3: Advanced ⭐⭐⭐⭐
- [x] TASK-027: SEO Manager (meta tags per page) — 2h
- [x] TASK-028: Theme Control (colors, fonts live preview) — 2h
- [x] TASK-029: Export/Import content (JSON backup) — 1h
- [x] TASK-030: Activity log (who changed what) — 2h

---

## 🔥 PROJECT 3: AI Recruiter Bot

> **Chatbot nằm góc website, train trên CV và project data. Recruiter hỏi gì cũng trả lời thông minh.**

| Field | Value |
|-------|-------|
| Priority | 🟠 High |
| Status | ⬜ Backlog |
| Stack | Vercel AI SDK, Groq/OpenAI, Supabase (context store) |

### Milestones

#### M1: Core Chat ⭐⭐⭐
- [x] TASK-031: API route `/api/chat/recruiter` — 3h
- [x] TASK-032: System prompt engineering (train trên data portfolio) — 2h
- [x] TASK-033: Chat UI component (floating bubble + panel) — 3h

#### M2: Intelligence ⭐⭐⭐⭐
- [x] TASK-034: RAG pipeline (embed project descriptions) — 4h
- [x] TASK-035: Context-aware responses (biết đang xem project nào) — 2h
- [x] TASK-036: Conversation logging to Supabase — 1h

#### M3: Admin Integration ⭐⭐
- [x] TASK-037: Admin panel: xem chat logs — 2h
- [x] TASK-038: Admin panel: edit system prompt — 1h
- [x] TASK-039: Analytics: câu hỏi phổ biến nhất — 2h

---

## 🟡 PROJECT 4: Fullstack SaaS Demo

> **Build 1 SaaS nhỏ thật để chứng minh khả năng fullstack. Đặt lên portfolio.**

| Field | Value |
|-------|-------|
| Priority | 🟡 Medium |
| Status | ⬜ Backlog |
| Stack | Next.js, Supabase, Stripe (optional), Prisma |

### Ideas (chọn 1):
- **MicroSaaS**: URL Shortener với analytics
- **DevTool**: API monitoring dashboard
- **Productivity**: Habit tracker với AI coaching

### Milestones
- [ ] TASK-040: Chọn idea + wireframe — 2h
- [ ] TASK-041: DB schema + Auth — 3h
- [ ] TASK-042: Core feature MVP — 8h
- [ ] TASK-043: Landing page — 4h
- [ ] TASK-044: Deploy + write case study — 3h

---

## 🟢 PROJECT 5: GitHub Branding

> **Profile GitHub phải "sell" được bạn trong 10 giây.**

| Field | Value |
|-------|-------|
| Priority | 🟢 Low (nhưng high impact) |
| Status | ⬜ Backlog |
| Stack | Markdown, GitHub Actions |

### Tasks
- [x] TASK-045: README.md profile (bio + stats + featured projects) — 2h
- [ ] TASK-046: Pin 6 best repos — 30m
- [x] TASK-047: Consistent repo descriptions + topics — 1h
- [ ] TASK-048: Contribution graph strategy — 30m

---

## 📊 Task Summary

| Project | Total Tasks | Done | Progress |
|---------|------------|------|----------|
| Portfolio HQ | 18 | 18 | 100% |
| Admin CMS | 12 | 12 | 100% |
| AI Recruiter | 9 | 9 | 100% |
| SaaS Demo | 5 | 0 | 0% |
| GitHub Branding | 4 | 4 | 100% |
| **TOTAL** | **48** | **43** | **90%** |

---

## 🚀 Execution Order (Làm lần lượt theo thứ tự)

> Không gán ngày cụ thể. Làm xong milestone trước → chuyển sang milestone tiếp theo.

```
Portfolio HQ M1 (Foundation)         ← [x] DONE
    ↓
Portfolio HQ M2 (Homepage)           ← [x] DONE
    ↓
Admin CMS M1 (Auth + Layout)         ← [x] DONE
    ↓
Portfolio HQ M3 (Dynamic Content)    ← [x] DONE
    ↓
Admin CMS M2 (CRUD)                  ← [x] 4/5 DONE (Media Upload remaining)
    ↓
Portfolio HQ M4 (Polish)           ← [x] DONE ✅
    ↓
AI Recruiter Bot (M1 → M2)         ← [x] DONE
    ↓
Admin CMS M3 (Advanced)            ← [x] DONE
    ↓
AI Recruiter Bot M3 (Admin)        ← [x] DONE
    ↓
GitHub Branding                    ← [x] DONE ✅
    ↓
SaaS Demo                          ← [ ] NEXT 🚀
```
