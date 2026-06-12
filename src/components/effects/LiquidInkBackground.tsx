import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fx, fxRuntime, hexToRgb01, subscribeFx } from '@/lib/effectsConfig';

/**
 * The page atmosphere — luminous cyan ink flowing in a deep navy abyss.
 * Domain-warped fbm (two warp passes) gives the liquid-metal currents; the
 * pointer literally stirs the fluid: a decaying trail of swirl points is fed
 * into the warp, so moving the mouse drags glowing currents through the ink.
 *
 * A site-wide particle dust layer lives in the SAME renderer (one canvas,
 * one rAF): round glowing sprites that drift everywhere, gather in a ring
 * around the cursor's gravity circle (they can never enter it), ride the
 * Process section's scrub wind (fxRuntime.windX), scatter when the intro
 * dissolves (`speedleads:ink-burst`), and detonate outward on a tap/click
 * on empty space. The dust renders through a low-res ping-pong feedback
 * buffer, so motion leaves fading comet trails (length is a panel dial).
 *
 * Everything tunable reads from the effects config: stir strength, flow
 * speed, smoke intensity, ink colors, particle count/size/gravity/color,
 * glow, sharpness, trail length, trail-buffer resolution, gravity radius.
 *
 * The site's ONE full-page WebGL surface. DPR capped at 1.5, pauses when the
 * tab is hidden, full dispose on unmount, static gradient fallback under
 * reduced motion or if WebGL fails.
 */

const TRAIL_POINTS = 8;
const MAX_PARTICLES = 2500;
const MAX_SHOCKS = 3;

// --- Particle sprite: round core + glow halo (the squares were raw POINTS) --
const PARTICLE_VERTEX = /* glsl */ `
  attribute float aScale;
  uniform float uSize;  // sprite size in trail-buffer pixels
  uniform float uGlow;
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
    // the halo needs room inside the sprite, so glow widens the quad
    gl_PointSize = uSize * aScale * (2.0 + uGlow * 0.9);
  }
`;

const PARTICLE_FRAGMENT = /* glsl */ `
  precision highp float; // must match the vertex stage — uGlow lives in both
  uniform vec3 uColor;
  uniform float uGlow;      // halo strength
  uniform float uSharpness; // core edge hardness
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0; // 0 center .. 1 sprite edge
    if (d > 1.0) discard;
    float edge = mix(0.5, 0.05, clamp(uSharpness / 3.0, 0.0, 1.0));
    float core = 1.0 - smoothstep(max(0.34 - edge, 0.0), 0.34 + edge, d);
    float halo = exp(-d * 4.5) * 0.5 * uGlow;
    float a = clamp(core * 0.85 + halo, 0.0, 1.0);
    gl_FragColor = vec4(uColor, a);
  }
`;

// Feedback fade: last frame's dust, dimmed — this is what leaves the trails.
const SCREEN_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FADE_FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform sampler2D tPrev;
  uniform float uDecay;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(tPrev, vUv) * uDecay;
  }
`;

const COMPOSITE_FRAGMENT = /* glsl */ `
  precision mediump float;
  uniform sampler2D tDust;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(tDust, vUv);
  }
`;

const FRAGMENT_SHADER = (octaves: number) => /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;
  uniform float uStir;            // mouse-stir strength, 1 = designed default
  uniform float uIntensity;       // smoke brightness relative to the abyss
  uniform vec2 uRes;
  uniform vec2 uPointer;            // smoothed head, 0-1 (y up)
  uniform vec3 uInkCyan;            // bright filament color
  uniform vec3 uInkAzure;           // current body color
  uniform vec3 uTrail[${TRAIL_POINTS}]; // xy: pos 0-1 (y up), z: strength 0-1

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < ${octaves}; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = uv * vec2(aspect, 1.0) * 1.6;
    float t = uTime * 0.045;

    // Slow vertical drift with scroll so every section sits in fresh liquid
    p.y += uScroll * 1.1;

    // --- The stir: pointer trail injects rotational swirl into the warp ---
    vec2 stir = vec2(0.0);
    float wake = 0.0;
    for (int i = 0; i < ${TRAIL_POINTS}; i++) {
      vec2 tp = uTrail[i].xy * vec2(aspect, 1.0) * 1.6;
      tp.y += uScroll * 1.1;
      vec2 d = p - tp;
      float dist2 = dot(d, d);
      float influence = uTrail[i].z * exp(-dist2 * 14.0);
      // rotate around the trail point — stirring, not pushing
      stir += vec2(-d.y, d.x) * influence * 1.4 * uStir;
      wake += influence * uStir;
    }

    // --- Two-pass domain warp (the liquid) ---
    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + t),
      fbm(p + vec2(5.2, 1.3) - t * 0.8)
    );
    q += stir;

    vec2 r = vec2(
      fbm(p + 1.9 * q + vec2(1.7, 9.2) + t * 0.35),
      fbm(p + 1.9 * q + vec2(8.3, 2.8) - t * 0.25)
    );

    float f = fbm(p + 1.8 * r);

    // --- Palette: two panel-editable inks, the rest derived from them ---
    vec3 abyss = vec3(0.012, 0.024, 0.055);  // deep navy void
    vec3 azure = uInkAzure;                   // current
    vec3 deep  = uInkAzure * 0.45;            // deep body
    vec3 cyan  = uInkCyan;                    // bright filament
    vec3 ice   = mix(uInkCyan, vec3(1.0), 0.62); // crest highlight

    vec3 col = mix(abyss, deep, clamp(f * f * 2.6, 0.0, 1.0));
    col = mix(col, azure, clamp(length(q) * 0.55, 0.0, 1.0) * 0.45);
    col = mix(col, cyan, clamp(r.x * r.x * 1.6, 0.0, 1.0) * 0.30);

    // Specular-ish crests — the liquid-metal sheen
    float crest = smoothstep(0.62, 0.92, f) * smoothstep(0.4, 0.9, r.y);
    col += ice * crest * 0.22;

    // The wake glows — you can see where the cursor has been
    col += cyan * wake * 0.30 + ice * wake * wake * 0.12;

    // Soft ambient light around the resting cursor so stillness still breathes
    vec2 pd = (uv - uPointer) * vec2(aspect, 1.0);
    col += azure * 0.10 * exp(-dot(pd, pd) * 9.0);

    // Smoke intensity: scale the lit ink relative to the void
    col = abyss + (col - abyss) * uIntensity;

    // Deeper into the page the ink calms toward the abyss (keeps copy readable)
    col = mix(col, abyss, uScroll * 0.45);

    // Vignette + grain
    col *= 1.0 - 0.34 * length(uv - vec2(0.5, 0.55));
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.022;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERTEX_SHADER = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const STATIC_FALLBACK = (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage:
        'radial-gradient(ellipse at 28% 12%, rgba(0, 246, 255, 0.10), transparent 55%), radial-gradient(ellipse at 72% 40%, rgba(0, 114, 229, 0.10), transparent 55%), linear-gradient(180deg, #0A1626, #05080F)',
    }}
  />
);

const LiquidInkBackground = () => {
  const reducedMotion = useReducedMotion();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (reducedMotion || !mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
    } catch {
      return; // fallback div below remains
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const isSmallScreen = window.innerWidth < 768;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const trail = Array.from({ length: TRAIL_POINTS }, () => new THREE.Vector3(0.5, 0.5, 0));
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uStir: { value: fx.inkStir },
      uIntensity: { value: fx.inkIntensity },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uInkCyan: { value: new THREE.Vector3(...hexToRgb01(fx.inkCyan)) },
      uInkAzure: { value: new THREE.Vector3(...hexToRgb01(fx.inkAzure)) },
      uTrail: { value: trail },
    };
    const material = new THREE.ShaderMaterial({
      // fewer fbm octaves on small screens — invisible there, much cheaper
      fragmentShader: FRAGMENT_SHADER(isSmallScreen ? 3 : 4),
      vertexShader: VERTEX_SHADER,
      uniforms,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // --- Site-wide particle dust (same canvas, same rAF) -------------------
    // Positions live in NDC [-1,1]. Each particle has a home it springs back
    // to, so the cursor's gravity well swirls the field without collapsing it.
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const homes = new Float32Array(MAX_PARTICLES * 2);
    const velocities = new Float32Array(MAX_PARTICLES * 2);
    const drift = new Float32Array(MAX_PARTICLES);
    const scales = new Float32Array(MAX_PARTICLES);
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      homes[i * 2] = x;
      homes[i * 2 + 1] = y;
      drift[i] = 0.4 + Math.random() * 0.8;
      scales[i] = 0.7 + Math.random() * 0.9;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    const particleUniforms = {
      uColor: { value: new THREE.Color(fx.particleColor) },
      uSize: { value: 1 },
      uGlow: { value: fx.particleGlow },
      uSharpness: { value: fx.particleSharpness },
    };
    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      uniforms: particleUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const points = new THREE.Points(particleGeometry, particleMaterial);

    // The dust draws into a low-res ping-pong buffer: previous frame × decay,
    // fresh sprites on top — real comet trails for the cost of two small RTs.
    const resScale = () => Math.min(Math.max(fx.particleResolution, 0.25), 1);
    const rtSize = () => ({
      w: Math.max(1, Math.floor(window.innerWidth * renderer.getPixelRatio() * resScale())),
      h: Math.max(1, Math.floor(window.innerHeight * renderer.getPixelRatio() * resScale())),
    });
    const makeRT = () => {
      const { w, h } = rtSize();
      return new THREE.WebGLRenderTarget(w, h, { depthBuffer: false, stencilBuffer: false });
    };
    let rtPrev = makeRT();
    let rtCurr = makeRT();
    let appliedResScale = resScale();

    const fadeMaterial = new THREE.ShaderMaterial({
      vertexShader: SCREEN_VERTEX,
      fragmentShader: FADE_FRAGMENT,
      uniforms: { tPrev: { value: rtPrev.texture }, uDecay: { value: 0 } },
      blending: THREE.NoBlending,
      depthWrite: false,
      depthTest: false,
    });
    const fadeQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fadeMaterial);
    fadeQuad.renderOrder = 0;
    points.renderOrder = 1;
    const dustScene = new THREE.Scene();
    dustScene.add(fadeQuad);
    dustScene.add(points);

    const compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: SCREEN_VERTEX,
      fragmentShader: COMPOSITE_FRAGMENT,
      uniforms: { tDust: { value: rtCurr.texture } },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const compositeQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), compositeMaterial);
    const compositeScene = new THREE.Scene();
    compositeScene.add(compositeQuad);

    const activeCount = () =>
      Math.min(Math.round(fx.particleCount * (isSmallScreen ? 0.4 : 1)), MAX_PARTICLES);
    particleGeometry.setDrawRange(0, activeCount());

    const sizeTrailBuffers = () => {
      const { w, h } = rtSize();
      rtPrev.setSize(w, h);
      rtCurr.setSize(w, h);
      appliedResScale = resScale();
    };

    // Panel changes that aren't cheap to poll per frame
    const unsubscribeFx = subscribeFx(() => {
      uniforms.uInkCyan.value.set(...hexToRgb01(fx.inkCyan));
      uniforms.uInkAzure.value.set(...hexToRgb01(fx.inkAzure));
      particleUniforms.uColor.value.set(fx.particleColor);
      particleGeometry.setDrawRange(0, activeCount());
      if (resScale() !== appliedResScale) sizeTrailBuffers();
    });

    // Pointer head is smoothed; a trail point is dropped whenever the head
    // has travelled far enough, so fast strokes leave a long stirred wake.
    const target = new THREE.Vector2(0.5, 0.5);
    const head = new THREE.Vector2(0.5, 0.5);
    const lastDrop = new THREE.Vector2(0.5, 0.5);
    let pointerActive = false;
    let trailIndex = 0;
    let rafId = 0;
    let running = true;
    let elapsed = 0;
    const clock = new THREE.Clock();

    // Tap/click detonations — an expanding ring that kicks dust outward.
    const shocks: Array<{ x: number; y: number; t: number }> = [];

    const stepParticles = (dt: number, aspect: number) => {
      const count = activeCount();
      const motion = fx.motionSpeed;
      // gravity well center in NDC (x is aspect-corrected so math is circular)
      const px = (head.x * 2 - 1) * aspect;
      const py = head.y * 2 - 1;
      const gravity = isCoarsePointer || !pointerActive ? 0 : fx.particleGravity;
      const wind = fxRuntime.windX;
      fxRuntime.windX *= 0.92; // wind impulses decay here, once per frame

      // px → NDC-y units: 1 unit = half the viewport height
      const pxToNdc = 2 / window.innerHeight;
      const exclusion = fx.gravityRadius * pxToNdc; // the gravity circle
      const capture = exclusion * 3.5; // attraction reaches this far out

      const frame = Math.min(dt, 0.05) * 60; // normalize physics to ~60fps steps

      for (const shock of shocks) shock.t += dt * 1000;
      while (shocks.length && shocks[0].t > 900) shocks.shift();

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iv = i * 2;
        let x = positions[ix];
        let y = positions[ix + 1];

        // cursor gravity: radial pull toward the rim of the exclusion circle;
        // inside it, a hard outward spring — dust rings the cursor, never
        // sits under it. (Forces are computed in aspect-corrected space and
        // the x-component is mapped back, so the gather is truly circular.)
        if (gravity > 0) {
          const dx = px - x * aspect;
          const dy = py - y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1e-5;
          if (d < exclusion) {
            const f = (1 - d / exclusion) * 0.02 * frame;
            velocities[iv] -= ((dx / d) * f) / aspect;
            velocities[iv + 1] -= (dy / d) * f;
          } else if (d < capture) {
            const f = (1 - (d - exclusion) / (capture - exclusion)) * 0.0011 * gravity * frame;
            velocities[iv] += ((dx / d) * f) / aspect;
            velocities[iv + 1] += (dy / d) * f;
          }
        }

        // detonation rings (artifact-style expanding band)
        for (const shock of shocks) {
          const r = shock.t * 0.9 * pxToNdc;
          const band = 44 * pxToNdc;
          const sx = x * aspect - shock.x;
          const sy = y - shock.y;
          const sd = Math.sqrt(sx * sx + sy * sy) || 1e-5;
          const off = Math.abs(sd - r);
          if (off < band) {
            const f = (1 - off / band) * 0.012 * frame;
            velocities[iv] += ((sx / sd) * f) / aspect;
            velocities[iv + 1] += (sy / sd) * f;
          }
        }

        // spring home + damping keeps the field stable
        velocities[iv] += (homes[iv] - x) * 0.0008 * frame;
        velocities[iv + 1] += (homes[iv + 1] - y) * 0.0008 * frame;
        velocities[iv] *= 0.94;
        velocities[iv + 1] *= 0.94;

        // ambient drift + Process scrub wind (RTL stage travels +x → dust -x)
        x += (velocities[iv] - wind * 0.02 * drift[i]) * frame;
        y += (velocities[iv + 1] + 0.00035 * drift[i] * motion) * frame;

        // wrap; the home wraps with the particle so the spring never fights it
        if (y > 1.05) { y -= 2.1; homes[iv + 1] -= 2.1; }
        else if (y < -1.05) { y += 2.1; homes[iv + 1] += 2.1; }
        if (x > 1.05) { x -= 2.1; homes[iv] -= 2.1; }
        else if (x < -1.05) { x += 2.1; homes[iv] += 2.1; }

        positions[ix] = x;
        positions[ix + 1] = y;
      }
      particleGeometry.attributes.position.needsUpdate = true;
    };

    const tick = () => {
      if (!running) return;
      const dt = clock.getDelta();
      elapsed += dt * fx.inkFlow * fx.motionSpeed;
      uniforms.uTime.value = elapsed;
      uniforms.uStir.value = fx.inkStir;
      uniforms.uIntensity.value = fx.inkIntensity;

      head.lerp(target, 0.14);
      uniforms.uPointer.value.copy(head);

      if (head.distanceTo(lastDrop) > 0.012) {
        const speed = Math.min(head.distanceTo(lastDrop) * 26, 1);
        trail[trailIndex].set(head.x, head.y, Math.max(trail[trailIndex].z, 0.35 + 0.65 * speed));
        trailIndex = (trailIndex + 1) % TRAIL_POINTS;
        lastDrop.copy(head);
      }
      for (const point of trail) point.z *= 0.965; // the wake fades

      stepParticles(dt, uniforms.uRes.value.x / uniforms.uRes.value.y);

      // dust pass: previous frame faded + fresh sprites → current buffer
      particleUniforms.uSize.value =
        fx.particleSize * renderer.getPixelRatio() * appliedResScale * 1.6;
      particleUniforms.uGlow.value = fx.particleGlow;
      particleUniforms.uSharpness.value = fx.particleSharpness;
      fadeMaterial.uniforms.tPrev.value = rtPrev.texture;
      fadeMaterial.uniforms.uDecay.value = Math.min(fx.particleTrail, 1) * 0.94;
      renderer.setRenderTarget(rtCurr);
      renderer.render(dustScene, camera);
      renderer.setRenderTarget(null);

      renderer.render(scene, camera); // the ink
      compositeMaterial.uniforms.tDust.value = rtCurr.texture;
      renderer.autoClear = false;
      renderer.render(compositeScene, camera); // dust + trails over the ink
      renderer.autoClear = true;

      [rtPrev, rtCurr] = [rtCurr, rtPrev];
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerActive = true;
      target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    // Tap empty space to detonate: shockwave through the dust + a swirl in
    // the ink. Interactive elements keep their clicks to themselves.
    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (el?.closest?.('a, button, input, textarea, select, label, [role="button"], [role="dialog"]')) return;
      const nx = e.clientX / window.innerWidth;
      const ny = 1 - e.clientY / window.innerHeight;
      shocks.push({ x: (nx * 2 - 1) * (window.innerWidth / window.innerHeight), y: ny * 2 - 1, t: 0 });
      if (shocks.length > MAX_SHOCKS) shocks.shift();
      trail[trailIndex].set(nx, ny, 1);
      trailIndex = (trailIndex + 1) % TRAIL_POINTS;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      uniforms.uScroll.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
      sizeTrailBuffers();
    };
    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        clock.start();
        tick();
      } else {
        cancelAnimationFrame(rafId);
      }
    };
    // The intro dissolves INTO the ink: seed a ring of strong swirl points at
    // screen center and blow the dust outward once.
    const onInkBurst = () => {
      for (let i = 0; i < TRAIL_POINTS; i++) {
        const angle = (i / TRAIL_POINTS) * Math.PI * 2;
        trail[i].set(0.5 + Math.cos(angle) * 0.16, 0.5 + Math.sin(angle) * 0.16, 1);
      }
      const count = activeCount();
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iv = i * 2;
        const dx = positions[ix];
        const dy = positions[ix + 1];
        const dist = Math.hypot(dx, dy) + 0.0001;
        const kick = 0.02 * Math.exp(-dist * 1.8);
        velocities[iv] += (dx / dist) * kick;
        velocities[iv + 1] += (dy / dist) * kick;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('speedleads:ink-burst', onInkBurst);
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      unsubscribeFx();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('speedleads:ink-burst', onInkBurst);
      quad.geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      fadeQuad.geometry.dispose();
      fadeMaterial.dispose();
      compositeQuad.geometry.dispose();
      compositeMaterial.dispose();
      rtPrev.dispose();
      rtCurr.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  if (reducedMotion) return STATIC_FALLBACK;

  return (
    <>
      {STATIC_FALLBACK}
      <div ref={mountRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />
    </>
  );
};

export default LiquidInkBackground;
