import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAPContext — wraps gsap.context() for safe React cleanup.
 * Pass a callback that contains all your GSAP setup.
 * Deps array triggers re-run (like useEffect).
 */
export function useGSAPContext(callback, deps = []) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(callback, ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

/**
 * useScrollReveal — GSAP ScrollTrigger powered reveal for a single element.
 * Returns a ref to attach to the element you want animated.
 */
export function useGSAPReveal(options = {}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      from = { opacity: 0, y: 60 },
      to = { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      triggerOptions = {},
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          ...triggerOptions,
        },
      })
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/**
 * Utility: split text into individual character spans
 */
export function splitChars(element) {
  const text = element.textContent
  element.innerHTML = ''
  const chars = []
  for (const char of text) {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    element.appendChild(span)
    chars.push(span)
  }
  return chars
}

/**
 * Utility: split text into word spans
 */
export function splitWords(element) {
  const words = element.textContent.trim().split(' ')
  element.innerHTML = ''
  return words.map(word => {
    const span = document.createElement('span')
    span.textContent = word
    span.style.display = 'inline-block'
    span.style.overflow = 'hidden'
    element.appendChild(span)
    // space
    element.appendChild(document.createTextNode(' '))
    return span
  })
}

export { gsap, ScrollTrigger }
