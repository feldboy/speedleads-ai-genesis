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
 * one rAF): the particles drift everywhere, fall toward the cursor like a
 * soft gravity well, ride the Process section's scrub wind (fxRuntime.windX),
 * and scatter when the intro dissolves (`speedleads:ink-burst`).
 *
 * Everything tunable reads from the effects config: stir strength, flow
 * speed, smoke intensity, ink colors, particle count/size/gravity/color.
 *
 * The site's ONE full-page WebGL surface. DPR capped at 1.5, pauses when the
 * tab is hidden, full dispose on unmount, static gradient fallback under
 * reduced motion or if WebGL fails.
 */

const TRAIL_POINTS = 8;
const MAX_PARTICLES = 900;

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
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      homes[i * 2] = x;
      homes[i * 2 + 1] = y;
      drift[i] = 0.4 + Math.random() * 0.8;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(fx.particleColor),
      size: fx.particleSize * renderer.getPixelRatio(), // device px → crisp at any DPR
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    const points = new THREE.Points(particleGeometry, particleMaterial);
    points.renderOrder = 1;
    scene.add(points);

    const activeCount = () =>
      Math.min(Math.round(fx.particleCount * (isSmallScreen ? 0.4 : 1)), MAX_PARTICLES);
    particleGeometry.setDrawRange(0, activeCount());

    // Panel changes that aren't cheap to poll per frame
    const unsubscribeFx = subscribeFx(() => {
      uniforms.uInkCyan.value.set(...hexToRgb01(fx.inkCyan));
      uniforms.uInkAzure.value.set(...hexToRgb01(fx.inkAzure));
      particleMaterial.color.set(fx.particleColor);
      particleMaterial.size = fx.particleSize * renderer.getPixelRatio();
      particleGeometry.setDrawRange(0, activeCount());
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

    const stepParticles = (dt: number, aspect: number) => {
      const count = activeCount();
      const motion = fx.motionSpeed;
      // gravity well center in NDC (aspect-corrected for circular falloff)
      const px = head.x * 2 - 1;
      const py = head.y * 2 - 1;
      const gravity = isCoarsePointer || !pointerActive ? 0 : fx.particleGravity;
      const wind = fxRuntime.windX;
      fxRuntime.windX *= 0.92; // wind impulses decay here, once per frame

      const frame = Math.min(dt, 0.05) * 60; // normalize physics to ~60fps steps

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const iv = i * 2;
        let x = positions[ix];
        let y = positions[ix + 1];

        // cursor gravity: soft inverse-square attraction, clamped near the core
        if (gravity > 0) {
          const dx = (px - x) * aspect;
          const dy = py - y;
          const d2 = dx * dx + dy * dy;
          const force = Math.min((gravity * 0.00045) / (d2 + 0.015), 0.0035);
          velocities[iv] += dx * force * frame;
          velocities[iv + 1] += dy * force * frame;
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

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerActive = true;
      target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      uniforms.uScroll.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    };
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('speedleads:ink-burst', onInkBurst);
      quad.geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
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
