# Galway Bouncy Castles - Website

Multi-page static site built for SEO preservation of https://www.galwaybouncycastles.ie/

## Structure

- `index.html` - Homepage
- `category/{slug}/index.html` - 4 category pages
- `category/{slug}/{id}/{product-slug}/index.html` - 18 product pages
- `pages/testimonials/index.html` - Reviews (matches legacy URL)
- `pages/contact-galway-bouncy-castles/index.html` - Contact (matches legacy URL)
- `about/index.html`, `areas/index.html`, `faq/index.html`, `book/index.html`
- `styles.css` - Shared stylesheet (~27KB)
- `script.js` - Shared JS (chat, mobile nav, area/weather checker, scroll reveal)
- `sitemap.xml`, `robots.txt`
- `vercel.json` - Vercel deployment config with clean URLs and caching

## URL Preservation

Every URL from the live site has a direct 1:1 mapping:
- `/` -> `/`
- `/category/obstacle-courses` -> `/category/obstacle-courses/`
- `/category/obstacle-courses/17/jaws-the-shark-high-slide-obstacle-course` -> same path
- `/pages/testimonials` -> `/pages/testimonials/`
- `/pages/contact-galway-bouncy-castles` -> same path

No redirects needed. All existing backlinks and Google-indexed URLs remain valid.

## TODO before deploy

1. Replace `[FORMSPREE-ID]` in `book/index.html` and `pages/contact-galway-bouncy-castles/index.html` with your actual Formspree form ID
2. Add real product photos (currently using emoji placeholders in `.card-img` and `.hero-visual`)
3. Upload `gblogo.png` to root (or remove the `<img>` reference in the nav brand)

## Regenerating the site

Edit `data.py` to add/remove products or update prices/testimonials, then:

```
python3 generate.py
```

Output goes to `site/`. Push that directory to GitHub and deploy on Vercel.

## Deploy on Vercel

```
cd site
vercel --prod
```

Or connect the GitHub repo to Vercel - it auto-deploys on push.

## SEO checklist

- [x] Canonical URLs on every page
- [x] Per-page title + meta description
- [x] Open Graph + Twitter Card tags
- [x] LocalBusiness schema (EntertainmentBusiness) on every page
- [x] Per-product Product + Offer schema
- [x] Per-category ItemList schema
- [x] BreadcrumbList schema on all subpages
- [x] FAQPage schema on home + FAQ page
- [x] Review schema on testimonials page
- [x] Sitemap.xml with all URLs
- [x] Robots.txt
- [x] Mobile-first responsive design
- [x] All internal links use relative paths
