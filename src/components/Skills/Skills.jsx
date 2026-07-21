import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { SKILLS, SKILL_CATEGORIES } from '../../data/index.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Sub-components ───────────────────────────────────────── */
function CategoryFilter({ active, onChange }) {
  return (
    <div className="skills-categories">
      {SKILL_CATEGORIES.map(cat => (
        <button
          key={cat}
          id={`skill-cat-${cat.toLowerCase()}`}
          className={`skill-cat-btn${active === cat ? ' active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

function SkillCard({ icon, name, invert, cardRef }) {
  return (
    <div className="skill-card" ref={cardRef}>
      <span className="skill-icon">
        {icon?.startsWith('http') ? (
          <img
            src={icon}
            alt={name}
            style={{ filter: invert ? 'invert(1) brightness(2)' : 'none' }}
          />
        ) : icon}
      </span>
      <div className="skill-name">{name}</div>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const categoriesRef = useRef(null)
  const gridRef = useRef(null)
  const hasRevealed = useRef(false)

  const filtered =
    activeCategory === 'All'
      ? SKILLS
      : SKILLS.filter(s => s.cat === activeCategory)

  // Initial scroll reveal for header
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            onEnter: () => { hasRevealed.current = true },
          },
        }
      )

      gsap.fromTo(
        categoriesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate skill cards whenever filtered list changes
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.skill-card')

    // First fade out, then reveal new
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.85 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.04,
        ease: 'back.out(1.4)',
      }
    )
  }, [filtered])

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef} className="skills-header" style={{ opacity: 0 }}>
          <span className="section-label">My Toolkit</span>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Technologies I use to build powerful, scalable, and beautiful digital products.
          </p>
        </div>

        <div ref={categoriesRef} style={{ opacity: 0 }}>
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <div ref={gridRef} className="skills-grid">
          {filtered.map(skill => (
            <SkillCard key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
