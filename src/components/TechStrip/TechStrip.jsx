import { TECH_STRIP } from '../../data/index.js'

export default function TechStrip() {
  // Double the array so the marquee loops seamlessly
  const doubled = [...TECH_STRIP, ...TECH_STRIP]

  return (
    <div className="tech-strip" aria-hidden="true">
      <div className="tech-strip-inner">
        {doubled.map((item, i) => (
          <span key={i} className="tech-strip-item">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {item.icon?.startsWith('http') ? <img src={item.icon} alt={item.name} style={{ width: '1.2em', height: '1.2em', objectFit: 'contain' }} /> : item.icon}
            </span>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}
