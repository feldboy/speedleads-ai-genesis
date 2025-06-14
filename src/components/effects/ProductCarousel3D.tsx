
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Text3D, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// iPhone 3D Model Component
const iPhone = ({ rotation = [0, 0, 0], ...props }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef} {...props}>
      {/* Phone body */}
      <RoundedBox
        args={[1, 2, 0.1]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[0.85, 1.7, 0.02]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0.051]}
      >
        <meshStandardMaterial color="#000" emissive="#001122" emissiveIntensity={0.1} />
      </RoundedBox>
      
      {/* Camera bump */}
      <RoundedBox
        args={[0.3, 0.3, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[-0.25, 0.7, -0.075]}
      >
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </RoundedBox>
    </group>
  );
};

// MacBook 3D Model Component
const MacBook = ({ rotation = [0, 0, 0], ...props }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + Math.PI) * 0.1;
    }
  });

  return (
    <group ref={meshRef} {...props}>
      {/* Base */}
      <RoundedBox
        args={[3, 0.1, 2]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Screen */}
      <RoundedBox
        args={[2.8, 1.8, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.9, -0.975]}
        rotation={[-0.1, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Screen display */}
      <RoundedBox
        args={[2.6, 1.6, 0.01]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.9, -0.945]}
        rotation={[-0.1, 0, 0]}
      >
        <meshStandardMaterial color="#000" emissive="#001122" emissiveIntensity={0.1} />
      </RoundedBox>
      
      {/* Keyboard area */}
      <RoundedBox
        args={[2.4, 0.02, 1.6]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.01, 0.2]}
      >
        <meshStandardMaterial color="#2a2a2a" />
      </RoundedBox>
    </group>
  );
};

// 3D Scene Component
const ProductScene = ({ product }: { product: 'iphone' | 'macbook' }) => {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="rounded-lg"
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {product === 'iphone' ? (
          <iPhone position={[0, 0, 0]} scale={1.5} />
        ) : (
          <MacBook position={[0, -0.5, 0]} scale={0.8} />
        )}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-tech-blue rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCarousel3D = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const products = [
    {
      id: 'iphone',
      name: 'iPhone מתקדם',
      description: 'פיתוח אפליקציות מובייל מתקדמות עם טכנולוגיות חדשניות',
      type: 'iphone' as const,
    },
    {
      id: 'macbook',
      name: 'MacBook Pro',
      description: 'פתרונות תוכנה מקצועיים ופיתוח אפליקציות עסקיות',
      type: 'macbook' as const,
    },
  ];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {products.map((product, index) => (
            <div key={product.id} className="flex-[0_0_100%] min-w-0">
              <div className="px-4">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-white/50">
                  <ProductScene product={product.type} />
                  
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-dark mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6 text-dark" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
        aria-label="Next product"
      >
        <ChevronRight className="w-6 h-6 text-dark" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === selectedIndex
                ? 'bg-tech-blue scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel3D;
