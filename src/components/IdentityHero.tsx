import { identity } from '../data/portfolio'
import { nameMark } from '../data/nameMark'

export function IdentityHero() {
  return (
    <header className="identity">
      <h1 className="identity__name">
        {/* Real text for screen readers and search; the drawing is what people see */}
        <span className="visually-hidden">{identity.name}</span>
        <svg
          className="identity__mark"
          viewBox={`0 0 ${nameMark.width} ${nameMark.height}`}
          style={{ aspectRatio: `${nameMark.width} / ${nameMark.height}` }}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* Brushed metal: light catching the top edge, falling to bronze */}
            <linearGradient id="name-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--metal-highlight)" />
              <stop offset="0.45" stopColor="var(--metal-mid)" />
              <stop offset="0.8" stopColor="var(--metal-shadow)" />
              <stop offset="1" stopColor="var(--metal-rim)" />
            </linearGradient>
          </defs>
          <path d={nameMark.d} fill="url(#name-metal)" />
        </svg>
      </h1>
      <p className="identity__subtitle">
        {identity.subtitle.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
    </header>
  )
}
