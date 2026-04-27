import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')
    gsap.set([dot, ring], { opacity: 1, xPercent: -50, yPercent: -50 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0, ease: 'none' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0, ease: 'none' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.18, ease: 'power2' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.18, ease: 'power2' })

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 })

    const enterInteractive = () => {
      gsap.to(ring, {
        scale: 1.7,
        borderColor: 'rgb(var(--c-gold))',
        backgroundColor: 'rgb(var(--c-gold) / 0.08)',
        duration: 0.25,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const leaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgb(var(--c-silver-light) / 0.85)',
        backgroundColor: 'transparent',
        duration: 0.25,
        ease: 'power2.out',
      })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR)
      if (target) enterInteractive()
    }
    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest?.(INTERACTIVE_SELECTOR)
      const related = (e.relatedTarget as Node | null) || null
      if (target && (!related || !target.contains(related))) leaveInteractive()
    }

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: 'power2.out' })
    }
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeaveWindow)
    window.addEventListener('mouseenter', onEnterWindow)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeaveWindow)
      window.removeEventListener('mouseenter', onEnterWindow)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '9999px',
          border: '1.5px solid rgb(var(--c-silver-light) / 0.85)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.25)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '9999px',
          background: 'rgb(var(--c-gold-light))',
          boxShadow:
            '0 0 0 1.5px rgba(255, 255, 255, 0.85), 0 0 8px rgba(0, 0, 0, 0.55)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
