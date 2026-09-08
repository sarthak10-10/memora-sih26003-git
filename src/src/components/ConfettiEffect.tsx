import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface Props {
  score: number
  total: number
}

export function ConfettiEffect({ score, total }: Props) {
  useEffect(() => {
    const ratio = score / total

    if (ratio >= 0.6) {
      const count = ratio >= 1 ? 300 : ratio >= 0.8 ? 200 : 100
      const spread = ratio >= 1 ? 100 : 70

      confetti({
        particleCount: count,
        spread,
        origin: { y: 0.6 },
        colors: ['#3e644a', '#825500', '#c2edcb', '#ffc166', '#8d6e59'],
        ticks: 200,
      })

      if (ratio >= 1) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#3e644a', '#c2edcb'],
          })
          confetti({
            particleCount: 100,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#825500', '#ffc166'],
          })
        }, 300)
      }
    }
  }, [])

  return null
}