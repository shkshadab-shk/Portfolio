import { useEffect, useState } from 'react'

/** Reactive media query — used to disable expensive effects on small screens. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** True on pointer-coarse / small viewports where hover effects don't apply. */
export const useIsTouch = () => useMediaQuery('(hover: none), (pointer: coarse)')

/** True below Tailwind's `lg` breakpoint. */
export const useIsMobile = () => useMediaQuery('(max-width: 1023px)')

export default useMediaQuery
