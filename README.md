# spark-services

Marketing site for **Spark Services**, built with **Nuxt 4** + **Vue 3** and styled with **Tailwind CSS v4**.

## Tech stack

- **Nuxt**: routing + SSR/SSG (`nuxt dev/build/preview/generate`)
- **Tailwind CSS**: via `@tailwindcss/vite` (see `app/assets/css/main.css`)
- **VueUse Motion**: animation helpers
- **vee-validate**: form validation (contact form)
- **lucide-vue-next**: icon set

## Requirements

- **Node.js**: 18+ recommended
- **Package manager**: npm (this repo includes `package-lock.json`)

## Getting started

Install dependencies:

```bash
npm install
```

Run the dev server (defaults to `http://localhost:3000`):

```bash
npm run dev
```

## Scripts

```bash
# Dev server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Static generation (if deploying as static)
npm run generate
```

## Project structure

Nuxt is using the `app/` directory.

- **Pages (routes)**: `app/pages/`
  - `app/pages/index.vue` — home
  - `app/pages/about.vue` — about
  - `app/pages/faq.vue` — FAQ
  - `app/pages/cleaning.vue` — cleaning service page
  - `app/pages/gardening.vue` — gardening service page
  - `app/pages/removals.vue` — removals service page
- **Reusable sections/components**: `app/components/`
  - `AppNavbar.vue`, `AppFooter.vue`
  - `HeroSection.vue`, `FaqSection.vue`, `ContactUsSection.vue`, etc.
- **Layout**: `app/layouts/default.vue` (wraps navbar/footer around pages)
- **Styles**: `app/assets/css/main.css` (Tailwind import + theme tokens)
- **Static files**: `public/` (e.g. `public/robots.txt`)

## Where to edit content

- **Navigation / footer**: `app/components/AppNavbar.vue`, `app/components/AppFooter.vue`
- **Home page sections**: `app/pages/index.vue` and referenced components in `app/components/`
- **Service pages**: `app/pages/cleaning.vue`, `app/pages/gardening.vue`, `app/pages/removals.vue`
- **FAQ content**: `app/components/FaqSection.vue` and `app/pages/faq.vue`

## Deployment notes

- **Node server**: use `npm run build` then `npm run preview` (or run the output with your preferred Node host).
- **Static hosting**: use `npm run generate` and deploy the generated output.

For Nuxt deployment options, see the Nuxt docs: `https://nuxt.com/docs/getting-started/deployment`.
