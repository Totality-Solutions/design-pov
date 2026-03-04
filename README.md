# Design POV — Website 2.0

A design publication, a cultural movement, a living archive.

Built with **Next.js 14**, **Sanity CMS**, **Tailwind CSS**, and **Framer Motion**.

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local` and fill in your credentials:
```bash
cp .env.local .env.local
```

Required variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — from sanity.io/manage
- `SANITY_API_TOKEN` — from sanity.io/manage > API
- `HUBSPOT_ACCESS_TOKEN` — from HubSpot > Settings > Integrations > Private Apps

### 3. Create your Sanity project
```bash
npx sanity init
```
Then copy your Project ID into `.env.local`.

### 4. Run the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Run Sanity Studio (CMS)
```bash
npm run sanity
```
Open [http://localhost:3333](http://localhost:3333)

---

## Project Structure

```
design-pov/
├── app/
│   ├── (marketing)/          # All public pages
│   ├── (dashboard)/          # Phase 2 — member logins
│   └── api/                  # Server-side API routes
├── components/               # Reusable UI components
├── lib/sanity/               # Sanity client + GROQ queries
├── sanity/schemas/           # CMS content schemas
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript definitions
└── public/                   # Static assets
```

## Key Pages (Phase 1)

| Route | Page |
|---|---|
| `/` | Home — Living Manifesto |
| `/about` | About Design POV |
| `/2026` | 2026 Edition Hub |
| `/2026/theme` | Sense & Sensibility |
| `/2026/core` | Core Collective Grid |
| `/2026/core/[studio]` | Individual Studio Page |
| `/2026/design-partners` | Sponsor Showcase |
| `/2026/circle` | Panel Programme |
| `/2026/visit` | Waitlist + FAQs |
| `/journal` | Editorial Index |
| `/journal/[slug]` | Article Page |
| `/apply` | Partner Hub (6 funnels) |
| `/ecosystem/*` | Originals, Elevate, Edits, Objects |

## CMS Content Types

| Schema | Manages |
|---|---|
| `studio` | Core Collective pages |
| `journalPost` | All journal articles |
| `speaker` | Circle programme |
| `sponsor` | Design partners |
| `author` | Journal authors |
| `siteSettings` | Global nav/SEO |

## Deployment

Deploy to [Vercel](https://vercel.com) in one click:
1. Push to GitHub
2. Connect repo to Vercel
3. Add all `.env.local` variables to Vercel environment settings
4. Deploy

---

## Phase 2 Roadmap

- [ ] Ticketing — Stripe/Razorpay integration
- [ ] Core Dashboard — Studio member login (NextAuth)
- [ ] Brand Dashboard — Brand collaborator portal
- [ ] POV Objects — E-commerce layer
- [ ] Journal paywall — Subscription via Stripe

---

Built for Design POV · Mumbai · 2026
