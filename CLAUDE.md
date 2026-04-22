# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `app/` directory.

- `npm run dev` — Vite dev server on port 3000 (`vite.config.ts`).
- `npm run build` — Type-checks with `tsc -b` then builds with Vite. Build fails on TS errors.
- `npm run lint` — ESLint over the repo (flat config in `eslint.config.js`).
- `npm run preview` — Serve the production build locally.

No test runner is configured.

## Architecture

Single-page marketing site for a security-services brand. **Vite + React 19 + TypeScript SPA** — not Next.js, no SSR, no router (despite `react-router` being installed, it is unused; `App.tsx` renders a single page composed of section components).

### Page composition model

`src/App.tsx` is the whole app. It mounts `Header` + an ordered list of section components (`Hero`, `StatsBar`, `Services`, `WhyChooseUs`, `Industries`, `Testimonials`, `CTABanner`, `Contact`) + `Footer`. Page structure is edited by reordering/adding imports in `App.tsx`, not via a router. `src/pages/Home.tsx` exists but is not wired up.

### Scroll / animation stack

`App.tsx` owns a single global setup: Lenis smooth-scroll is dynamically imported and its `raf` is driven by GSAP's ticker, with `lenis.on('scroll', ScrollTrigger.update)` bridging Lenis into GSAP's `ScrollTrigger`. **All section-level scroll animations must use GSAP `ScrollTrigger`** so they stay in sync with Lenis — do not use IntersectionObserver or CSS scroll-linked animations for scroll-tied effects, and do not instantiate a second Lenis instance. Cleanup in `App.tsx` kills all `ScrollTrigger`s on unmount.

### UI system

shadcn/ui (New York style, slate base, Lucide icons) configured in `components.json`. Components live in `src/components/ui/` and are imported via the `@/` alias (maps to `src/`, configured in both `vite.config.ts` and `tsconfig.app.json`). Utility merging helper is `@/lib/utils` (`cn`).

### Theming

Tailwind v3 with a dual color system in `tailwind.config.js`:
- **Brand palette** (hardcoded hex): `deep-navy`, `midnight`, `gold`, `gold-light`, `ice-white`, `slate`, `gold-glow`, `border-subtle`, `overlay-dark`. Use these for the site's visual identity.
- **shadcn tokens** (CSS variables, e.g. `hsl(var(--primary))`): used by `components/ui` primitives. Variables are defined in `src/index.css`.

Fonts: `font-inter` (body) and `font-mono` → JetBrains Mono.

### Key config notes

- `vite.config.ts` sets `base: './'` (relative asset paths — the build is deployable as a static bundle from any subpath) and includes the `kimi-plugin-inspect-react` plugin alongside `@vitejs/plugin-react`.
- Two tsconfigs: `tsconfig.app.json` (app code, defines the `@/*` path alias) and `tsconfig.node.json` (Vite config). Root `tsconfig.json` only references them.
- ESLint flat config extends `@eslint/js` recommended + `typescript-eslint` recommended + React Hooks (recommended-latest) + React Refresh (vite). `dist/` is ignored.
