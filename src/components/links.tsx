import type { ReactNode } from 'react'

interface MaybeLinkProps {
  href: string
  className?: string
  pendingClassName?: string
  /** Shown to assistive tech and as a tooltip when the link isn't set yet. */
  pendingHint?: string
  ariaLabel?: string
  title?: string
  children: ReactNode
}

/**
 * Renders an anchor when a URL exists, otherwise plain text.
 * External links open in a new tab without access to this page.
 */
export function MaybeLink({
  href,
  className = '',
  pendingClassName = '',
  pendingHint = 'Link not added yet',
  ariaLabel,
  title,
  children,
}: MaybeLinkProps) {
  if (!href) {
    return (
      <span className={`${className} ${pendingClassName}`.trim()} title={title ? `${title} — ${pendingHint.toLowerCase()}` : pendingHint}>
        {children}
        <span className="visually-hidden"> ({pendingHint.toLowerCase()})</span>
      </span>
    )
  }

  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function PlaceholderNote({ show }: { show?: boolean }) {
  if (!show) return null
  return <span className="placeholder-note">placeholder</span>
}
