# ✅ Pre-Ship Checklist

> Chạy checklist này TRƯỚC KHI deploy bất kỳ thứ gì lên production.

## 🔍 Code Quality
- [ ] Không có `console.log` debug thừa
- [ ] Không có TODO/FIXME chưa xử lý
- [ ] TypeScript không có `any` không cần thiết
- [ ] Error handling đầy đủ (try/catch, error boundaries)

## 🎨 UI/UX
- [ ] Responsive: Mobile (375px) ✓
- [ ] Responsive: Tablet (768px) ✓
- [ ] Responsive: Desktop (1440px) ✓
- [ ] Dark mode hoạt động đúng
- [ ] Font loading ok (không flash)
- [ ] Images có alt text
- [ ] Loading states cho async content
- [ ] Empty states cho list trống

## ⚡ Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse SEO > 90
- [ ] No layout shift (CLS < 0.1)
- [ ] Images optimized (WebP, lazy load)
- [ ] Bundle size reasonable

## 🔐 Security
- [ ] Không expose API keys trong frontend
- [ ] Auth routes được protect
- [ ] Input validation trên server
- [ ] CORS configured đúng

## 📱 Cross-browser
- [ ] Chrome ✓
- [ ] Safari ✓
- [ ] Firefox ✓
- [ ] Mobile Safari ✓

## 🌐 SEO
- [ ] Title tag unique cho mỗi page
- [ ] Meta description có
- [ ] Open Graph tags (title, description, image)
- [ ] Sitemap.xml
- [ ] robots.txt

## 🚀 Deploy
- [ ] Environment variables đúng
- [ ] Build command chạy thành công
- [ ] Preview deploy test ok
- [ ] DNS/domain configured (nếu lần đầu)

## 📝 Post-Deploy
- [ ] Verify live site hoạt động
- [ ] Ghi vào ship_log.md
- [ ] Commit message rõ ràng
- [ ] Tag version nếu cần
