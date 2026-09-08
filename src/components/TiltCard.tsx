import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  ariaLabel?: string
}

export function TiltCard({ children, className, style, onClick, ariaLabel }: Props) {
  const cardRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(62,100,74,0.25)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    card.style.boxShadow = '0 8px 32px rgba(62, 100, 74, 0.08)'
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const card = cardRef.current
    if (!card) return
    const touch = e.touches[0]
    const rect = card.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  }

  return (
    <button
      ref={cardRef}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
