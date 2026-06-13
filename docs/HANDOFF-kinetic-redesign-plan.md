# HANDOFF — SpeedLeads kinetic homepage redesign plan (2026-06-12 02:22, session 482353d7)

## Task
Plan a full homepage design overhaul for SpeedLeads.AI: bold/futuristic/kinetic, Awwwards-caliber, keeping the existing brand (navy `#0D1B2A` / cyan `#00F6FF` / gold `#B08D57`, Hebrew RTL, Heebo/Assistant/Playfair/DM Sans). Owner will switch to **Fable 5** (`/model claude-fable-5`) to implement + refine.

## Status: PLAN COMPLETE (no implementation started)
The full plan lives in **`DESIGN-OVERHAUL-PLAN.md`** (repo root) — this is the deliverable to hand to Fable 5. A duplicate copy exists at `/Users/omerdayan/.claude/plans/luminous-finding-alpaca.md` (the repo file is the source of truth now).

## Done this session
- Explored codebase (design tokens, site structure) — see plan's Context/Research.
- Researched Awwwards 2026 trends (glassmorphism 2.0, GSAP ScrollTrigger, WebGL cursor/liquid distortion, bento, scrollytelling).
- Analyzed **shiruziel.com** (owner's reference) via Firecrawl + Playwright: spotlight/flashlight cursor, letter-by-letter kinetic headings, mixed-axis scroll (vertical + horizontal pin), floating objects, logo marquee, **6-step process section**. NOTE: reference for **sections/layout/scroll only — NOT her branding**. Keep 100% SpeedLeads brand.
- Chosen aesthetic: **"Cinematic Spatial Dark"** (depth/light/motion led; glass = accent only, not the whole language).
- Added 3 owner-requested NEW sections to plan: (1) futuristic calming **ambient sound** w/ mute toggle (autoplay-safe, off by default), (2) **intro scrollytelling** pre-homepage curtain-raiser, (3) **Customer Process** horizontal-pin scrollytelling.

## What's left (for Fable 5 session)
1. Create branch `git checkout -b feature/fable5-kinetic-redesign` (preserves current uncommitted WIP on `feature/liquid-glass-redesign`).
2. Implement per plan: design tokens → new primitives (`KineticHeading`, `GlowCard`, `AuroraBackground`, `WebGLCursor`, `SectionReveal`, `useGsap`) → new sections (`IntroSequence`, `ProcessSection`, `AmbientSound`+`useAmbientSound`) → restyle every homepage section.
3. Finalize Hebrew copy for the Process steps with owner.
4. Source/generate a loopable ambient track → `public/audio/`.

## Key files
- `DESIGN-OVERHAUL-PLAN.md` — the plan (read this first).
- `src/pages/Index.tsx` — homepage composition (add Intro at top, Process after WhySpeedLeads).
- `src/index.css` / `src/App.css` / `tailwind.config.ts` / `index.html` — tokens, glass classes, fonts.
- `src/hooks/useReducedMotion.ts` — gate ALL heavy motion/audio/WebGL through this + `prefers-reduced-motion`.
- Existing reusable: `magic-card.tsx`, `MagneticButton.tsx`, `TypewriterText.tsx`, `AnimatedStats.tsx`, `EnhancedParticles.tsx`/`ParticleVortex.tsx`, `gradient-heading.tsx`. GSAP/three.js/R3F/shadergradient already in package.json.

## Environment notes
- Dev server: `npm run dev -- --port 8081` (port 8080 is taken by a DIFFERENT project, `eloozfit-forge-hebrew`).
- `node_modules` was reinstalled this session (was broken: missing `@rollup/rollup-darwin-arm64` + lost `.bin` exec bits). Working now.
- Branch `feature/liquid-glass-redesign` is 8 commits behind `origin/main` — decide on rebase before/after redesign; has uncommitted WIP. Do NOT touch `main`.
- Node is v20 but deps want ≥22 (warns, runs fine).

## How to continue
Start a fresh session, `/model claude-fable-5`, paste this handoff, then open `DESIGN-OVERHAUL-PLAN.md` and begin at "Branch & starting point".
