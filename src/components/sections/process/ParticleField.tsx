import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cyan particle drift inside the pinned Process stage. The particles' lateral
 * velocity is driven by the scroll scrub (ProcessSection writes progress into
 * `progressRef`), so scrubbing the section visibly pushes the dust along the
 * direction of travel — the stage feels like it has wind.
 *
 * Deliberately tiny: one Points mesh, ~280 vertices, additive blending.
 * Mounted only on desktop without reduced motion; rAF runs only while the
 * section is on screen (IntersectionObserver).
 */

const COUNT = 280;

type Props = {
  /** Mutable scrub progress (0-1), written by ProcessSection's ScrollTrigger */
  progressRef: React.MutableRefObject<number>;
};

const ParticleField = ({ progressRef }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return;
    }

    const size = () => ({ w: mount.clientWidth || 1, h: mount.clientHeight || 1 });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(size().w, size().h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = Math.random() * 2 - 1;
      positions[i * 3 + 1] = Math.random() * 2 - 1;
      positions[i * 3 + 2] = 0;
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0x00d8f0,
      size: 2.2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let rafId = 0;
    let visible = false;
    let lastProgress = progressRef.current;

    const tick = () => {
      if (!visible) return;
      const progress = progressRef.current;
      const wind = (progress - lastProgress) * 60; // scrub velocity
      lastProgress = progress;

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        // ambient drift + scrub wind (RTL travel: stage moves +x, dust flies -x)
        pos[i * 3] += (0.0006 + Math.min(Math.abs(wind) * 0.02, 0.03)) * speeds[i] * (wind >= 0 ? -1 : 1);
        pos[i * 3 + 1] += 0.0003 * speeds[i];
        if (pos[i * 3] > 1.05) pos[i * 3] = -1.05;
        if (pos[i * 3] < -1.05) pos[i * 3] = 1.05;
        if (pos[i * 3 + 1] > 1.05) pos[i * 3 + 1] = -1.05;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) tick();
      if (!visible) cancelAnimationFrame(rafId);
    });
    observer.observe(mount);

    const onResize = () => renderer.setSize(size().w, size().h);
    window.addEventListener('resize', onResize);

    return () => {
      visible = false;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-70" />;
};

export default ParticleField;
