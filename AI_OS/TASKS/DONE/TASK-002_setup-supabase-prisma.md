# TASK-002: Setup Supabase + Prisma schema

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-002 |
| **Title** | Initialize Prisma and setup Supabase connection |
| **Project** | Portfolio HQ |
| **Priority** | 🔴 Critical |
| **Status** | TODO |
| **Estimated Time** | 1.5h |
| **Actual Time** | — |
| **Deadline** | 2026-04-12 |
| **Difficulty** | ⭐⭐⭐ |

---

## 🎯 Objective
Thiết lập kết nối Database (Supabase) và khởi tạo Prisma ORM để quản lý dữ liệu cho Portfolio.

## 🤔 Why This Matters
Đây là phần backend core. Mọi dữ liệu về dự án, bài viết, và thông tin cá nhân sẽ được quản lý qua đây thay vì Hardcode.

## 📐 Scope

**In Scope:**
- Cài đặt `prisma` và `@prisma/client`.
- Init prisma schema.
- Setup environment variables cho Supabase.
- Định nghĩa schema cơ bản: `Project`, `Skill`, `Experience`.
- Verify connection.

**Out of Scope:**
- CRUD logic cụ thể.
- Auth implementation (TASK-019).

## 📦 Deliverables
- [ ] `prisma/schema.prisma` file.
- [ ] `.env` file với connection string.
- [ ] Prisma client initialized in `src/lib/prisma.ts`.

## 🔗 Dependencies
- TASK-001 (Completed)

## 📁 Files to Touch
```
prisma/schema.prisma
src/lib/prisma.ts
.env
```

## 🔨 Build Steps
1. [ ] `npm install prisma --save-dev`
2. [ ] `npx prisma init`
3. [ ] Configure `.env` with Supabase credentials.
4. [ ] Define models in `schema.prisma`.
5. [ ] `npx prisma generate`
6. [ ] Create `src/lib/prisma.ts` singleton.

## ✅ QA Checklist
- [ ] `npx prisma generate` không lỗi.
- [ ] `.env` được thêm vào `.gitignore`.
- [ ] Prisma client export thành công.

## 📝 Notes / Learnings
- Sử dụng Supabase Connection Pooling nếu deploy lên Vercel.

---

## 🏁 Final Result
_Status check: Pending implementation_
