import { useEffect } from 'react'

/** Freezes background scroll (mobile menu) without the layout shift of overflow:hidden alone. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const { body } = document
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [locked])
}

export default useLockBodyScroll
