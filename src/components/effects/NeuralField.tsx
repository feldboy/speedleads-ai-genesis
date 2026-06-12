import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * NeuralField — the site-wide background: a slowly drifting neural mesh.
 * Nodes within reach of the cursor are gently attracted and their links
 * brighten cyan; everything else stays a faint champagne-on-obsidian web.
 */

const CYAN = new THREE.Color('#00f6ff');
const FAINT = new THREE.Color('#23406a');
const GOLD = new THREE.Color('#d4af7a');

interface MeshProps {
  nodeCount: number;
  interactive: boolean;
}

const NeuralMesh = ({ nodeCount, interactive }: MeshProps) => {
  const { viewport, pointer } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const linkDist = 1.9;
  const maxLinks = nodeCount * 6;

  const sim = useMemo(() => {
    const w = Math.max(viewport.width, 10) * 1.15;
    const h = Math.max(viewport.height, 6) * 1.15;
    const positions = new Float32Array(nodeCount * 3);
    const home = new Float32Array(nodeCount * 3);
    const vel = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      const z = (Math.random() - 0.5) * 2.5;
      positions.set([x, y, z], i * 3);
      home.set([x, y, z], i * 3);
      vel.set([
        (Math.random() - 0.5) * 0.0035,
        (Math.random() - 0.5) * 0.0035,
        0,
      ], i * 3);
      sizes[i] = Math.random();
    }
    return {
      positions,
      display: positions.slice(),
      home,
      vel,
      sizes,
      w,
      h,
      linePositions: new Float32Array(maxLinks * 6),
      lineColors: new Float32Array(maxLinks * 6),
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeCount]);

  useFrame((state) => {
    const { positions, display, vel, home, linePositions, lineColors, w, h } = sim;
    const t = state.clock.elapsedTime;

    // cursor in world units
    const mx = pointer.x * (viewport.width / 2);
    const my = pointer.y * (viewport.height / 2);
    const mouseOn = interactive && (pointer.x !== 0 || pointer.y !== 0);

    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3;
      let x = positions[ix];
      let y = positions[ix + 1];

      // ambient drift + soft pull back home keeps the cloud coherent
      x += vel[ix] + Math.sin(t * 0.25 + i) * 0.0008;
      y += vel[ix + 1] + Math.cos(t * 0.21 + i * 1.7) * 0.0008;
      x += (home[ix] - x) * 0.0015;
      y += (home[ix + 1] - y) * 0.0015;

      // soft wrap at field edges
      if (x > w / 2) x = -w / 2;
      if (x < -w / 2) x = w / 2;
      if (y > h / 2) y = -h / 2;
      if (y < -h / 2) y = h / 2;

      positions[ix] = x;
      positions[ix + 1] = y;

      // mouse pull is a *displayed* offset recomputed from the base each
      // frame — it never feeds back into the simulation, so the mesh
      // leans toward the cursor and relaxes when it leaves
      let px = x;
      let py = y;
      if (mouseOn) {
        const dx = mx - x;
        const dy = my - y;
        const d2 = dx * dx + dy * dy;
        const reach = 11; // squared world units
        if (d2 < reach && d2 > 0.01) {
          const falloff = 1 - d2 / reach;
          const f = falloff * falloff * 0.35;
          px = x + dx * f;
          py = y + dy * f;
        }
      }
      display[ix] = px;
      display[ix + 1] = py;
      display[ix + 2] = positions[ix + 2];
    }

    // rebuild links
    let link = 0;
    const linkDist2 = linkDist * linkDist;
    for (let i = 0; i < nodeCount && link < maxLinks; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < nodeCount && link < maxLinks; j++) {
        const jx = j * 3;
        const dx = display[ix] - display[jx];
        const dy = display[ix + 1] - display[jx + 1];
        const d2 = dx * dx + dy * dy;
        if (d2 < linkDist2) {
          const o = link * 6;
          linePositions[o] = display[ix];
          linePositions[o + 1] = display[ix + 1];
          linePositions[o + 2] = display[ix + 2];
          linePositions[o + 3] = display[jx];
          linePositions[o + 4] = display[jx + 1];
          linePositions[o + 5] = display[jx + 2];

          // brightness: closer pairs are stronger; near the cursor go cyan
          const strength = 1 - d2 / linkDist2;
          let color = FAINT;
          let amp = 0.16 + strength * 0.2;
          if (mouseOn) {
            const cx = (display[ix] + display[jx]) / 2 - mx;
            const cy = (display[ix + 1] + display[jx + 1]) / 2 - my;
            const md2 = cx * cx + cy * cy;
            if (md2 < 5) {
              const glow = 1 - md2 / 5;
              color = glow > 0.55 ? CYAN : GOLD;
              amp = 0.14 + strength * 0.16 + glow * 0.22;
            }
          }
          for (let v = 0; v < 2; v++) {
            lineColors[o + v * 3] = color.r * amp;
            lineColors[o + v * 3 + 1] = color.g * amp;
            lineColors[o + v * 3 + 2] = color.b * amp;
          }
          link++;
        }
      }
    }

    const points = pointsRef.current;
    const lines = linesRef.current;
    if (points) {
      (points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
    if (lines) {
      (lines.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lines.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      lines.geometry.setDrawRange(0, link * 2);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sim.display, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#7fa3c4"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sim.linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[sim.lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

const StaticFallback = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-0 pointer-events-none"
    style={{
      background:
        'radial-gradient(ellipse 80% 60% at 50% 0%, #0b1322 0%, #050810 60%), #050810',
    }}
  />
);

const NeuralField = () => {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = useIsMobile();

  if (prefersReducedMotion) return <StaticFallback />;

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      {/* deep gradient behind the mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #0b1322 0%, #050810 60%), #050810',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ position: 'absolute', inset: 0 }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <NeuralMesh nodeCount={isMobile ? 70 : 150} interactive={!isMobile} />
      </Canvas>
    </div>
  );
};

export default NeuralField;
