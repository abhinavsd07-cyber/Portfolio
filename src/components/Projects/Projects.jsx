import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { PROJECTS } from '../../data/index.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Inline icons ─────────────────────────────────────────── */
const IconExternal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
)

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

/* ── Sub-components ───────────────────────────────────────── */
function ProjectTag({ label }) {
  return <span className="project-tag">{label}</span>
}

function ProjectOverlay({ live, github }) {
  return (
    <div className="project-overlay">
      <a href={live} target="_blank" rel="noopener noreferrer" className="project-overlay-btn primary">
        Live Demo
      </a>
      <a href={github} target="_blank" rel="noopener noreferrer" className="project-overlay-btn outline">
        GitHub
      </a>
    </div>
  )
}

function ProjectImage({ images, image, gradient, title, live, github, projectIndex }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayImages = images || (image ? [image] : []);

  const handleImageClick = () => {
    if (projectIndex !== undefined) {
      window.open(`/?project=${projectIndex}`, '_blank');
    }
  };

  useEffect(() => {
    if (displayImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <div className="project-card-image">
      {displayImages.length > 0 ? (
        <>
          {displayImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${title} - ${index + 1}`}
              loading="lazy"
              onClick={handleImageClick}
              style={{
                position: 'absolute',
                top: 24, left: 24, right: 24, bottom: 24,
                width: 'calc(100% - 48px)',
                height: 'calc(100% - 48px)',
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 1 : 0,
                cursor: 'pointer',
                transition: 'opacity 0.6s ease',
              }}
            />
          ))}
          {displayImages.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '12px', left: '0', right: '0',
              display: 'flex', justifyContent: 'center', gap: '6px', zIndex: 2
            }}>
              {displayImages.map((_, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: idx === currentIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{
          width: '100%', height: '100%', background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 40 }}>💻</span>
        </div>
      )}
      <ProjectOverlay live={live} github={github} />
    </div>
  )
}

function ProjectCard({ title, desc, tags, images, image, gradient, github, live, projectIndex, cardRef }) {
  const imgWrapRef = useRef(null)

  const handleMouseEnter = () => {
    if (!cardRef?.current) return
    gsap.to(cardRef.current, { y: -8, duration: 0.3, ease: 'power2.out' })
    gsap.to(imgWrapRef.current, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (!cardRef?.current) return
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power3.out' })
    gsap.to(imgWrapRef.current, { scale: 1, duration: 0.4, ease: 'power3.out' })
  }

  return (
    <div
      className="project-card"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0 }}
    >
      <div ref={imgWrapRef}>
        <ProjectImage
          images={images} image={image} gradient={gradient}
          title={title} live={live} github={github}
          projectIndex={projectIndex}
        />
      </div>

      <div className="project-card-body">
        <div className="project-tag-row">
          {tags.map(t => <ProjectTag key={t} label={t} />)}
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{desc}</p>
        <div className="project-links">
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="project-link">
              <IconExternal /> Live Demo
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">
              <IconGitHub /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      // Cards stagger
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.projects-grid'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef} className="projects-header" style={{ opacity: 0 }}>
          <div>
            <span className="section-label">My Work</span>
            <h2 className="section-title">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>
          <a
            href="https://github.com/abhinavsd07-cyber"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            View All on GitHub <IconExternal />
          </a>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              projectIndex={index}
              cardRef={el => { cardRefs.current[index] = el }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
