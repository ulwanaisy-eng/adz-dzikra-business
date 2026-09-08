# DZIKRA CMS

The storefront now includes a private product manager at `/admin`.

## What you can manage

- Add, edit, publish, or draft products.
- Upload multiple product images from the browser.
- Set prices, author, Arabic title, description, specifications, badge, and WhatsApp checkout link.
- Choose the featured product shown in the hero.
- Edit hero text and buttons.
- Edit collection heading/description.
- Toggle About, How to Order, and Contact sections.
- Show or hide an announcement bar.
- Update WhatsApp, Instagram, email, and pre-order form settings.

## How it works

The admin UI writes the catalog and homepage settings into `data/products.json` and `data/settings.json` through the GitHub Contents API. Each save creates a normal Git commit; Vercel then deploys the new commit automatically.

No GitHub Release or tag is required for product publishing.

## Vercel environment variables

Add these server-only variables in Vercel Project Settings → Environment Variables:

- `DZIKRA_ADMIN_PASSWORD`
- `GITHUB_CMS_TOKEN`
- `GITHUB_CMS_OWNER` = `ulwanaisy-eng` (optional)
- `GITHUB_CMS_REPO` = `adz-dzikra-business` (optional)
- `GITHUB_CMS_BRANCH` = `main` (optional)

The GitHub token must be allowed to write repository contents. Never prefix it with `NEXT_PUBLIC_`.

After adding/changing environment variables, redeploy the project.

## Admin URL

`https://www.dzikrapenerbit.com/admin`

