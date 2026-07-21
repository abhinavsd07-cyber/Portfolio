import { useState, useRef, useLayoutEffect } from 'react'
import { CONTACT_INFO } from '../../data/index.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Sub-components ───────────────────────────────────────── */
function ContactInfoCard({ icon, label, value }) {
  return (
    <div className="contact-info-card">
      <div className="contact-info-icon" dangerouslySetInnerHTML={{ __html: icon }}></div>
      <div>
        <div className="contact-info-label">{label}</div>
        <div className="contact-info-value">{value}</div>
      </div>
    </div>
  )
}

/* ── Form fields ─────────────────────────────────────────── */
const INITIAL_FORM = { name: '', email: '', subject: '', message: '' }

function FormField({ id, label, name, type = 'text', placeholder, value, onChange }) {
  const inputRef = useRef(null)

  const handleFocus = () => {
    gsap.to(inputRef.current, { borderColor: 'rgba(255,255,255,0.6)', duration: 0.25, ease: 'power2.out' })
  }
  const handleBlur = () => {
    gsap.to(inputRef.current, { borderColor: 'rgba(255,255,255,0.12)', duration: 0.25, ease: 'power2.out' })
  }

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
      />
    </div>
  )
}

function FormTextarea({ id, label, name, placeholder, value, onChange }) {
  const textareaRef = useRef(null)

  const handleFocus = () => {
    gsap.to(textareaRef.current, { borderColor: 'rgba(255,255,255,0.6)', duration: 0.25 })
  }
  const handleBlur = () => {
    gsap.to(textareaRef.current, { borderColor: 'rgba(255,255,255,0.12)', duration: 0.25 })
  }

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        className="form-textarea"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
      />
    </div>
  )
}

function SuccessBanner() {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 12,
      padding: '16px 20px',
      marginBottom: 24,
      color: '#ffffff',
      fontSize: 15,
      fontWeight: 600,
      textAlign: 'center',
    }}>
      ✅ Message sent! I'll get back to you soon.
    </div>
  )
}

function ContactForm({ formRef }) {
  const [form, setForm]           = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const btnRef = useRef(null)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    // Button pop animation
    gsap.timeline()
      .to(btnRef.current, { scale: 0.92, duration: 0.1 })
      .to(btnRef.current, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
    
    setIsLoading(true)
    
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
        setForm(INITIAL_FORM)
      } else {
        alert('Failed to send message.')
      }
    } catch (error) {
      console.error(error)
      alert('Failed to connect to the server.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      id="contact-form"
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      style={{ opacity: 0 }}
    >
      {submitted && <SuccessBanner />}

      <div className="form-row">
        <FormField
          id="contact-name"
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
        />
        <FormField
          id="contact-email"
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <FormField
        id="contact-subject"
        label="Subject"
        name="subject"
        placeholder="Project Inquiry"
        value={form.subject}
        onChange={handleChange}
      />

      <FormTextarea
        id="contact-message"
        label="Message"
        name="message"
        placeholder="Tell me about your project..."
        value={form.message}
        onChange={handleChange}
      />

      <button
        id="contact-submit"
        ref={btnRef}
        type="submit"
        className="btn-primary form-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Message'}
        {!isLoading && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        )}
      </button>
    </form>
  )
}

/* ── Main export ──────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null)
  const infoPanelRef = useRef(null)
  const formRef = useRef(null)
  const orbRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Orb infinite rotation + pulse
      gsap.to(orbRef.current, {
        rotate: 360, duration: 20, ease: 'none', repeat: -1,
      })
      gsap.to(orbRef.current, {
        scale: 1.15, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Info panel slides in from left
      gsap.fromTo(
        infoPanelRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: infoPanelRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      // Form slides in from right
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )

      // Info cards stagger
      gsap.fromTo(
        infoPanelRef.current?.querySelectorAll('.contact-info-card') || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: infoPanelRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div ref={orbRef} className="contact-orb" aria-hidden="true" />
      <div className="container">
        <div className="contact-grid">
          <div ref={infoPanelRef} style={{ opacity: 0 }}>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="section-subtitle">
              Have a project in mind? I'd love to hear about it. Drop me a message
              and let's create something amazing.
            </p>
            <div className="contact-info-cards">
              {CONTACT_INFO.map(c => (
                <ContactInfoCard key={c.label} {...c} />
              ))}
            </div>
          </div>
          <ContactForm formRef={formRef} />
        </div>
      </div>
    </section>
  )
}
