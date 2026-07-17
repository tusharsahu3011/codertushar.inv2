# codertushar.in

The official coming-soon / waitlist landing page for **[codertushar.in](https://codertushar.in)** — a platform for beginner-friendly programming notes, learning roadmaps, real projects, tutorials, resources, and a growing developer community.

Built with a dark, developer-first aesthetic — terminal windows, code snippets, and a live launch countdown — to give visitors a feel for what's coming before the site goes live.

---

## ✨ Features

- **Animated hero terminal** — a typewriter-style terminal simulating a real `npm run dev` → deploy session, triggered only when it scrolls into view (`useInView`), so it never wastes cycles off-screen.
- **Floating code & terminal windows** — subtle floating `CodeWindow` and `TerminalWindow` widgets for visual flavor.
- **Feature grid** — six color-coded cards (Notes, Roadmaps, Projects, Tutorials, Resources, Community), each with its own icon and accent color.
- **Live launch countdown** — days / hours / minutes / seconds to launch, computed client-side and hydration-safe (no SSR/client mismatch flicker).
- **Waitlist / newsletter signup**
  - Cloudflare Turnstile bot verification (invisible challenge)
  - Duplicate-email detection — already-registered users get **one** reminder email, never spammed on repeat submits
  - Fully accessible, keyboard-safe, single-submit-path form (no accidental auto-submits)
  - Emails stored in Supabase, welcome email sent via Resend
- **Resilient logo** — navbar logo falls back to a styled "CT" mark if the image fails to load, and quietly retries loading the real logo in the background (up to 5 attempts, 5s apart) without needing a page refresh.
- **Fully responsive, dark-mode-only UI** built with Tailwind CSS and Framer Motion micro-interactions throughout.

---

## 🛠️ Tech Stack

| Layer            | Tech                                                   |
| ----------------- | ------------------------------------------------------- |
| Framework          | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language           | TypeScript                                               |
| Styling            | Tailwind CSS                                             |
| Animation          | Framer Motion                                            |
| Database           | [Supabase](https://supabase.com) (waitlist storage)      |
| Transactional Email| [Resend](https://resend.com)                             |
| Bot Protection     | [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) |
| Icons              | lucide-react, react-icons                                |
| Deployment         | [Vercel](https://vercel.com)                             |

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/codertushar-dev/codertushar.in.git
cd codertushar.in
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Resend
RESEND_API_KEY=your_resend_api_key
```

### 3. Database setup

The waitlist table needs a `duplicate_reminder_sent_at` column so repeat signups only ever get **one** reminder email:

```sql
alter table waitlist
add column if not exists duplicate_reminder_sent_at timestamptz;
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

### 5. Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```
app/
  actions/
    newsletter.ts        # Server action: validation, Turnstile check, Supabase insert, Resend email
  favicon.ico
  icon.png
  apple-icon.png
  layout.tsx
  page.tsx

components/
  countdown/
    Countdown.tsx         # Launch countdown (hydration-safe)
  features/
    Features.tsx
    FeatureCard.tsx
  newsletter/
    Newsletter.tsx         # Waitlist signup form
  terminal/
    Terminal.tsx           # Animated hero terminal
  navbar/
    Navbar.tsx             # Logo + status pill, with retry-on-failure logo
  footer/
    Footer.tsx             # Social links + copyright
  ui/
    Container.tsx
    Section.tsx
    Card.tsx
    Reveal.tsx

constants/
  site.ts                  # siteConfig: name, description, launchDate, status, copyright

public/
  logo-icon.png             # Navbar logo asset
```

---

## 📦 Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/new), the creators of Next.js:

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add the environment variables from `.env.local` in the Vercel project settings.
4. Deploy 🚀

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more.

---

## 🔗 Links

- Website: [codertushar.in](https://codertushar.in)
- GitHub: [@codertushar-dev](https://github.com/codertushar-dev)
- Instagram: [@coder.tushar](https://instagram.com/coder.tushar)
- LinkedIn: [tusharsahu3011](https://linkedin.com/in/tusharsahu3011)

---

## 📄 License

This project is personal / proprietary to Tushar Kumar Sahu. All rights reserved unless stated otherwise.