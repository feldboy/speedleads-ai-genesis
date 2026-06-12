# HANDOFF — Fable 5 kinetic redesign, iteration 3 in progress (2026-06-12 19:06, session 0fff57e5)

## Task

Iteration 3: the owner sent 8 rejects on iteration 2. Approved plan with full detail: `/Users/omerdayan/.claude/plans/handoff-fable-wiggly-cherny.md` (READ IT — it has the architecture and item-by-item spec). Owner clarified via questions: sound = "airy & breathy"; hero shader = KEEP + optimize + blend seamlessly into liquid ink.

Branch `feature/fable5-kinetic-redesign`. **ALL ITERATION-3 WORK IS UNCOMMITTED** (working tree only). Still 8 behind origin/main (owner deferred reconciliation; do NOT rebase). Never merge without owner approval.

## Done (implemented, typecheck + build clean)

1. **`src/lib/effectsConfig.ts` (NEW)** — FxConfig store: defaults, localStorage (`speedleads-fx-v1`), pub/sub + `useFxConfig()` (useSyncExternalStore), mutable `fx` read by rAF loops, `fxRuntime.windX`, CSS vars (`--headline-from/to`, `--btn-from/to`, `--cursor-color`, `--motion-speed`), `hexToRgb01`/`hexToRgba`, applied at module load.
2. **index.css** (CRLF! use python3) — `--brand-gradient` now 2-stop `to left, var(--headline-from), var(--headline-to)` = exact logo "Leads" gradient (item 5 done); `.gradient-text` uses same vars; gradient-pan duration honors `--motion-speed`.
3. **Button gradient sweep** — all `from-[#00f6ff]`/`to-[#00a7ff]` (non-alpha) across 13 tsx files → `from-[color:var(--btn-from,#00f6ff)]` / `to-[color:var(--btn-to,#00a7ff)]`; `hover:from-…/80 hover:to-…/80` → `hover:brightness-110`.
4. **LiquidInkBackground rewritten** — global particle layer in the SAME canvas (THREE.Points, MAX 900, drawRange from `fx.particleCount`, DPR-crisp size, mouse-gravity + home-spring physics, `fxRuntime.windX` wind, wrap), fx-driven uniforms (uStir/uIntensity/uInkCyan/uInkAzure, flow speed via accumulated time), `speedleads:ink-burst` listener (ring of trail swirls + particle blast), fbm octaves 3 on <768px (item 3 done + perf).
5. **process/ParticleField.tsx DELETED**; ProcessSection writes scrub gusts to `fxRuntime.windX`.
6. **ParticleVortex (hero) rewritten** — DPR ≤1.5 ×0.85 internal scale, IntersectionObserver + visibilitychange pause, accumulated time × `fx.heroSpeed*fx.motionSpeed`, uTint/uIntensity uniforms from fx, `object-contain` removed, CSS mask fades bottom 45% into liquid ink (seamless done).
7. **IntroSequence** — plays on EVERY entry (sessionStorage gate removed), ignition shockwave ring + 12 sparks at the logo beat, dispatches `speedleads:ink-burst` on dismiss (guarded by dismissedRef) (item 1 done).
8. **useAmbientSound rebuilt** — Amaj9↔Fmaj9 crossfade (~40s), per-voice breath LFOs, bandpassed-noise "air", E6 shimmer w/ vibrato, feedback 0.25, 4s attack, volume = `fx.volume*0.34` applied live via subscribeFx. AmbientSound.tsx: slide-out range slider while playing (dir=ltr container), id `ambient_sound_toggle` kept (item 2 done — owner hasn't listened yet).
9. **CursorCore** — fx-driven (cursorColor via hexToRgba in applyTheme/applyMode, cursorSpotlight, cursorHalo), subscribeFx live updates.
10. **EffectsPanel.tsx (NEW)** + mounted in Index.tsx — toggle button `effects_panel_toggle` fixed bottom-[140px] left-5; desktop glass card / mobile bottom sheet; sections: רקע נוזלי, חלקיקים, עכבר, הירו, כותרות וכפתורים, תנועה, סאונד; reset + copy-JSON; hidden under reduced motion (item 6 done).
11. **ProcessSection** — center-spacers `w-[calc(50vw-min(480px,80vw)/2-2rem)]` both ends, equal-height cards (h-full chain + GlowCard `h-[calc(100%-2.5rem)]`), end `distance()*1.8`, scrub 1.5, snap duration 0.3–0.7, blur() removed from focus-pull (item 4 — geometry VERIFIED: track overflow exactly 5×512px, cards all 480×404, station deltas 0 when scrub settles).
12. **useGsap.ts** — `document.fonts.ready` + `loadingdone` → `ScrollTrigger.refresh()` (fixes stale pin start/end from font swap — verified start=4414 end=9022 correct after fix). Dev-only `window.__ScrollTrigger` + `window.__gsap` exposed for automation (consider keeping; harmless).

Verified working (Playwright, desktop 1440): intro replays every load, 2 canvases total, panel opens with 12 sliders + 9 color inputs, CSS vars correct, analytics IDs all present, cards equal size, geometry exact.

## RESOLVED (2026-06-12 late session) — snap bug was dev-only

`npm run build && npm run preview` (4173) + `.verify-it3-wheel-preview.mjs`: snap settles every burst, deltas 0–7px across all 6 stations. The freeze only happens on the dev server — stagewise/AOS dev tooling interference. No code change needed. Mobile audit also done: `.verify-it3-mobile.mjs` (ported to 4173) passes — no h-overflow, 2 canvases, panel bottom-sheet works (must dismiss `#cookie_accept_button` first), reduced-motion shows 0 canvases / no intro / no panel toggle. Iteration 4 (owner rejects: widget stack, sound character, particle engine port from `~/Downloads/fable-particle-engine.html`, panel range headroom) planned in `/Users/omerdayan/.claude/plans/temporal-jumping-aho.md`.

## OLD NOTES — ScrollTrigger snap freeze investigation (kept for context)

Symptom: scrolling the pinned Process section then stopping leaves cards off-center; ScrollTrigger `scrollEnd` fires, snap tween STARTS (scrollStart fires) but scroll position never moves; `t.getTween()` shows the tween crawling (p 0.02→0.11 over ~1s) then RESTARTING from 0.02 repeatedly. y stays put. So snap is started and continuously interrupted/restarted.

KEY CLUE found at session end: dev console shows **stagewise/21st-extension toolbar** polling and an **"AOS refresh attempt 1..10" loop** — third-party dev-only tooling is active in dev and may be killing/restarting the snap tween (vite plugin "stagewise" + AOS in ServiceCards).

**NEXT STEPS (in order):**
1. `npm run build && npm run preview` (port 4173) and re-run the wheel test against the preview — if snap works there, it's dev-toolbar interference only; note it and move on.
2. If still broken in preview: replace ScrollTrigger's built-in `snap` with explicit debounced snapping — on `onUpdate` reset a ~180ms timer; on fire, `gsap.to(window, { scrollTo: self.start + round(p*5)/5 * (self.end-self.start), duration 0.5, ease power1.inOut })` using ScrollToPlugin (`gsap/ScrollToPlugin`, register in useGsap); kill the tween on user `wheel`/`touchmove`.
3. Test scripts ready in repo root: `.verify-it3-wheel.mjs` (burst-scroll + nearest-station delta), `.verify-it3-process.mjs` (exact snap-point centering), `.verify-it3-snapdebug.mjs` (progress/velocity probe), `.verify-it3-mobile.mjs` (mobile 390 + reduced-motion audit, NOT YET RUN), `.verify-it3-desktop.mjs` (full desktop pass, already passed except snap).

## Remaining work after the snap bug

1. Run `.verify-it3-mobile.mjs` → fix mobile issues found (item 7; hero letterboxing already fixed via object-contain removal — verify visually).
2. Perf sanity (item 8 mostly done: 3→2 canvases, pauses, no scrub blur, DPR caps). Optional: scroll perf trace.
3. Eyeball desktop screenshots (it3-*.png in repo root) — intro shockwave, hero blend (mask), panel styling.
4. **Conventional commits per item group** (NOTHING committed yet), include screenshots for owner review. Suggested grouping: feat(fx-config + css vars + button sweep), feat(liquid-ink particles), feat(hero vortex optimize/blend), feat(intro), feat(sound), feat(process), feat(effects panel), fix(useGsap font refresh).
5. Delete scratch files before any PR: `.verify-it3-*.mjs`, `it3-*.png`, `it2-*.png`, `01..04-*.png`, `.firecrawl/`, `.playwright-mcp/`.
6. Owner still to review: sound character + volume, process Hebrew copy (pending from it2), all visuals; then /simplify + code review + finishing-a-development-branch (deferred until owner sign-off).

## Environment gotchas

- node_modules was corrupted (postcss `unesc` missing) → did `rm -rf node_modules && npm ci`. **playwright installed via `npm install --no-save playwright`** — re-run that after any fresh `npm ci` or the .verify scripts fail.
- Dev server bg on port 8081 (ALWAYS 8081). A stale server from a previous session may hold the port — `lsof -nP -iTCP:8081` then kill.
- Playwright MCP NOT available this session — use the local `.verify-*.mjs` node scripts instead.
- CRLF: index.css, Index.tsx, About3.tsx, tailwind.config.ts → python3 byte-level edits for multi-line changes.
- Foreground `sleep` chains are blocked by the harness; use `run_in_background` + notifications.
