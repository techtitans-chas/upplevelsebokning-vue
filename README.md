# Hourglass Adventures

Lightweight Vue 3 + Vite time-travel booking demo app with Pinia state, Vue Router, and Tailwind CSS.

## Quick overview
- Tech: Vue 3, TypeScript, Vite, Pinia, Vue Router, TailwindCSS (UnoCSS)
- App serves JSON data from `public/data/*` and images from `public/images/*`.
- Vite `base` is set for GitHub Pages when building (see `vite.config.ts`).

## Requirements
- Node 18+ (or a modern LTS)
- npm or yarn

## Install & run
1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
# opens on http://localhost:5173 by default
```


## Important project notes
- Static data lives in `public/data/*.json` and images in `public/images/*`. Files in `public/` are served as root-relative assets (e.g. `/images/foo.jpg`).
- Code includes a small composable `useAssetUrl` that prepends `import.meta.env.BASE_URL` so components can safely resolve public assets both in dev and when deployed to a subpath.
- Data fetching uses `src/composables/useDataLoader.ts` which automatically prepends the base URL when fetching JSON files.

## Routing & route guards
- Router is defined in `src/router.ts`. If you deploy to a subpath (GitHub Pages), make sure the router history uses the same base as Vite (the project already sets this during create).
- When using Pinia stores inside route guards, import the store dynamically (via `import()` inside the guard) to avoid accessing stores before the app has installed Pinia.

## Project structure (top-level)
- `public/` — static JSON and images
- `src/` — source code
  - `main.ts` — app entry (router + pinia installed)
  - `router.ts` — route definitions
  - `stores/` — Pinia stores
  - `components/` — UI components (Card, Section, etc.)
  - `composables/` — helpers (`useDataLoader`, `useAssetUrl`)

## Deployment (GitHub Pages)
1. Build the project: `npm run build`
2. Copy the `dist/` output to the `gh-pages` branch or use any deployment action (GitHub Action or `gh-pages` npm package). The app expects to be served from `/upplevelsebokning-vue/` in production (this value is already set in `vite.config.ts`).
