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
  inkFlow: number; // flow/time speed of the liquid
  inkIntensity: number; // overall "smoke" brightness
  // --- particles ---
  particleCount: number;
  particleSize: number;
  particleGravity: number; // mouse attraction strength
  particleGlow: number; // halo strength around each particle core
  particleSharpness: number; // core edge hardness (low = soft puff, high = crisp dot)
  particleTrail: number; // 0 = none, 1 = long comet trails
  particleResolution: number; // trail-layer render scale (0.25..1 of canvas)
  gravityRadius: number; // px — exclusion circle around the cursor; dust rings around it
  // --- cursor ---
  cursorSpotlight: number; // spotlight glow strength
  cursorHalo: number; // halo ring size multiplier
  // --- hero shader ---
  heroIntensity: number;
  heroSpeed: number;
  // --- motion ---
  motionSpeed: number; // global multiplier for ambient animation speeds
  // --- sound ---
  volume: number; // 0..1
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
  heroTint: '#2699ff',
  inkStir: 0.6,
  inkFlow: 1,
  inkIntensity: 1,
  particleCount: 320,
  particleSize: 2.2,
  particleGravity: 1,
  particleGlow: 1,
  particleSharpness: 1,
  particleTrail: 0.5,
  particleResolution: 0.6,
  gravityRadius: 110,
  cursorSpotlight: 1,
  cursorHalo: 1,
  heroIntensity: 1,
  heroSpeed: 1,
  motionSpeed: 1,
  volume: 0.5,
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

/** Mutable live config — rAF loops read this directly each frame. */
export const fx: FxConfig = { ...FX_DEFAULTS, ...loadStored() };

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
  Object.assign(fx, FX_DEFAULTS);
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
