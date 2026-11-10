import { emailOpensIn, socialLinks, type SocialKey } from '../data/portfolio'

/** Turns a configured value into a usable href. Empty stays empty. */
export function resolveHref(key: SocialKey | null, href: string): string {
  const value = href.trim()
  if (!value) return ''
  if (key === 'email') {
    const address = value.replace(/^mailto:/, '')
    return emailOpensIn === 'gmail'
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`
      : `mailto:${address}`
  }
  return value
}

export function socialHref(key: SocialKey): string {
  return resolveHref(key, socialLinks[key].href)
}
