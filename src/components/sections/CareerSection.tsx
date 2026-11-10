import { useLayoutEffect, useRef } from 'react'
import { sections } from '../../data/portfolio'
import { PlaceholderNote } from '../links'
import { SectionMore } from './SectionMore'

export function CareerSection() {
  const { roles, highlights, link, resume } = sections.career
  const resumeRef = useRef<HTMLElement>(null)

  // On wide screens the résumé fills the space to the left of the text.
  // Measure where the text column starts so it can centre itself there.
  useLayoutEffect(() => {
    const aside = resumeRef.current
    const section = aside?.closest('.section')
    const anchor = section?.querySelector('.section__title')
    if (!aside || !section || !anchor) return
    const measure = () => aside.style.setProperty('--resume-area', `${anchor.getBoundingClientRect().left}px`)
    const observer = new ResizeObserver(measure)
    observer.observe(section)
    window.addEventListener('resize', measure)
    measure()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <>
      <div className="section__body">
        <ul className="entries" aria-label="Experience">
          {roles.map((role, i) => (
            <li key={i} className="entry">
              <div className="entry__head">
                <h3 className="entry__title">
                  {role.title}
                  <PlaceholderNote show={role.placeholder} />
                </h3>
                <span className="entry__meta">{role.period}</span>
              </div>
              <p className="entry__org">{role.organisation}</p>
              {role.summary && <p className="entry__text">{role.summary}</p>}
            </li>
          ))}
        </ul>

        {highlights.length > 0 && (
          <ul className="highlights" aria-label="Highlights">
            {highlights.slice(0, 3).map((item, i) => (
              <li key={i}>
                {item.text}
                <PlaceholderNote show={item.placeholder} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <SectionMore label={link.label} to={link.ref} />
      {resume && (
        <aside className="resume" aria-label="Résumé" ref={resumeRef}>
          <a href={resume.src} target="_blank" rel="noopener" title="Open full résumé">
            <img src={resume.src} alt={resume.alt} width={resume.width} height={resume.height} decoding="async" />
          </a>
        </aside>
      )}
    </>
  )
}
