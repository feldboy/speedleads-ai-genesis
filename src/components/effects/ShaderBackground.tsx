import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

const ShaderBackground = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, #0a1a2e, #0d2235, #0a1a2e)',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <ShaderGradientCanvas
        style={{ width: '100%', height: '100%', background: '#0D1B2A' }}
        pixelDensity={1}
      >
        <ShaderGradient
          type="sphere"
          animate="on"
          uTime={0}
          uSpeed={0.3}
          uStrength={0.3}
          uDensity={0.8}
          uFrequency={5.5}
          uAmplitude={3.2}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1="#00aac4"
          color2="#6991ff"
          color3="#8da0ce"
          reflection={0.4}
          wireframe={false}
          shader="defaults"
          grain="on"
          lightType="env"
          brightness={0.8}
          envPreset="city"
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.5}
          cameraZoom={15.1}
        />
      </ShaderGradientCanvas>
    </div>
  );
};

export default ShaderBackground;
