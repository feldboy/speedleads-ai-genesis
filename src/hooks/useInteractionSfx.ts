import { useEffect } from 'react';
import { fx, subscribeFx } from '@/lib/effectsConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Generative interaction SFX — no audio assets, all synthesized via Web Audio:
 *  - whoosh : a soft musical note (A+E, in the ambient pad's key) that swells as you wave the cursor (own knob: fx.whooshVolume)
 *  - tap    : crisp click transient when a button/link is pressed
 *  - detonate: a deeper variant on empty-space taps (rides the ink shockwave)
 *  - hover  : a soft high blip the first time the pointer enters a clickable
 *
 * Self-contained AudioContext (the ambient pad's context is private to its
 * hook). Unlocked on the first pointer/key gesture, suspended on hidden tab,
 * silenced for prefers-reduced-motion. Volume tracks fx.sfxVolume live.
 */

const SFX_SCALE = 0.6; // keep the whole layer subtle even at sfxVolume = 1

// matches the ink detonation's own "is this an interactive target" filter
const TAP_GUARD = 'a, button, input, textarea, select, label, [role="button"], [role="dialog"]';
// what counts as a "clickable" for the hover blip (mirrors CursorCore)
const HOVERABLE = 'a, button, [role="button"], [data-cursor="pull"]';

type SfxEngine = {
  ctx: AudioContext;
  master: GainNode; // tap + hover bus, scaled by fx.sfxVolume
  noise: AudioBuffer;
  // whoosh: a soft musical "note" (A+E, consonant with the ambient pad) that
  // swells as you wave the cursor. Driven straight to destination on its own
  // fx.whooshVolume so it blends with the music.
  oscA: OscillatorNode;
  oscB: OscillatorNode;
  vib: OscillatorNode;
  windFilter: BiquadFilterNode;
  windGain: GainNode;
};

const createSfxEngine = (): SfxEngine | null => {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();

  const master = ctx.createGain();
  master.gain.value = Math.max(0, fx.sfxVolume) * SFX_SCALE;
  master.connect(ctx.destination);

  // 1s of white noise for the tap's short click transient
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  // The whoosh is a soft musical note, not air: two sine voices on A4 + E5 — a
  // fifth that's consonant with BOTH chords the ambient pad cycles through, so
  // it sits inside the music. A slow vibrato gives the same gentle wave as the
  // pad. The rAF loop only swells its VOLUME as you move; the pitch stays put,
  // so it reads as a note fading in/out, not a swoop. A warm lowpass keeps it
  // soft. Runs on its own fx.whooshVolume straight to destination (independent
  // of the tap/hover bus).
  const oscA = ctx.createOscillator();
  oscA.type = 'sine';
  oscA.frequency.value = 440; // A4
  const oscB = ctx.createOscillator();
  oscB.type = 'sine';
  oscB.frequency.value = 659.25; // E5
  const vib = ctx.createOscillator();
  vib.type = 'sine';
  vib.frequency.value = 0.12;
  const vibDepth = ctx.createGain();
  vibDepth.gain.value = 5; // cents — barely-there wave, like the pad's vibrato
  vib.connect(vibDepth);
  vibDepth.connect(oscA.detune);
  vibDepth.connect(oscB.detune);

  const windFilter = ctx.createBiquadFilter();
  windFilter.type = 'lowpass';
  windFilter.frequency.value = 1700;
  windFilter.Q.value = 0.6; // warm, soft — no edge
  const windGain = ctx.createGain();
  windGain.gain.value = 0;
  oscA.connect(windFilter);
  oscB.connect(windFilter);
  windFilter.connect(windGain).connect(ctx.destination);
  oscA.start();
  oscB.start();
  vib.start();

  return { ctx, master, noise, oscA, oscB, vib, windFilter, windGain };
};

export function useInteractionSfx() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let engine: SfxEngine | null = null;

    const ensure = (): SfxEngine | null => {
      if (!engine) {
        engine = createSfxEngine();
        if (engine && !rafId) rafId = requestAnimationFrame(tick); // start the wind loop
      }
      if (engine && engine.ctx.state === 'suspended') void engine.ctx.resume();
      return engine;
    };

    const active = () => fx.sfxVolume > 0.001;

    // --- voices -------------------------------------------------------------
    // whoosh: a continuous wind voice (built in the engine) driven by an rAF
    // loop below — not a per-move one-shot. See `tick`.

    const tap = (deep: boolean) => {
      const e = engine;
      if (!e) return;
      const now = e.ctx.currentTime;
      // pitched body — a quick downward blip
      const osc = e.ctx.createOscillator();
      osc.type = deep ? 'sine' : 'triangle';
      const f0 = deep ? 300 : 560;
      const f1 = deep ? 110 : 180;
      osc.frequency.setValueAtTime(f0, now);
      osc.frequency.exponentialRampToValueAtTime(f1, now + (deep ? 0.16 : 0.1));
      const og = e.ctx.createGain();
      og.gain.setValueAtTime(0.0001, now);
      og.gain.exponentialRampToValueAtTime(deep ? 0.28 : 0.2, now + 0.004);
      og.gain.exponentialRampToValueAtTime(0.0001, now + (deep ? 0.22 : 0.13));
      osc.connect(og).connect(e.master);
      osc.start(now);
      osc.stop(now + (deep ? 0.24 : 0.15));
      // click transient — a tiny high noise tick for "snap"
      const tick = e.ctx.createBufferSource();
      tick.buffer = e.noise;
      const hp = e.ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = deep ? 1400 : 2600;
      const tg = e.ctx.createGain();
      tg.gain.setValueAtTime(deep ? 0.12 : 0.18, now);
      tg.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      tick.connect(hp).connect(tg).connect(e.master);
      tick.start(now);
      tick.stop(now + 0.05);
    };

    const hover = () => {
      const e = engine;
      if (!e) return;
      const now = e.ctx.currentTime;
      const osc = e.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.07);
      const g = e.ctx.createGain();
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.05, now + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc.connect(g).connect(e.master);
      osc.start(now);
      osc.stop(now + 0.12);
    };

    // --- listeners ----------------------------------------------------------
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let primed = false;
    let targetSpeed = 0; // instantaneous cursor speed fed by onMove (px/ms)
    let smooth = 0; // smoothed speed driving the wind
    let rafId = 0;

    const onMove = (ev: PointerEvent) => {
      const t = performance.now();
      if (primed) {
        const dt = Math.max(t - lastT, 1);
        const speed = Math.hypot(ev.clientX - lastX, ev.clientY - lastY) / dt; // px/ms
        if (speed > targetSpeed) targetSpeed = speed; // take the peak of this frame
      }
      lastX = ev.clientX;
      lastY = ev.clientY;
      lastT = t;
      primed = true;
      if (engine && !rafId) rafId = requestAnimationFrame(tick); // wake the wind loop
    };

    // rAF loop: smooth the speed, decay it toward 0 when the pointer is still,
    // steer the lightsaber whoosh, and STOP itself once movement settles so it
    // isn't a perpetual loop. onMove wakes it again.
    const tick = () => {
      const e = engine;
      if (!e) { rafId = 0; return; }
      smooth += (targetSpeed - smooth) * 0.25;
      targetSpeed *= 0.82; // fades once you stop moving
      const wv = Math.max(0, fx.whooshVolume);
      const drive = wv > 0.001 ? Math.min(smooth / 3, 1) : 0; // 0..1, gated by its own knob
      const now = e.ctx.currentTime;
      // only the VOLUME swells with movement — pitch + tone stay put, so it's a
      // soft note fading in with the music, not a swoop.
      e.windGain.gain.setTargetAtTime(wv * 0.08 * drive, now, 0.12);
      if (smooth < 0.0015 && targetSpeed < 0.0015) {
        e.windGain.gain.setTargetAtTime(0, now, 0.25); // settle to silence and idle
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onDown = (ev: PointerEvent) => {
      if (ev.pointerType === 'touch') return; // touch decides tap-vs-drag on touchend
      const e = ensure(); // first gesture unlocks the context
      if (!e || !active()) return;
      const el = ev.target as Element | null;
      tap(!(el?.closest?.(TAP_GUARD))); // empty space → deep detonate; clickable → crisp tap
    };

    // Touch: only a deliberate tap (no scroll, no drag) makes the sound — a
    // press-and-drag/scroll stays silent. Mirrors the ink detonation gating.
    let touchTap: { x: number; y: number; time: number; scrollY: number } | null = null;
    const onTouchStart = (ev: TouchEvent) => {
      ensure(); // first gesture unlocks the audio context
      const t = ev.touches[0];
      if (!t) return;
      touchTap = { x: t.clientX, y: t.clientY, time: performance.now(), scrollY: window.scrollY };
    };
    const onTouchEnd = (ev: TouchEvent) => {
      const start = touchTap;
      touchTap = null;
      if (!start || !engine || !active()) return;
      const t = ev.changedTouches[0];
      if (!t) return;
      const moved = Math.hypot(t.clientX - start.x, t.clientY - start.y);
      const elapsedMs = performance.now() - start.time;
      const scrolled = Math.abs(window.scrollY - start.scrollY) > 2;
      if (moved < 10 && elapsedMs < 250 && !scrolled) {
        const el = t.target as Element | null;
        tap(!(el?.closest?.(TAP_GUARD))); // empty space → deep detonate; clickable → crisp tap
      }
    };

    let lastHover: Element | null = null;
    const onOver = (ev: PointerEvent) => {
      if (!engine || !active()) {
        lastHover = null;
        return;
      }
      const el = ev.target instanceof Element ? ev.target.closest(HOVERABLE) : null;
      if (el && el !== lastHover) hover();
      lastHover = el;
    };

    const onKey = () => ensure();
    const onVisibility = () => {
      if (!engine) return;
      if (document.hidden) {
        void engine.ctx.suspend();
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; } // pause the wind loop
      } else {
        void engine.ctx.resume(); // onMove will wake the wind loop again
      }
    };

    const unsubscribe = subscribeFx(() => {
      if (engine) engine.master.gain.setTargetAtTime(Math.max(0, fx.sfxVolume) * SFX_SCALE, engine.ctx.currentTime, 0.05);
    });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', onVisibility);
      if (engine) {
        try { engine.oscA.stop(); engine.oscB.stop(); engine.vib.stop(); } catch { /* already stopped */ }
        void engine.ctx.close();
      }
      engine = null;
    };
  }, [reducedMotion]);
}
