import { useState } from 'react'
import type { SectionId } from '../data/portfolio'
import { AmbientBackground } from './AmbientBackground'
import { BrandMark } from './BrandMark'
import { CategoryNavigation } from './CategoryNavigation'
import { IdentityHero } from './IdentityHero'
import { SectionOverlay } from './SectionOverlay'
import { SocialLinks } from './SocialLinks'

export function LandingPage() {
  const [active, setActive] = useState<SectionId | null>(null)

  return (
    <>
      <AmbientBackground />
      {/* Fades away while a chapter is open, leaving only the ambient light */}
      <div className="page" data-dimmed={active !== null || undefined}>
        <BrandMark />
        <main className="composition">
          <IdentityHero />
          <CategoryNavigation active={active} onSelect={setActive} />
        </main>
        <SocialLinks />
      </div>
      <SectionOverlay active={active} onClose={() => setActive(null)} />
    </>
  )
}
