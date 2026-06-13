# HANDOFF — UI rejects, Why-SpeedLeads photos & SEO (2026-06-13 12:10, session f7a6fb55)

Branch: `feature/fable5-kinetic-redesign`. Dev server: `npm run dev -- --port 8081`. Typecheck clean (`npx tsc --noEmit -p tsconfig.json`). **Nothing committed yet** — all changes are in the working tree.

## Done this session
1. **FloatingAI tooltip off-screen** (`src/components/effects/FloatingAI.tsx`): tooltip was `left-1/2 -translate-x-1/2` over a button at `right-6`, overflowing. Changed to `right-0`; arrow moved to `right-8 translate-x-1/2`.
2. **Gravity ring centering** (`src/components/effects/LiquidInkBackground.tsx`, `stepParticles`): well center now tracks raw `target` (not lagged `head`); added `homePull` (fades home-spring to 0 for captured dust so ring doesn't pull toward screen-centre); added `carry` (advects captured dust with pointer delta `wellDX/wellDY` to kill move-lag). **RESOLVED**: exposed `gravityOffsetX/Y` in `effectsConfig.ts` (FxConfig + FX_DEFAULTS) + two EffectsPanel sliders ("היסט כבידה X/Y", −300..300). User confirmed centered at **gravityOffsetX = 15**, now the default.
3. **Why-SpeedLeads photos** (`src/components/sections/About3.tsx`): replaced 4 flat gradient placeholders with Unsplash photos + navy/cyan overlay, `loading="lazy"`, Hebrew `alt`.
4. **Process cards transparent / dark** (`src/components/sections/ProcessSection.tsx`): root cause = focus-pull faded whole-card opacity to ~0.55 (line ~153) so particles bled through. Set `opacity: 1` (kept `scale` focus); card bg now `!bg-[#1B2D48]` (opaque lighter slate-blue — `#0A1626` was too dark/low-contrast; user wanted to match Why-SpeedLeads card contrast). User confirmed looks good.
5. **SEO**: `index.html` — canonical, robots, theme-color, full OG/Twitter, font preconnects, **JSON-LD** (`ProfessionalService`+`WebSite`, Tel Aviv/IL, he-IL). New `public/sitemap.xml`; `public/robots.txt` now references sitemap.

## All user rejects RESOLVED & confirmed
Gravity ring centered (gravityOffsetX=15 default), Process cards good contrast, photos in, SEO done. Note: WebGL layer often doesn't hot-reload — needed HARD reload (⌘⇧R) for changes to show; that was the main source of "still broken" confusion.

## How to continue
- User asked to **commit everything** at end — was about to offer. Conventional commits, branch only, never main, ask before merge (CLAUDE.md).
- No SEO skill is installed; SEO done by hand.
- Verify scripts were temp `.verify-*.mjs` (deleted). Recreate as needed; screenshots auto-background and are slow — poll for the PNG file.
