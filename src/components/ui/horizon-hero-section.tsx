import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface HorizonHeroProps {
  onAnimationComplete?: () => void;
}

export const Component: React.FC<HorizonHeroProps> = ({ onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0); // Start at 0 (HORIZON)
  const [isReady, setIsReady] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const wheelDelta = useRef(0);
  const touchStartY = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  
  const threeRefs = useRef({
    scene: null as THREE.Scene | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    composer: null as EffectComposer | null,
    stars: [] as THREE.Points[],
    nebula: null as THREE.Mesh | null,
    mountains: [] as THREE.Mesh[],
    atmosphere: null as THREE.Mesh | null,
    animationId: null as number | null,
    locations: [] as number[],
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100, // Match original starting position
    currentProgress: 0 // Store progress for animate function access
  });

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  // Get current content based on section
  const getCurrentContent = () => {
    const titles = ['EMBRACE', 'AI', 'POWER'];
    const subtitles = [
      {
        line1: 'Where vision meets reality,',
        line2: 'we shape the future of tomorrow'
      },
      {
        line1: 'Beyond the boundaries of imagination,',
        line2: 'lies the universe of possibilities'
      },
      {
        line1: 'In the space between thought and creation,',
        line2: 'we find the essence of true innovation'
      }
    ];
    
    return {
      title: titles[currentSection] || titles[0],
      subtitle: subtitles[currentSection] || subtitles[0]
    };
  };


  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char" style={{ 
        color: 'white !important', 
        opacity: 1, 
        visibility: 'visible',
        display: 'inline-block',
        fontSize: 'inherit',
        textFillColor: 'white',
        WebkitTextFillColor: 'white',
        backgroundClip: 'unset',
        WebkitBackgroundClip: 'unset'
      }}>
        {char}
      </span>
    ));
  };

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    const initThree = () => {
      console.log('🚀 Initializing Three.js scene...');
      const { current: refs } = threeRefs;
      
      try {
        // Scene setup
        console.log('📦 Creating scene...');
        refs.scene = new THREE.Scene();
        refs.scene.background = new THREE.Color(0x0a0a0a); // Dark background to prevent white flashes
        refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);
        console.log('✅ Scene created');

        // Camera
        console.log('📷 Creating camera...');
        refs.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          2000
        );
        refs.camera.position.set(0, 30, 100); // Match original starting position
        console.log('✅ Camera created at position:', refs.camera.position);

        // Renderer
        console.log('🎨 Creating renderer...');
        refs.renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current!,
          antialias: true,
          alpha: true
        });
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        refs.renderer.toneMappingExposure = 0.3; // reduced from 0.5 to prevent bright flashes
        console.log('✅ Renderer created, size:', window.innerWidth, 'x', window.innerHeight);

        // Post-processing setup
        console.log('🌟 Creating post-processing composer...');
        refs.composer = new EffectComposer(refs.renderer);
        const renderPass = new RenderPass(refs.scene, refs.camera);
        refs.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.35, // strength - reduced from 0.8 to prevent bright flashes
          0.4,  // radius
          0.9   // threshold - increased from 0.85 to reduce bloom
        );
        refs.composer.addPass(bloomPass);
        console.log('✅ Post-processing composer created with bloom pass');

        // Create scene elements
        console.log('⭐ Creating stars...');
        createStarField();
        console.log('✅ Stars created, count:', refs.stars.length);
        
        console.log('🌌 Creating nebula...');
        createNebula();
        console.log('✅ Nebula created');
        
        console.log('🏔️ Creating mountains...');
        createMountains();
        console.log('✅ Mountains created, count:', refs.mountains.length);
        
        console.log('🌍 Creating atmosphere...');
        createAtmosphere();
        console.log('✅ Atmosphere created');
        
        getLocation();

        // Start animation
        console.log('🎬 Starting animation loop...');
        animate();
        
        // Mark as ready
        setIsReady(true);
        console.log('🎉 Three.js initialization complete!');
      } catch (error) {
        console.error('❌ Three.js initialization failed:', error);
      }
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;

      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Match original star shader with correct uniform names
        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      // Match original nebula dimensions and shader
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = 0;
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
      
      // Store reference for updating uniforms
      refs.atmosphere = atmosphere;
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene || !refs.camera || !refs.renderer) return;
      
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Update star shader uniforms (using original uniform names)
      refs.stars.forEach((starField, i) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time;
        }
      });

      // Update nebula shader uniforms and animation
      if (refs.nebula) {
        refs.nebula.rotation.z += 0.0001;
        if (refs.nebula.material.uniforms) {
          refs.nebula.material.uniforms.time.value = time * 0.5;
        }
      }

      // Update atmosphere shader uniforms
      if (refs.atmosphere && refs.atmosphere.material.uniforms) {
        refs.atmosphere.material.uniforms.time.value = time;
      }

      // Smooth camera movement with easing
      const smoothingFactor = 0.05;
      
      smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
      smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
      smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
      
      // Add subtle floating motion
      const floatX = Math.sin(time * 0.1) * 2;
      const floatY = Math.cos(time * 0.15) * 1;
      
      refs.camera.position.x = smoothCameraPos.current.x + floatX;
      refs.camera.position.y = smoothCameraPos.current.y + floatY;
      refs.camera.position.z = smoothCameraPos.current.z;
      refs.camera.lookAt(0, 10, -600);

      // Parallax mountains with subtle animation and hiding logic
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
        
        // Hide mountains when progress > 0.7 (during INFINITY phase)
        if (refs.currentProgress > 0.7) {
          mountain.position.z = 600000; // Move far away
        } else {
          mountain.position.z = refs.locations[i] || mountain.userData.baseZ;
        }
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    const getLocation = () => {
      const { current: refs } = threeRefs;
      const locations: number[] = [];
      refs.mountains.forEach((mountain, i) => {
        locations[i] = mountain.position.z;
      });
      refs.locations = locations;
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      const { current: refs } = threeRefs;
      
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      refs.stars.forEach(starField => {
        if (starField.geometry) starField.geometry.dispose();
        if (starField.material) starField.material.dispose();
      });

      refs.mountains.forEach(mountain => {
        if (mountain.geometry) mountain.geometry.dispose();
        if (mountain.material) mountain.material.dispose();
      });

      if (refs.nebula) {
        if (refs.nebula.geometry) refs.nebula.geometry.dispose();
        if (refs.nebula.material) refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  // GSAP Animations - Run after component is ready
  useEffect(() => {
    if (!isReady) return;
    
    // Set initial states to prevent flash
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    // Animate menu
    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Animate title
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      }, "-=0.5");
    }

    // Animate subtitle lines
    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(subtitleLines, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8");
    }

    // Animate scroll indicator
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Handle text animations when section changes
  useEffect(() => {
    if (!isReady) return;
    
    // Animate title change
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, 
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }

    // Animate subtitle change
    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      gsap.fromTo(subtitleLines,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [currentSection, isReady]);

  // Scroll hijacking and wheel event handling
  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent all scrolling on document while animation is active
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, page up/down, home, end, arrows
      if (scrollKeys.includes(e.keyCode)) {
        e.preventDefault();
        return false;
      }
    };

    // Hijack all scroll events
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('keydown', preventKeyScroll, { passive: false });
    
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body);
    const originalOverflow = originalStyle.overflow;
    const originalPosition = originalStyle.position;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Accumulate wheel delta
      wheelDelta.current += e.deltaY * 0.001;
      wheelDelta.current = Math.max(0, Math.min(1, wheelDelta.current));
      
      updateProgress(wheelDelta.current);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (e.type === 'touchstart') {
          touchStartY.current = e.touches[0].clientY;
        } else if (e.type === 'touchmove') {
          e.preventDefault();
          e.stopPropagation();
          const deltaY = touchStartY.current - e.touches[0].clientY;
          wheelDelta.current += deltaY * 0.002;
          wheelDelta.current = Math.max(0, Math.min(1, wheelDelta.current));
          
          updateProgress(wheelDelta.current);
          touchStartY.current = e.touches[0].clientY;
        }
      }
    };

    const updateProgress = (newProgress: number) => {
      setProgress(newProgress);
      
      // Update progress in threeRefs for animate function access
      const { current: refs } = threeRefs;
      refs.currentProgress = newProgress;
      
      // Update section based on progress
      let newSection = 0;
      if (newProgress > 0.66) {
        newSection = 2; // INFINITY
      } else if (newProgress > 0.33) {
        newSection = 1; // COSMOS
      } else {
        newSection = 0; // HORIZON
      }
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }

      // Update camera position
      // Match original camera positions
      const cameraPositions = [
        { x: 0, y: 30, z: 100 },    // HORIZON - match original starting position
        { x: 0, y: 40, z: -50 },    // COSMOS
        { x: 0, y: 50, z: -700 }    // INFINITY
      ];
      
      // Interpolate between positions based on progress
      if (newProgress <= 0.33) {
        const t = newProgress / 0.33;
        refs.targetCameraX = cameraPositions[0].x + (cameraPositions[1].x - cameraPositions[0].x) * t;
        refs.targetCameraY = cameraPositions[0].y + (cameraPositions[1].y - cameraPositions[0].y) * t;
        refs.targetCameraZ = cameraPositions[0].z + (cameraPositions[1].z - cameraPositions[0].z) * t;
      } else if (newProgress <= 0.66) {
        const t = (newProgress - 0.33) / 0.33;
        refs.targetCameraX = cameraPositions[1].x + (cameraPositions[2].x - cameraPositions[1].x) * t;
        refs.targetCameraY = cameraPositions[1].y + (cameraPositions[2].y - cameraPositions[1].y) * t;
        refs.targetCameraZ = cameraPositions[1].z + (cameraPositions[2].z - cameraPositions[1].z) * t;
      } else {
        refs.targetCameraX = cameraPositions[2].x;
        refs.targetCameraY = cameraPositions[2].y;
        refs.targetCameraZ = cameraPositions[2].z;
      }
      
      // Progressive scroll restoration - start enabling scroll at 85% completion
      if (newProgress >= 0.85 && !scrollEnabled) {
        setScrollEnabled(true);
        
        // Gradually restore scroll functionality with better animation frame management
        const enableScrollGradually = () => {
          document.removeEventListener('wheel', preventScroll);
          document.removeEventListener('touchmove', preventScroll);
          document.removeEventListener('keydown', preventKeyScroll);
        };
        
        animationFrameRef.current = requestAnimationFrame(enableScrollGradually);
      }
      
      // Check for completion with smoother transition
      if (newProgress >= 0.95) {
        setFadeOut(true);
        
        // Use requestAnimationFrame for smoother timing instead of setTimeout
        const completeAnimation = () => {
          // Restore remaining document scroll functionality if not already done
          if (!scrollEnabled) {
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('scroll', preventScroll);
            document.removeEventListener('keydown', preventKeyScroll);
          }
          
          // Only remove scroll lock - leave document scroll enabled
          document.removeEventListener('scroll', preventScroll);
          
          // Restore body styles smoothly
          document.body.style.overflow = originalOverflow;
          document.body.style.position = originalPosition;
          document.body.style.width = '';
          document.body.style.height = '';
          
          // Restore scroll restoration
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'auto';
          }
          
          setAnimationComplete(true);
          
          // Call the callback to notify parent component
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        };
        
        // Use requestAnimationFrame chain for smoother animation completion detection
        const scheduleCompletion = () => {
          animationFrameRef.current = requestAnimationFrame(() => {
            animationFrameRef.current = requestAnimationFrame(completeAnimation);
          });
        };
        
        scheduleCompletion();
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouch, { passive: false });
    container.addEventListener('touchmove', handleTouch, { passive: false });

    return () => {
      // Cleanup scroll hijacking
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('scroll', preventScroll);
      document.removeEventListener('keydown', preventKeyScroll);
      
      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.height = '';
      
      // Restore scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
      
      // Cancel any pending animation frames
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Remove container events
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouch);
      container.removeEventListener('touchmove', handleTouch);
    };
  }, [currentSection]);

  // Don't render if animation is complete
  if (animationComplete) {
    return null;
  }

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 hero-container cosmos-style transition-all duration-700 ease-out ${
        fadeOut ? 'opacity-0 z-40' : 'opacity-100 z-50'
      }`}
      style={{ 
        width: '100vw', 
        height: '100vh',
        overflow: 'hidden',
        touchAction: 'none',
        transform: fadeOut ? 'scale(1.1)' : 'scale(1)',
        filter: fadeOut ? 'blur(8px) brightness(0.4)' : 'blur(0px) brightness(0.8)',
        transition: 'all 700ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        backdropFilter: fadeOut ? 'blur(12px)' : 'none'
      }}
    >
      <canvas ref={canvasRef} className="hero-canvas" />
      
      {/* Side menu */}
      <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text">SPEEDLEADS</div>
      </div>

      {/* Main content */}
      <div className="hero-content cosmos-content">
        <h1 ref={titleRef} className="hero-title">
          {getCurrentContent().title}
        </h1>
        
        <div ref={subtitleRef} className="hero-subtitle">
          <p className="subtitle-line">
            {getCurrentContent().subtitle.line1}
          </p>
          <p className="subtitle-line">
            {getCurrentContent().subtitle.line2}
          </p>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection).padStart(2, '0')} / 02
        </div>
      </div>
    </div>
  );
};