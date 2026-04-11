# 🏗️ Architecture Decisions — vanhkhuc.dev Ecosystem

> Ghi lại TẠI SAO chọn công nghệ X thay vì Y. Để future-self không phải hỏi lại.

---

## Decision 001: Next.js 15 thay vì Vanilla HTML

**Date:** 2026-04-12
**Context:** Website hiện tại là HTML/CSS/JS thuần. Performance tốt nhưng không scale được.

**Decision:** Chuyển sang Next.js 15 (App Router).

**Reasons:**
1. **SSR + SEO:** Mỗi project page cần unique metadata → Next.js tự generate.
2. **Server Actions:** CRUD admin không cần viết REST API riêng.
3. **File-based Routing:** Thêm page mới = thêm 1 file. Zero config.
4. **AI Integration:** Vercel AI SDK chỉ chạy trên Next.js/Node.js.
5. **Deploy:** Vercel deploy = 1 click. Zero DevOps.

**Trade-offs:**
- Mất tốc độ load "instant" của HTML thuần
- Build time chậm hơn
- Cần học App Router patterns

**Verdict:** Trade-off chấp nhận được. Gain >> Loss.

---

## Decision 002: Supabase thay vì MongoDB/Firebase

**Date:** 2026-04-12

**Decision:** Dùng Supabase (PostgreSQL + Auth + Storage).

**Reasons:**
1. PostgreSQL = standard SQL, transferable skill
2. Auth built-in, không cần NextAuth
3. Storage built-in cho image upload
4. Free tier đủ cho personal project
5. Dashboard GUI để debug data

---

## Decision 003: Tailwind + Shadcn thay vì Vanilla CSS

**Date:** 2026-04-12

**Decision:** Chuyển từ Vanilla CSS sang Tailwind + Shadcn/UI.

**Reasons:**
1. Shadcn = component library KHÔNG phải dependency (copy code, own it)
2. Tailwind = consistent design tokens
3. Dark mode built-in
4. Responsive utilities cực nhanh
5. Industry standard → recruiter recognize

**Giữ lại:** Design thinking từ style cũ (Blue theme, Glassmorphism).
