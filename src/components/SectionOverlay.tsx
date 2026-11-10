import { useState } from 'react'
import { sections, type SectionId } from '../data/portfolio'
import { Dialog } from './Dialog'
import { PlaceholderNote } from './links'
import { BlogSection } from './sections/BlogSection'
import { CareerSection } from './sections/CareerSection'
import { ContentSection } from './sections/ContentSection'
import { PhotographySection } from './sections/PhotographySection'
import { ProjectsSection } from './sections/ProjectsSection'

interface SectionOverlayProps {
  active: SectionId | null
  onClose: () => void
}

const bodies: Record<SectionId, () => React.JSX.Element> = {
  career: CareerSection,
  projects: ProjectsSection,
  content: ContentSection,
  photography: PhotographySection,
  blog: BlogSection,
}

export function SectionOverlay({ active, onClose }: SectionOverlayProps) {
  // Keep showing the last section while the overlay fades out.
  const [shown, setShown] = useState<SectionId | null>(active)
  if (active && active !== shown) setShown(active)

  const section = shown ? sections[shown] : null
  const Body = shown ? bodies[shown] : null
  const titleId = 'section-title'

  return (
    <Dialog open={active !== null} onClose={onClose} labelledBy={titleId}>
      {section && Body && (
        <article className={`section section--${shown}`}>
          <h2 id={titleId} className="section__title">
            {section.label}
          </h2>
          <p className="section__intro">
            {section.intro.text}
            <PlaceholderNote show={section.intro.placeholder} />
          </p>
          <Body />
        </article>
      )}
    </Dialog>
  )
}
