# SpeedLeads.AI — Bold Kinetic Homepage Overhaul

## Context

The current site (branch `feature/liquid-glass-redesign`) looks competent but "generic / too AI" to the owner. The brand foundation is strong and must be **kept**: near-navy background `#0D1B2A`, electric cyan `#00F6FF`, luxe gold `#B08D57`, Hebrew-first RTL, Heebo/Assistant/Playfair/DM Sans fonts, and the liquid-glass card language. The goal is a **full homepage makeover** in a **bold, futuristic, kinetic** direction — more motion, depth, and personality — so the site itself reads as proof that SpeedLeads builds premium AI products, while still feeling like the same brand.

No external Claude design artifact exists to match (confirmed by repo/branch/stash search) — the direction below is designed from scratch on top of the existing brand.

> **Handoff:** Owner will switch to **Fable 5** (`/model claude-fable-5`) for implementation + refinement. This plan is written to be detailed enough to execute directly.

## Research — what's winning on Awwwards (2026) and how we apply it

Findings from current Awwwards galleries + 2026 trend reviews (sources at bottom), mapped to our build:

- **Glassmorphism 2.0** — evolved past simple blur into *surface transduction* (realistic light/refraction). Modern recipe: layered `backdrop-filter: blur() saturate(180%)`, **relative-color-syntax** tints, `mask-image` gradient edges, inner light lines. Used with **restraint** — nav, modals, cards, CTAs — not the whole page. → Our `GlowCard` + refined `.glass-liquid`/`.glass-navbar` become the "glass 2.0" accent layer.
- **GSAP + ScrollTrigger as the motion engine** — scrubbed, scroll-tied sequences, pinned sections, SVG/text reveals. GSAP is already installed but unused → make it the backbone for **scrollytelling** (story-as-you-scroll) and section pinning, with Framer Motion for component-level state/gesture.
- **Custom WebGL cursor + mouse-reactive hero** — Awwwards SOTD sites (OHZI, Sweetpunk, Heroine) use GLSL distortion that reacts to cursor proximity: **lens/fish-eye distortion**, **RGB-shift**, **liquid/water ripple**. We already ship three.js + R3F + shadergradient → build a `WebGLCursor` + a mouse-reactive hero shader for the "banger" moment.
- **Bento-first layouts** — 2026's settled modular layout. → Apply to the Stats and "Why SpeedLeads" sections as an asymmetric bento grid instead of plain card rows.
- **Cinematic / emotive** — orchestrated page-load reveal, generous depth, atmosphere over flat color. → Aurora background + grain + one big hero entrance.

## Reference site — shiruziel.com (owner-loved benchmark)

Analyzed live (Firecrawl + browser). **We take only her *sections, layout and scroll craft* as inspiration — none of her branding, colors, fonts or content.** SpeedLeads' own brand (navy `#0D1B2A` / cyan `#00F6FF` / gold `#B08D57`, our fonts + logo) stays 100%. Great work to learn from ≠ a site to mimic. What we're borrowing (vibe, not copy):

- **Spotlight/flashlight cursor** revealing a dark hero — a torch that lights up content in the void. Fits our "Cinematic Spatial Dark" perfectly (becomes a brand-tinted glow cursor over the aurora).
- **Kinetic letter-by-letter heading reveals** — Hebrew headlines where each letter animates in on scroll. Strong against "generic" — folds into `KineticHeading` (RTL char stagger).
- **Mixed-axis scroll** — most sections reveal vertically, key sections move **horizontally / pin-scrub** ("some go down, some to the side"). Implement with GSAP ScrollTrigger horizontal pinning.
- **Floating object choreography** (coins/props drifting on scroll), **client-logo marquee**, **embedded brand video**, **custom portfolio cursor**.
- **A 6-step process section "how a site comes to life"** revealed sequentially as you scroll — the model for our new Customer Process section.

## New sections requested by owner

1. **Ambient sound** — a **futuristic, calming** ambient bed (soft synth/pad drone) with a tasteful, always-visible **mute/unmute toggle**. Must respect browser autoplay policy: **start muted/off, only play after a user gesture**; persist preference in `localStorage`; auto-pause when tab hidden; fully off under `prefers-reduced-motion`/accessibility "disable animations". Optional subtle UI ticks on key interactions (off by default). New: `src/components/effects/AmbientSound.tsx` + `src/hooks/useAmbientSound.ts`; audio asset in `public/audio/` (e.g. a seamless loopable ~30–60s pad). Source a royalty-free track or generate one.
2. **Intro scrollytelling sequence (pre-homepage)** — a short cinematic "curtain-raiser" before the hero: logo/spark reveal in the void → brand one-liner assembling (kinetic letters) → spotlight widens and the page transitions into the hero. Pinned GSAP timeline, skippable, runs once per session (sessionStorage), reduced-motion shows a static brand frame. New: `src/components/sections/IntroSequence.tsx`, rendered first in `src/pages/Index.tsx`.
3. **Customer Process section** — "איך הרעיון שלכם מתעורר לחיים" — a scroll-driven, step-by-step walkthrough that carries the client through our engagement steps (e.g. *שיחת אפיון → אסטרטגיה ומסרים → עיצוב → אינטראקציות ותנועה → פיתוח → בדיקות והשקה*; finalize copy with owner). **Pinned horizontal scroll** (steps move sideways as you scroll down) with a progress rail, numbered nodes, and per-step reveal. New: `src/components/sections/ProcessSection.tsx`. Placed after Services / "Why SpeedLeads", before Testimonials.

## Trendy hero concept — "Liquid Aurora Terminal" (the banger)

A dark, depth-rich hero combining: a **mouse-reactive WebGL aurora/liquid-distortion** backdrop in brand cyan→violet→gold; a **custom blend-mode WebGL cursor** that distorts/refracts what's under it; a **glass 2.0 agent panel** (the live "AI/code" card) floating with parallax; and a **GSAP-scrubbed entrance** where the headline (`KineticHeading`) assembles word-by-word as the aurora settles. RGB-shift/lens distortion on hover over the panel and logo. All reduced-motion safe.

## Branch & starting point

- There are **uncommitted changes** across the working tree on `feature/liquid-glass-redesign`, and the branch is **8 commits behind `origin/main`**.
- **Recommendation:** create the new branch from the current state so the in-progress liquid-glass work is preserved:
  `git checkout -b feature/fable5-kinetic-redesign` (uncommitted changes carry over).
- Reconciling with `origin/main` (rebase/merge) is deferred and optional — flag to the user before doing it, since it can conflict with the uncommitted WIP. Do **not** touch `main`.

## Design language (the kinetic system)

**Chosen aesthetic — "Cinematic Spatial Dark" (recommendation, not glassmorphism-led).** Rather than making frosted glass the whole language, the site's identity comes from **depth, light and motion**: a deep navy void, a living WebGL aurora, bold kinetic Hebrew typography, gold used like a spotlight, and GSAP-scrubbed scrollytelling. **Glassmorphism 2.0 is kept only as an accent material** — nav, the hero agent panel, cards, modals — which is exactly how 2026 award sites use it (restrained, as surface, not everywhere). This reads premium/cinematic and distinctly *not* "generic AI." If a section wants a different treatment (e.g. a solid editorial bento block, a raw/brutalist callout), prefer the better fit over forcing glass.

Establish the new look as **tokens + reusable primitives** first, then apply per section — avoid one-off styling.

1. **Color depth** (`src/index.css`): keep existing brand tokens; add a deeper base `--bg-abyss: 222 60% 5%` (~`#05080F`) for stronger contrast behind glass, plus motion-glow tokens (cyan/gold/violet glow stops) and a `--brand-gradient` (cyan→azure→violet) used by animated borders and headings.
2. **Typography**: keep Hebrew RTL on Heebo/Assistant. Add one **distinctive Hebrew display face for headings** (candidate: `Suez One` or `Rubik` heavy) loaded in `index.html`, wired as `font-display` in `tailwind.config.ts`. This is the single biggest lever against the "generic" feel. Logo keeps DM Sans + Playfair.
3. **Motion principles**: high-impact orchestrated reveals over scattered micro-interactions. **GSAP + ScrollTrigger** drives scroll-scrubbed/pinned scrollytelling; **Framer Motion** drives component state/gesture; **WebGL/GLSL** (three.js + R3F already installed) drives the hero distortion + custom cursor. Techniques: kinetic headline reveals (word/char stagger), animated conic gradient borders, cursor-spotlight hover on glass cards, magnetic CTAs, RGB-shift/lens distortion on hero hover, mouse-reactive aurora. All gated by the existing `useReducedMotion` hook (`src/hooks/useReducedMotion.ts`) and `prefers-reduced-motion` (skip WebGL/cursor entirely on reduced-motion + touch devices).

## New reusable primitives (create under `src/components/ui/` + `src/components/effects/`)

- **`AuroraBackground.tsx`** — global animated mesh/aurora + subtle grain + grid that reacts to scroll & pointer. Replaces/augments the current `ShaderBackground` as the page atmosphere (keep WebGL shader optional/lazy as a layer). Reuses existing orb keyframes in `src/App.css`.
- **`KineticHeading.tsx`** — headline component with word/char staggered reveal + animated brand-gradient text. Reuses `gradient-heading.tsx` typography scale.
- **`GlowCard.tsx`** — glass card with animated conic gradient border + cursor spotlight + subtle tilt. Built on existing `magic-card.tsx` + `.glass-liquid`.
- **`SectionReveal.tsx`** — wrapper applying consistent scroll-triggered stagger (GSAP ScrollTrigger) to any section.
- **`WebGLCursor.tsx`** — custom blend-mode/distortion cursor (GLSL) + brand-tinted **spotlight/flashlight** mode for the hero/intro; follows pointer with GSAP easing; auto-disabled on touch + reduced-motion.
- **`useGsap.ts`** (hook) + GSAP/ScrollTrigger registration helper for pinned, scrubbed, and **horizontal-pin** scroll sequences.
- **`AmbientSound.tsx` + `useAmbientSound.ts`** — futuristic calming ambient audio with mute toggle, autoplay-policy & reduced-motion safe (see "New sections" #1).
- **`IntroSequence.tsx`** — pre-homepage cinematic curtain-raiser (see #2).
- **`ProcessSection.tsx`** — horizontal-pin customer-process scrollytelling (see #3).
- Reuse existing: `MagneticButton.tsx`, `EnhancedParticles.tsx`/`ParticleVortex.tsx`, `AnimatedStats.tsx`, `TypewriterText.tsx`, `magic-card.tsx`, three.js/R3F/shadergradient.

## Section-by-section redesign (homepage, order preserved)

Composition is updated in `src/pages/Index.tsx` (new sections marked **NEW**); each section is restyled with the kinetic system. Mix scroll axes deliberately — most sections reveal vertically, Process + Portfolio use horizontal pin-scrub. Replace the flat `.section-divider` with animated gradient/scanline dividers.

0. **Intro scrollytelling (NEW)** — `IntroSequence.tsx`, pre-hero curtain-raiser, runs once/session, skippable, reduced-motion-safe.
1. **Hero** (`HeroSection.tsx` + `src/components/hero/*`): the "Liquid Aurora Terminal" — mouse-reactive WebGL aurora/distortion bg, `WebGLCursor`, `KineticHeading` with GSAP-scrubbed word assembly, keep the rotating `TypewriterText` of services, magnetic dual CTAs, glass-2.0 agent panel (`HeroCodeSection.tsx`) with RGB-shift hover, upgraded scroll indicator.
2. **Animated Stats** (inline section in `Index.tsx` + `AnimatedStats.tsx`): **bento grid** of kinetic counters with animated rings/progress and glow; pinned/scrubbed count-up on scroll.
3. **Service Cards** (`ServiceCards.tsx`): convert to `GlowCard` with animated conic borders, cursor-spotlight hover, clearer pricing/feature hierarchy.
4. **Why SpeedLeads** (`WhySpeedLeadsSection.tsx` → `About3.tsx`): asymmetric **bento** `GlowCard` grid with staggered reveal and gradient iconography.
4b. **Customer Process (NEW)** (`ProcessSection.tsx`): horizontal-pin scrollytelling walking the client through the engagement steps — progress rail, numbered nodes, per-step reveal. Hebrew copy finalized with owner.
5. **Testimonials** (`TestimonialsSection.tsx`): keep Embla carousel; restyle slides as glass spotlight cards with metric callouts and animated transitions.
6. **FAQ** (`FaqSection.tsx`): kinetic accordion — glass rows, animated chevron + reveal.
7. **Contact** (`ContactSection.tsx`): glass form with `.glass-input`, glowing focus states, animated submit, restyled info/map sidebar.
8. **Header & Footer** (`layout/Header.tsx`, `layout/Footer.tsx`): refine `.glass-navbar` (scroll-aware blur/shrink), kinetic mobile menu; footer gets a gradient edge + CTA band.
9. **Floating UI** (`FloatingAI.tsx`, WhatsApp button in `Index.tsx`): cohesive glow treatment + the ambient **sound toggle** lives here as a small persistent control.

## Files to modify / create

- **Tokens/config**: `src/index.css`, `src/App.css`, `tailwind.config.ts`, `index.html` (fonts).
- **New primitives**: `src/components/ui/KineticHeading.tsx`, `src/components/ui/GlowCard.tsx`, `src/components/effects/AuroraBackground.tsx`, `src/components/effects/WebGLCursor.tsx`, `src/components/ui/SectionReveal.tsx`, `src/hooks/useGsap.ts`.
- **New sections/audio**: `src/components/sections/IntroSequence.tsx`, `src/components/sections/ProcessSection.tsx`, `src/components/effects/AmbientSound.tsx`, `src/hooks/useAmbientSound.ts`, plus a loopable ambient track in `public/audio/`.
- **Restyle**: `src/pages/Index.tsx` and every file under `src/components/sections/`, `src/components/hero/`, plus `layout/Header.tsx`, `layout/Footer.tsx`, `effects/AnimatedStats.tsx`, `effects/FloatingAI.tsx`.
- Preserve all existing copy (Hebrew), RTL attributes, analytics IDs/tracking, accessibility classes, and the `useReducedMotion` gating.

## Verification

1. `npm run dev -- --port 8081` (port 8080 is taken by another project) and review the full homepage scroll on desktop + mobile widths.
2. Confirm: brand colors/logo intact; Hebrew RTL correct in every section; all CTAs, carousel, FAQ accordion, contact form, chatbot/WhatsApp buttons still work; analytics element IDs unchanged.
3. Toggle OS "Reduce Motion" → heavy animations, WebGL cursor, intro sequence and ambient audio all disabled, content fully visible. Check the accessibility widget/high-contrast mode.
3b. **New sections**: intro plays once/session and is skippable; ambient sound stays **off until the user enables it**, toggle persists across reloads, pauses on hidden tab; Process section pins and scrolls horizontally smoothly on desktop and degrades to a vertical stack on mobile.
4. `npm run build` succeeds; no TypeScript/console errors; Lighthouse spot-check stays reasonable.
5. Use Playwright MCP to screenshot hero + each section at desktop (1440) and mobile (390) for a before/after visual pass.

## Fable 5 Elevation (2026-06-12, supersedes conflicting items above)

Owner-approved refinements layered on this plan at implementation time:

1. **Unifying concept — "The Signal" (האות).** One thread of cyan→gold light is the site's narrative: a lead traveling at speed through the funnel. Born in the intro (point of light ignites the logo) → lives in the hero aurora as its brightest filament → drawn down the page by scroll as an SVG path that **replaces every flat `.section-divider`** → becomes the Process section's progress rail → terminates into the Contact submit CTA. New primitive: `src/components/effects/SignalThread.tsx` (GSAP ScrollTrigger scrub on stroke-dashoffset).
2. **Restraint cuts.** RGB-shift hover is dropped (dated). The custom cursor is a **brand spotlight glow only** (`SpotlightCursor.tsx`, CSS/GSAP — no WebGL lens/liquid distortion; native cursor stays). **One WebGL surface only** — the hero aurora; everything else is CSS/SVG/Framer/GSAP. Particles live only inside the hero.
3. **Typography as the hero.** New Hebrew display face: **Suez One** (`font-display`), giant outlined numerals in Stats/Process. Kinetic reveals stagger **right-to-left**; Hebrew splits at **word** level (letterform safety), char-level only for numerals/Latin.
4. **Generative ambient sound.** Synthesized live with Web Audio (detuned oscillators → LFO-swept lowpass → feedback delay) instead of an audio file: zero weight, seamless infinite loop, no licensing; filter opens subtly with scroll depth. All autoplay/persistence/reduced-motion rules from "New sections #1" still apply. No `public/audio/` asset needed.
5. **Engineering discipline.** Single `useGsap` hook owning `gsap.context()` + cleanup; hero canvas lazy-mounted and unmounted offscreen (IntersectionObserver); DPR capped at 1.5; everything gated by `useReducedMotion`.

**Owner decisions:** Signal concept ✓ · generative audio ✓ · branch `feature/fable5-kinetic-redesign` created from the dirty working tree (baseline commit), reconciliation with `origin/main` deferred.

## Sources (research)

- [Awwwards — Best GSAP Animation Websites](https://www.awwwards.com/websites/gsap/) · [Awwwards — Hovers, Cursors & Interactions](https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/) · [Awwwards — WebGL liquid distortion (Heroine)](https://www.awwwards.com/inspiration/mouse-interaction-webgl-liquid-distortion-heroine) · [Awwwards — WebGL cursor (Sweetpunk)](https://www.awwwards.com/inspiration/webgl-cursor-animation-effect-sweetpunk)
- [Glassmorphism 2.0 — modern CSS techniques (2026)](https://weblogtrips.com/technology/glassmorphism-2-0-css-techniques-2026/) · [Glassmorphism in 2026 without killing UX (Orizon)](https://www.orizon.co/blog/glassmorphism-in-2026-how-to-use-frosted-glass-without-killing-ux)
- [10 Web Design Trends Dominating Award Galleries (2026)](https://www.topcssgallery.com/blog/web-design-trends-dominating-award-galleries/) · [Web Design Trends 2026 — reality check (Studio Meyer)](https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check)
- [Blend-mode animated cursor with React + GSAP (tutorial)](https://blog.olivierlarose.com/tutorials/blend-mode-cursor)

---

## Iteration 2 — Owner Review Feedback (2026-06-12)

Owner reviewed iteration 1 live and redirected:

**Rejected / changed**
- ~~AuroraBackground~~ → **LiquidInkBackground**: domain-warped fbm "liquid ink" in pure cyan; the pointer stirs the fluid (decaying trail injects swirl into the warp). Owner asked for "something cool like the old shader, or better" rather than a revert.
- ~~SignalThread page overlay~~ — removed ("out of place, going over stuff"). The Signal motif now lives only inside sections: process rail, contact submit glow, footer edge.
- ~~Violet/gold in the brand gradient~~ — **cyan-only rule**: `--brand-gradient` = cyan → azure → deep azure. למה feature cards unified to cyan-family tints.
- Process v1 (uniform cards) — "lackluster and generic".

**Added**
- **Process v2 — live vignettes**: every station demos itself (chat typing, message map, self-drawing wireframe, ghost-cursor magnetic button, code typing, launch pulse), igniting node rail, giant parallax numerals, focus-pull staging, scrub-wind particle field (three.js, lazy, desktop only). Copy structure adapted from the owner-supplied reference shiruziel.com (rich benefit paragraphs + bold emphasis + concrete deliverables) — **pending owner copy review**.
- **CursorCore**: custom cursor (core dot + lagging halo + spotlight) replacing SpotlightCursor; ring reacts to links/buttons/inputs; native cursor on touch/reduced-motion.
- **Ambient sound fix**: pad was voiced 55–220Hz at −32dBFS (physically inaudible on laptop speakers). Revoiced A2–E5, filter 900Hz, −20dBFS, 41% energy above 250Hz.

**Standing owner directives**: intro stays; awwwards-level bar; GSAP + three.js should visibly earn their keep; everything stays on `feature/fable5-kinetic-redesign` until owner review.
