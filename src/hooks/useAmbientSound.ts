import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fx, setFx, subscribeFx } from '@/lib/effectsConfig';

const STORAGE_KEY = 'speedleads-ambient-sound';

/**
 * Generative ambient soundscape, synthesized live with the Web Audio API —
 * no audio asset, no loop seam, no licensing.
 *
 * Voice (owner brief: "airy & breathy, calming, never static"):
 *  - two soft chords (Amaj9 ↔ Fmaj9, pure sines) crossfading on a ~40s cycle
 *  - every voice breathes on its own slow amplitude LFO (desynced rates)
 *  - a quiet band-passed noise layer — the "air" — swelling slowly
 *  - one barely-there shimmer note two octaves up with slow vibrato
 *  - gentle feedback delay for space; a lowpass opens as you scroll deeper
 *
 * Volume comes from the effects config (`fx.volume`, panel + slide-out
 * slider) and is applied live.
 *
 * Rules: off by default, only ever starts from a user gesture (autoplay-safe),
 * preference persists in localStorage, suspends when the tab is hidden,
 * unavailable under reduced motion.
 */

/** fx.volume (0..1) → master gain. 0.5 ≈ the level verified audible on laptops. */
const VOLUME_SCALE = 0.34;
const ATTACK_S = 4;

interface AmbientEngine {
  ctx: AudioContext;
  master: GainNode;
  filter: BiquadFilterNode;
  stop: () => void;
}

type Voice = { freq: number; gain: number };

// Amaj9 (home, matches the brand's A-rooted iteration-2 pad) ↔ Fmaj9 (warm lift)
const CHORD_A: Voice[] = [
  { freq: 220.0, gain: 0.3 },
  { freq: 329.63, gain: 0.26 },
  { freq: 440.0, gain: 0.2 },
  { freq: 554.37, gain: 0.11 },
  { freq: 659.25, gain: 0.07 },
];
const CHORD_B: Voice[] = [
  { freq: 174.61, gain: 0.28 },
  { freq: 261.63, gain: 0.26 },
  { freq: 329.63, gain: 0.2 },
  { freq: 392.0, gain: 0.12 },
  { freq: 523.25, gain: 0.07 },
];

function createAmbientEngine(): AmbientEngine | null {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const startedNodes: Array<OscillatorNode | AudioBufferSourceNode> = [];

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Lowpass keeps everything soft; it opens slightly as you scroll (see hook)
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1100;
  filter.Q.value = 0.6;
  filter.connect(master);

  // Spacious feedback-delay wet path (feedback kept low — air, not echo)
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.46;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.25;
  const wet = ctx.createGain();
  wet.gain.value = 0.35;
  filter.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(master);

  const startOsc = (osc: OscillatorNode) => {
    osc.start();
    startedNodes.push(osc);
  };

  // --- Two chord buses crossfading on a ~40s cycle -------------------------
  const chordBusA = ctx.createGain();
  const chordBusB = ctx.createGain();
  chordBusA.gain.value = 0.5;
  chordBusB.gain.value = 0.5;
  chordBusA.connect(filter);
  chordBusB.connect(filter);

  const crossLfo = ctx.createOscillator();
  crossLfo.frequency.value = 1 / 40;
  const crossUp = ctx.createGain();
  crossUp.gain.value = 0.45;
  const crossDown = ctx.createGain();
  crossDown.gain.value = -0.45;
  crossLfo.connect(crossUp);
  crossLfo.connect(crossDown);
  crossUp.connect(chordBusA.gain);
  crossDown.connect(chordBusB.gain);
  startOsc(crossLfo);

  const buildChord = (voices: Voice[], bus: GainNode) => {
    voices.forEach((voice, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = voice.freq;
      osc.detune.value = (Math.random() - 0.5) * 7; // gentle ensemble drift

      const g = ctx.createGain();
      g.gain.value = voice.gain;
      osc.connect(g);
      g.connect(bus);

      // each voice breathes at its own slow, desynced rate
      const breath = ctx.createOscillator();
      breath.frequency.value = 0.02 + ((i * 7919) % 100) / 100 * 0.045;
      const breathDepth = ctx.createGain();
      breathDepth.gain.value = voice.gain * 0.35;
      breath.connect(breathDepth);
      breathDepth.connect(g.gain);
      startOsc(breath);
      startOsc(osc);
    });
  };
  buildChord(CHORD_A, chordBusA);
  buildChord(CHORD_B, chordBusB);

  // --- The "air": band-passed noise, swelling very slowly ------------------
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const airBand = ctx.createBiquadFilter();
  airBand.type = 'bandpass';
  airBand.frequency.value = 1900;
  airBand.Q.value = 0.7;
  const airGain = ctx.createGain();
  airGain.gain.value = 0.014;
  noise.connect(airBand);
  airBand.connect(airGain);
  airGain.connect(master);
  const airSwell = ctx.createOscillator();
  airSwell.frequency.value = 0.025;
  const airSwellDepth = ctx.createGain();
  airSwellDepth.gain.value = 0.008;
  airSwell.connect(airSwellDepth);
  airSwellDepth.connect(airGain.gain);
  noise.start();
  startedNodes.push(noise);
  startOsc(airSwell);

  // --- Shimmer: one distant high note with slow vibrato --------------------
  const shimmer = ctx.createOscillator();
  shimmer.type = 'sine';
  shimmer.frequency.value = 1318.51; // E6
  const shimmerVibrato = ctx.createOscillator();
  shimmerVibrato.frequency.value = 0.12;
  const vibratoDepth = ctx.createGain();
  vibratoDepth.gain.value = 9; // cents
  shimmerVibrato.connect(vibratoDepth);
  vibratoDepth.connect(shimmer.detune);
  const shimmerGain = ctx.createGain();
  shimmerGain.gain.value = 0.009;
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master);
  startOsc(shimmer);
  startOsc(shimmerVibrato);

  // Very slow filter sweep on top of the scroll-follow — extra breathing
  const filterLfo = ctx.createOscillator();
  filterLfo.frequency.value = 0.03;
  const filterLfoDepth = ctx.createGain();
  filterLfoDepth.gain.value = 220;
  filterLfo.connect(filterLfoDepth);
  filterLfoDepth.connect(filter.frequency);
  startOsc(filterLfo);

  const stop = () => {
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.2);
    window.setTimeout(() => {
      startedNodes.forEach((node) => node.stop());
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
    // anchor the automation so the long, soft attack starts from silence
    engine.master.gain.setValueAtTime(0, now);
    engine.master.gain.linearRampToValueAtTime(fx.volume * VOLUME_SCALE, now + ATTACK_S);
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

  const setVolume = useCallback((volume: number) => {
    setFx({ volume });
  }, []);

  // Volume changes (slider here or in the control panel) apply live
  useEffect(() => {
    if (!playing) return;
    return subscribeFx(() => {
      const engine = engineRef.current;
      if (!engine) return;
      engine.master.gain.setTargetAtTime(fx.volume * VOLUME_SCALE, engine.ctx.currentTime, 0.1);
    });
  }, [playing]);

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
        engine.filter.frequency.setTargetAtTime(1100 + depth * 500, engine.ctx.currentTime, 0.5);
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

  return { playing, toggle, setVolume, available: !reducedMotion };
}
