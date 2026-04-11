# TASK-001: Init Next.js + Tailwind + Shadcn

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-001 |
| **Title** | Initialize Next.js 15 project with Tailwind + Shadcn |
| **Project** | Portfolio HQ |
| **Priority** | 🔴 Critical |
| **Status** | TODO |
| **Estimated Time** | 2h |
| **Actual Time** | — |
| **Deadline** | 2026-04-12 |
| **Difficulty** | ⭐⭐ |

## 🎯 Objective
Khởi tạo project Next.js 15 mới với Tailwind CSS và Shadcn/UI. Đây là nền móng cho toàn bộ Portfolio HQ.

## 🤔 Why This Matters
Không có foundation = không build được gì. Task này phải xong đầu tiên. Mọi task khác đều depend vào nó.

## 📐 Scope

**In Scope:**
- Khởi tạo Next.js 15 (App Router, TypeScript)
- Cài đặt Tailwind CSS
- Init Shadcn/UI
- Setup base folder structure
- Tạo `layout.tsx` root
- Verify chạy được trên localhost

**Out of Scope:**
- UI components cụ thể
- Database connection
- Auth

## 📦 Deliverables
- [ ] Next.js project chạy được trên `localhost:3000`
- [ ] Tailwind CSS hoạt động
- [ ] Shadcn/UI initialized
- [ ] Folder structure theo chuẩn

## 🔗 Dependencies
Không có. Đây là task đầu tiên.

## 📁 Files to Touch
```
./ (root — init mới)
├── src/app/layout.tsx
├── src/app/page.tsx
├── src/app/globals.css
├── tailwind.config.ts
├── next.config.ts
├── components.json (shadcn)
└── package.json
```

## 🔨 Build Steps

1. [ ] `npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. [ ] `npx shadcn-ui@latest init`
3. [ ] Tạo folder structure: `src/components/ui/`, `src/components/sections/`, `src/lib/`
4. [ ] Verify: `npm run dev` → page load ok
5. [ ] Commit: `feat: init next.js 15 with tailwind + shadcn`

## ✅ QA Checklist
- [ ] `npm run dev` không lỗi
- [ ] `localhost:3000` hiện trang mặc định
- [ ] Tailwind classes hoạt động
- [ ] TypeScript strict mode ok
- [ ] Đã push lên GitHub

## 📝 Notes
Chọn options khi init:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: Yes
- App Router: Yes
- Import alias: @/*
