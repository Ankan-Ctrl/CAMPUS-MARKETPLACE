// Named imports (rather than `import * as Icons`) so the bundler only includes
// the handful of icons this app actually uses instead of the whole icon set.
import {
  Laptop, BookOpen, Armchair, Bike, Lamp, Dumbbell, Shirt, Guitar,
  Calculator, Keyboard, Ruler, Refrigerator, Speaker, Package,
} from 'lucide-react'

export const ICON_MAP = {
  Laptop, BookOpen, Armchair, Bike, Lamp, Dumbbell, Shirt, Guitar,
  Calculator, Keyboard, Ruler, Refrigerator, Speaker, Package,
}

export function getIcon(name) {
  return ICON_MAP[name] || Package
}
