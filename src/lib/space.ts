/**
 * Deep-space backdrop drawn on a canvas: a sparse starfield drifting
 * forward so slowly it reads as still. (The sunlight on top is CSS — see .ambient__sun in globals.css.)
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

const DRIFT = 0.006 // depth units per second — barely perceptible
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
    size: 0.5 + Math.random() ** 3 * 1.2,
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

    const count = Math.round(Math.min(170, Math.max(70, (width * height) / 9000)))
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
      const twinkle = 0.88 + 0.12 * Math.sin(elapsed * 0.6 + s.phase)
      // Fade stars as they pass behind the name and labels so text stays clean
      const ex = (px - cx) / (width * 0.34)
      const ey = (py - cy) / (height * 0.2)
      const behindText = Math.min(1, 0.45 + 0.55 * (ex * ex + ey * ey))
      const alpha = Math.min(0.85, 0.4 + near * 0.5) * twinkle * behindText
      const r = s.size * (0.6 + near * 0.8)
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = s.tint


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
