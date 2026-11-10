import { useState } from 'react'
import { sections, type ContentPiece } from '../../data/portfolio'
import { resolveHref } from '../../lib/links'
import { MaybeLink, PlaceholderNote } from '../links'
import { VideoViewer } from '../VideoViewer'
import { SectionMore } from './SectionMore'

export function ContentSection() {
  const { items, link } = sections.content
  const [watching, setWatching] = useState<ContentPiece | null>(null)
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
                {piece.video && (
                  <button
                    type="button"
                    className="piece__watch"
                    aria-haspopup="dialog"
                    onClick={() => setWatching(piece)}
                  >
                    <span className="piece__poster">
                      <img src={piece.video.poster} alt="" loading="lazy" />
                      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M9 6.5v11l9-5.5z" />
                      </svg>
                    </span>
                    <span className="piece__watch-label">
                      Watch the video
                      <span className="visually-hidden"> for {piece.title}</span>
                    </span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SectionMore label={link.label} to={link.ref} />
      <VideoViewer
        title={watching?.title ?? ''}
        video={watching?.video ?? null}
        onClose={() => setWatching(null)}
      />
    </>
  )
}
