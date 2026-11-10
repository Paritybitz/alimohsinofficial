/**
 * Deep-space backdrop drawn on a canvas: a steady forward flight through a
 * starfield, stars streaming out from a point just behind the name. (The sunlight on top is CSS — see .ambient__sun in globals.css.)
 *
 * - Pauses when the tab is hidden.
 * - With prefers-reduced-motion, draws a single still frame.
 * Returns a cleanup function.
 */

interface Star {
  x: number // world position, roughly −1…1
  y: number
  z: number // depth: 1 = far, approaches 0 as the camera drifts forward
  size: number
  tint: string
  phase: number // twinkle offset
}

const DRIFT = 0.045 // depth units per second — a steady, calm flight forward
const TRAIL = 0.035 // how far back (in depth) a near star's streak reaches
const TINTS = ['#fff4e6', '#ffe9cf', '#e9eef7', '#dfe6f2', '#fff0d9']

export function startSpace(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let width = 0
  let height = 0
  let stars: Star[] = []
  let raf = 0
  let last = 0
  let elapsed = 0

  const spawn = (star: Partial<Star> = {}, far = false): Star => ({
    x: (Math.random() * 2 - 1) * 1.6,
    y: (Math.random() * 2 - 1) * 1.6,
    z: far ? 0.85 + Math.random() * 0.15 : 0.08 + Math.random() * 0.92,
    size: 0.7 + Math.random() ** 3 * 1.9,
    tint: TINTS[(Math.random() * TINTS.length) | 0],
    phase: Math.random() * Math.PI * 2,
    ...star,
  })

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.round(Math.min(260, Math.max(110, (width * height) / 6500)))
    stars = Array.from({ length: count }, () => spawn())
  }

  function frame(now: number) {
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
    last = now
    elapsed += dt
    draw(dt)
    raf = requestAnimationFrame(frame)
  }

  function draw(dt: number) {
    ctx!.clearRect(0, 0, width, height)
    const cx = width / 2
    const cy = height * 0.45
    const focal = Math.max(width, height) * 0.55

    // Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i]
      s.z -= DRIFT * dt
      const px = cx + (s.x / s.z) * focal
      const py = cy + (s.y / s.z) * focal
      if (s.z < 0.06 || px < -20 || px > width + 20 || py < -20 || py > height + 20) {
        stars[i] = spawn({}, true)
        continue
      }
      const near = 1 - s.z
      const twinkle = 0.85 + 0.15 * Math.sin(elapsed * 1.3 + s.phase)
      // Fade stars as they pass behind the name and labels so text stays clean
      const ex = (px - cx) / (width * 0.34)
      const ey = (py - cy) / (height * 0.2)
      const behindText = Math.min(1, 0.45 + 0.55 * (ex * ex + ey * ey))
      const alpha = Math.min(1, 0.62 + near * 0.8) * twinkle * behindText
      const r = s.size * (0.65 + near * 1.7)
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = s.tint

      // Close stars leave a short streak back toward the vanishing point,
      // which is what makes the forward motion read.
      if (!motion.matches && s.z < 0.55) {
        const tz = s.z + TRAIL
        const tx = cx + (s.x / tz) * focal
        const ty = cy + (s.y / tz) * focal
        ctx!.strokeStyle = s.tint
        ctx!.lineWidth = r * 1.4
        ctx!.globalAlpha = alpha * Math.min(1, (0.55 - s.z) * 2.5) * 0.6
        ctx!.beginPath()
        ctx!.moveTo(tx, ty)
        ctx!.lineTo(px, py)
        ctx!.stroke()
        ctx!.globalAlpha = alpha
      }

      if (r < 0.9) {
        ctx!.fillRect(px - r, py - r, r * 2, r * 2)
      } else {
        ctx!.beginPath()
        ctx!.arc(px, py, r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    ctx!.globalAlpha = 1
  }

  function start() {
    cancelAnimationFrame(raf)
    last = 0
    if (motion.matches || document.hidden) {
      draw(0)
    } else {
      raf = requestAnimationFrame(frame)
    }
  }

  const onResize = () => {
    resize()
    start()
  }
  const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start())

  resize()
  start()
  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  motion.addEventListener('change', start)

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    motion.removeEventListener('change', start)
  }
}
