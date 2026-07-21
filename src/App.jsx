import React, { useState, useEffect } from 'react';
import './index.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar       from './components/Navbar/Navbar.jsx'
import Hero         from './components/Hero/Hero.jsx'
import About        from './components/About/About.jsx'
import Skills       from './components/Skills/Skills.jsx'
import Projects     from './components/Projects/Projects.jsx'
import Experience   from './components/Experience/Experience.jsx'
import Contact      from './components/Contact/Contact.jsx'
import Footer       from './components/Footer/Footer.jsx'
import ProjectGallery from './components/Projects/ProjectGallery.jsx'
import Preloader    from './components/Preloader/Preloader.jsx'
import CustomCursor from './components/CustomCursor/CustomCursor.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [projectId, setProjectId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const proj = urlParams.get('project');
    if (proj !== null) {
      setProjectId(parseInt(proj, 10));
    }
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (projectId !== null) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId;

    function raf(time) {
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [projectId])

  if (projectId !== null) {
    return <ProjectGallery projectId={projectId} />;
  }

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <Navbar loaded={loaded} />
      <main>
        <Hero loaded={loaded} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
