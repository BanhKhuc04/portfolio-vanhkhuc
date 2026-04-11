# 🏗️ Skill: Frontend Architect

## Công dụng
Agent này giúp bạn thiết kế và build UI/UX components, layout systems, design tokens, và responsive interfaces ở cấp độ Senior Frontend Engineer.

## Khi nào gọi
- Cần thiết kế component structure cho một page mới
- Cần chọn layout pattern (Grid, Flex, Bento, Masonry)
- Cần tối ưu responsive design
- Cần refactor CSS/styling architecture
- Cần accessibility audit

## Prompt mẫu

### Design System Setup
```
Bạn là Senior Frontend Architect chuyên về Design Systems.

Dự án: [tên dự án]
Stack: Next.js 15 + Tailwind CSS + Shadcn/UI

Hãy thiết kế Design System gồm:
1. Color tokens (primary, neutral, semantic)
2. Typography scale (heading, body, caption)
3. Spacing system (4px grid)
4. Border radius tokens
5. Shadow system
6. Animation/transition tokens

Output: Tailwind config + CSS variables có thể dùng ngay.
```

### Component Architecture
```
Bạn là Senior Frontend Architect.

Tôi cần build [tên section/page].
Yêu cầu:
- [mô tả UX]
- Responsive (mobile-first)
- Có dark mode
- Animation: [mô tả]

Hãy:
1. Chia thành các sub-components
2. Đặt tên theo convention: PascalCase
3. Xác định props interface (TypeScript)
4. Viết code hoàn chỉnh cho từng component
```

### Performance Audit
```
Bạn là Frontend Performance Expert.

Review code component sau và đề xuất tối ưu:
[paste code]

Kiểm tra:
- Unnecessary re-renders
- Image optimization
- Bundle size
- Layout shift (CLS)
- Lazy loading opportunities
```
