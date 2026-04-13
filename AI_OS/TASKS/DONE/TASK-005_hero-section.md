# TASK-005: Hero Section (headline + subtle parallax + CTA)

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-005 |
| **Title** | Build High-Impact Hero Section with Parallax |
| **Project** | Portfolio HQ |
| **Priority** | 🔴 Critical |
| **Status** | TODO |
| **Estimated Time** | 3h |
| **Actual Time** | — |
| **Deadline** | 2026-04-13 |
| **Difficulty** | ⭐⭐⭐ |

---

## 🎯 Objective
Xây dựng trang Hero (màn hình đầu tiên) cực kỳ ấn tượng với tiêu đề mạnh mẽ, hiệu ứng Parallax đa tầng và kêu gọi hành động (CTA) rõ ràng.

## 🤔 Why This Matters
"3-Second Rule": Bạn chỉ có 3 giây để gây ấn tượng với recruiter. Hero section là bộ mặt của cả portfolio.

## 📐 Scope

**In Scope:**
- Headline & Subheadline (Typography theo TASK-003).
- Hiệu ứng Parallax (Mouse movement + Scroll interaction).
- Star system (Canvas) kế thừa từ bản cũ nhưng tối ưu cho React.
- CTA Button (Primary style).
- Scroll-down indicator.

**Out of Scope:**
- 3D models nặng (chỉ dùng layers 2D).
- Page transitions.

## 📦 Deliverables
- [ ] `src/components/sections/Hero.tsx`
- [ ] `src/components/ui/StarCanvas.tsx`
- [ ] `src/app/page.tsx` updated with Hero.

## 🔗 Dependencies
- TASK-004 (Layout components)

## 📁 Files to Touch
```
src/components/sections/Hero.tsx
src/components/ui/StarCanvas.tsx
src/app/page.tsx
```

## 🔨 Build Steps
1. [ ] Dựng khung HTML/CSS cho Hero.
2. [ ] Implement `StarCanvas.tsx` bằng React + Canvas.
3. [ ] Thêm logic Mouse Parallax bằng `framer-motion` (useMotionValue).
4. [ ] Thêm logic Scroll Parallax bằng `framer-motion` (useScroll).
5. [ ] Đánh bóng animation vào (fade-in, letter spacing animation).

## ✅ QA Checklist
- [ ] Parallax chạy mượt trên 60fps.
- [ ] Mobile responsive (tắt/giảm parallax trên mobile để save battery).
- [ ] Headline đọc rõ trên cả Light/Dark mode.

---

## 🏁 Final Result
_Status check: Pending implementation_
