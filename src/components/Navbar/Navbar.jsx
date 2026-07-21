import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { NAV_LINKS } from '../../data/index.js'
import gsap from 'gsap'

function scrollToSection(id) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar({ loaded }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const linksRef = useRef([])
  const logoRef = useRef(null)
  const ctaRef = useRef(null)
  const hasAnimated = useRef(false)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Escape key
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // GSAP entrance — fires once after preloader completes
  useEffect(() => {
    if (!loaded || hasAnimated.current) return
    hasAnimated.current = true

    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo(
      navRef.current,
      { yPercent: -120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    tl.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo(
      linksRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' },
      '-=0.3'
    )
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' },
      '-=0.2'
    )
  }, [loaded])

  const toggleMenu = () => setMenuOpen(o => !o)

  const handleNavClick = (e, link) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => scrollToSection(link), 100)
  }

  return (
    <>
      {/* Desktop navbar */}
      <nav
        ref={navRef}
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        style={{ opacity: 0 }}
      >
        <div className="container navbar-inner">
          <a
            ref={logoRef}
            href="#hero"
            className="nav-logo"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            Abhinav
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link, i) => (
              <li key={link}>
                <a
                  ref={el => { linksRef.current[i] = el }}
                  href={`#${link.toLowerCase()}`}
                  onClick={e => handleNavClick(e, link)}
                  className="nav-link-item"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div ref={ctaRef} className="nav-cta">
            <a
              href="#contact"
              className="btn-primary"
              onClick={e => handleNavClick(e, 'Contact')}
            >
              Contact
            </a>
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={e => handleNavClick(e, link)}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {link}
          </a>
        ))}
        <a
          className="btn-primary"
          href="#contact"
          onClick={e => handleNavClick(e, 'Contact')}
          style={{ marginTop: 8 }}
        >
          Contact
        </a>
      </div>
    </>
  )
}
