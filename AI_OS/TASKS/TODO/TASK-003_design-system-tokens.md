# TASK-003: Design System tokens

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-003 |
| **Title** | Setup Design System (Colors, Typography, Spacing) |
| **Project** | Portfolio HQ |
| **Priority** | 🔴 Critical |
| **Status** | TODO |
| **Estimated Time** | 1h |
| **Actual Time** | — |
| **Deadline** | 2026-04-12 |
| **Difficulty** | ⭐⭐ |

---

## 🎯 Objective
Định nghĩa hệ thống token màu sắc, font chữ và spacing chuyên nghiệp trong Tailwind CSS để đảm bảo tính nhất quán cho toàn bộ UI.

## 🤔 Why This Matters
Hệ thống token tốt giúp việc scale UI dễ dàng và duy trì design language đồng nhất. "Premium look" bắt đầu từ đây.

## 📐 Scope

**In Scope:**
- Cài đặt Google Fonts (Inter/Outfit).
- Định nghĩa bảng màu (Primary, Secondary, Accent, Background).
- Setup Dark/Light mode tokens.
- Cấu hình spacing & typography trong `tailwind.config.ts`.

**Out of Scope:**
- Animation (Framer Motion).
- UI Components cụ thể.

## 📦 Deliverables
- [ ] Google Fonts integration in `layout.tsx`.
- [ ] Tailwind CSS configuration updated.
- [ ] `globals.css` updated with CSS Variables.

## 🔗 Dependencies
- TASK-001 (Completed)

## 📁 Files to Touch
```
tailwind.config.ts
src/app/layout.tsx
src/app/globals.css
```

## 🔨 Build Steps
1. [ ] Import Google Fonts trong `src/app/layout.tsx`.
2. [ ] Định nghĩa CSS Variables trong `src/app/globals.css`.
3. [ ] Map CSS Variables vào `tailwind.config.ts`.
4. [ ] Verify bằng cách áp dụng class mới vào `page.tsx`.

## ✅ QA Checklist
- [ ] Fonts load đúng.
- [ ] Màu sắc hiển thị đúng theo pallet.
- [ ] Dark mode toggle (nếu có) phản hồi đúng token.

## 📝 Notes / Learnings
- Sử dụng bảng màu Slate hoặc Zinc cho Neutral.
- Accent color có thể dùng Indigo hoặc Blue.

---

## 🏁 Final Result
_Status check: Pending implementation_
