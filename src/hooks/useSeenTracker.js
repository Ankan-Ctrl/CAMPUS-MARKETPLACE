import { useRef, useCallback } from 'react'

// Backed by a ref (not state) since membership shouldn't itself trigger a
// re-render - components just ask "has this id already played its entrance?"
// while rendering.
export function useSeenTracker() {
  const seen = useRef(new Set())

  const hasSeen = useCallback((id) => seen.current.has(id), [])
  const markSeen = useCallback((id) => {
    seen.current.add(id)
  }, [])

  return { hasSeen, markSeen }
}
