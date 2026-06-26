# Deployment Guide — Adz Dzikra

## Prerequisites
- GitHub account
- Vercel account (free tier is sufficient)
- Git installed locally

---

## Step 1: Push to GitHub

### Option A: Create a new repository via GitHub CLI
```bash
gh repo create adz-dzikra --public --source=. --remote=origin --push
```

### Option B: Manual GitHub setup
1. Go to https://github.com/new
2. Repository name: `adz-dzikra`
3. Keep it public or private (your preference)
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"
6. Then run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/adz-dzikra.git
git push -u origin main
```

Verify the push:
```bash
git log --oneline
git remote -v
```

---

## Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub account and find `adz-dzikra`
4. Click **"Import"**
5. Framework: **Next.js** (auto-detected)
6. Root Directory: leave as `.`
7. Build Command: `npm run build` (auto-detected)
8. Output Directory: `.next` (auto-detected)
9. Click **"Deploy"**

⏱ First deployment takes ~2 minutes.

---

## Step 3: Verify the Deployment

After deployment completes:
- Visit your Vercel URL (e.g., `adz-dzikra.vercel.app`)
- Confirm all sections load correctly
- Test all WhatsApp links
- Test Instagram link
- Test email links
- Confirm floating WhatsApp button works

---

## Future Updates

Every `git push` to `main` automatically triggers a new Vercel deployment:

```bash
# Make changes locally
git add -A
git commit -m "feat: describe your changes"
git push origin main
# Vercel auto-deploys in ~60 seconds
```

---

## Custom Domain (Optional)

1. In Vercel dashboard → Project Settings → Domains
2. Add your custom domain (e.g., `adz-dzikra.com`)
3. Update your DNS records as instructed by Vercel
4. Vercel provides free SSL automatically

---

## Environment Variables

No environment variables required for this project. All contact information is hardcoded in `app/page.tsx`.

To update contact information, edit the constants at the top of `app/page.tsx`:
```typescript
const WA_NUMBER = "6288200002979";
const WA_MSG = "...";
const IG_URL = "https://instagram.com/dzikracomppublishers";
const EMAIL = "dzikracompofficial05@gmail.com";
```

---

## Troubleshooting

**Build fails on Vercel?**
- Run `npm run build` locally first — must pass before pushing
- Check the Vercel build logs for TypeScript errors

**WhatsApp link not working?**
- Ensure the number format is correct: `6288200002979` (country code + number, no + or spaces)

**Fonts not loading?**
- Google Fonts requires internet access — they load on the live site
