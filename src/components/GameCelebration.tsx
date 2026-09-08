import { useEffect, useRef } from 'react'

interface Props {
  score: number
  total: number
}

export function GameCelebration({ score, total }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ratio = score / total
    if (ratio < 0.6) return

    const particles: {
      x: number; y: number; vx: number; vy: number
      size: number; color: string; alpha: number; rotation: number
    }[] = []

    const colors = ['#3e644a', '#825500', '#c2edcb', '#ffc166', '#8d6e59', '#ffdad6']
    const count = ratio >= 1 ? 150 : 80

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 5,
        size: Math.random() * 12 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * 360,
      })
    }

    let animFrame: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let alive = false
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.4
        p.alpha -= 0.015
        p.rotation += 5

        if (p.alpha > 0) {
          alive = true
          ctx.save()
          ctx.globalAlpha = p.alpha
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2)
          ctx.restore()
        }
      })

      if (alive) animFrame = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    draw()
    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  )
}
