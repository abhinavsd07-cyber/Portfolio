import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Hide on mobile/touch
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows cursor instantly
      gsap.set(dot, { x: mouseX, y: mouseY })

      // Ring lags behind with ease
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.1 })
      gsap.to(dot, { scale: 1.5, duration: 0.1 })
    }

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      interactiveEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
