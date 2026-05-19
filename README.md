# 🦞 SmallBizClaw

An AI-powered business assistant for small business owners — built with Express, PostgreSQL, and OpenClaw. Business owners chat naturally on Telegram to log sales, track expenses, set reminders, and get summaries. No app to download, no dashboard to learn.

## Demo

> Owner texts: *"I made a $75 sale today for a beard trim"*
> Bot replies: *"Logged! $75 beard trim recorded for May 19, 2026."*

> Owner texts: *"How did I do this week?"*
> Bot replies: *"This week: $320 in sales, $45 in expenses. Net: $275."*

## Tech Stack

| Layer | Tech |
|---|---|
| Runtime | Node.js + Express |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle |
| AI Agent | OpenClaw |
| Messaging | Telegram Bot API |
| Deployment | Railway |

## Features

- **Log sales** — just text it naturally, AI figures out the amount and description
- **Log expenses** — same natural language flow
- **Daily & weekly summaries** — ask anytime, get real numbers from the database
- **Reminders** — set reminders that fire automatically via cron job
- **API key auth** — each business gets their own key, multi-tenant ready
- **Zero frontend** — Telegram IS the UI

## Architecture

```
Telegram Message
      ↓
OpenClaw Agent (reads SOUL.md for instructions)
      ↓
Express REST API (Railway)
      ↓
PostgreSQL (Neon)
```

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/sales` | Log a sale |
| GET | `/api/sales/log` | Log a sale via query params (for AI agents) |
| POST | `/api/expenses` | Log an expense |
| GET | `/api/expenses/log` | Log an expense via query params (for AI agents) |
| GET | `/api/summary/daily` | Today's totals |
| GET | `/api/summary/weekly` | This week's totals |
| POST | `/api/reminders` | Create a reminder |
| GET | `/api/reminders/pending` | Get unsent reminders |
| GET | `/health` | Health check |

All routes are protected by `x-api-key` header or `apiKey` query parameter.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- OpenClaw installed
- Telegram bot token (from @BotFather)

### Installation

```bash
git clone https://github.com/arshiyakhy/smallbizclaw
cd smallbizclaw
npm install
```

### Environment Variables

Create a `.env` file:
```
DATABASE_URL=postgresql://...
PORT=3000
```

### Database Setup

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

### Run Locally

```bash
npm run dev
```

### Deploy

This project is configured for Railway. Connect your GitHub repo and add the `DATABASE_URL` environment variable.

## Project Structure

```
smallbizclaw/
├── src/
│   ├── routes/
│   │   ├── sales.js
│   │   ├── expenses.js
│   │   ├── summary.js
│   │   └── reminders.js
│   ├── middleware/
│   │   └── auth.js
│   └── cron.js
├── db/
│   ├── index.js
│   └── schema.js
├── drizzle.config.js
└── index.js
```

## Business Model

This project is designed to be sold to small businesses at $29-49/month per business. Each business gets a unique API key and connects via their existing Telegram account — no app to install, no training required.

## License

MIT
