# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page / product guide website for "NombreApp" — a mobile/web productivity application. Built with React 19 + TypeScript + Vite 7 using the SWC plugin for fast refresh.

## Commands

- **Dev server:** `npm run dev` — starts Vite dev server with HMR
- **Build:** `npm run build` — runs TypeScript type-check (`tsc -b`) then Vite production build
- **Lint:** `npm run lint` — ESLint with flat config (eslint.config.js)
- **Preview:** `npm run preview` — serves the production build locally

## Architecture

This is a single-page application with all UI in `src/App.tsx` (~595 lines). There is no routing, no state management library, and no API calls — it is a static marketing/landing page.

**Key patterns in App.tsx:**
- **Custom hook `useInView()`** — wraps Intersection Observer for scroll-triggered fade-in animations
- **Inline styles only** — all styling uses React inline style objects; no CSS-in-JS library. A `COLORS` constant object defines the palette (primary: `#1B1F3B`)
- **Component composition** — `FadeIn`, `DotPattern`, `PhoneMockup`, `FloatingCard`, `IconCircle` are all defined in the same file and composed together in section components (`Navbar`, `HeroSection`, `OverviewSection`, `FeaturesSection`, `StepsSection`, `CTASection`)

**Entry point:** `src/main.tsx` renders `<App />` inside React StrictMode into `#root`.

## TypeScript

Strict mode is enabled. The project uses a references-based tsconfig setup:
- `tsconfig.json` — root, references app and node configs
- `tsconfig.app.json` — application code (target ES2022, JSX react-jsx, bundler module resolution)
- `tsconfig.node.json` — build tooling (target ES2023)

`noUnusedLocals` and `noUnusedParameters` are both enabled.

## Dependencies

Minimal: only `react` and `react-dom` as runtime dependencies. All other packages are devDependencies (TypeScript, ESLint, Vite).

## No Test Framework

There is currently no test runner or test files configured.
