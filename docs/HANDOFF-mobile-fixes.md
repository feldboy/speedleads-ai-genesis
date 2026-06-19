# HANDOFF — mobile flicker/touch/panel fixes (2026-06-14 02:25, session c92d9434)

## Task
Fix mobile-only problems on the SpeedLeads homepage (don't reproduce in desktop emulator):
flicker on scroll, liquid smoke looking wrong + swirl "stuck", touch triggering detonation
on every scroll, code box resizing the layout, and the effects panel not closeable on mobile.

**Owner directives:** all changes mobile-only (desktop byte-for-byte unchanged); touch model =
quick-tap detonates / press-and-drag forms swirl ring around finger; match desktop fidelity on
mobile; verify via LAN URL on real phone.

Plan file: `/Users/omerdayan/.claude/plans/listen-i-checked-on-glittery-bengio.md`

## Done (all 5 fixes implemented, build passes)
Branch: `feature/fable5-kinetic-redesign`. Nothing committed yet.

- **Fix 1 — flicker** (`src/components/effects/LiquidInkBackground.tsx`): added `lastW`/`maxH`
  state; `onResize` ignores height-only changes on coarse pointers and locks canvas to tallest
  height (settles once, no per-scroll realloc); `onScroll` uses stable `maxH` on coarse pointers.
  Gated behind existing `isCoarsePointer`.
- **Fix 2 — touch model** (same file): added `touchHolding`, `tapStart`, `detonateAt()`, `isInteractive()`.
  `onPointerDown` branches on `e.pointerType==='touch'` (defers, sets touchHolding + target, no blast);
  new `onPointerUp` detonates only if moved<10px && <250ms && scrollY unchanged; new `onPointerCancel`.
  Gravity gate (`:~404`) now: `!pointerActive || (isCoarsePointer && !touchHolding) ? 0 : fx.particleGravity`.
  New listeners registered + cleaned up (pointerup, pointercancel).
- **Fix 3 — fidelity** (same file): octaves `FRAGMENT_SHADER(4)` (was `isSmallScreen?3:4`);
  `activeCount` dropped the `*0.4` small-screen reduction; removed now-unused `isSmallScreen` decl.
- **Fix 4 — code box** (`src/components/effects/AnimatedCode.tsx`): added `max-md:min-h-[9rem]` to `<pre>`.
- **Fix 5 — panel** (`src/components/effects/EffectsPanel.tsx`): mobile backdrop (`isMobile && open`,
  tap → setOpen(false)) + mobile-only sticky close X in header (`max-md:sticky` with bg). IDs untouched.

## Verification status
- `npm run build` → clean (after repairing node_modules; see below).
- `npm run lint` → 23 errors but ALL pre-existing files (textarea, analytics, admin pages, tailwind.config),
  none in the 3 edited files.
- node_modules was broken (missing `semver`, `caniuse-lite/...`); ran `npm install` to repair.
- Dev server live on LAN: **http://192.168.1.82:8081** (already running, host mode, HMR applied edits).
- **Owner has NOT yet confirmed on real phone.** Awaiting screenshots for: no flicker, no scroll-blast,
  tap detonates, drag forms finger swirl, code box stable, panel closes.

## Next steps
1. Get owner's phone screenshots; tune Fix 3 fidelity down (per-`isSmallScreen`) if framerate strains.
2. Once confirmed, commit to branch (conventional commit, Co-Authored-By line). Ask before merging to main.
3. Untracked effect files (AuroraBackground/LogoIntro/SignalThread/SpotlightCursor/ParticleField) are
   NOT mounted in Index.tsx — left untouched.
