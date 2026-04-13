# TASK-004: Layout component (Nav + Footer)

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-004 |
| **Title** | Create Responsive Navbar and Informative Footer |
| **Project** | Portfolio HQ |
| **Priority** | 🔴 Critical |
| **Status** | TODO |
| **Estimated Time** | 2h |
| **Actual Time** | — |
| **Deadline** | 2026-04-12 |
| **Difficulty** | ⭐⭐ |

---

## 🎯 Objective
Xây dựng 2 component quan trọng nhất của layout: Navbar (đa thiết bị) và Footer (thông tin bản quyền + mạng xã hội).

## 🤔 Why This Matters
Navbar và Footer xuất hiện trên mọi trang. Đây là nơi định hình khung sườn cho UX và navigation của portfolio.

## 📐 Scope

**In Scope:**
- Navbar: Mobile responsive (hamburger menu), sticky scroll, glassmorphism style.
- Footer: Copyright, Links, Social icons.
- Integration: Gắn vào `app/layout.tsx`.

**Out of Scope:**
- Logic Search nâng cao.
- Menu Login/Profile.

## 📦 Deliverables
- [ ] `src/components/sections/Navbar.tsx`
- [ ] `src/components/sections/Footer.tsx`
- [ ] `app/layout.tsx` updated.

## 🔗 Dependencies
- TASK-001 (Completed)
- TASK-003 (Completed)

## 📁 Files to Touch
```
src/components/sections/Navbar.tsx
src/components/sections/Footer.tsx
src/app/layout.tsx
```

## 🔨 Build Steps
1. [ ] Create Navbar component with mobile support.
2. [ ] Create Footer component.
3. [ ] Import and wrap `{children}` in `src/app/layout.tsx`.
4. [ ] Verify responsiveness.

## ✅ QA Checklist
- [ ] Navbar dính (sticky) khi scroll.
- [ ] Hamburger menu hoạt động trên mobile.
- [ ] Footer hiển thị đúng info.

## 📝 Notes / Learnings
- Sử dụng `framer-motion` cho animation menu mobile nếu cần sang chảnh hơn.

---

## 🏁 Final Result
_Status check: Pending implementation_
