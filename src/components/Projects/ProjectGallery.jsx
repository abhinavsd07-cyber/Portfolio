import React from 'react';
import { PROJECTS } from '../../data/index.js';

export default function ProjectGallery({ projectId }) {
  const project = PROJECTS[projectId];

  if (!project) {
    return <div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Project not found</div>;
  }

  const images = project.images || (project.image ? [project.image] : []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0c',
      padding: '4rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
    }}>
      <h1 style={{ 
        color: 'white', 
        fontFamily: 'Outfit, sans-serif', 
        fontSize: 'clamp(24px, 4vw, 36px)',
        textAlign: 'center',
        marginBottom: '1rem' 
      }}>
        {project.title}
      </h1>
      
      {images.map((img, idx) => (
        <img 
          key={idx}
          src={img}
          alt={`${project.title} screenshot ${idx + 1}`}
          style={{
            maxWidth: '100%',
            width: '1100px',
            height: 'auto',
            borderRadius: '16px',
            boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        />
      ))}
    </div>
  );
}
