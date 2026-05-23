# Postgres Setup

1. Create a local database for this project:

```sql
CREATE DATABASE cbmc;
```

2. Copy `.env.example` to `.env` and replace `YOUR_PASSWORD`.

3. Generate Prisma Client:

```bash
npm run db:generate
```

4. Create and apply the first migration:

```bash
npm run db:migrate -- --name init
```

5. Seed the first Super Admin and Admin accounts:

```bash
npm run db:seed:admins
```

The seed command prints generated temporary passwords. Both users are marked `mustChangePassword`.

6. Open Prisma Studio:

```bash
npm run db:studio
```
