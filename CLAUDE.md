# Claude Instructions for SpeedLeads AI

## What This Is
The marketing/lead-gen homepage for **SpeedLeads AI** — an Israeli agency selling website building, AI automations, and AI implementations. The site is Hebrew-first, RTL, single-page (homepage-focused), and is itself the product demo: every interaction should prove what we can build for clients.

You are acting as an elite UX/UI designer and full-stack developer. Balance aesthetics, performance, and conversion — the site is a lead-generation machine first.

**Business strategy, site roadmap, conversion goals, and design psychology live in `BUSINESS-CONTEXT.md`** — read it before product/copy/structure decisions.

## Stack (actual — do not "upgrade" it)
- **Vite 5 + React 18 + TypeScript**, SPA with react-router-dom (no Next.js, no SSR, no backend, no CMS)
- **Tailwind CSS 3 + shadcn/ui (Radix)** — components in `src/components/ui`
- **framer-motion 12** for component/gesture animation; **GSAP 3 + ScrollTrigger** for scroll choreography (scrub, pin)
- **three.js** (raw, via lazy-loaded component) for the single WebGL aurora background; R3F/drei/shadergradient are installed but the aurora intentionally uses raw three
- **Web Audio API** for the generative ambient pad (no audio assets)

## Commands
```bash
npm run dev -- --port 8081   # ALWAYS port 8081 — 8080 belongs to another local project (eloozfit-forge-hebrew)
npm run build                # production build
npm run lint                 # eslint
npm run preview              # preview the build
```
Node 20 works; some deps want Node 22 and print engine warnings — ignore them.

## Architecture
```
src/
  pages/Index.tsx            # homepage composition — section order + global effect layers live here
  components/sections/       # full-width page sections (HeroSection, ProcessSection, IntroSequence, …)
  components/ui/             # shadcn primitives + custom primitives (GlowCard, KineticHeading, SectionReveal, SpeedLeadsLogo)
  components/effects/        # ambient/global layers (LiquidInkBackground, CursorCore, AmbientSound, FloatingAI)
  components/hero/           # hero internals
  components/layout/         # Header, Footer
  hooks/                     # useGsap, useReducedMotion, useAmbientSound, use-mobile
  lib/analytics.ts           # event tracking
```

## Design Language: "Cinematic Spatial Dark" — cyan only
Full art direction in `DESIGN-OVERHAUL-PLAN.md` (source of truth, see the Iteration 2 addendum). The short version:
- **Cyan-only rule (owner directive)**: all headline gradients and accents stay in the cyan family. No violet anywhere; gold only where it pre-existed the redesign.
- The page floats over **LiquidInkBackground** — a mouse-stirred liquid shader (the pointer drags glowing currents). **CursorCore** replaces the native cursor on fine pointers (dot + lagging halo + spotlight).
- The Signal motif lives *inside* sections only (process rail, contact submit glow, footer edge) — no page-spanning overlay.
- The Process section is live-vignette scrollytelling: each station demos itself. The site is the portfolio.

## Brand Tokens
- Colors: navy/abyss `#0D1B2A` (`--bg-abyss`), cyan `#00F6FF`, azure `#00A7FF`, deep azure `#0072E5`; `--brand-gradient` (cyan→azure→deep) and glow tokens live in `src/index.css`
- Fonts: **Heebo** (body), **Suez One** (`font-display`, Hebrew display headlines + giant numerals), Assistant/DM Sans/Playfair loaded
- Utility classes: `text-brand-gradient`, `text-outline`, `glow-border`, `bg-abyss`, `signal-path` — defined in `src/index.css`

## Hard Rules (learned the hard way)
1. **Hebrew RTL everywhere**: `dir="rtl"` on the page wrapper; keep it. Kinetic text staggers right-to-left (DOM order). Split Hebrew headings at **word** level only — char-level splitting breaks Hebrew letterforms; char-level is fine for numerals/Latin. Numbers render inside `dir="ltr"` spans.
2. **Analytics element IDs are a contract** — IDs like `submit_contact_form_button`, `header_contact_button`, `service_*` are tracked externally. Never rename or remove them.
3. **Reduced motion**: every heavy effect (GSAP scrub/pin, WebGL, intro sequence, ambient audio, spotlight) must gate through `src/hooks/useReducedMotion.ts` and degrade to visible static content.
4. **Performance**: lazy-mount the WebGL canvas, cap DPR at 1.5, pause offscreen/hidden-tab work. Target stays Lighthouse 95+.
5. **Line endings**: several files have CRLF (and some Hebrew strings contain NBSP). If the Edit tool fails on multi-line matches, use `python3`/`perl` with explicit byte handling instead.
6. Preserve existing Hebrew copy and accessibility classes unless explicitly asked to change them. Process-section step copy is placeholder pending owner review.

## Git Workflow & Collaboration
This project involves collaboration with another developer. Always follow proper git workflow:

1. **Branch strategy**: create feature branches for all changes (`feature/...`, `fix/...`); **never commit directly to main**; keep branches focused.
2. **Pull requests**: **always ask for permission before merging into main**; descriptive titles/descriptions; include screenshots for UI changes; wait for review.
3. **Commits**: conventional commit format (`feat:`, `fix:`, `refactor:`, …); commit in logical groupings.

## Success Metrics
Conversion 5%+ visitor→lead, bounce < 40%, 2+ min sessions, Lighthouse 95+. Every design decision should serve one of these.
