# Hackathon auth & registration (local setup)

## Prerequisites

1. **MongoDB** running locally (`mongodb://localhost:27017/firststephack`)
2. **Auth0 (local)** — same as FirstStep `firststep_frontend-main` → **`local`** profile (callback `http://localhost:5173` is already allowed). API stays on **port 5000** (FirstStep local uses 3001; hackathon does not):
   - `VITE_API_BASE_URL`: `http://localhost:5000`
   - Domain: `dev-nbbimthvhvjioper.us.auth0.com`
   - SPA: `8cVxmXxDjWQZkkZ3Fo3tuqyQWKr0BbVh`
   - Audience: `https://dev-nbbimthvhvjioper.us.auth0.com/api/v2/`
   - **Production** (`auth.firststepjob.com`): SPA `b8FeZorUljdYnE8olnBA2FMM3RdJFyVv`
   - For Render/dev tenant (`rZdCSh2…` on `dev-0yrs1pb6s37h8s6u`), use `npm run dev:development` and add `http://localhost:5173` in Auth0 dashboard

## Run locally

### API (terminal 1)

```bash
cd backend
npm install
npm run dev
```

API: http://localhost:5000

### Frontend (terminal 2)

```bash
cd protothon2021.webflow.io
npm install
npm run dev
```

App: http://localhost:5173

## Flow

1. **Claim your spot** → Auth0 (FirstStep account)
2. **/sprint** → dashboard (read-only until registration approved)
3. **Complete registration** → Zoho form (same email as Auth0)
4. Ops sets `accountStatus: "active"` in MongoDB on `hackathonusers` collection

## Test Zoho webhook (curl)

```bash
curl -X POST http://localhost:5000/api/webhooks/zoho/registration \
  -H "Content-Type: application/json" \
  -H "x-zoho-secret: local-dev-zoho-secret" \
  -d "{\"Email\":\"you@example.com\",\"First Name\":\"Test\",\"Last Name\":\"User\"}"
```

## Activate a user (MongoDB)

```js
db.hackathonusers.updateOne(
  { email: "you@example.com" },
  { $set: { accountStatus: "active", activatedAt: new Date() } }
)
```

## Production (later)

| Item | Value |
|------|--------|
| Frontend | https://hack-q28v.onrender.com |
| API | Deploy `backend/` as Render Web Service |
| `VITE_API_BASE_URL` | Your API URL |
| Auth0 callbacks | Add `https://hack-q28v.onrender.com` |
| Zoho webhook | `https://<api>/api/webhooks/zoho/registration` |

Env profiles in `backend/.env-cmdrc.json` (same pattern as FirstStep backend):

| Command | Profile | MongoDB |
|---------|---------|---------|
| `npm run dev` | `development` | `firststep-usa-dev` Atlas (`firststep_db`) |
| `npm start` | `production` | `firststep-usa-prod` Atlas (`firststep_db`) |

Hackathon data uses **dedicated collections** in that database (not FirstStep `users`):

`hackathon_users`, `hackathon_teams`, `hackathon_submissions`, `hackathon_tasks`, `hackathon_task_progress`, `hackathon_referrals`, `hackathon_social_proofs`, `hackathon_judge_scores`, `hackathon_announcements`, `hackathon_config` — created automatically on first write.

Override secrets on Render for production (`JWT_*`, `ZOHO_WEBHOOK_SECRET`).
