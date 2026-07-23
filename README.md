# Siddhi Gaikwad — Portfolio

A premium, editorial UI/UX portfolio built with Next.js 15, MongoDB, Framer Motion and Resend.

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** v20+ → https://nodejs.org
- **Yarn** → `npm install -g yarn`
- **MongoDB** — pick one:
  - **Local** (Community): https://www.mongodb.com/try/download/community
  - **Atlas cloud (recommended for beginners)** — free tier: https://cloud.mongodb.com

### 2. Configure environment

The `.env` file is already included. If you want to use MongoDB Atlas (cloud) instead of local Mongo:

1. Sign up at https://cloud.mongodb.com and create a free M0 cluster
2. In `Network Access`, add IP `0.0.0.0/0` (allow all)
3. In `Database Access`, create a user
4. Copy the connection string
5. Open `.env` and replace the `MONGO_URL` line with your Atlas string

### 3. Install dependencies

```bash
yarn install
```

This takes 2–3 minutes the first time.

### 4. Run the dev server

```bash
yarn dev
```

Open **http://localhost:3000** — the portfolio loads.

### 5. Admin dashboard

Visit **http://localhost:3000/admin**
- Email: `admin@siddhi.com`
- Password: `siddhi2025`

You'll see all contact form submissions, can mark them Read/Replied/Archived, delete, export CSV.

---

## 📁 Project structure

```
siddhi-portfolio/
├── app/
│   ├── page.js                       Main portfolio (all sections + case studies)
│   ├── layout.js                     SEO metadata + JSON-LD structured data
│   ├── globals.css                   Global styles + fonts + animations
│   ├── admin/page.js                 Hidden admin dashboard UI
│   ├── api/[[...path]]/route.js      Backend API (contact, admin, analytics, resume)
│   ├── opengraph-image.jsx           Auto-generated OG image for social shares
│   ├── twitter-image.jsx             Auto-generated Twitter card image
│   ├── sitemap.js                    Dynamic sitemap.xml
│   └── robots.js                     Dynamic robots.txt
├── components/ui/                    shadcn UI primitives (Button, Input, etc.)
├── lib/utils.js                      cn() helper for merging Tailwind classes
├── public/
│   ├── favicon.svg
│   └── assets/portfolio/             ALL your project images, video, resume
├── .env                              Secrets (DO NOT commit)
├── .gitignore
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json                     For @/ import alias
└── components.json                   shadcn config
```

---

## 📡 API endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET  | `/api` | Health check |
| POST | `/api/contact` | Submit contact form → stores in Mongo + emails via Resend |
| POST | `/api/newsletter` | Newsletter subscribe |
| POST | `/api/analytics` | Track page views + project clicks |
| GET  | `/api/download/resume` | Downloads resume PDF, tracks count |
| POST | `/api/admin/login` | Admin login |
| GET  | `/api/admin/contacts` | List messages (auth required) |
| PUT  | `/api/admin/contacts` | Update message status |
| DELETE | `/api/admin/contacts` | Delete message |
| GET  | `/api/admin/stats` | Dashboard stats |

---

## 🎨 Design tokens (see `app/globals.css`)

- **Background:** `#FCFAF6` (warm cream)
- **Cards:** `#FFFFFF`
- **Primary text:** `#1D1D1D`
- **Secondary text:** `#666666`
- **Borders:** `#ECE8E3`
- **Hover:** `#F4F1EB`
- **Accents:** pastel blue `#EAF4FF`, pink `#FBEFF4`, green `#EAF8F0`, lavender `#F2EEFF`

**Fonts:** *Instrument Serif* (display) + *DM Sans* (body) — loaded from Google Fonts.

---

## 🚀 Deploying to production

**Vercel** (recommended for Next.js):

1. Push this folder to a GitHub repo
2. Import at https://vercel.com/new
3. Add all `.env` variables in Vercel dashboard → Settings → Environment Variables
4. Update `NEXT_PUBLIC_BASE_URL` to your production domain (e.g. `https://siddhigaikwad.com`)
5. Deploy

**MongoDB Atlas** connection string will work as-is in production.

**Custom domain:** Add it in Vercel → Settings → Domains, then update DNS.

---

## ⚠️ Security

**Never commit `.env` to a public repo.** The Resend API key inside can send emails from your account, and the admin password can access all messages.

If you accidentally push `.env`:
1. Immediately rotate the Resend key at https://resend.com/api-keys
2. Change `ADMIN_PASSWORD` in `.env`

The `.gitignore` already excludes `.env`, but double-check with `git status` before pushing.

---

## ✏️ Common content updates

**Change project details:**
- Edit the `PROJECTS` array in `app/page.js` (around line 104)

**Update social links:**
- Edit the `socials` array in the `Footer` component (around line 630)
- And the links in the `Contact` component (around line 570)

**Replace resume PDF:**
- Drop new PDF at `public/assets/portfolio/me/resume.pdf`

**Change portrait:**
- Replace `public/assets/portfolio/me/profile.jpg`

**Add a new project:**
- Add images to `public/assets/portfolio/images/<ProjectName>/`
- Add an entry to `PROJECTS` in `app/page.js`
- Optionally add a new case study function (see `YourGateCase`, `FlaraCase`, `MojitoCase` for reference)

---

## 🐛 Troubleshooting

| Problem | Fix |
|--------|-----|
| `MONGO_URL is not defined` | `.env` missing or typo |
| Port 3000 in use | `yarn dev -p 3001` (change port) |
| `EACCES` on install (mac/linux) | `sudo yarn install` |
| Images broken | Check `public/assets/portfolio/` exists with subfolders |
| Atlas connection fails | Whitelist your IP: Atlas → Network Access → Add `0.0.0.0/0` |
| Resend emails not sending | Owner email works. Visitor auto-reply requires a verified custom domain on Resend (free tier limit) |
| Fonts look wrong on first load | Google Fonts needs internet — normal |
| `Module not found` | Delete `node_modules` and re-run `yarn install` |

---

## 📦 Tech stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 18, Tailwind CSS 3, shadcn/ui, Framer Motion 11
- **Icons:** lucide-react
- **Toasts:** sonner
- **Database:** MongoDB (native driver)
- **Email:** Resend (via HTTP API)
- **Deployment:** Vercel-ready

---

Built with ♥ by Siddhi Gaikwad.
