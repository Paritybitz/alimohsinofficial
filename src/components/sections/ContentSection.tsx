import { sections } from '../../data/portfolio'
import { resolveHref } from '../../lib/links'
import { MaybeLink, PlaceholderNote } from '../links'
import { SectionMore } from './SectionMore'

export function ContentSection() {
  const { items, link } = sections.content
  const hasVisuals = items.some((piece) => piece.logo || piece.thumbnail)

  return (
    <>
      <div className="section__body">
        <ul className="entries">
          {items.slice(0, 3).map((piece, i) => (
            <li key={i} className={hasVisuals ? 'piece' : 'entry'}>
              {hasVisuals &&
                (piece.logo ? (
                  <span className="piece__logo" aria-hidden="true">
                    <img src={piece.logo} alt="" loading="lazy" />
                  </span>
                ) : piece.thumbnail ? (
                  <img className="piece__thumb" src={piece.thumbnail} alt="" loading="lazy" />
                ) : (
                  <span className="piece__thumb" aria-hidden="true" />
                ))}
              <div className="entry">
                <h3 className="entry__title">
                  <MaybeLink href={resolveHref(null, piece.href)} className="entry__title">
                    {piece.title}
                  </MaybeLink>
                  <PlaceholderNote show={piece.placeholder} />
                </h3>
                <p className="entry__meta">{piece.platform}</p>
                {piece.description && <p className="entry__text">{piece.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SectionMore label={link.label} to={link.ref} />
    </>
  )
}
