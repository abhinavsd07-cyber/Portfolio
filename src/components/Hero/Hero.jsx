import { useState, useEffect, useRef } from 'react'
import { HERO_STATS } from '../../data/index.js'
import propic from '../../assets/me.JPG'
import gsap from 'gsap'
import { splitChars } from '../../hooks/useGSAP.js'

/* ── Inline SVG icons ─────────────────────────────────────── */
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
)

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
)

/* ── Social data ──────────────────────────────────────────── */
const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/abhinavsd07-cyber',  icon: <IconGitHub />   },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/abhinav-s-d',   icon: <IconLinkedIn /> },
  { label: 'Instagram',href: 'https://www.instagram.com/mr__abhiz/',  icon: <IconInstagram />},
  { label: 'Email',    href: 'mailto:abhinavsd07@gmail.com',          icon: <IconEmail />    },
]

/* ── Sub-components ───────────────────────────────────────── */
function HeroBadge({ innerRef }) {
  return (
    <div ref={innerRef} className="hero-badge" style={{ opacity: 0 }}>
      <span className="hero-badge-dot" />
      React Developer Intern @ 
      <a 
        href="https://www.aabasoft.com/in-en/" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
      >
        <img 
          src="https://www.google.com/s2/favicons?domain=aabasoft.com&sz=256" 
          alt="Aabasoft" 
          style={{ width: '16px', height: '16px', borderRadius: '4px', objectFit: 'contain' }} 
        />
        <span style={{ textDecoration: 'underline' }}>Aabasoft</span>
      </a>
    </div>
  )
}

function HeroImage({ innerRef }) {
  return (
    <div ref={innerRef} className="hero-image-wrapper" style={{ opacity: 0 }}>
      <div className="hero-image-bg-2" />
      <div className="hero-image-bg" />
      <div className="hero-image-inner">
        <img src={propic} alt="Abhinav — Full Stack Developer" />
      </div>
    </div>
  )
}

function HeroStats({ stats }) {
  return (
    <div className="hero-stats">
      {HERO_STATS.map((s, i) => (
        <div key={s.label} className="hero-stat-card" ref={el => { stats.current[i] = el }} style={{ opacity: 0 }}>
          <div className="hero-stat-number">{s.n}</div>
          <div className="hero-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

function HeroSocials({ innerRef }) {
  return (
    <div ref={innerRef} className="hero-socials" style={{ opacity: 0 }}>
      {SOCIALS.map(s => {
        const isMailto = s.href.startsWith('mailto:');
        return (
          <a
            key={s.label}
            href={s.href}
            className="hero-social-link"
            target={isMailto ? undefined : "_blank"}
            rel={isMailto ? undefined : "noopener noreferrer"}
            aria-label={s.label}
          >
            {s.icon}
          </a>
        );
      })}
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function Hero({ loaded }) {
  const sectionRef = useRef(null)
  const badgeRef = useRef(null)
  const greetingRef = useRef(null)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const descRef = useRef(null)
  const actionsRef = useRef(null)
  const socialsRef = useRef(null)
  const imageRef = useRef(null)
  const statsRefs = useRef([])
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const hasAnimated = useRef(false)

  // Floating orbs loop (runs immediately, independent of loaded)
  useEffect(() => {
    if (!orb1Ref.current || !orb2Ref.current) return
    gsap.to(orb1Ref.current, {
      y: -40, x: 30, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })
    gsap.to(orb2Ref.current, {
      y: 50, x: -20, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1,
    })
  }, [])

  // Scroll indicator bounce
  useEffect(() => {
    if (!scrollIndicatorRef.current) return
    gsap.to(scrollIndicatorRef.current, {
      y: 10, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true,
    })
  }, [])

  // Main hero GSAP timeline — fires after preloader
  useEffect(() => {
    if (!loaded || hasAnimated.current) return
    hasAnimated.current = true

    // Split name into chars
    const chars = nameRef.current ? splitChars(nameRef.current) : []

    const tl = gsap.timeline({ delay: 0.2 })

    // Badge
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0)

    // Greeting
    tl.fromTo(
      greetingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.15
    )

    // Name — letter by letter
    tl.fromTo(
      chars,
      { opacity: 0, y: 60, rotateX: -90 },
      {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'back.out(1.7)',
      },
      0.35
    )

    // Role
    tl.fromTo(
      roleRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      0.75
    )

    // Description
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0.9
    )

    // Actions
    tl.fromTo(
      actionsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      1.05
    )

    // Socials
    tl.to(socialsRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.15)

    // Image
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, x: 60 },
      { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: 'power3.out' },
      0.4
    )

    // Stats stagger
    tl.fromTo(
      statsRefs.current,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
      0.8
    )

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.4
    )
  }, [loaded])

  const scrollToProjects = e => {
    e.preventDefault()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section" ref={sectionRef}>
      {/* Background orbs */}
      <div className="hero-bg">
        <div className="orb hero-orb-1" ref={orb1Ref} />
        <div className="orb hero-orb-2" ref={orb2Ref} />
      </div>

      <div className="container">
        <div className="hero-grid">
          {/* ── Left: content ── */}
          <div className="hero-content">
            <HeroBadge innerRef={badgeRef} />
            <p ref={greetingRef} className="hero-greeting" style={{ opacity: 0 }}>Hello, I'm</p>
            <h1 ref={nameRef} className="hero-name" style={{ perspective: '600px' }}>Abhinav</h1>
            <div ref={roleRef} className="hero-role" style={{ opacity: 0 }}>
              <span className="hero-role-line" />
              Full Stack Developer
            </div>
            <p ref={descRef} className="hero-desc" style={{ opacity: 0 }}>
              I craft high-performance web applications with modern technologies.
              Passionate about clean architecture, responsive UI, and delivering
              exceptional user experiences.
            </p>
            <div ref={actionsRef} className="hero-actions" style={{ opacity: 0 }}>
              <a href="#projects" className="btn-primary" onClick={scrollToProjects}>
                View My Work <IconArrow />
              </a>
              <a href="/Abhinav SD Full stack resume.pdf" download="Abhinav_Resume.pdf" className="btn-secondary">
                Download CV <IconDownload />
              </a>
            </div>
            <HeroSocials innerRef={socialsRef} />
          </div>

          {/* ── Right: visual ── */}
          <div className="hero-visual">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              <HeroImage innerRef={imageRef} />
              <HeroStats stats={statsRefs} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="hero-scroll-indicator" aria-hidden="true" style={{ opacity: 0 }}>
        <span>Scroll</span>
        <div className="hero-scroll-arrow" />
      </div>
    </section>
  )
}
