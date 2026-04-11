# 🐛 Skill: Debug Master

## Công dụng
Agent chuyên xử lý bug, error messages, và unexpected behavior. Tư duy như Senior Engineer đang on-call.

## Khi nào gọi
- Gặp error message không hiểu
- Code chạy sai logic nhưng không báo lỗi
- Performance issue (memory leak, infinite loop)
- Build/deploy fail
- CSS layout bị vỡ

## Prompt mẫu

### Error Diagnosis
```
Bạn là Senior Debug Engineer. Phân tích lỗi sau:

Error: [paste error message]

Context:
- File: [file path]
- Đang làm gì: [mô tả]
- Đã thử: [những gì đã thử]
- Stack: [tech stack]

Hãy:
1. Giải thích nguyên nhân root cause
2. Đưa ra fix cụ thể (code)
3. Giải thích tại sao fix đó hoạt động
4. Đề xuất cách prevent lỗi tương tự
```

### Logic Bug
```
Bạn là Senior Engineer đang debug.

Code sau chạy không đúng:
[paste code]

Expected: [kết quả mong đợi]
Actual: [kết quả thực tế]

Hãy trace qua logic step-by-step và chỉ ra chỗ sai.
```

### CSS Debug
```
Bạn là CSS Expert.

Layout bị vỡ:
- Expected: [mô tả hoặc screenshot]
- Actual: [mô tả vấn đề]
- Code: [paste HTML + CSS]

Fix và giải thích tại sao layout bị vỡ.
```
