import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

import { useIsMobile } from '../../hooks/useMediaQuery'

/**
 * Fixed atmosphere behind the whole page: drifting aurora blobs (CSS only),
 * a hairline grid, film grain, a vignette, and a canvas particle web.
 *
 * Colours come from the `--aurora-*` / `--particle*` CSS variables in index.css,
 * so every layer flips with `<html data-theme>` without a re-render.
 */

/** Reads the live particle tokens off <html> — canvas can't use CSS variables. */
function readParticleTokens() {
  const s = getComputedStyle(document.documentElement)
  const parts = (s.getPropertyValue('--particle') || '255 255 255').trim().split(/\s+/).map(Number)
  const opacity = Number.parseFloat(s.getPropertyValue('--particle-opacity'))
  return {
    rgb: parts.length === 3 && parts.every(Number.isFinite) ? parts : [255, 255, 255],
    opacity: Number.isFinite(opacity) ? opacity : 0.5,
  }
}

const AURORA = [
  {
    className: '-left-[18%] -top-[22%] h-[70vh] w-[70vh] sm:h-[85vh] sm:w-[85vh]',
    variable: '--aurora-a',
    delay: '0s',
  },
  {
    className: '-right-[16%] top-[6%] h-[62vh] w-[62vh] sm:h-[76vh] sm:w-[76vh]',
    variable: '--aurora-b',
    delay: '-8s',
  },
  {
    className: 'bottom-[-24%] left-[22%] h-[58vh] w-[58vh] sm:h-[72vh] sm:w-[72vh]',
    variable: '--aurora-c',
    delay: '-16s',
  },
]

export default function Background() {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    const COUNT = isMobile ? 26 : 60
    const LINK = isMobile ? 90 : 130

    let w = 0
    let h = 0
    let dots = []
    let raf = 0
    let tokens = readParticleTokens()

    const seed = () => {
      dots = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const paint = (t) => {
      const [r, g, b] = tokens.rgb
      ctx.clearRect(0, 0, w, h)

      // Constellation links first, so the dots sit on top of the web.
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d = Math.hypot(dx, dy)
          if (d > LINK) continue
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / LINK) * tokens.opacity * 0.15})`
          ctx.beginPath()
          ctx.moveTo(dots[i].x, dots[i].y)
          ctx.lineTo(dots[j].x, dots[j].y)
          ctx.stroke()
        }
      }

      for (const dot of dots) {
        const twinkle = 0.55 + 0.45 * Math.sin(dot.phase + t * 0.0013)
        ctx.fillStyle = `rgba(${r},${g},${b},${tokens.opacity * 0.7 * twinkle})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const advance = () => {
      for (const dot of dots) {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < -24) dot.x = w + 24
        else if (dot.x > w + 24) dot.x = -24
        if (dot.y < -24) dot.y = h + 24
        else if (dot.y > h + 24) dot.y = -24
      }
    }

    const loop = (t) => {
      advance()
      paint(t)
      raf = requestAnimationFrame(loop)
    }

    resize()
    if (reduce) paint(0)
    else raf = requestAnimationFrame(loop)

    // Don't burn frames in a background tab.
    const onVisibility = () => {
      if (reduce) return
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf) {
        raf = requestAnimationFrame(loop)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduce) paint(0)
    })
    resizeObserver.observe(canvas)

    // Re-read the palette when the theme toggle flips data-theme.
    const themeObserver = new MutationObserver(() => {
      tokens = readParticleTokens()
      if (reduce) paint(0)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce, isMobile])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Aurora field */}
      {AURORA.map((blob) => (
        <span
          key={blob.variable}
          className={`absolute rounded-full blur-[90px] animate-aurora-drift gpu sm:blur-[120px] ${blob.className}`}
          style={{
            background: `radial-gradient(closest-side, rgb(var(${blob.variable}) / var(--aurora-opacity)), transparent 72%)`,
            animationDelay: blob.delay,
          }}
        />
      ))}

      {/* Hairline grid, fading out toward the bottom of the viewport */}
      <span className="absolute inset-0 bg-grid-fine bg-grid-fine opacity-[0.22] mask-fade-b" />

      {/* Particle constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette pulls focus to the centre column in both themes */}
      <span
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 0%, transparent 32%, rgb(var(--bg-0) / 0.55) 78%, rgb(var(--bg-0) / 0.9) 100%)',
        }}
      />

      {/* Film grain keeps the large gradients from banding */}
      <span className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}

export { Background }
