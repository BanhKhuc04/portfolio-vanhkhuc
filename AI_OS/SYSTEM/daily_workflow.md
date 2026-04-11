# ⚙️ Daily Workflow — VK Builder Mode

> Quy trình hàng ngày cho solo technical builder. Không có team, không có meeting, chỉ có OUTPUT.

---

## 🌅 MORNING BOOT (15 phút — trước khi code)

```
1. Mở AI_OS/COMMAND_CENTER/today.md
2. Review TASKS/IN_PROGRESS/ — có gì đang dở không?
3. Chọn TOP 3 tasks cho hôm nay (không được chọn hơn 3)
4. Ghi vào today.md:
   - Task 1: [tên] — estimated Xh
   - Task 2: [tên] — estimated Xh  
   - Task 3: [tên] — estimated Xh
5. Move task files từ TODO/ → IN_PROGRESS/
6. Commit: "🎯 Daily plan: [task names]"
```

**Nguyên tắc:** Nếu không biết làm gì → mở `_master_list.md` → chọn task tiếp theo trong Execution Order.

---

## 🔨 BUILD SESSION (4-6 tiếng — deep work)

### Session 1: Heavy Lift (2-3h)
```
- Task khó nhất / quan trọng nhất trong ngày
- Phone im lặng
- Không mở YouTube / Reddit / X
- Chỉ mở: VS Code + Browser (localhost) + Antigravity
- Nếu stuck > 30 phút → gọi AI Agent debug
```

### Break (15-30 phút)
```
- Đứng dậy, uống nước, đi lại
- KHÔNG check social media
```

### Session 2: Medium Tasks (2-3h)
```
- Task 2 và 3 trong ngày
- Hoặc tiếp tục task 1 nếu chưa xong
- Commit thường xuyên (mỗi feature nhỏ = 1 commit)
```

### Quy tắc khi code:
```
✅ Viết code → test ngay → commit
✅ Stuck? → rubber duck 30s → AI agent → google
✅ Xong 1 task? → move file sang REVIEW/ hoặc DONE/
✅ Phát hiện bug? → ghi vào BACKLOG, KHÔNG fix ngay (trừ khi blocking)
❌ KHÔNG refactor khi đang build feature mới
❌ KHÔNG chuyển task giữa chừng
❌ KHÔNG thêm scope vào task đang làm
```

---

## 🌙 EVENING SHUTDOWN (15 phút — sau khi code)

```
1. Tạo file: LOGS/daily/YYYY-MM-DD.md
2. Ghi 3 dòng:
   ✅ Done: [Đã hoàn thành gì]
   📚 Learned: [Học được gì hôm nay]
   🎯 Tomorrow: [Mai sẽ làm gì]
3. Update task status (move files nếu cần)
4. git add + git commit + git push
5. Đóng VS Code. Xong.
```

---

## 📅 WEEKLY REVIEW (Chủ nhật, 30 phút)

```
1. Tạo: LOGS/weekly/week-XX.md
2. Trả lời:
   - Tuần này đã ship gì?
   - Task nào bị stuck? Tại sao?
   - Tuần sau focus gì?
   - Có cần thay đổi priority không?
3. Update _master_list.md (đánh dấu % progress)
4. Move task DONE cũ → ARCHIVE nếu cần
5. Chọn 5-7 tasks cho tuần tới → move vào TODO/
```

---

## 🚀 SHIP PROTOCOL (Mỗi khi deploy)

```
1. Chạy ship_checklist.md
2. Test trên mobile + desktop
3. Lighthouse audit > 90
4. Ghi vào LOGS/ship_log.md:
   - Ngày: YYYY-MM-DD
   - Shipped: [Tên feature/version]
   - Link: [URL]
   - Impact: [Ảnh hưởng gì]
5. Post lên LinkedIn/X (optional nhưng recommended)
```

---

## ⚡ EMERGENCY PROTOCOLS

### Khi bị overwhelmed:
```
→ Đóng hết tabs
→ Mở today.md
→ Chỉ làm task 1
→ Xong task 1 mới nghĩ tiếp
```

### Khi không có motivation:
```
→ Làm task dễ nhất trong TODO/ (5 phút)
→ Momentum sẽ tự kéo bạn đi tiếp
```

### Khi stuck kỹ thuật:
```
→ Mô tả vấn đề bằng text (30 giây)
→ Gọi AI Agent "debug_master"
→ Nếu vẫn stuck → ghi vào BLOCKED, chuyển task khác
→ Quay lại sau khi có context mới
```
