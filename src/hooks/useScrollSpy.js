import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 *
 * Uses IntersectionObserver with a band centred on the viewport, and picks the
 * entry closest to that band's centre — this avoids the flicker you get when
 * two tall sections are both intersecting.
 */
export function useScrollSpy(ids, { offset = 96 } = {}) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    let ticking = false
    const pick = () => {
      ticking = false
      const line = offset + 40
      let best = elements[0]
      let bestDistance = Infinity

      for (const el of elements) {
        const { top, bottom } = el.getBoundingClientRect()
        if (bottom < line) continue
        const distance = Math.abs(top - line)
        if (top - line <= 0 || distance < bestDistance) {
          if (top - line <= 0) {
            best = el
            bestDistance = 0
          } else if (distance < bestDistance) {
            best = el
            bestDistance = distance
          }
        }
      }

      // At the very bottom of the page the last section wins outright.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        best = elements[elements.length - 1]
      }

      setActiveId((prev) => (prev === best.id ? prev : best.id))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(pick)
    }

    pick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids, offset])

  return activeId
}

export default useScrollSpy
