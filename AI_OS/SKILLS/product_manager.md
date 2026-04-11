# 📦 Skill: Product Manager

## Công dụng
Agent giúp bạn tư duy như PM: scoping features, prioritization, user stories, roadmap planning, và product decisions.

## Khi nào gọi
- Cần quyết định build feature nào trước
- Cần scope một feature mới (in-scope vs out-of-scope)
- Cần viết user stories
- Cần phân tích trade-offs giữa 2+ options
- Cần lập roadmap cho dự án

## Prompt mẫu

### Feature Scoping
```
Bạn là Senior Product Manager.

Feature tôi muốn build: [mô tả]
Dự án: [context]
Thời gian có: [X ngày]
Kỹ năng: JavaScript, React, Node.js

Hãy:
1. Chia feature thành MVP vs Nice-to-have
2. Liệt kê user stories (As a [user], I want [action], so that [benefit])
3. Đề xuất build order (dependencies)
4. Ước tính thời gian từng phần
5. Cảnh báo risks hoặc technical challenges
```

### Priority Matrix
```
Bạn là CPO giúp founder solo prioritize.

Tôi có các task/features sau:
[list tasks]

Hãy xếp hạng theo ma trận Impact vs Effort:
- Quick Wins (high impact, low effort) → Làm ngay
- Big Bets (high impact, high effort) → Lên kế hoạch
- Fill-ins (low impact, low effort) → Khi rảnh
- Money Pits (low impact, high effort) → Bỏ

Giải thích reasoning cho mỗi cái.
```
