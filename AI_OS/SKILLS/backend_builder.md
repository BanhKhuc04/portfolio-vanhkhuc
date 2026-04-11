# 🔧 Skill: Backend Builder

## Công dụng
Agent giúp thiết kế API routes, database schema, server logic, authentication flow và data pipelines.

## Khi nào gọi
- Cần thiết kế database schema mới
- Cần viết API endpoint (REST hoặc Server Actions)
- Cần setup authentication flow
- Cần optimize database queries
- Cần cấu trúc error handling

## Prompt mẫu

### Database Schema Design
```
Bạn là Senior Backend Engineer + Database Architect.

Dự án: [tên]
Database: PostgreSQL (Supabase)
ORM: Prisma

Tôi cần schema cho: [mô tả feature]

Yêu cầu:
- Normalized đúng chuẩn (3NF khi cần)
- Có indexes cho query phổ biến
- Có timestamps (createdAt, updatedAt)
- Relations rõ ràng
- Migration-safe (không break data cũ)

Output: Prisma schema + giải thích design decisions.
```

### API Route
```
Bạn là Senior Fullstack Engineer.

Stack: Next.js 15 App Router + Prisma + Supabase

Viết API route cho: [mô tả]

Yêu cầu:
- Input validation (Zod)
- Error handling có message rõ ràng
- Auth check nếu cần
- Return proper HTTP status codes
- TypeScript strict

Output: Hoàn chỉnh file route.ts
```
