
import React, { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ count = 3000 }) {
  const ref = useRef<any>();
  const { mouse, viewport } = useThree();
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere
      const r = Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      
      // Gradient colors from blue to gold
      const colorIntensity = Math.random();
      colors[i * 3] = colorIntensity * 0.7; // R
      colors[i * 3 + 1] = colorIntensity * 0.9; // G
      colors[i * 3 + 2] = 1; // B
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the whole system
      ref.current.rotation.x = time * 0.05;
      ref.current.rotation.y = time * 0.03;
      
      // Mouse interaction
      const mouseInfluence = 0.5;
      ref.current.rotation.x += mouse.y * mouseInfluence * 0.1;
      ref.current.rotation.y += mouse.x * mouseInfluence * 0.1;
      
      // Animate individual particles
      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.003}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const EnhancedParticles = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default EnhancedParticles;
