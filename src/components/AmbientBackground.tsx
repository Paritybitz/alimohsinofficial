import { useEffect, useRef, useState } from 'react'
import { backgroundClip } from '../data/portfolio'
import { startSpace } from '../lib/space'

/**
 * Outer-space backdrop: a canvas starfield (lib/space.ts), sunlight
 * streaming in from the left, film grain and a vignette.
 */
export function AmbientBackground() {
  const canvas = useRef<HTMLCanvasElement>(null)

  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!canvas.current) return
    return startSpace(canvas.current)
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      {backgroundClip.src && !reducedMotion && (
        <video
          className="ambient__clip"
          src={backgroundClip.src}
          style={{ opacity: backgroundClip.strength }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      )}
      <canvas ref={canvas} className="ambient__space" />
      <div className="ambient__sun">
        <div className="ambient__layer ambient__glow" />
        <div className="ambient__layer ambient__rays ambient__rays--a" />
        <div className="ambient__layer ambient__rays ambient__rays--b" />
      </div>
      <div className="ambient__grain" />
      <div className="ambient__vignette" />
    </div>
  )
}
