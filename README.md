# Attendance Checker

Sentimental overhaul of a 2020 University of Prishtina *Programim i Distribuar* project: login → weekly timetable → WebRTC classroom room with chat and a simple presence sidebar.

Originally built with classmates; kept alive so Dependabot stops yelling and the code is less embarrassing to open.

## What changed in the overhaul

- Default branch is **`main`** (replacing `master`)
- Dependencies modernized; unused / vuln-heavy packages removed (`webpack-dev-server`, `bcrypt-nodejs`, `inquirer`, legacy `mysql`, Socket.IO 2, etc.)
- Passwords hashed with **bcrypt**; seed data no longer stores plaintext `0000`
- Config via **`.env`** (`SESSION_SECRET`, DB credentials, `APP_URL`)
- Auth/schema aligned on a single `users` table (was split between `login` / `users` and broken)
- Passport: one `deserializeUser`, proper logout, flash messages on EJS login/signup
- Static assets under `public/`; Socket.IO 4 client loaded from the same origin
- XSS-safer presence rendering; session cookies tightened (`httpOnly`, `sameSite`)

## Quick start

Requirements: Node 18+, MySQL/MariaDB.

```bash
cp .env.example .env
# edit DB_* and SESSION_SECRET

mysql -u root < sql/schema.sql
npm install
npm start
```

Open http://localhost:3000

Demo users are seeded in `sql/schema.sql`. Password for all of them: `0000`

## Scripts

| Command | Purpose |
|---|---|
| `npm start` | Run the server |
| `npm run dev` | Run with nodemon |
| `npm run hash-password -- <text>` | Print a bcrypt hash for SQL inserts |

## Project layout

```
app/routes.js          Express routes
config/                Passport + DB config
db.js                  mysql2 pool
public/                CSS, JS, images
sql/schema.sql         Schema + seed users
views/                 EJS templates (login, signup, table, room)
server.js              HTTP + Socket.IO entrypoint
```

## Notes

This is a classroom demo, not a production product. WebRTC uses a public Google STUN server; there is no TURN, no HTTPS, and no hardened auth beyond local sessions. Fine for nostalgia and local demos — not for real student data on the public internet.
