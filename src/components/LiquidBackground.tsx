import { useEffect, useRef } from 'react'

export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const blobs = [
      { x: 0.3, y: 0.3, r: 0.35, color: 'rgba(62,100,74,0.04)', speed: 0.00015 },
      { x: 0.7, y: 0.6, r: 0.4, color: 'rgba(130,85,0,0.03)', speed: 0.0001 },
      { x: 0.5, y: 0.8, r: 0.3, color: 'rgba(141,110,89,0.03)', speed: 0.0002 },
      { x: 0.2, y: 0.7, r: 0.32, color: 'rgba(194,237,203,0.05)', speed: 0.00012 },
      { x: 0.8, y: 0.2, r: 0.28, color: 'rgba(255,193,102,0.04)', speed: 0.00018 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob, i) => {
        const x = (blob.x + Math.sin(t * blob.speed * 1000 + i) * 0.08) * canvas.width
        const y = (blob.y + Math.cos(t * blob.speed * 1000 + i * 2) * 0.06) * canvas.height
        const r = blob.r * Math.min(canvas.width, canvas.height)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      })

      t += 16
      animFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
