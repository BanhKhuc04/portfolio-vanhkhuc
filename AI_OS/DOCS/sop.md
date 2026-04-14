# Standard Operating Procedures (SOPs)

This document dictates how the user and the AI (VK-OS Agent) must collaborate.

## 1. Giao Tiếp Lệnh (Prompting Standard)
When the user gives a command, the AI must:
- Check `COMMAND_CENTER/today.md` for context.
- Audit the existing code using specific APIs (never raw bash grep/cat).
- Give a concise response avoiding motivational fluff.
- Execute autonomously if clear.

## 2. Code Commits
- Use Atomic commits: One feature/fix per commit.
- Prefixes: `feat:`, `fix:`, `docs:`, `ui:`, `refactor:`, `chore:`.

## 3. PR & QA (Ship Checklist)
Before marking any feature as SHIPPED:
- Run `npm run build` to catch TS errors.
- Ensure all responsive break points are tested.
- Update `AI_OS/LOGS/ship_log.md`.
