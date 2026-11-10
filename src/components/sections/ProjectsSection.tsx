import { sections } from '../../data/portfolio'
import { resolveHref } from '../../lib/links'
import { MaybeLink, PlaceholderNote } from '../links'
import { SectionMore } from './SectionMore'

export function ProjectsSection() {
  const { items, link } = sections.projects

  return (
    <>
      <div className="section__body">
        <ul className="entries">
          {items.slice(0, 4).map((project, i) => (
            <li key={i} className="entry">
              <h3 className="entry__title">
                <MaybeLink href={resolveHref(null, project.href)} className="entry__title">
                  {project.name}
                </MaybeLink>
                <PlaceholderNote show={project.placeholder} />
              </h3>
              <p className="entry__text">{project.description}</p>
              {project.points && project.points.length > 0 && (
                <ul className="entry__points">
                  {project.points.slice(0, 3).map((point, p) => (
                    <li key={p}>{point}</li>
                  ))}
                </ul>
              )}
              {project.tags.length > 0 && (
                <ul className="entry__tags" aria-label="Built with">
                  {project.tags.map((tag, t) => (
                    <li key={t}>{tag}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <SectionMore label={link.label} to={link.ref} />
    </>
  )
}
