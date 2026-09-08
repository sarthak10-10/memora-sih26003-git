import { useEffect, useRef } from 'react'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  size: number
  duration: number
  delay: number
  color: string
}

export function ParticleBackground() {
  const colors = ['#3e644a', '#825500', '#8d6e59', '#c2edcb', '#ffc166']
  const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100,
    size: Math.random() * 8 + 4,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    color: colors[i % colors.length],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}