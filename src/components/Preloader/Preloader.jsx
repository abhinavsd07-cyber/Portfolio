import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)
  const dotsRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.()
      },
    })

    // Initial state
    gsap.set(overlayRef.current, { opacity: 1 })

    // Counter count-up
    let count = { val: 0 }
    tl.to(count, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(count.val) + '%'
        }
      },
    }, 0)

    // Line expand
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'power2.inOut', transformOrigin: 'left center' },
      0
    )

    // Text reveal
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20, letterSpacing: '0.4em' },
      { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.7, ease: 'power3.out' },
      0.2
    )

    // Exit animation
    tl.to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.in' }, 1.9)
    tl.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    }, 2.3)

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={overlayRef} className="preloader">
      <div className="preloader-inner">
        <div ref={textRef} className="preloader-name">Abhinav</div>
        <div className="preloader-bar-wrap">
          <div ref={lineRef} className="preloader-bar" />
        </div>
        <div ref={counterRef} className="preloader-counter">0%</div>
      </div>
    </div>
  )
}
