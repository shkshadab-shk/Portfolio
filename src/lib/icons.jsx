/**
 * Icon set — one file, zero icon-library dependency.
 *
 * Usage:  <Icon name="brain" className="h-5 w-5" />
 *
 * All glyphs are 24x24, stroke-based, and inherit `currentColor`, so accent
 * colour comes from the parent's text class. Every `icon:` string used in
 * src/data/resume.js has an entry here. Unknown names render the `spark`
 * fallback rather than crashing the section.
 */

const P = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const paths = {
  // --- concepts ---
  brain: (
    <>
      <path d="M12 5.5a3 3 0 0 0-6 0 3.2 3.2 0 0 0-1.6 5.6A3.3 3.3 0 0 0 5.6 16 3 3 0 0 0 9 19a3 3 0 0 0 3-3z" {...P} />
      <path d="M12 5.5a3 3 0 0 1 6 0 3.2 3.2 0 0 1 1.6 5.6A3.3 3.3 0 0 1 18.4 16 3 3 0 0 1 15 19a3 3 0 0 1-3-3z" {...P} />
      <path d="M12 5.5v13.5" {...P} />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7z" {...P} />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" {...P} />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" {...P} />
      <path d="M18.5 15l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6z" {...P} />
      <path d="M5.5 4l.5 1.4 1.4.5-1.4.5L5.5 8 5 6.4 3.6 5.9 5 5.4z" {...P} />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 3v5.6c0 4.4-3 8.3-7.5 9.4-4.5-1.1-7.5-5-7.5-9.4V6z" {...P} />
      <path d="M9.2 12.1l2 2 3.6-3.9" {...P} />
    </>
  ),
  rocket: (
    <>
      <path d="M13.6 4.6c2.9-1.7 5.6-1.5 5.6-1.5s.2 2.7-1.5 5.6l-4.7 7.6-3.6-1.3-1.3-3.6z" {...P} />
      <path d="M8.1 15.9c-1.6.5-2.6 1.6-3.1 4 2.4-.5 3.5-1.5 4-3.1" {...P} />
      <circle cx="15" cy="9" r="1.5" {...P} />
    </>
  ),
  bolt: <path d="M13.4 3L6 13.4h4.4L9.8 21l7.6-10.6H13z" {...P} />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" {...P} />
      <path d="M14.9 9.1l-1.6 4.2-4.2 1.6 1.6-4.2z" {...P} />
    </>
  ),
  puzzle: (
    <path
      d="M10.5 4.5a1.6 1.6 0 1 1 3.2 0V6h2.6a1 1 0 0 1 1 1v2.4h1.4a1.6 1.6 0 1 1 0 3.2h-1.4V16a1 1 0 0 1-1 1h-2.6v1.5a1.6 1.6 0 1 1-3.2 0V17H7.9a1 1 0 0 1-1-1v-2.6H5.5a1.6 1.6 0 1 1 0-3.2h1.4V7a1 1 0 0 1 1-1h2.6z"
      {...P}
    />
  ),
  users: (
    <>
      <circle cx="9.5" cy="8.5" r="3" {...P} />
      <path d="M4 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" {...P} />
      <path d="M16 6.2a3 3 0 0 1 0 5.8" {...P} />
      <path d="M17.4 14.8c1.7.6 2.9 2.2 2.9 4.2" {...P} />
    </>
  ),
  star: <path d="M12 3.8l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8 6.9 19.5l1-5.7-4.1-4 5.7-.8z" {...P} />,
  grid: (
    <>
      <rect x="3.8" y="3.8" width="6.4" height="6.4" rx="1.6" {...P} />
      <rect x="13.8" y="3.8" width="6.4" height="6.4" rx="1.6" {...P} />
      <rect x="3.8" y="13.8" width="6.4" height="6.4" rx="1.6" {...P} />
      <rect x="13.8" y="13.8" width="6.4" height="6.4" rx="1.6" {...P} />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9.5" r="5.2" {...P} />
      <path d="M9 14.2L7.6 21l4.4-2.4L16.4 21 15 14.2" {...P} />
    </>
  ),

  // --- stack / tooling ---
  layout: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.4" {...P} />
      <path d="M3.5 9h17M9.5 9v11" {...P} />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="6.4" rx="2" {...P} />
      <rect x="3.5" y="13.6" width="17" height="6.4" rx="2" {...P} />
      <path d="M7.2 7.2h.01M7.2 16.8h.01" {...P} />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" {...P} />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" {...P} />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" {...P} />
    </>
  ),
  stack: (
    <>
      <path d="M12 3.2l8.2 4.3-8.2 4.3L3.8 7.5z" {...P} />
      <path d="M3.8 12.2l8.2 4.3 8.2-4.3" {...P} />
      <path d="M3.8 16.6l8.2 4.3 8.2-4.3" {...P} />
    </>
  ),
  tool: (
    <>
      <path d="M14.2 6.6a3.6 3.6 0 0 1 4.9 4.6l-8 8a2.3 2.3 0 0 1-3.3-3.3z" {...P} />
      <path d="M9.6 5.4L5.2 9.8 3.6 6.2 6.2 3.6z" {...P} />
    </>
  ),
  code: <path d="M9 7.5L4.5 12 9 16.5M15 7.5L19.5 12 15 16.5M13.6 4.5l-3.2 15" {...P} />,
  python: (
    <>
      <path d="M12 3.2c-2.7 0-4.3.9-4.3 3v2h6.6v1.4H6.2c-2 0-3 1.5-3 4s1 4 3 4h1.5v-2.6c0-2 1.6-3.2 3.6-3.2" {...P} />
      <path d="M12 20.8c2.7 0 4.3-.9 4.3-3v-2H9.7v-1.4h8.1c2 0 3-1.5 3-4s-1-4-3-4h-1.5v2.6c0 2-1.6 3.2-3.6 3.2" {...P} />
    </>
  ),
  scan: (
    <>
      <path d="M4 8.5V6.4A2.4 2.4 0 0 1 6.4 4h2.1M15.5 4h2.1A2.4 2.4 0 0 1 20 6.4v2.1M20 15.5v2.1a2.4 2.4 0 0 1-2.4 2.4h-2.1M8.5 20H6.4A2.4 2.4 0 0 1 4 17.6v-2.1" {...P} />
      <path d="M4 12h16" {...P} />
    </>
  ),
  chat: (
    <>
      <path d="M20 12.4c0 4-3.6 7.2-8 7.2a9 9 0 0 1-2.6-.4L5 21l1-3.3A6.9 6.9 0 0 1 4 12.4C4 8.4 7.6 5.2 12 5.2s8 3.2 8 7.2z" {...P} />
      <path d="M9 12h.01M12 12h.01M15 12h.01" {...P} />
    </>
  ),
  chart: (
    <>
      <path d="M4 19.5h16" {...P} />
      <path d="M6.8 19.5v-5M11 19.5V8.5M15.2 19.5v-7.5M19.4 19.5V5.5" {...P} />
    </>
  ),

  // --- journey ---
  cap: (
    <>
      <path d="M2.8 8.8L12 4.5l9.2 4.3L12 13z" {...P} />
      <path d="M6 10.8v4.4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.4" {...P} />
      <path d="M21.2 8.8v5.4" {...P} />
    </>
  ),
  book: (
    <>
      <path d="M4.5 5.2A1.7 1.7 0 0 1 6.2 3.5H19a.7.7 0 0 1 .7.7v13.6a.7.7 0 0 1-.7.7H6.2a1.7 1.7 0 0 0-1.7 1.7z" {...P} />
      <path d="M4.5 5.2v13.6" {...P} />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2.2" {...P} />
      <path d="M9 7.5V6a1.7 1.7 0 0 1 1.7-1.7h2.6A1.7 1.7 0 0 1 15 6v1.5" {...P} />
      <path d="M3.5 12.6h17" {...P} />
    </>
  ),
  calendar: (
    <>
      <rect x="3.8" y="5.2" width="16.4" height="15" rx="2.2" {...P} />
      <path d="M3.8 10h16.4M8.5 3.5v3.4M15.5 3.5v3.4" {...P} />
    </>
  ),
  quote: (
    <path
      d="M9.5 6.5c-2.8 1-4.5 3.4-4.5 6.6V17a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3.4a1 1 0 0 0-1-1H7.2M19.5 6.5c-2.8 1-4.5 3.4-4.5 6.6V17a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3.4a1 1 0 0 0-1-1h-1.8"
      {...P}
    />
  ),

  // --- contact / social ---
  github: (
    <path
      d="M9.3 20.5c-3.9 1.1-3.9-2-5.4-2.5m10.8 5v-3.4a2.9 2.9 0 0 0-.8-2.3c2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.3-3.1 4.2 4.2 0 0 0-.1-3.2s-1.4-.4-4.5 1.7a11 11 0 0 0-5.8 0C4.4 1.8 3 2.2 3 2.2a4.2 4.2 0 0 0-.1 3.2A4.5 4.5 0 0 0 1.6 8.5c0 4.5 2.7 5.5 5.3 5.8a2.9 2.9 0 0 0-.8 2.3V20"
      {...P}
      transform="translate(1.6 1.2)"
    />
  ),
  linkedin: (
    <>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="3" {...P} />
      <path d="M8 10.4v6.2M8 7.4v.02M12 16.6v-3.5a2.1 2.1 0 0 1 4.2 0v3.5M12 10.4v6.2" {...P} />
    </>
  ),
  mail: (
    <>
      <rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.4" {...P} />
      <path d="M3.8 7l7.3 5.2a1.6 1.6 0 0 0 1.8 0L20.2 7" {...P} />
    </>
  ),
  phone: (
    <path
      d="M6.3 3.8h2.4l1.4 3.6-1.9 1.3a10.6 10.6 0 0 0 5.1 5.1l1.3-1.9 3.6 1.4v2.4a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.3 6a2 2 0 0 1 2-2.2z"
      {...P}
    />
  ),
  mapPin: (
    <>
      <path d="M12 21.2s6.8-5.4 6.8-10.4a6.8 6.8 0 1 0-13.6 0C5.2 15.8 12 21.2 12 21.2z" {...P} />
      <circle cx="12" cy="10.4" r="2.5" {...P} />
    </>
  ),
  send: <path d="M20.5 3.5L10.8 13.2M20.5 3.5l-6.3 17-3.4-7.3-7.3-3.4z" {...P} />,

  // --- interface ---
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" {...P} />,
  arrowUpRight: <path d="M7 17L17 7M8.5 7H17v8.5" {...P} />,
  arrowDown: <path d="M12 4.5v15M6 13.5l6 6 6-6" {...P} />,
  chevronDown: <path d="M6.5 9.5l5.5 5.5 5.5-5.5" {...P} />,
  download: <path d="M12 3.8v11M7.5 10.5l4.5 4.5 4.5-4.5M4.5 19.5h15" {...P} />,
  external: <path d="M14 4.5h5.5V10M19 5L11 13M18 14v4.2a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.2V7.8A1.8 1.8 0 0 1 5.8 6H10" {...P} />,
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h10" {...P} />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" {...P} />,
  check: <path d="M5 12.8l4.4 4.4L19 7.6" {...P} />,
  copy: (
    <>
      <rect x="8.6" y="8.6" width="11.8" height="11.8" rx="2.4" {...P} />
      <path d="M15.4 5.6V5a1.4 1.4 0 0 0-1.4-1.4H5A1.4 1.4 0 0 0 3.6 5v9a1.4 1.4 0 0 0 1.4 1.4h.6" {...P} />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" {...P} />
      <path d="M12 2.8v2.2M12 19v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.8 12H5M19 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" {...P} />
    </>
  ),
  moon: <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.6 8.6 0 1 0 10.4 10.4z" {...P} />,
  filter: <path d="M4.5 6.5h15M7.5 12h9M10.5 17.5h3" {...P} />,
  loader: (
    <>
      <path d="M12 3.5v3.2" {...P} />
      <path d="M12 17.3v3.2" opacity="0.35" {...P} />
      <path d="M5.9 5.9l2.3 2.3" opacity="0.85" {...P} />
      <path d="M15.8 15.8l2.3 2.3" opacity="0.45" {...P} />
      <path d="M3.5 12h3.2" opacity="0.7" {...P} />
      <path d="M17.3 12h3.2" opacity="0.55" {...P} />
      <path d="M5.9 18.1l2.3-2.3" opacity="0.6" {...P} />
      <path d="M15.8 8.2l2.3-2.3" opacity="0.3" {...P} />
    </>
  ),
}

export const iconNames = Object.keys(paths)

export function Icon({ name, className = 'h-5 w-5', title, ...rest }) {
  const glyph = paths[name] || paths.spark
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  )
}

export default Icon
