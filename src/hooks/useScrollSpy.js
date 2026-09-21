import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 *
 * Picks the last section in document order whose top has crossed a line just
 * below the sticky navbar — for tall sections that is the one the viewport is
 * actually inside, and it avoids the flicker of matching two intersecting boxes.
 */
export function useScrollSpy(ids, { offset = 96 } = {}) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    let ticking = false

    const pick = () => {
      ticking = false
      // Re-resolved every frame rather than once: below-the-fold sections are
      // code-split, so they are still absent from the DOM when this first runs.
      const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
      if (!elements.length) return

      const line = offset + 40
      let best = elements[0]

      for (const el of elements) {
        if (el.getBoundingClientRect().top - line > 0) break
        best = el
      }

      // At the very bottom of the page the last section wins outright.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
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
    // Catch lazy sections (and webfonts) landing after this effect ran — the
    // next scroll alone would not re-pick once the visitor has stopped.
    const observer = new ResizeObserver(onScroll)
    observer.observe(document.documentElement)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      observer.disconnect()
    }
  }, [ids, offset])

  return activeId
}

export default useScrollSpy
