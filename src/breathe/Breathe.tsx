import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../store/useLanguage'

type Phase = 'inhale' | 'hold' | 'exhale'

const PHASES: { phase: Phase; duration: number }[] = [
  { phase: 'inhale', duration: 4 },
  { phase: 'hold', duration: 4 },
  { phase: 'exhale', duration: 4 },
]

const phaseColors: Record<Phase, string> = {
  inhale: '#3e644a',
  hold: '#825500',
  exhale: '#8d6e59',
}

function Breathe() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [countdown, setCountdown] = useState(PHASES[0].duration)
  const [rounds, setRounds] = useState(0)
  const [scale, setScale] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countRef = useRef(PHASES[0].duration)
  const phaseRef = useRef(0)

  const currentPhase = PHASES[phaseIndex]

  const phaseLabel: Record<Phase, string> = {
    inhale: t.inhale,
    hold: t.hold,
    exhale: t.exhale,
  }

  useEffect(() => {
    if (!running) return

    intervalRef.current = setInterval(() => {
      countRef.current -= 1

      if (countRef.current <= 0) {
        const nextPhase = (phaseRef.current + 1) % PHASES.length
        phaseRef.current = nextPhase

        if (nextPhase === 0) {
          setRounds((r) => r + 1)
        }

        countRef.current = PHASES[nextPhase].duration
        setPhaseIndex(nextPhase)
        setCountdown(PHASES[nextPhase].duration)

        // Animate circle
        if (PHASES[nextPhase].phase === 'inhale') setScale(1.4)
        else if (PHASES[nextPhase].phase === 'exhale') setScale(1)
        else setScale(1.4)
      } else {
        setCountdown(countRef.current)
      }
    }, 1000)

    // Set initial scale
    if (currentPhase.phase === 'inhale') setScale(1.4)
    else if (currentPhase.phase === 'exhale') setScale(1)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const handleToggle = () => {
    if (running) {
      setRunning(false)
      setPhaseIndex(0)
      setCountdown(PHASES[0].duration)
      setScale(1)
      countRef.current = PHASES[0].duration
      phaseRef.current = 0
    } else {
      setRunning(true)
    }
  }

  const circleColor = phaseColors[currentPhase.phase]

  return (
    <div className="min-h-screen bg-[#fef9ea] w-full flex justify-center">
      <div className="px-5 py-6 flex flex-col items-center gap-8 max-w-md w-full">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            aria-label="Go back to Home"
            className="flex items-center gap-2 px-4 py-2 bg-[#f3eedf] rounded-full text-[#3e644a] font-semibold shadow-sm"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">arrow_back</span>
            {t.home}
          </button>
          <h1 className="text-xl font-bold text-[#3e644a]" style={{ fontFamily: 'Quicksand' }}>
            {t.breatheTitle}
          </h1>
          <div className="w-20" />
        </div>

        <p className="text-[#424942] text-center">{t.breatheSubtitle}</p>

        {/* Breathing circle */}
        <div className="relative flex items-center justify-center mt-8" style={{ width: 260, height: 260 }}>
          {/* Outer ring */}
          <div
            className="absolute rounded-full opacity-20 transition-all"
            style={{
              width: 260,
              height: 260,
              backgroundColor: circleColor,
              transform: `scale(${running ? scale * 0.95 : 1})`,
              transition: `transform ${currentPhase.duration}s ease-in-out, background-color 1s`,
            }}
          />
          {/* Middle ring */}
          <div
            className="absolute rounded-full opacity-30 transition-all"
            style={{
              width: 220,
              height: 220,
              backgroundColor: circleColor,
              transform: `scale(${running ? scale * 0.9 : 1})`,
              transition: `transform ${currentPhase.duration}s ease-in-out, background-color 1s`,
            }}
          />
          {/* Inner circle */}
          <div
            className="absolute rounded-full flex flex-col items-center justify-center shadow-lg"
            style={{
              width: 180,
              height: 180,
              backgroundColor: circleColor,
              transform: `scale(${running ? scale * 0.85 : 1})`,
              transition: `transform ${currentPhase.duration}s ease-in-out, background-color 1s`,
            }}
          >
            <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Quicksand' }}>
              {running ? phaseLabel[currentPhase.phase] : '🌿'}
            </div>
            {running && (
              <div className="text-white text-4xl font-bold mt-1">{countdown}</div>
            )}
          </div>
        </div>

        {/* Rounds counter */}
        {rounds > 0 && (
          <div className="text-[#3e644a] font-semibold text-lg">
            {rounds} {t.breatheRounds}
          </div>
        )}

        {/* Start/stop button */}
        <button
          onClick={handleToggle}
          aria-label={running ? t.breatheStop : t.breatheStart}
          className={`w-full max-w-xs py-5 rounded-full font-bold text-xl shadow-md transition-all ${
            running ? 'bg-[#8d6e59] text-white' : 'bg-[#3e644a] text-white'
          }`}
        >
          {running ? t.breatheStop : t.breatheStart}
        </button>

        {/* Reassurance */}
        <div className="w-full bg-[#f3eedf] rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#c2edcb] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#294e36]" aria-hidden="true">favorite</span>
          </div>
          <p className="text-sm text-[#424942]">{t.noRush}</p>
        </div>
      </div>
    </div>
  )
}

export default Breathe