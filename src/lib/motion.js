// Central source of truth for the animation spec's durations/easings/offsets.
// Every component should import from here rather than hardcoding numbers, so
// the whole app stays consistent and the spec only has to be tuned in one place.

export const EASE_OUT = [0.16, 1, 0.3, 1] // spec: easeOut only
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] // spec: easeInOut only

export const DURATION = {
  hover: 0.2, // 180-220ms
  click: 0.13, // 120-180ms
  pageTransition: 0.25,
  sectionReveal: 0.4, // 350-450ms band
  heroReveal: 0.45,
  gridReveal: 0.35,
  modal: 0.2,
  card: 0.2,
}

export const OFFSET = {
  small: 15, // grid / section reveal translateY
  medium: 20, // hero / category translateY
  lift: 4, // card hover lift
  button: 2, // button hover lift
}

// Whole-block reveal (hero, category section, footer, page fades) - never
// stagger children, the spec is explicit that sections animate as one unit.
export const revealBlock = (distance = OFFSET.medium, duration = DURATION.sectionReveal) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
})

export const fadeOnly = (duration = DURATION.sectionReveal) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration, ease: EASE_OUT } },
})

// Product card entrance - used by the "only animate new cards" tracker.
export const cardEnter = {
  hidden: { opacity: 0, y: OFFSET.small },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.gridReveal, ease: EASE_OUT } },
}

export const cardAlreadySeen = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
}

export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.modal, ease: EASE_IN_OUT } },
  exit: { opacity: 0, transition: { duration: DURATION.modal, ease: EASE_IN_OUT } },
}

export const modalPanel = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.modal, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.97, transition: { duration: DURATION.modal, ease: EASE_IN_OUT } },
}

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.pageTransition, ease: EASE_IN_OUT } },
  exit: { opacity: 0, transition: { duration: DURATION.pageTransition, ease: EASE_IN_OUT } },
}

// Buttons: subtle lift on hover, with a clean transform reset to avoid motion warnings.
export const buttonHover = {
  whileHover: { y: -OFFSET.button, scale: 1.02, transition: { duration: DURATION.hover, ease: EASE_OUT } },
  whileTap: { scale: 0.98, y: 0, transition: { duration: DURATION.click, ease: EASE_OUT } },
}

// Icon-only controls: keep the scale action isolated so the transform stack stays clean.
export const iconHover = {
  whileHover: { scale: 1.04, transition: { duration: DURATION.hover, ease: EASE_OUT } },
  whileTap: { scale: 0.96, transition: { duration: DURATION.click, ease: EASE_OUT } },
}

export const messageBubble = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.hover, ease: EASE_OUT } },
}

export const floatLoop = {
  animate: {
    y: [0, -4, 0],
    transition: { duration: 4, repeat: Infinity, ease: EASE_IN_OUT },
  },
}
