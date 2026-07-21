import { useRef, useLayoutEffect, useEffect } from 'react'
import { ABOUT_HIGHLIGHTS } from '../../data/index.js'
import aboutimg1 from '../../assets/aboutimg1.JPG'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Sub-components ───────────────────────────────────────── */
function HighlightCard({ icon, title, text }) {
  return (
    <div className="bento-card highlight-card">
      <div className="about-highlight-icon" dangerouslySetInnerHTML={{ __html: icon }}></div>
      <h3 className="about-highlight-title">{title}</h3>
      <p className="about-highlight-text">{text}</p>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  const scrollToContact = e => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Mouse move glow effect
  useEffect(() => {
    const handleMouseMove = e => {
      const cards = sectionRef.current?.querySelectorAll('.bento-card')
      if (!cards) return
      for (const card of cards) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top
        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      }
    }
    const section = sectionRef.current
    section?.addEventListener('mousemove', handleMouseMove)
    return () => section?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Bento cards reveal stagger
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.bento-card'),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <span className="section-label">Who I Am</span>
          <h2 className="section-title">
            Passionate Developer <span className="gradient-text">&amp; Problem Solver</span>
          </h2>
        </div>

        <div className="about-bento">
          {/* 1. Profile Frame Card */}
          <div className="bento-card profile-card">
            <div className="about-bento-visual">
              <img ref={imageRef} src={aboutimg1} alt="Abhinav — Full Stack Developer" />
              <div className="about-bento-badge">
                <div className="about-exp-number">2+</div>
                <div className="about-exp-label">Years of Experience</div>
              </div>
            </div>
          </div>

          {/* 2. Bio Card */}
          <div className="bento-card bio-card">
            <div>
              <p className="about-text" style={{ fontSize: '18px', fontWeight: 500, color: 'var(--text-primary)' }}>
                Hi! I'm Abhinav, a Full Stack Developer based in India with 2+ years of experience building scalable web applications.
              </p>
              <p className="about-text" style={{ marginTop: 16 }}>
                I specialize in React ecosystems, Node.js backends, and database management. I love transforming complex problems into elegant, performant solutions. When I'm not coding, you'll find me exploring the latest in AI/ML, contributing to open-source, or building creative side projects.
              </p>
            </div>
          </div>

          {/* 3. Highlights Cards (x4) */}
          {ABOUT_HIGHLIGHTS.map(h => (
            <HighlightCard key={h.title} {...h} />
          ))}

          {/* 4. Let's Talk Card */}
          <div className="bento-card cta-card">
            <h3>Interested in working together?</h3>
            <p>I am currently available for freelance projects and full-time opportunities.</p>
            <a href="#contact" className="btn-primary" onClick={scrollToContact}>
              Let's Talk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
