import { useEffect, useRef } from 'react'

/**
 * Attaches an IntersectionObserver to the returned ref.
 * Adds the 'visible' class once the element enters the viewport.
 * Also checks immediately if the element is already visible on mount.
 */
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check immediately in case element is already in viewport on mount
    const rect = el.getBoundingClientRect()
    const inViewport =
      rect.top < window.innerHeight && rect.bottom > 0

    if (inViewport) {
      // Small delay to let CSS animation begin naturally
      const t = setTimeout(() => el.classList.add('visible'), 50)
      return () => clearTimeout(t)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
