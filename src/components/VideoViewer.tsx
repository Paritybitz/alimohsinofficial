import { useEffect, useRef } from 'react'
import type { ContentVideo } from '../data/portfolio'
import { Dialog } from './Dialog'

interface VideoViewerProps {
  /** Brand name, shown under the video. */
  title: string
  video: ContentVideo | null
  onClose: () => void
}

/** Full-screen player for one vertical video, with a link to the original post. */
export function VideoViewer({ title, video, onClose }: VideoViewerProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const open = video !== null

  // Start when opened (the tap counts as permission); stop and rewind when closed.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open) {
      el.play().catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} labelledBy="video-caption" className="viewer">
      {video && (
        <>
          <div className="viewer__stage">
            <div className="viewer__video" data-content>
              <video
                ref={ref}
                src={video.src}
                poster={video.poster}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
          <div className="viewer__bar viewer__bar--video">
            <p id="video-caption" className="viewer__caption">
              {title}
            </p>
            <a
              className="viewer__step viewer__step--link"
              href={video.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Instagram
            </a>
          </div>
        </>
      )}
    </Dialog>
  )
}
