/**
 * Accent token map.
 *
 * Components take an `accent` string ('blue' | 'cyan' | 'violet' | 'purple')
 * from src/data/resume.js and look up ready-made Tailwind classes here.
 *
 * Class strings are literal in this file so Tailwind's content scanner emits
 * them — never build accent classes with template interpolation in components.
 */

export const ACCENTS = {
  blue: {
    key: 'blue',
    hex: '#3d7bff',
    rgb: '61 123 255',
    text: 'text-neon-blue',
    border: 'border-neon-blue/40',
    borderSoft: 'border-neon-blue/20',
    ring: 'ring-neon-blue/40',
    bgSoft: 'bg-neon-blue/10',
    bgSolid: 'bg-neon-blue',
    glow: 'shadow-glow-blue',
    fromTo: 'from-neon-blue to-neon-cyan',
    gradient: 'bg-gradient-to-r from-neon-blue to-neon-cyan',
    gradientBr: 'bg-gradient-to-br from-neon-blue to-neon-cyan',
    shadow: '0 18px 50px -16px rgba(61, 123, 255, 0.6)',
  },
  cyan: {
    key: 'cyan',
    hex: '#22d3ee',
    rgb: '34 211 238',
    text: 'text-neon-cyan',
    border: 'border-neon-cyan/40',
    borderSoft: 'border-neon-cyan/20',
    ring: 'ring-neon-cyan/40',
    bgSoft: 'bg-neon-cyan/10',
    bgSolid: 'bg-neon-cyan',
    glow: 'shadow-glow-cyan',
    fromTo: 'from-neon-cyan to-neon-blue',
    gradient: 'bg-gradient-to-r from-neon-cyan to-neon-blue',
    gradientBr: 'bg-gradient-to-br from-neon-cyan to-neon-blue',
    shadow: '0 18px 50px -16px rgba(34, 211, 238, 0.55)',
  },
  violet: {
    key: 'violet',
    hex: '#8b5cf6',
    rgb: '139 92 246',
    text: 'text-neon-violet',
    border: 'border-neon-violet/40',
    borderSoft: 'border-neon-violet/20',
    ring: 'ring-neon-violet/40',
    bgSoft: 'bg-neon-violet/10',
    bgSolid: 'bg-neon-violet',
    glow: 'shadow-glow-violet',
    fromTo: 'from-neon-violet to-neon-purple',
    gradient: 'bg-gradient-to-r from-neon-violet to-neon-purple',
    gradientBr: 'bg-gradient-to-br from-neon-violet to-neon-purple',
    shadow: '0 18px 50px -16px rgba(139, 92, 246, 0.6)',
  },
  purple: {
    key: 'purple',
    hex: '#b14aed',
    rgb: '177 74 237',
    text: 'text-neon-purple',
    border: 'border-neon-purple/40',
    borderSoft: 'border-neon-purple/20',
    ring: 'ring-neon-purple/40',
    bgSoft: 'bg-neon-purple/10',
    bgSolid: 'bg-neon-purple',
    glow: 'shadow-glow-violet',
    fromTo: 'from-neon-purple to-neon-violet',
    gradient: 'bg-gradient-to-r from-neon-purple to-neon-violet',
    gradientBr: 'bg-gradient-to-br from-neon-purple to-neon-violet',
    shadow: '0 18px 50px -16px rgba(177, 74, 237, 0.6)',
  },
}

/** Safe lookup — unknown keys fall back to blue instead of throwing. */
export const accent = (key) => ACCENTS[key] || ACCENTS.blue

/** Deterministic accent for lists without an explicit accent field. */
const ORDER = ['blue', 'violet', 'cyan', 'purple']
export const accentByIndex = (i) => ACCENTS[ORDER[i % ORDER.length]]

/** Tiny classname joiner (no clsx dependency). */
export const cx = (...parts) => parts.filter(Boolean).join(' ')
