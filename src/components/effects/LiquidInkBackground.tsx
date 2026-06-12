import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The page atmosphere — luminous cyan ink flowing in a deep navy abyss.
 * Domain-warped fbm (two warp passes) gives the liquid-metal currents; the
 * pointer literally stirs the fluid: a decaying trail of swirl points is fed
 * into the warp, so moving the mouse drags glowing currents through the ink.
 *
 * The site's ONE full-page WebGL surface. DPR capped at 1.5, pauses when the
 * tab is hidden, full dispose on unmount, static gradient fallback under
 * reduced motion or if WebGL fails.
 */

const TRAIL_POINTS = 8;

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uRes;
  uniform vec2 uPointer;            // smoothed head, 0-1 (y up)
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
    for (int i = 0; i < 4; i++) {
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
      stir += vec2(-d.y, d.x) * influence * 1.4;
      wake += influence;
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

    // --- Cyan-only palette ---
    vec3 abyss   = vec3(0.012, 0.024, 0.055);  // deep navy void
    vec3 deep    = vec3(0.0, 0.16, 0.38);      // deep azure body
    vec3 azure   = vec3(0.0, 0.45, 0.85);      // current
    vec3 cyan    = vec3(0.0, 0.83, 0.95);      // bright filament
    vec3 ice     = vec3(0.62, 0.95, 1.0);      // crest highlight

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

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const trail = Array.from({ length: TRAIL_POINTS }, () => new THREE.Vector3(0.5, 0.5, 0));
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uTrail: { value: trail },
    };
    const material = new THREE.ShaderMaterial({
      fragmentShader: FRAGMENT_SHADER,
      vertexShader: VERTEX_SHADER,
      uniforms,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // Pointer head is smoothed; a trail point is dropped whenever the head
    // has travelled far enough, so fast strokes leave a long stirred wake.
    const target = new THREE.Vector2(0.5, 0.5);
    const head = new THREE.Vector2(0.5, 0.5);
    const lastDrop = new THREE.Vector2(0.5, 0.5);
    let trailIndex = 0;
    let rafId = 0;
    let running = true;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!running) return;
      uniforms.uTime.value = clock.getElapsedTime();

      head.lerp(target, 0.14);
      uniforms.uPointer.value.copy(head);

      if (head.distanceTo(lastDrop) > 0.012) {
        const speed = Math.min(head.distanceTo(lastDrop) * 26, 1);
        trail[trailIndex].set(head.x, head.y, Math.max(trail[trailIndex].z, 0.35 + 0.65 * speed));
        trailIndex = (trailIndex + 1) % TRAIL_POINTS;
        lastDrop.copy(head);
      }
      for (const point of trail) point.z *= 0.965; // the wake fades

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
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

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      quad.geometry.dispose();
      material.dispose();
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
