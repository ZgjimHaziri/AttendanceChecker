# Attendance Checker

Classroom attendance app with login, a weekly timetable, and a WebRTC video room with chat and a presence sidebar.

## Quick start

Requires Node 18+ and MySQL/MariaDB.

```bash
cp .env.example .env
# edit DB_* and SESSION_SECRET

mysql -u root < sql/schema.sql
npm install
npm start
```

Open http://localhost:3000

Seeded demo password: `0000`

## Scripts

| Command | Purpose |
|---|---|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm run hash-password -- <text>` | Print a bcrypt hash |
