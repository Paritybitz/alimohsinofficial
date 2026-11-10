import { useEffect, useState } from 'react'
import type { Photograph } from '../data/portfolio'
import { Dialog } from './Dialog'

interface PhotoViewerProps {
  photos: Photograph[]
  index: number | null
  onChange: (index: number | null) => void
}

export function PhotoViewer({ photos, index, onChange }: PhotoViewerProps) {
  const [shown, setShown] = useState(index)
  if (index !== null && index !== shown) setShown(index)

  const open = index !== null
  const photo = shown !== null ? photos[shown] : null
  const count = photos.length

  useEffect(() => {
    if (index === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onChange((index + 1) % count)
      if (event.key === 'ArrowLeft') onChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, onChange])

  return (
    <Dialog open={open} onClose={() => onChange(null)} labelledBy="viewer-caption" className="viewer">
      {photo && shown !== null && (
        <>
          <div className="viewer__stage">
            {photo.src ? (
              <img className="viewer__image" src={photo.src} alt={photo.alt} />
            ) : (
              <div className="viewer__empty" data-content style={{ aspectRatio: photo.ratio, '--ratio': photo.ratio } as React.CSSProperties}>
                <span className="frame-placeholder">Your photograph</span>
              </div>
            )}
          </div>
          <div className="viewer__bar">
            <button
              type="button"
              className="viewer__step"
              onClick={() => onChange((shown - 1 + count) % count)}
            >
              Previous
            </button>
            <p id="viewer-caption" className="viewer__caption">
              {photo.caption ?? `${shown + 1} of ${count}`}
            </p>
            <button type="button" className="viewer__step" onClick={() => onChange((shown + 1) % count)}>
              Next
            </button>
          </div>
        </>
      )}
    </Dialog>
  )
}
