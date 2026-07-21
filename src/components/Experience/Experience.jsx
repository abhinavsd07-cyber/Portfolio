import { useRef, useLayoutEffect } from 'react'
import { EXPERIENCES } from '../../data/index.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Sub-components ───────────────────────────────────────── */
function TimelineDot({ dotRef }) {
  return (
    <div className="timeline-center">
      <div className="timeline-dot" ref={dotRef} style={{ opacity: 0, transform: 'scale(0)' }} />
    </div>
  )
}

function TimelineCard({ company, role, desc, logo, url }) {
  const CardWrapper = url ? 'a' : 'div';
  const wrapperProps = url ? {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "timeline-card",
    style: { display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }
  } : {
    className: "timeline-card"
  };

  return (
    <CardWrapper {...wrapperProps}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        {logo && (
          <img
            src={logo}
            alt={`${company} logo`}
            style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain', background: '#fff', padding: '4px' }}
          />
        )}
        <div className="timeline-company" style={{ marginBottom: 0 }}>{company}</div>
      </div>
      <div className="timeline-role">{role}</div>
      <div className="timeline-desc">{desc}</div>
    </CardWrapper>
  )
}

function TimelineItem({ company, role, date, desc, logo, url, index, cardRef, dotRef, dateRef }) {
  const isLeft = index % 2 === 0

  return (
    <div className="timeline-item">
      {isLeft ? (
        <>
          <div className="timeline-content" ref={cardRef} style={{ opacity: 0 }}>
            <TimelineCard company={company} role={role} desc={desc} logo={logo} url={url} />
          </div>
          <TimelineDot dotRef={dotRef} />
          <div className="timeline-date" ref={dateRef} style={{ opacity: 0 }}>
            <div className="timeline-date-text">{date}</div>
          </div>
        </>
      ) : (
        <>
          <div className="timeline-date" ref={dateRef} style={{ opacity: 0 }}>
            <div className="timeline-date-text">{date}</div>
          </div>
          <TimelineDot dotRef={dotRef} />
          <div className="timeline-content" ref={cardRef} style={{ opacity: 0 }}>
            <TimelineCard company={company} role={role} desc={desc} logo={logo} url={url} />
          </div>
        </>
      )}
    </div>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const lineRef = useRef(null)
  const cardRefs = useRef([])
  const dotRefs = useRef([])
  const dateRefs = useRef([])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      // Timeline line draw — scrub from top to bottom as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      )

      // Each timeline item
      EXPERIENCES.forEach((_, i) => {
        const isLeft = i % 2 === 0

        // Card
        gsap.fromTo(
          cardRefs.current[i],
          { opacity: 0, x: isLeft ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRefs.current[i],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        // Dot pop
        gsap.to(dotRefs.current[i], {
          opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)',
          scrollTrigger: {
            trigger: dotRefs.current[i],
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })

        // Date
        gsap.fromTo(
          dateRefs.current[i],
          { opacity: 0, x: isLeft ? 40 : -40 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: {
              trigger: dateRefs.current[i],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="container">
        <div ref={headerRef} className="experience-header" style={{ opacity: 0 }}>
          <span className="section-label">My Journey</span>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            My professional timeline — highlighting my journey in web development.
          </p>
        </div>

        <div className="timeline">
          {/* The animated center line */}
          <div
            ref={lineRef}
            className="timeline-line-gsap"
            style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
          />

          {EXPERIENCES.map((exp, i) => (
            <TimelineItem
              key={exp.company}
              {...exp}
              index={i}
              cardRef={el => { cardRefs.current[i] = el }}
              dotRef={el => { dotRefs.current[i] = el }}
              dateRef={el => { dateRefs.current[i] = el }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
