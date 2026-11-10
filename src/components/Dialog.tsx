import { useEffect, useRef, type ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onClose: () => void
  labelledBy: string
  className?: string
  children: ReactNode
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const CLOSE_MS = 220

/** Links, buttons, images, and anything marked to count as content. */
const CONTENT_SELECTOR = 'a, button, img, [data-content]'

/**
 * True when the click landed on something the visitor meant to touch:
 * a control, an image, or the actual glyphs of a piece of text — not the
 * empty part of a line or the space between blocks.
 */
function isOnContent(target: Element, x: number, y: number): boolean {
  if (target.closest(CONTENT_SELECTOR)) return true
  // Finishing a text selection shouldn't close the view.
  if (window.getSelection()?.toString()) return true

  const range = document.createRange()
  const slop = 2
  for (const node of target.childNodes) {
    if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) continue
    range.selectNodeContents(node)
    for (const rect of range.getClientRects()) {
      if (
        x >= rect.left - slop &&
        x <= rect.right + slop &&
        y >= rect.top - slop &&
        y <= rect.bottom + slop
      ) {
        return true
      }
    }
  }
  return false
}

/**
 * Full-viewport modal built on the native <dialog>, which already handles
 * focus containment, Escape and making the page behind it inert.
 * This adds a short exit fade and returns focus to whatever opened it.
 */
export function Dialog({ open, onClose, labelledBy, className = '', children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open) {
      // Also cancels a fade-out if reopened mid-close.
      dialog.removeAttribute('data-closing')
      if (!dialog.open) {
        returnFocus.current = document.activeElement as HTMLElement | null
        dialog.showModal()
        dialog.scrollTop = 0
      }
      return
    }

    if (dialog.open) {
      const finish = () => {
        dialog.removeAttribute('data-closing')
        dialog.close()
        returnFocus.current?.focus({ preventScroll: true })
      }
      if (prefersReducedMotion()) return finish()
      dialog.setAttribute('data-closing', '')
      const timer = window.setTimeout(finish, CLOSE_MS)
      return () => window.clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    // Escape: run our animated close instead of the instant native one.
    const onCancel = (event: Event) => {
      event.preventDefault()
      onCloseRef.current()
    }
    // If the browser closes it anyway (e.g. repeated Escape), keep state in sync.
    const onNativeClose = () => onCloseRef.current()

    dialog.addEventListener('cancel', onCancel)
    dialog.addEventListener('close', onNativeClose)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      dialog.removeEventListener('close', onNativeClose)
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={labelledBy}
      onClick={(event) => {
        // Clicks inside a nested dialog (the photo viewer) belong to that dialog.
        if ((event.target as Element).closest('dialog') !== event.currentTarget) return
        // Anywhere that isn't text, an image or a control takes you back home.
        if (!isOnContent(event.target as Element, event.clientX, event.clientY)) onClose()
      }}
    >
      <button type="button" className="dialog__close" onClick={onClose}>
        Close
      </button>
      <div className="dialog__inner">{children}</div>
    </dialog>
  )
}
