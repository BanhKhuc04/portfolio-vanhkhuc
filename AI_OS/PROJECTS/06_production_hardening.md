# 🔥 PROJECT 6: Production Hardening & Security Lockdown

> **Status:** 🔴 P0 - CRITICAL (Sửa ngay lập tức trước khi public)
> **Goal:** Vá toàn bộ lỗ hổng bảo mật, tối ưu database, dọn dẹp nợ kỹ thuật (Technical Debt) để hệ thống thực sự đạt chuẩn Production thay vì chỉ là bản Demo.

## CHUẨN ĐOÁN HỆ THỐNG (AUDIT RESULT)
- **Điểm sẵn sàng Release:** 45/100 (TRƯỢT)
- **UI/UX:** 95/100 (Xuất sắc)
- **Kiến trúc Code & Tốc độ:** 60/100 (Cần tối ưu pagination & cache)
- **Security:** 0/100 (Admin panel phơi bày 100% ra public)

---

## 🛠 ROADMAP TRIỂN KHAI (CHI TIẾT 4 GIAI ĐOẠN)

### PHASE 1: SECURITY SHIELD & ACCESS CONTROL (CRITICAL)
*Lý do: Backend Admin API hoàn toàn mở. Có thể dùng Postman gửi request xoá trắng Data mà không cần login.*

- [ ] **TASK-049: JWT Authentication Setup**
  - Cài đặt thư viện `jsonwebtoken` và `@types/jsonwebtoken`.
  - Rewrite `/api/admin/auth/route.ts`: Xác thực `ADMIN_PASSWORD` xong sẽ mã hoá ra token JWT (kèm thời hạn 12 tiếng) và Set-Cookie `HttpOnly` `Secure` về trình duyệt. Cookie tên là `vk_admin_session`.
- [ ] **TASK-050: Next.js Edge Middleware**
  - Tạo `src/middleware.ts`.
  - Config matcher chạy trên tất cả các route `/api/admin/*` VÀ front-end `/admin`.
  - Loại trừ `/api/admin/auth` ra khỏi filter.
  - Logic: Đọc Cookie `vk_admin_session`. Decode JWT bằng secret key. Nếu sai hoặc hết hạn -> Redirect về trang 401 hoặc `/admin?login=false`.
- [ ] **TASK-051: Frontend Admin Auth Refactory**
  - Bỏ lưu auth ở `sessionStorage` trong `src/app/admin/page.tsx` (cực kỳ không an toàn vì bị XSS là mất quyền điều khiển).
  - Khai báo AuthGate kiểm tra qua API Validate Cookie.
- [ ] **TASK-052: Rà soát & Loại bỏ Secret Leaks**
  - Xoá `DATABASE_URL` cứng khỏi `.env`.
  - Xoá lịch sử git chứa password DB. Thiết lập `.env.example` trống. Đưa toàn bộ key lên Vercel Project Settings.

### PHASE 2: DATABASE & PERFORMANCE TUNING
*Lý do: Không có database indexes sẽ dẫn tới Full-Table Scan cực chậm. API Admin thay đổi data nhưng không báo cho UI update lại (Thiếu Cache Revalidation).*

- [ ] **TASK-053: Missing Indexing (Schema Optimization)**
  - Mở `schema.prisma`. 
  - Đánh `@@index([featured])` cho Project.
  - Đánh `@@index([published])` cho Blog.
  - Đánh `@@index([category])` cho Skill.
  - Đánh `@@index([sessionId])` cho ChatMessage.
  - Chạy `npx prisma migrate dev --name db_optimization`.
- [ ] **TASK-054: Backend Pagination & Limit Protection**
  - Trong `/api/admin/activity` và `/api/admin/chat-logs`, chặn load vô hạn bằng cách thêm `take: 100` và `orderBy`. Tránh bị Out of Memory.
- [ ] **TASK-055: Next.js Data Revalidation Strategy**
  - Import `revalidatePath` từ `next/cache`.
  - Tất cả các API `POST, PUT, DELETE` trong `admin/*` sau khi Prisma query thành công phải gọi hàm `revalidatePath('/')`, `revalidatePath('/blog')`, v.v... để refresh data SSR, tránh trường hợp trang chủ bị hiển thị data cũ.
- [ ] **TASK-056: API Rate Limiting**
  - Bảo vệ `/api/chat/recruiter` (Đang gọi Gemini). Nếu không khoá, người xấu spam script gọi AI sẽ làm "cháy" account limit. (Có thể làm đơn giản ở Middleware chặn IP spam hơn 10 req/phút).

### PHASE 3: TECHNICAL DEBT & ARCHITECTURE REFACTOR
*Lý do: Component `admin/page.tsx` quá khổng lồ (hơn 1300 lines).*

- [ ] **TASK-057: Admin Monolith Componentization**
  - Tách logic Projects ra thành `src/components/admin/ProjectManager.tsx`.
  - Tách logic Blogs ra thành `src/components/admin/BlogManager.tsx`.
  - Tách logic SEO, Analytics ra component riêng.
  - `page.tsx` chỉ còn đóng vai trò Shell (Bộ vỏ bọc Layout) và gọi component.
- [ ] **TASK-058: Centralized Error Handling**
  - Implement chuẩn hóa Response từ Server (`{ data, error, message }`) thay vì try/catch rối loạn ở từng file.

### PHASE 4: FINAL PRODUCTION TEST
- [ ] **TASK-059: End-to-End Test (E2E)**
  - Audit lại điểm Lighthouse.
  - Check lại Cookie bảo vệ trên Postman.
  - Đảm bảo Admin Dashboard load cực nhanh khi tách component.

---
**Approval State:** WAITING FOR REVIEW.
