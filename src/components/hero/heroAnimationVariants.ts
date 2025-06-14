
import { Variants } from "framer-motion";

// All animation variants (moved from HeroSection)
export const heroVariants: { [key: string]: Variants } = {
  hero: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren" } }
  },
  background: {
    hidden: { opacity: 0 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      transition: { duration: 0.4, delay: 0.10 * (custom?.delayIdx ?? 0), ease: "easeOut" as const }
    })
  },
  headline: {
    hidden: { opacity: 0, x: -70, scale: 0.92 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, delay: 0.13 * (custom?.delayIdx ?? 0), ease: [0.22, 1, 0.36, 1] as any }
    })
  },
  subHeadline: {
    hidden: { opacity: 0, x: 70 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.13 * (custom?.delayIdx ?? 0), ease: "easeOut" as const }
    })
  },
  cta: {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, bounce: 0.32, duration: 0.57, delay: 0.13 * (custom?.delayIdx ?? 0) }
    })
  },
  code: {
    hidden: { opacity: 0, y: 80, scale: 0.93 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring" as const, bounce: 0.25, delay: 0.18 * (custom?.delayIdx ?? 0) }
    })
  },
  decor: {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (custom?: { delayIdx?: number; styleOpacity?: number }) => ({
      opacity: custom?.styleOpacity ?? 0.7,
      scale: 1,
      transition: { duration: 0.6, type: "spring" as const, bounce: 0.1, delay: 0.25 + 0.12 * (custom?.delayIdx ?? 0) }
    })
  },
  scrollIndicator: {
    hidden: { opacity: 0, y: 22 },
    visible: (custom?: { delayIdx?: number }) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: 0.45 + 0.12 * (custom?.delayIdx ?? 0) }
    })
  }
};
