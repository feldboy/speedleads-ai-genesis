import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STORAGE_KEY = 'speedleads-ambient-sound';

/**
 * Generative ambient pad, synthesized live with the Web Audio API — no audio
 * asset, no loop seam, no licensing. Detuned oscillators feed an LFO-swept
 * lowpass into a feedback delay; the filter opens subtly as you scroll deeper.
 *
 * Rules: off by default, only ever starts from a user gesture (autoplay-safe),
 * preference persists in localStorage, suspends when the tab is hidden,
 * unavailable under reduced motion.
 */

interface AmbientEngine {
  ctx: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode;
  stop: () => void;
}

function createAmbientEngine(): AmbientEngine | null {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // LFO-swept lowpass is what makes the pad feel alive.
  // Base sits at 900Hz: low enough to stay soft, high enough that the pad's
  // mid harmonics survive laptop speakers (everything below ~250Hz doesn't).
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  filter.Q.value = 0.7;

  // Dry + spacious feedback-delay wet path
  filter.connect(master);
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.46;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.35;
  const wet = ctx.createGain();
  wet.gain.value = 0.4;
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(master);

  // A-rooted pad, voiced around A2-E5 so it's actually reproducible on
  // laptop speakers (the original 55-220Hz voicing was physically inaudible
  // on anything without a woofer)
  const voices: Array<{ type: OscillatorType; freq: number; detune: number; gain: number }> = [
    { type: 'sine', freq: 110, detune: 0, gain: 0.4 },
    { type: 'sine', freq: 220, detune: 0, gain: 0.45 },
    { type: 'sine', freq: 329.63, detune: 5, gain: 0.3 },
    { type: 'triangle', freq: 440, detune: -6, gain: 0.18 },
    { type: 'triangle', freq: 659.25, detune: 8, gain: 0.1 },
  ];
  const oscillators = voices.map((v) => {
    const osc = ctx.createOscillator();
    osc.type = v.type;
    osc.frequency.value = v.freq;
    osc.detune.value = v.detune;
    const g = ctx.createGain();
    g.gain.value = v.gain;
    osc.connect(g);
    g.connect(filter);
    osc.start();
    return osc;
  });

  // Very slow filter sweep — the "breathing"
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.03;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 350;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  const stop = () => {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.2);
    window.setTimeout(() => {
      oscillators.forEach((o) => o.stop());
      lfo.stop();
      void ctx.close();
    }, 1400);
  };

  return { ctx, master, filter, stop };
}

export function useAmbientSound() {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);

  const start = useCallback(() => {
    if (engineRef.current) return;
    const engine = createAmbientEngine();
    if (!engine) return;
    engineRef.current = engine;
    void engine.ctx.resume();
    const now = engine.ctx.currentTime;
    // anchor the automation so the ramp starts from silence at `now`
    engine.master.gain.setValueAtTime(0, now);
    engine.master.gain.linearRampToValueAtTime(0.17, now + 2.5);
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    engineRef.current = null;
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      localStorage.setItem(STORAGE_KEY, 'off');
    } else {
      start();
      localStorage.setItem(STORAGE_KEY, 'on');
    }
  }, [playing, start, stop]);

  // Stored "on" still needs a user gesture before audio may start
  useEffect(() => {
    if (reducedMotion) return;
    if (localStorage.getItem(STORAGE_KEY) !== 'on') return;

    const onFirstGesture = () => start();
    window.addEventListener('pointerdown', onFirstGesture, { once: true });
    window.addEventListener('keydown', onFirstGesture, { once: true });
    return () => {
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
    };
  }, [reducedMotion, start]);

  // Suspend while the tab is hidden
  useEffect(() => {
    if (!playing) return;
    const onVisibility = () => {
      const ctx = engineRef.current?.ctx;
      if (!ctx) return;
      if (document.hidden) void ctx.suspend();
      else void ctx.resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [playing]);

  // The filter opens as you scroll deeper — the pad follows the journey
  useEffect(() => {
    if (!playing) return;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const engine = engineRef.current;
        if (!engine) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const depth = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        engine.filter.frequency.setTargetAtTime(900 + depth * 700, engine.ctx.currentTime, 0.5);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [playing]);

  // Full teardown on unmount; reduced motion forces silence
  useEffect(() => {
    if (reducedMotion && engineRef.current) stop();
    return () => {
      engineRef.current?.stop();
      engineRef.current = null;
    };
  }, [reducedMotion, stop]);

  return { playing, toggle, available: !reducedMotion };
}
