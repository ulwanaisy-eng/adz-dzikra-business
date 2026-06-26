# Adz Dzikra — Premium Islamic Publishing

A premium website for Adz Dzikra, a classical Islamic publishing house built on three decades of Arabic typesetting and book layout expertise since 1992.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS variables
- **Font**: Amiri (Google Fonts) for Arabic script, Georgia for display
- **Deployment**: Vercel (via GitHub integration)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Deployment

This project is deployed to Vercel via GitHub integration.

### Steps to Deploy

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/adz-dzikra.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New → Project"
   - Import your GitHub repository
   - Keep all default settings (Next.js is auto-detected)
   - Click "Deploy"

3. **Auto-deploy on push**
   - Every `git push` to `main` will automatically redeploy via Vercel's GitHub integration

## Contact Information

- **WhatsApp**: [0882-0000-2979](https://wa.me/6288200002979)
- **Instagram**: [@dzikracomppublishers](https://instagram.com/dzikracomppublishers)
- **Email**: dzikracompofficial05@gmail.com

## Project Structure

```
adz-dzikra/
├── app/
│   ├── globals.css      # Design tokens, animations, utility classes
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Complete single-page website
├── public/              # Static assets
├── package.json
└── README.md
```

## Design System

### Colors
- `--gold: #B8973A` — Primary brand gold
- `--gold-light: #D4AF5A` — Lighter gold for headings
- `--gold-muted: #8A6E2A` — Muted gold for secondary elements
- `--dark: #0F0E0C` — Primary background
- `--dark-2: #1A1814` — Alternating section background
- `--cream: #FAF7F2` — Primary text color

### Typography
- **Display**: Georgia (serif) — headings, pull quotes, hero
- **Body/UI**: System UI (sans-serif) — labels, captions, navigation
- **Arabic**: Amiri — Arabic script

## Content Policy

This website contains:
- ✅ Real contact information
- ✅ Truthful publisher heritage (since 1992)
- ✅ Accurate statistics
- ✅ Placeholder collection cards (no fictional books)
- ✅ Placeholder testimonials (no fictional reviews)
- ❌ No fake prices, book titles, or cover images
- ❌ No fictional scholars or customer names
