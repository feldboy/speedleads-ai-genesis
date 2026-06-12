# HANDOFF — Fable 5 kinetic redesign, iteration 4 COMPLETE (2026-06-12 23:25, session edf568b8)

## STATUS UPDATE (supersedes "Remaining work" below)

Iteration 4 is implemented, verified on the preview build, and committed (aea9be3, 9448b55, 18789dd, 8f769fa). Found + fixed a real shader bug during verification: the particle ShaderMaterial declared `uGlow` highp in vertex / mediump in fragment → program never compiled → dust layer invisible. Verified after fix: 2500 round glowing sprites render, gather is centered on the cursor at the configured gravityRadius, panel has 17 sliders incl. all new dials (values apply via localStorage merge), chat widget sits above WhatsApp on the right rail (bbox-checked 1440), mobile + reduced-motion audit passes, lint errors are all pre-existing files. node_modules corrupted AGAIN this session (@swc/core, then sucrase) → fixed with full `rm -rf node_modules && npm ci && npm install --no-save playwright`.

Still open for the owner: listen to the new pad (wavier unison+vibrato, soft arpeggio rhythm), judge particle aesthetics at defaults vs dialed-up (`it4-*.png`), process Hebrew copy (pending since it2). No PR/merge without owner approval. Scratch files to delete before any PR: `.verify-*.mjs`, `it2/it3/it3b/it4-*.png`, `0*.png`, `.firecrawl/`, `.playwright-mcp/`, `src/index 2.css`, `"01-intro 2.png"`.

## Task

Iteration 4: owner sent 4 rejects + 2 follow-ups. Approved plan with full detail: `/Users/omerdayan/.claude/plans/temporal-jumping-aho.md` (READ IT). Rejects: (1) move FloatingAI chat widget above the WhatsApp button, (2) sound still noisy/stale — wavier, nicer rhythm, (3) particles are squares — round glowing sprites + panel dials for glow/sharpness/resolution/trail, (4) particles gather in a square offset left of cursor — radial pixel-true gravity + exclusion "gravity circle" (ring forms around cursor) + tap-to-detonate, ported from the owner's artifact `/Users/omerdayan/Downloads/fable-particle-engine.html`. Also: MUCH more headroom on ALL panel slider maxima.

Branch `feature/fable5-kinetic-redesign`. Still 8 behind origin/main (owner deferred — do NOT rebase). Never merge/PR without owner approval.

## Done this session

1. **Iteration 3 fully verified and COMMITTED** in 8 conventional commits (1523866..ee9bfd8). Snap bug was dev-toolbar-only (stagewise/AOS): preview build (4173) snaps perfectly, deltas 0–7px (`.verify-it3-wheel-preview.mjs`). Mobile + reduced-motion audit passes (`.verify-it3-mobile.mjs`, sed-ported to 4173 as `.verify-it3-mobile-preview.mjs`; must tap `#cookie_accept_button` after intro skip or the cookie banner intercepts taps). Desktop screenshots retaken on preview (`it3b-*.png`) — hero is properly dark; old washed-out it3-02 was mid-ink-burst.
2. **ALL iteration-4 code changes are written (UNCOMMITTED, working tree)**:
   - `FloatingAI.tsx` — wrapper now `fixed bottom-24 right-6 z-40`, entrance `x: 100` (right rail, above WhatsApp which is `bottom-6 right-6`).
   - `useAmbientSound.ts` — per-voice detuned unison pairs (±4¢) + slow vibrato LFO (0.06–0.16Hz, 5.5¢) into both detunes; air layer 1900Hz/0.014 → 1200Hz/0.007 (Q 0.9, swell 0.004); generative arpeggio: every 2.4–3.6s one soft octave-up note from the currently-louder chord (sin(2πt/40)≥0 → CHORD_A), 0.4s attack/3s release, gain 0.05, connected to `filter` (rides the delay echoes); `arpTimer` cleared in `stop()`.
   - `effectsConfig.ts` — new keys + defaults: `particleGlow:1, particleSharpness:1, particleTrail:0.5, particleResolution:0.6, gravityRadius:110`.
   - `LiquidInkBackground.tsx` — MAX_PARTICLES 900→2500; points use custom ShaderMaterial (PARTICLE_VERTEX/FRAGMENT: round core smoothstep + exp halo, aScale attr, sprite widens with glow); ping-pong WebGLRenderTargets at `particleResolution` scale; `dustScene` = fadeQuad (FADE_FRAGMENT, NoBlending, tPrev×uDecay) + points; composite quad (AdditiveBlending) over ink; tick: dust→rtCurr, ink→screen, composite→screen, swap; trail decay = `fx.particleTrail*0.94`. Physics: aspect-corrected radial gravity — attraction ring between `exclusion` (gravityRadius px→NDC via 2/innerHeight) and `capture=3.5×`; inside exclusion strong outward spring → dust rings the cursor. Shockwaves array (max 3, 900ms, band 44px, speed 0.9px/ms) + `onPointerDown` (skips `a,button,input,textarea,select,label,[role=button],[role=dialog]`) pushes shock + drops trail stir point. RTs resized on resize + resolution change; everything disposed.
   - `EffectsPanel.tsx` — new sliders in חלקיקים (זוהר 0–5, חדות 0–3, שובל 0–1, רזולוציה 0.25–1, רדיוס כבידה 40–500) + headroom everywhere: inkIntensity 0–4, inkFlow/inkStir 0–5, count 0–2500, size 0.5–12, gravity 0–8, spotlight 0–4, halo 0.25–5, hero 0–4/0–5, motionSpeed 0.1–4.
3. `tsc --noEmit` PASSES.

## BLOCKER — node_modules corrupted again

`npm run build` fails: `@swc/core` missing `./spack` (same corruption class as last session's postcss). I ran `rm -rf node_modules/@swc/core && npm install --no-save @swc/core@1.15.41` in background (task beqxwrnvv) — **completion not confirmed**. NEXT: check `ls node_modules/@swc/core/spack.js`; if missing, re-run that install (or full `rm -rf node_modules && npm ci` + `npm install --no-save playwright` — playwright is needed by the .verify scripts and is NOT in package.json).

## Remaining work (in order)

1. Verify `@swc/core` fixed → `npm run build` clean.
2. `npm run preview -- --port 4173` (a preview server from earlier may still hold 4173 — check `lsof -nP -iTCP:4173`; it serves the OLD build, restart it after rebuilding).
3. Playwright verification on preview (write `.verify-it4-*.mjs` modeled on `.verify-it3-*.mjs`; plan's Verification section has the full checklist): round glowing particles (zoom screenshot), ring centered on a known mouse position, detonation on background pointerdown (and NOT when clicking buttons), trail slider 0 vs 1 visual diff, panel has the new sliders, FloatingAI box above WhatsApp box (1440 + 390), re-run mobile/reduced-motion audit (0 canvases under RM).
4. Tune by eye: particle force constants (0.02 exclusion spring, 0.0011 attraction, sprite size factor 1.6, halo exp 4.5) — screenshot at defaults and at extremes; adjust if mushy/blown out.
5. Commit iteration-4 in groups (feat: widget stack; feat: wavier pad + arp; feat: particle engine + trails + detonate; feat: panel dials + headroom). Screenshots for owner.
6. Owner still to judge: sound character (hasn't listened), all visuals, process Hebrew copy (pending since it2).
7. Cleanup before any PR: `.verify-*.mjs`, `it2/it3/it3b/it3-m*.png`, `0*.png`, `.firecrawl/`, `.playwright-mcp/`, `src/index 2.css`, `"01-intro 2.png"` (macOS dupes — do not commit).

## Environment gotchas

- Dev port ALWAYS 8081; dev server has stagewise/AOS toolbars that BREAK ScrollTrigger snap — verify scroll behavior on `npm run preview` (4173) only.
- node_modules corrupts repeatedly (postcss last session, @swc/core now). After any `npm ci`: `npm install --no-save playwright`.
- CRLF files: index.css, Index.tsx, About3.tsx, tailwind.config.ts → python3 byte-level edits.
- Foreground `sleep` blocked by harness → `run_in_background`.
- Cookie banner (`#cookie_accept_button`) intercepts mobile taps in tests — dismiss it first.
- Analytics IDs are a contract; FloatingAI/WhatsApp/sound/panel IDs unchanged this session.
