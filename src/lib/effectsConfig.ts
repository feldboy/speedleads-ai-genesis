import { useSyncExternalStore } from 'react';

/**
 * The single source of truth for every visual/audio tunable on the site —
 * the backing store of the on-page effects control panel.
 *
 * Two read paths, on purpose:
 *  - React components call `useFxConfig()` and re-render on change.
 *  - rAF loops (WebGL backgrounds, cursor) read the mutable `fx` object
 *    directly every frame — tuning a slider never re-renders the page.
 * Colors and motion speed are additionally mirrored to CSS custom properties
 * so plain CSS (headline gradients, buttons) follows the panel for free.
 *
 * Persisted to localStorage so the owner's tuning survives reloads; the
 * stored value is merged over the defaults so new keys ship safely.
 */

export interface FxConfig {
  // --- colors ---
  headlineFrom: string; // headline gradient = the logo "Leads" gradient
  headlineTo: string;
  buttonFrom: string;
  buttonTo: string;
  cursorColor: string;
  particleColor: string;
  inkCyan: string; // liquid background bright filament
  inkAzure: string; // liquid background current body
  heroTint: string; // hero light-streak shader tint
  // --- liquid ink background ---
  inkStir: number; // mouse-stir strength (owner: default was too strong)
  inkStirSize: number; // swirl radius of the cursor stir, 1 = designed default
  inkStirTrail: number; // how long the stir wake lingers, 1 = designed default
  inkFlow: number; // flow/time speed of the liquid
  inkIntensity: number; // overall "smoke" brightness
  inkDetail: number; // MOBILE ONLY: noise-frequency multiplier — higher = smaller smoke
                     // cells (dissolves the value-noise lattice on narrow portrait screens)
  // --- particles ---
  particleCount: number;
  particleSize: number;
  particleGravity: number; // mouse attraction strength
  particleGlow: number; // halo strength around each particle core
  particleSharpness: number; // core edge hardness (low = soft puff, high = crisp dot)
  particleTrail: number; // 0 = none, 1 = long comet trails
  particleResolution: number; // trail-layer render scale (0.25..1 of canvas)
  gravityRadius: number; // px — exclusion circle around the cursor; dust rings around it
  gravityOffsetX: number; // px — nudge the gravity ring right (+) / left (-) of the cursor
  gravityOffsetY: number; // px — nudge the gravity ring down (+) / up (-) of the cursor
  // --- cursor ---
  cursorSpotlight: number; // spotlight glow strength
  cursorSpotlightSize: number; // spotlight radius multiplier
  cursorHalo: number; // halo ring size multiplier
  cursorSize: number; // core dot size multiplier
  // --- hero shader ---
  heroIntensity: number;
  heroSpeed: number;
  // --- motion ---
  motionSpeed: number; // global multiplier for ambient animation speeds
  // --- sound ---
  volume: number; // 0..1 — ambient pad
  sfxVolume: number; // 0..1 — tap / hover interaction SFX
  whooshVolume: number; // 0..1 — cursor "lightsaber" whoosh (own knob)
}

export const FX_DEFAULTS: FxConfig = {
  headlineFrom: '#00f6ff',
  headlineTo: '#00a7ff',
  buttonFrom: '#00f6ff',
  buttonTo: '#00a7ff',
  cursorColor: '#00f6ff',
  particleColor: '#00d8f0',
  inkCyan: '#00d4f2',
  inkAzure: '#0073d9',
  heroTint: '#009dff',
  inkStir: 0.7,
  inkStirSize: 1,
  inkStirTrail: 1,
  inkFlow: 2.85,
  inkIntensity: 1.3,
  inkDetail: 2.5,
  particleCount: 2410,
  particleSize: 0.5,
  particleGravity: 0.65,
  particleGlow: 4.5,
  particleSharpness: 2.25,
  particleTrail: 0.7,
  particleResolution: 0.95,
  gravityRadius: 40,
  gravityOffsetX: 15, // small constant nudge that centres the ring on the cursor
  gravityOffsetY: 0,
  cursorSpotlight: 1.7,
  cursorSpotlightSize: 1,
  cursorHalo: 1.05,
  cursorSize: 1,
  heroIntensity: 1.15,
  heroSpeed: 0.55,
  motionSpeed: 1,
  volume: 0.03,
  sfxVolume: 0.35,
  whooshVolume: 0.3,
};

const STORAGE_KEY = 'speedleads-fx-v1';

function loadStored(): Partial<FxConfig> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<FxConfig>;
    // keep only known keys with the right type, so stale storage can't break us
    const clean: Partial<FxConfig> = {};
    for (const key of Object.keys(FX_DEFAULTS) as Array<keyof FxConfig>) {
      if (typeof parsed[key] === typeof FX_DEFAULTS[key]) {
        (clean as Record<string, unknown>)[key] = parsed[key];
      }
    }
    return clean;
  } catch {
    return {};
  }
}

/**
 * Coarse-pointer (touch) devices get their own default overrides, tuned
 * separately from desktop. A fresh mobile visitor starts from these; the owner's
 * saved tuning (loadStored) still wins on top, and `resetFx` returns here on mobile.
 * Desktop is unaffected (overrides are only merged on a coarse pointer).
 */
export const FX_MOBILE_OVERRIDES: Partial<FxConfig> = {
  // Owner-tuned mobile defaults (only the keys that differ from FX_DEFAULTS).
  inkStir: 0.4, // calmer pointer stir
  inkDetail: 3.6, // finer smoke so the noise reads smooth on portrait
  particleCount: 200, // far fewer dust particles on phones
  particleGravity: 0.45,
  particleTrail: 0.4, // shorter dust trails
  particleResolution: 1, // full-res dust buffer
};

const isCoarsePointer =
  typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)').matches;

/** The starting defaults for THIS device (desktop defaults + mobile overrides on touch). */
export const FX_DEVICE_DEFAULTS: FxConfig = {
  ...FX_DEFAULTS,
  ...(isCoarsePointer ? FX_MOBILE_OVERRIDES : {}),
};

/** Mutable live config — rAF loops read this directly each frame. */
export const fx: FxConfig = { ...FX_DEVICE_DEFAULTS, ...loadStored() };

/** Runtime-only signals (never persisted, never trigger renders). */
export const fxRuntime = {
  /** Scrub wind from the Process section, consumed by the particle layer. */
  windX: 0,
};

let version = 0;
const listeners = new Set<() => void>();

function emit() {
  version++;
  for (const listener of listeners) listener();
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fx));
  } catch {
    /* storage may be unavailable (private mode) — live tuning still works */
  }
}

/** Mirror color/motion values into CSS custom properties on :root. */
export function applyFxCssVars() {
  const root = document.documentElement.style;
  root.setProperty('--headline-from', fx.headlineFrom);
  root.setProperty('--headline-to', fx.headlineTo);
  root.setProperty('--btn-from', fx.buttonFrom);
  root.setProperty('--btn-to', fx.buttonTo);
  root.setProperty('--cursor-color', fx.cursorColor);
  root.setProperty('--motion-speed', String(fx.motionSpeed));
}

export function setFx(patch: Partial<FxConfig>) {
  Object.assign(fx, patch);
  applyFxCssVars();
  persist();
  emit();
}

export function resetFx() {
  Object.assign(fx, FX_DEVICE_DEFAULTS);
  applyFxCssVars();
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export function subscribeFx(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * React binding: returns a change counter so components re-render on any
 * change, then read the mutable `fx` object for current values.
 */
export function useFxConfig(): FxConfig {
  useSyncExternalStore(subscribeFx, () => version);
  return fx;
}

// Stored tuning may differ from the stylesheet defaults — sync on load.
if (typeof document !== 'undefined') applyFxCssVars();

/** "#00f6ff" -> [r, g, b] in 0..1, for shader uniforms. */
export function hexToRgb01(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  const n = parseInt(value.length === 3 ? value.split('').map((c) => c + c).join('') : value, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

/** "#00f6ff" + alpha -> "rgba(...)" for inline styles. */
export function hexToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb01(hex);
  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}
