# Galway Bouncy Castles — Deployment Guide

## Pre-deploy: 2 things needed from you

### 1. Formspree form ID (booking + contact form)
Without this, form submissions will fail.

**Option A (recommended):** Sign up at https://formspree.io, create a form, copy the ID (looks like `xpzgkqra`), then run:
```bash
cd site
sed -i '' 's/\[FORMSPREE-ID\]/your_actual_id/g' book/index.html pages/contact-galway-bouncy-castles/index.html
```
(Drop `''` after `-i` on Linux.)

**Option B (zero setup):** Replace the form action with a `mailto:` fallback that opens the user's email client. Less reliable but no third party. Tell me if you want this and I'll swap it.

### 2. Logo file `gblogo.png`
Site works without it — the `<img onerror>` hides it gracefully and the brand name still shows. To add:
- Drop `gblogo.png` (recommend ~120px tall, transparent background) into `site/`
- It will appear in the top-left of every page automatically

## Deploy steps

1. Push `site/` to a GitHub repo (or use Vercel CLI directly)
2. Connect repo to Vercel — output dir is the repo root if you push `site/` contents, or `site` if you push the parent folder
3. Set custom domain to `www.galwaybouncycastles.ie` (and apex `galwaybouncycastles.ie` redirecting to www)
4. Verify SSL is active (Vercel does this automatically)

## SEO / ranking preservation checklist

URL parity has been verified — all 28 URLs from the live sitemap exist as files at the same paths. No redirects needed.

**After DNS cutover:**
1. Submit `https://www.galwaybouncycastles.ie/sitemap.xml` in Google Search Console (Property → Sitemaps)
2. Use **URL Inspection** on 3-5 key pages and click "Request Indexing"
3. Check **Coverage** report 3-5 days later — should show 0 increase in 404s
4. Monitor **Performance** tab for 30 days — expect minor temporary dip during recrawl, recovery within 2-4 weeks

**Critical: do NOT change these without redirects:**
- The www subdomain (canonicals all point to `www.galwaybouncycastles.ie`)
- The trailing slash on all paths (Vercel `trailingSlash: true` enforces this)
- Any of the `/category/{slug}/{id}/{product-slug}/` URL structure

## What's already configured

- `vercel.json` — clean URLs, trailing slashes, 1yr cache on assets, security headers
- `robots.txt` — allows all, points at sitemap
- `sitemap.xml` — 29 URLs (root + 28 pages), matches live structure
- `404.html` — branded page, served by Vercel on missing routes
- Favicon — inline SVG (castle emoji on yellow), no external file needed
- Canonical URLs — set on every page, all use `https://www.galwaybouncycastles.ie/...`
- Open Graph + Twitter Card meta — present (no `og:image` yet — see below)

## Nice-to-have (post launch)

- **OG image** — add a 1200x630 social share image at `/og-image.jpg` and reference in each `<head>` with `<meta property="og:image" content="https://www.galwaybouncycastles.ie/og-image.jpg" />`
- **Real product photos** — current pages use emoji icons; live site has photos. Adding photos will improve conversion + image search traffic
- **Google Business Profile** — confirm the new site URL is reflected on your GBP listing
- **Analytics** — add GA4 or Plausible snippet before the closing `</head>` if you want traffic data
