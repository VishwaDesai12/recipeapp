# RecipeApp 

A Recipe Management Application built with Next.js 16 (App Router), TypeScript, Redux Toolkit, Context API, Tailwind CSS, and shadcn/ui.

## Features

- Browse and filter recipes (category, difficulty, dietary tags, search, cook time)
- Recipe detail page with live ingredient scaling and unit conversion (metric - imperial)
- Per-step countdown timers (only one active at a time)
- Rate recipes with running average
- Personal cookbook — save/unsave, persisted to localStorage
- Create/edit recipes with dynamic ingredient + step editors including reorder
- Dark/light theme toggle (persisted)
- Proxy middleware protecting /manage routes via `chef_token` cookie

## Tech Stack

Next.js 16 · TypeScript (strict) · Redux Toolkit · Context API · Tailwind CSS · shadcn/ui (base-ui)

tion: `NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




