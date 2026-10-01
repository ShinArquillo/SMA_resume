# SMA Resume

Interactive resume website built with Next.js.

## Getting Started

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## QA

Lint and typecheck:
```bash
npm run lint
npx tsc --noEmit
```

Visual and accessibility pass (needs Chrome or Edge installed). Captures every
section at phone and desktop widths in both themes, runs axe-core, and flags
text under 11px, tap targets under 40px, horizontal overflow, console errors
and failed requests. Output lands in `qa-output/`:
```bash
npm run build
npx next start -p 3100
npm run qa
```

The resume page must still print to one page:
```bash
powershell -ExecutionPolicy Bypass -File scripts\check-resume-page.ps1
```

## Deployment

Deploy on [Vercel](https://vercel.com) by connecting your GitHub repository.
