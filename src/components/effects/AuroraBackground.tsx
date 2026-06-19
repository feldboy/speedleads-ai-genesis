import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The page atmosphere — a living aurora in brand colors (cyan/violet/gold over
 * the navy abyss). This is the site's ONE WebGL surface (replaces the old
 * ShaderBackground): pointer-reactive parallax, dims as you scroll deeper,
 * DPR capped at 1.5, pauses when the tab is hidden.
 * Falls back to a static gradient under reduced motion or if WebGL fails.
 */

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform vec2 uRes;

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
      p = p * 2.05 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    vec2 p = uv * vec2(uRes.x / uRes.y, 1.0);
    float t = uTime * 0.05;
    vec2 m = (uMouse - 0.5) * 0.18;

    vec3 abyss = vec3(0.016, 0.028, 0.058);
    vec3 cyan   = vec3(0.0, 0.965, 1.0);
    vec3 violet = vec3(0.39, 0.235, 0.86);
    vec3 gold   = vec3(0.69, 0.553, 0.34);

    float n1 = fbm(p * 1.6 + vec2(t, -t * 0.6) + m);
    float band1 = smoothstep(0.38, 0.78, n1) * (0.55 + 0.45 * sin(uv.y * 3.0 + n1 * 5.0 + t * 2.0));

    float n2 = fbm(p * 2.3 - vec2(t * 0.7, t * 0.35) - m * 0.6);
    float band2 = smoothstep(0.45, 0.85, n2);

    float n3 = fbm(p * 1.1 + vec2(-t * 0.4, t * 0.5));
    float band3 = smoothstep(0.58, 0.92, n3);

    vec3 col = abyss;
    col += cyan * band1 * 0.16 * (1.0 - uv.y * 0.35);
    col += violet * band2 * 0.10;
    col += gold * band3 * 0.07;

    // Deeper into the page, the aurora calms and the abyss takes over
    col = mix(col, abyss, uScroll * 0.55);

    // Soft vignette
    col *= 1.0 - 0.35 * length(uv - vec2(0.5, 0.55));

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
        'radial-gradient(ellipse at 30% 10%, rgba(0, 246, 255, 0.10), transparent 55%), radial-gradient(ellipse at 75% 35%, rgba(100, 60, 220, 0.08), transparent 55%), linear-gradient(180deg, #0A1626, #05080F)',
    }}
  />
);

const AuroraBackground = () => {
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
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };
    const material = new THREE.ShaderMaterial({
      fragmentShader: FRAGMENT_SHADER,
      vertexShader: VERTEX_SHADER,
      uniforms,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    let rafId = 0;
    let running = true;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!running) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetMouse, 0.04);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      targetMouse.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
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

export default AuroraBackground;
