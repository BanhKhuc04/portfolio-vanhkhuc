# 🧠 VK-OS — Personal AI Operating System

> Hệ điều hành cá nhân của vanhkhuc. Quản lý toàn bộ coding, portfolio, AI agents, projects và career growth.

## Architecture

```
AI_OS/
├── COMMAND_CENTER/          # 🎯 Bảng điều khiển hàng ngày
│   ├── today.md             # Task hôm nay (top 3)
│   ├── this_week.md         # Sprint tuần này
│   └── monthly_review.md    # Review tháng
│
├── PROJECTS/                # 💼 Tất cả dự án
│   ├── _master_list.md      # Danh sách tổng + trạng thái
│   ├── portfolio-hq/        # Website vanhkhuc.dev
│   ├── admin-cms/           # Admin Dashboard
│   ├── ai-recruiter-bot/    # Recruiter Chatbot
│   ├── saas-demo/           # SaaS showcase project
│   └── github-branding/     # GitHub profile optimization
│
├── TASKS/                   # ✅ Kanban Board dạng file
│   ├── BACKLOG/             # Chưa bắt đầu, ý tưởng thô
│   ├── TODO/                # Đã refine, sẵn sàng build
│   ├── IN_PROGRESS/         # Đang làm (max 3 cùng lúc)
│   ├── REVIEW/              # Build xong, cần QA
│   ├── DONE/                # Hoàn thành, đã ship
│   └── _templates/          # Task template chuẩn
│
├── SKILLS/                  # 🤖 AI Agent Skill Library
│   ├── frontend_architect.md
│   ├── backend_builder.md
│   ├── debug_master.md
│   ├── seo_writer.md
│   ├── recruiter_optimizer.md
│   ├── product_manager.md
│   ├── code_reviewer.md
│   └── content_creator.md
│
├── PROMPTS/                 # 📝 Prompt Library
│   ├── coding/
│   ├── writing/
│   ├── design/
│   └── strategy/
│
├── LOGS/                    # 📊 Build Logs & Progress
│   ├── daily/               # Ghi chép hàng ngày
│   ├── weekly/              # Weekly review
│   └── ship_log.md          # Mọi thứ đã ship
│
├── DOCS/                    # 📚 Tài liệu hệ thống
│   ├── tech_decisions.md    # Tại sao chọn stack X
│   ├── architecture.md      # Kiến trúc tổng thể
│   └── sop.md               # Quy trình chuẩn
│
├── IDEAS/                   # 💡 Idea Bank
│   ├── project_ideas.md
│   ├── feature_ideas.md
│   └── content_ideas.md
│
├── SYSTEM/                  # ⚙️ Config & SOP
│   ├── daily_workflow.md    # Quy trình mỗi ngày
│   ├── build_mode.md        # Focus protocol
│   └── ship_checklist.md    # Pre-ship QA
│
└── ARCHIVE/                 # 🗄️ Dự án/task đã xong hoàn toàn
```

## Nguyên tắc vận hành

1. **Mỗi sáng mở `COMMAND_CENTER/today.md`** — Chọn top 3 task, không hơn.
2. **Mỗi task là 1 file `.md`** — Move giữa BACKLOG → TODO → IN_PROGRESS → DONE.
3. **Mỗi tối ghi `LOGS/daily/`** — 3 dòng: Đã làm gì, Học được gì, Mai làm gì.
4. **Mỗi tuần ship 1 thứ** — Ghi vào `LOGS/ship_log.md`.
5. **IN_PROGRESS tối đa 3 task** — Quá 3 = mất focus = chết.

---
*Initialized: 2026-04-12 | Owner: vanhkhuc*
