# TASK-008: "Currently Building" live status

## 📋 Task Info

| Field | Value |
|-------|-------|
| **ID** | TASK-008 |
| **Title** | Create "Currently Building" Live Status Component |
| **Project** | Portfolio HQ |
| **Priority** | 🟢 Low |
| **Status** | TODO |
| **Estimated Time** | 1h |
| **Actual Time** | — |
| **Deadline** | 2026-04-13 |
| **Difficulty** | ⭐ |

---

## 🎯 Objective
Tạo một component nhỏ (badge hoặc card) hiển thị dự án bạn đang tập trung làm việc nhất hiện nay. Điều này tạo cảm giác website luôn chủ động và được cập nhật.

## 🤔 Why This Matters
Tạo sự tương tác và tin cậy. Recruiter thấy được bạn đang thực sự "active" trong việc build sản phẩm.

## 📐 Scope

**In Scope:**
- UI card nhỏ gọn.
- "Streaming" animation (pulse effect).
- Mock data trạng thái.

**Out of Scope:**
- Real-time backend integration (làm sau với CMS).

## 📦 Deliverables
- [ ] `src/components/ui/LiveStatus.tsx`.
- [ ] Integrated vào Hero hoặc Projects Grid.

## 🔗 Dependencies
- TASK-005 (Hero Section)

## 📁 Files to Touch
```
src/components/ui/LiveStatus.tsx
src/components/sections/Hero.tsx
```

## 🔨 Build Steps
1. [ ] Thiết kế component `LiveStatus` với blinking dot.
2. [ ] Thêm vào góc hoặc phía dưới headline của Hero section.
3. [ ] Viết nội dung mock: "Building Portfolio HQ v1.0".

## ✅ QA Checklist
- [ ] Pulse effect mượt mà.
- [ ] Chống vỡ layout trên mobile.

---

## 🏁 Final Result
_Status check: Pending implementation_
