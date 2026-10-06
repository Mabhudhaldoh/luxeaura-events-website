# LuxeAura Events

Marketing website for **LuxeAura Events**, a (fictional) luxury event design and styling studio based in Harare, Zimbabwe. Built as a static single-page application with React and Vite.

> This is a demonstration project. The studio, its team, projects, testimonials and contact details are fictional, and the Privacy Policy copy is placeholder text that has not been reviewed by a lawyer.

## Features

- **Seven routes** — Home, About, Services, Portfolio, Contact, Privacy and a custom 404.
- **Editorial portfolio** — 12 projects across 5 categories with animated filtering and a full-screen gallery viewer (arrow keys, swipe, thumbnails, neighbour preloading, focus trap).
- **Route-level code splitting** — the landing page is eager; every other route is a lazy chunk.
- **SEO** — per-route title, description, canonical URL, Open Graph, Twitter card, robots directive and JSON-LD, plus `robots.txt` and `sitemap.xml`.
- **Accessible by construction** — semantic landmarks, a skip link, visible focus rings, focus trapping and scroll locking in overlays, `aria-live` status regions, `prefers-reduced-motion` support, and labelled form fields.
- **Validated enquiry form** — client-side validation, inline errors, focus management, and pending/success/error states. See [Connecting the form](#connecting-the-form) before going live.
- **Responsive** — verified from 320px to 1920px with no horizontal scrolling.
- **Zero runtime dependencies beyond React and React Router** — fonts are self-hosted via Fontsource, images are lazy-loaded with `srcset`.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 8 (Rolldown) |
| Routing | React Router 7 (declarative mode) |
| Language | JavaScript (JSX) |
| Styling | Global design tokens + CSS Modules |
| Fonts | Playfair Display & Inter (variable, self-hosted) |
| Linting | Oxlint |
| Photography | Unsplash CDN |

## Getting started

Requires Node.js 20.19+ or 22.12+ (developed on Node 24).

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot module replacement |
| `npm run build` | Produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally to verify it |
| `npm run lint` | Lint all source with Oxlint |
| `npm run lint:fix` | Lint and apply safe automatic fixes |
| `npm run check` | Run lint and build together — use this before pushing |

## Project structure

```
.
├── index.html                  # Document shell, base SEO, JSON-LD
├── vite.config.js
├── public/                     # Copied verbatim into dist/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── _redirects              # SPA fallback (Netlify-style hosts)
└── src/
    ├── main.jsx                # Entry point: router, fonts, global styles
    ├── App.jsx                 # Layout, routes, lazy loading
    ├── data/                   # All content lives here — no copy in components
    │   ├── site.js             # Brand, nav, contact, social links
    │   ├── images.js           # Image registry + CDN URL helpers
    │   ├── services.js
    │   ├── portfolio.js
    │   ├── process.js
    │   ├── differentiators.js
    │   ├── testimonials.js
    │   └── studio.js           # About page narrative, team, stats
    ├── hooks/                  # useMediaQuery, useScrolled, useScrollLock, useFocusTrap
    ├── utils/                  # seo, validation, format helpers
    ├── styles/                 # Design tokens, reset, typography, layout, animation
    ├── components/
    │   ├── layout/             # Navbar, Footer, Logo, ScrollToTop, BackToTop
    │   ├── sections/           # Homepage and shared page sections
    │   ├── ui/                 # Button, Reveal, SmartImage, SectionHeading
    │   ├── cards/              # ServiceCard, PortfolioCard
    │   ├── gallery/            # Lightbox, Gallery
    │   ├── forms/              # ContactForm, NewsletterForm
    │   └── seo/                # Seo component
    └── pages/                  # One file per route
```

## Editing content

Almost everything a visitor reads lives in `src/data/`. You should not need to touch a component to change copy, add a project or swap an image.

**Adding a portfolio project** — append to `projects` in `src/data/portfolio.js`:

```js
{
  id: 'my-project',            // becomes the deep link: /portfolio#my-project
  name: 'Project Name',
  category: 'wedding',         // must match a category id
  location: 'Harare',
  year: '2026',
  summary: 'One line for the card and the lightbox.',
  image: 'weddingReception',   // a key from src/data/images.js
  images: ['weddingReception', 'weddingFloral', 'weddingTable'],
  span: 'wide',                // wide | standard | tall
  featured: true,              // optional: shows on the homepage
}
```

**Adding an image** — add an entry to `images` in `src/data/images.js` with a unique key, an Unsplash photo id and alt text that describes what is actually in the photograph. Every image is requested through the CDN with a correct aspect ratio, so the browser never downloads a file larger than it needs.

## Design system

| Token group | Location |
| --- | --- |
| Colour, spacing, type scale, easing, z-index | `src/styles/tokens.css` |
| Reset, focus rings, skip link, shared section primitives | `src/styles/base.css` |
| Fluid display typography | `src/styles/typography.css` |
| Container and grid system | `src/styles/layout.css` |
| Reveal, marquee and reduced-motion rules | `src/styles/animations.css` |

To rebrand, change the custom properties in `tokens.css`. Components reference tokens rather than literal colours, so a palette change is a one-file edit.

## Accessibility

- Landmarks, one `h1` per page, and a logical heading order.
- A "Skip to main content" link is the first focusable element.
- The mobile menu and the gallery viewer trap focus, restore focus on close, and close on `Escape`.
- Form errors are linked to their inputs with `aria-describedby` and announced with `role="alert"`.
- Submission results are announced through a polite live region.
- All motion is disabled under `prefers-reduced-motion: reduce`, and the testimonial rotator does not autoplay in that mode.
- Decorative images are `aria-hidden`; meaningful images carry descriptive alt text.

## Connecting the form

`submitEnquiry` in `src/utils/validation.js` currently simulates a network request so the pending and success states can be demonstrated. It contains no credentials. To make the form live, replace the body of that function with a `fetch` to a real endpoint (Formspree, a serverless function or your own API) and keep the existing `pending` / `success` / `error` contract so the UI keeps working unchanged.

## Deployment

The build output in `dist/` is fully static.

### Render

1. Push this repository to GitHub.
2. In Render, choose **New → Static Site** and connect the repository.
3. Configure:
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. Add a **rewrite** rule so client-side routes fall back to `index.html`:

   ```
   /*  /index.html  200
   ```

5. Deploy. Render assigns a subdomain; set a custom domain under **Settings → Custom Domains**.

`public/_redirects` already covers Netlify-style hosts. On Render the rewrite rule above is the equivalent.

### Before launch

- [ ] Replace the placeholder Privacy Policy with reviewed legal copy.
- [ ] Update `site.url`, `contact.email`, `contact.phone` and `socialLinks` in `src/data/site.js`.
- [ ] Bump `site.copyrightYear` if you deploy in a later year.
- [ ] Connect the enquiry form to a real endpoint.
- [ ] Set `site.shareImage` to a self-hosted 1200×630 image if you produce one.
- [ ] Update `sitemap.xml` and `robots.txt` if the domain changes.

## Future improvements

- Connect the enquiry and newsletter forms to a real backend.
- Add a case-study route per project for deeper storytelling.
- Consider CMS integration so content can be edited without a deploy.
- Add a lightbox zoom control for full-resolution viewing.
- Self-host photography and add an image CDN with art-directed crops.

## Credits

Photography from [Unsplash](https://unsplash.com) under the Unsplash Licence (free for commercial and non-commercial use, no attribution required). Typefaces are [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter), distributed via [Fontsource](https://fontsource.org) under the SIL Open Font License 1.1.