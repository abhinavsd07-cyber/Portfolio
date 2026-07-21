import { useRef, useLayoutEffect } from 'react'
import { NAV_LINKS } from '../../data/index.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Inline icons ─────────────────────────────────────────── */
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

const FOOTER_SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/abhinavsd07-cyber',  icon: <IconGitHub />    },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/abhinav-s-d',   icon: <IconLinkedIn />  },
  { label: 'Instagram', href: 'https://www.instagram.com/mr__abhiz/',  icon: <IconInstagram /> },
  { label: 'Email',     href: 'mailto:abhinavsd07@gmail.com',          icon: <IconEmail />     },
]

export default function Footer() {
  const footerRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const socialsRef = useRef(null)
  const bottomRef = useRef(null)

  const scrollTo = (e, link) => {
    e.preventDefault()
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
      })

      tl.fromTo(logoRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      tl.fromTo(
        linksRef.current?.querySelectorAll('li') || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out' },
        '-=0.3'
      )
      tl.fromTo(
        socialsRef.current?.querySelectorAll('a') || [],
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' },
        '-=0.3'
      )
      tl.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1'
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer className="footer" role="contentinfo" ref={footerRef}>
      <div className="container footer-inner">
        <div className="footer-top">
          <div ref={logoRef} className="footer-logo" style={{ opacity: 0 }}>Abhinav</div>

          <ul ref={linksRef} className="footer-links">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} onClick={e => scrollTo(e, link)}>
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div ref={socialsRef} className="footer-socials">
            {FOOTER_SOCIALS.map(s => {
              const isMailto = s.href.startsWith('mailto:');
              return (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social"
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  style={{ opacity: 0 }}
                >
                  {s.icon}
                </a>
              );
            })}
          </div>
        </div>

        <div ref={bottomRef} className="footer-bottom" style={{ opacity: 0 }}>
          <p>© {new Date().getFullYear()} Abhinav Crafted with ❤️ &amp; lots of ☕</p>
          <a href="mailto:abhinavsd07@gmail.com" className="footer-email-ref">abhinavsd07@gmail.com</a>
        </div>
      </div>
    </footer>
  )
}
