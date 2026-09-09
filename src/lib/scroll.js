/** Smooth-scroll helpers shared by the navbar, hero CTAs and footer. */

const NAV_OFFSET = 84

/**
 * Scrolls to an element id, accounting for the sticky navbar, and updates the
 * URL hash without triggering the browser's own (offset-ignoring) jump.
 */
export function scrollToId(id, { offset = NAV_OFFSET, updateHash = true } = {}) {
  const target = document.getElementById(id)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - offset
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })

  if (updateHash) {
    window.history.replaceState(null, '', `#${id}`)
  }
}

/** onClick handler factory for in-page anchor links. */
export function anchorHandler(href) {
  return (event) => {
    if (!href?.startsWith('#')) return
    event.preventDefault()
    scrollToId(href.slice(1))
  }
}

export function scrollToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  window.history.replaceState(null, '', window.location.pathname)
}

export { NAV_OFFSET }
