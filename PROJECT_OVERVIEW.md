# Tổng quan Dự án Portfolio — vanhkhuc.dev

Dưới đây là bản tóm tắt chi tiết về mã nguồn, chức năng và kiến trúc của dự án portfolio của bạn.

## 🚀 Mục đích chính
Trang web được thiết kế như một **Hồ sơ năng lực cá nhân (Personal Portfolio)** cao cấp, tập trung vào việc giới thiệu kỹ năng lập trình sản phẩm, các công cụ tự phát triển và thương hiệu cá nhân **vanhkhuc**.

## ✨ Những điểm nổi bật & Chức năng
- **Giao diện Pro Max:** Sử dụng Vanilla CSS với các kỹ thuật hiện đại (Glassmorphism, gradients, micro-animations) mang lại cảm giác premium.
- **Hệ thống Parallax Đa tầng:** Phần Hero sử dụng nhiều lớp layer di chuyển với tốc độ khác nhau, tạo hiệu ứng không gian 3D ấn tượng.
- **Đa ngôn ngữ (i18n):** Hệ thống chuyển đổi Tiếng Anh - Tiếng Việt tức thì, không tải lại trang, lưu trữ tùy chọn người dùng qua `localStorage`.
- **Dark/Light Mode:** Hỗ trợ giao diện sáng/tối đồng bộ toàn diện.
- **Hiệu năng Tối ưu:** Xây dựng hoàn toàn bằng HTML/CSS/JS thuần, không phụ thuộc vào framework nặng, giúp tốc độ tải trang cực nhanh.
- **Thống kê Trực quan:** Các con số thống kê tự động chạy hiệu ứng khi người dùng cuộn tới.

## 📁 Cấu trúc Tập tin

### 🔹 Lõi Giao diện (Frontend Core)
- `index.html`: Cấu trúc HTML5 chuẩn SEO, chứa các section: Hero, Stats, About, Projects, Tools, Blog, Contact.
- `style.css`: Hệ thống thiết kế (Design System), variables và layout chung.
- `hero.css`: Các animation và style đặc thù cho phần Hero Parallax.

### 🔹 Logic & Tính năng (JavaScript)
- `main.js`: Xử lý tương tác chung (Navbar, menu mobile, scroll animations, counters).
- `parallax.js`: Trái tim của hiệu ứng chiều sâu trên trang web.
- `i18n.js`: Engine xử lý logic đa ngôn ngữ.
- `translations.js`: Từ điển nội dung cho cả hai ngôn ngữ EN và VI.

### 🔹 Quản trị (Admin)
- `admin.js` & `admin.css`: Các tệp tin dành cho giao diện quản lý nội dung.

---
*Tài liệu này được tạo tự động bởi Antigravity để tóm tắt trạng thái hiện tại của dự án.*
