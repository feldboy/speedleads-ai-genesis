
import { Variants } from "framer-motion";

// Enhanced animation timeline with coordinated "assembling" sequence
export const heroVariants: { [key: string]: Variants } = {
  hero: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  },
  
  // Phase 1: Background elements (0-0.5s)
  background: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.1 + 0.05 * (custom?.delayIdx ?? 0),
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  },
  
  // Phase 2: Main headline with "build-up" effect (0.3-0.8s)
  headline: {
    hidden: { 
      opacity: 0, 
      x: -120, 
      scale: 0.8,
      rotateY: -15
    },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        mass: 1,
        delay: 0.4 + 0.1 * (custom?.delayIdx ?? 0),
        duration: 0.8
      }
    })
  },
  
  // Phase 3: Sub-headline from right with wave effect (0.6-1.0s)
  subHeadline: {
    hidden: { 
      opacity: 0, 
      x: 100, 
      y: 20,
      scale: 0.9
    },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        delay: 0.7 + 0.08 * (custom?.delayIdx ?? 0),
        duration: 0.6
      }
    })
  },
  
  // Phase 4: CTA buttons from bottom with stagger (0.9-1.3s)
  cta: {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.7,
      rotateX: 30
    },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 1.0 + 0.2 * (custom?.delayIdx ?? 0)
      }
    })
  },
  
  // Phase 5: Code section with "assembly" effect (1.0-1.5s)
  code: {
    hidden: { 
      opacity: 0, 
      x: 150, 
      scale: 0.8,
      rotateY: 20
    },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        mass: 1.2,
        delay: 1.1 + 0.05 * (custom?.delayIdx ?? 0),
        duration: 0.9
      }
    })
  },
  
  // Phase 6: Decorative elements assembling around code (1.2-1.8s)
  decor: {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      rotate: 180,
      y: 50
    },
    visible: (custom?: { delayIdx?: number; styleOpacity?: number }) => ({
      opacity: custom?.styleOpacity ?? 0.7,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.6,
        duration: 0.8,
        delay: 1.3 + 0.15 * (custom?.delayIdx ?? 0)
      }
    })
  },
  
  // Phase 7: Scroll indicator appears last (1.5-2.0s)
  scrollIndicator: {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 1.7 + 0.05 * (custom?.delayIdx ?? 0),
        duration: 0.7
      }
    })
  },
  
  // Enhanced typewriter effect coordination
  typewriter: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.3
      }
    }
  }
};
