import { useEffect, useState } from 'react'

interface Props {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'drawing' | 'fading'>('drawing')

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('fading'), 2000)
    const timer2 = setTimeout(() => onComplete(), 2800)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #f0ede0 0%, #e8f5ec 50%, #f5f0e8 100%)',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ marginBottom: 24 }}
      >
        {/* Outer brain shape */}
        <circle
          cx="60"
          cy="55"
          r="40"
          fill="none"
          stroke="#3e644a"
          strokeWidth="3"
          strokeDasharray="251"
          strokeDashoffset="251"
          style={{
            animation: 'drawCircle 1s ease forwards 0.2s',
          }}
        />
        {/* Inner spiral */}
        <circle
          cx="60"
          cy="55"
          r="25"
          fill="none"
          stroke="#3e644a"
          strokeWidth="2.5"
          strokeDasharray="157"
          strokeDashoffset="157"
          style={{
            animation: 'drawCircle 0.8s ease forwards 0.6s',
          }}
        />
        <circle
          cx="60"
          cy="55"
          r="12"
          fill="none"
          stroke="#825500"
          strokeWidth="2"
          strokeDasharray="75"
          strokeDashoffset="75"
          style={{
            animation: 'drawCircle 0.6s ease forwards 1s',
          }}
        />
        {/* Center dot */}
        <circle
          cx="60"
          cy="55"
          r="4"
          fill="#3e644a"
          style={{
            opacity: 0,
            animation: 'fadeIn 0.4s ease forwards 1.4s',
          }}
        />
      </svg>

      <h1
        style={{
          fontFamily: 'Quicksand',
          fontSize: 38,
          fontWeight: 700,
          background: 'linear-gradient(135deg, #3e644a, #825500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0,
          animation: 'fadeIn 0.6s ease forwards 1.2s',
        }}
      >
        Memora
      </h1>

      <p
        style={{
          color: '#424942',
          fontSize: 16,
          marginTop: 8,
          opacity: 0,
          animation: 'fadeIn 0.6s ease forwards 1.5s',
        }}
      >
        A gentle companion for your day
      </p>

      <style>{`
        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
