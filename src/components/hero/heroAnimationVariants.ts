import { Variants } from "framer-motion";

// A consistent delay function for a clean, staggered animation sequence.
const getDelay = (custom?: { delayIdx?: number }) => 0.1 * (custom?.delayIdx ?? 0);

// Assembling animation timeline: each phase is indexed for coordinated delay.
export const heroVariants: { [key: string]: Variants } = {
  hero: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren" } }
  },
  background: {
    hidden: { opacity: 0 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: getDelay(custom),
        ease: "easeOut"
      }
    })
  },
  headline: {
    hidden: { opacity: 0, x: -80, scale: 0.85 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: getDelay(custom),
        ease: [0.22, 1, 0.36, 1]
      }
    })
  },
  subHeadline: {
    hidden: { opacity: 0 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      transition: {
        delayChildren: getDelay(custom),
        staggerChildren: 0.05,
      }
    })
  },
  word: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  },
  cta: {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.6,
        delay: getDelay(custom)
      }
    })
  },
  code: {
    hidden: { opacity: 0, x: 120, scale: 0.85 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.35,
        duration: 0.83,
        delay: getDelay(custom),
        ease: "easeOut"
      }
    })
  },
  decor: {
    hidden: { opacity: 0, scale: 0.63 },
    visible: (custom?: { delayIdx?: number; styleOpacity?: number }) => ({
      opacity: custom?.styleOpacity ?? 0.7,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        bounce: 0.17,
        delay: getDelay(custom)
      }
    })
  },
  scrollIndicator: {
    hidden: { opacity: 0, y: 32 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: getDelay(custom)
      }
    })
  }
};
