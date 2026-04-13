# TASK-006: Featured Projects Grid (Bento layout)

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-006 |
| **Title** | Build Bento-style Featured Projects Grid |
| **Project** | Portfolio HQ |
| **Priority** | 🔴 Critical |
| **Status** | TODO |
| **Estimated Time** | 3h |
| **Actual Time** | — |
| **Deadline** | 2026-04-13 |
| **Difficulty** | ⭐⭐⭐ |

---

## 🎯 Objective
Xây dựng khu vực trưng bày dự án theo phong cách Bento Grid hiện đại, làm nổi bật các sản phẩm trọng tâm của vanhkhuc.

## 🤔 Why This Matters
Showcase sản phẩm là nơi recruiter quan tâm nhất. Bento layout giúp tạo phân cấp thị giác (visual hierarchy) tốt hơn so với lưới thông thường.

## 📐 Scope

**In Scope:**
- Bento Grid layout (CSS Grid).
- Project Cards (Glassmorphism, hover states).
- Project Data (TaskFlow, CodeCraft, MailPilot).
- Badge & Statistics integration trên card.
- Responsive handling.

**Out of Scope:**
- Database integration (dùng mock data trước).
- Detail project pages (làm sau).

## 📦 Deliverables
- [ ] `src/lib/data.ts` (Mock data).
- [ ] `src/components/ui/ProjectCard.tsx`.
- [ ] `src/components/sections/ProjectsGrid.tsx`.
- [ ] `app/page.tsx` updated.

## 🔗 Dependencies
- TASK-005 (Hero Section)

## 📁 Files to Touch
```
src/lib/data.ts
src/components/ui/ProjectCard.tsx
src/components/sections/ProjectsGrid.tsx
src/app/page.tsx
```

## 🔨 Build Steps
1. [ ] Chuẩn bị mock data trong `lib/data.ts`.
2. [ ] Thiết kế `ProjectCard` UI.
3. [ ] Xây dựng layout grid Bento phức tạp trong `ProjectsGrid`.
4. [ ] Thêm animation scroll và hover.
5. [ ] Tích hợp vào Home page.

## ✅ QA Checklist
- [ ] Bento grid không bị vỡ trên các độ phân giải màn hình khác nhau.
- [ ] Card hover mượt mà.
- [ ] Badge hiển thị rõ ràng.

---

## 🏁 Final Result
_Status check: Pending implementation_
