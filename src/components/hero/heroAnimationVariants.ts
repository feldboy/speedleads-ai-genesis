
import { Variants } from "framer-motion";

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
        delay: 0.07 * (custom?.delayIdx ?? 0),
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
        delay: 0.34 + 0.14 * (custom?.delayIdx ?? 0),
        ease: [0.22, 1, 0.36, 1]
      }
    })
  },
  subHeadline: {
    hidden: { opacity: 0, x: 80 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.58 + 0.10 * (custom?.delayIdx ?? 0),
        ease: "easeOut"
      }
    })
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
        delay: 0.95 + 0.2 * (custom?.delayIdx ?? 0)
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
        delay: 1.1 + 0.07 * (custom?.delayIdx ?? 0),
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
        delay: 1.27 + 0.10 * (custom?.delayIdx ?? 0)
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
        delay: 1.6 + 0.08 * (custom?.delayIdx ?? 0)
      }
    })
  }
};
