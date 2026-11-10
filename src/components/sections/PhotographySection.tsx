import { Fragment, useState } from 'react'
import { sections } from '../../data/portfolio'
import { PhotoViewer } from '../PhotoViewer'
import { SectionMore } from './SectionMore'

export function PhotographySection() {
  const { photos, link } = sections.photography
  const [viewing, setViewing] = useState<number | null>(null)
  const list = photos.slice(0, 5)

  return (
    <>
      <div className="section__body">
        {/* One filmstrip on wide screens; on phones the break makes rows of 3 + 2 */}
        <div className="gallery">
          {list.map((photo, i) => (
            <Fragment key={i}>
              {i === 3 && <span className="gallery__break" aria-hidden="true" />}
              <button
                type="button"
                className="gallery__frame"
                style={{ flex: `${photo.ratio} 1 0`, aspectRatio: photo.ratio }}
                onClick={() => setViewing(i)}
                aria-label={`View ${photo.alt}`}
              >
                {photo.src ? (
                  <img src={photo.src} alt="" loading="lazy" decoding="async" />
                ) : (
                  <span className="frame-placeholder" aria-hidden="true">
                    {i + 1}
                  </span>
                )}
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <SectionMore label={link.label} to={link.ref} />
      <PhotoViewer photos={list} index={viewing} onChange={setViewing} />
    </>
  )
}
