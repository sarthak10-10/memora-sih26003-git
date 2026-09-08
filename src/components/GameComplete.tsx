import { useNavigate } from 'react-router-dom'
import { ConfettiEffect } from './ConfettiEffect'
import { GameCelebration } from './GameCelebration'
import { PageWrapper } from './PageWrapper'

interface Props {
  score: number
  total: number
  difficulty: string
  onPlayAgain: () => void
}

export function GameComplete({ score, total, difficulty, onPlayAgain }: Props) {
  const navigate = useNavigate()

  const ratio = score / total
  const emoji = ratio >= 1 ? '🏆' : ratio >= 0.8 ? '⭐' : ratio >= 0.6 ? '👏' : '💪'
  const message =
    ratio >= 1 ? 'Perfect score! Absolutely brilliant!'
    : ratio >= 0.8 ? 'Wonderful job! You did great!'
    : ratio >= 0.6 ? 'Well done! Keep it up!'
    : 'Good effort! Practice makes perfect!'

  return (
    <PageWrapper>
      <ConfettiEffect score={score} total={total} />
      <GameCelebration score={score} total={total} />
      <div className="min-h-screen flex justify-center items-center px-5">
        <div className="glass-card rounded-3xl p-8 max-w-md w-full flex flex-col items-center gap-6 text-center">
          <div
            className="text-8xl"
            style={{ animation: 'bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            {emoji}
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'Quicksand' }}>
              {message}
            </h1>
            <p className="text-[#424942] text-lg">
              You scored <span className="font-bold text-[#3e644a]">{score}</span> out of{' '}
              <span className="font-bold">{total}</span>
            </p>
            <p className="text-sm text-[#424942] mt-1">Difficulty: {difficulty}</p>
          </div>

          {/* Score dots */}
          <div className="flex gap-3">
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all"
                style={{
                  backgroundColor: i < score ? '#3e644a' : '#e7e2d4',
                  color: i < score ? 'white' : '#424942',
                  animation: `fadeInUp 0.4s ease forwards ${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                {i < score ? '✓' : '○'}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={onPlayAgain}
              className="spring-btn w-full py-4 bg-[#3e644a] text-white rounded-full font-bold text-lg shadow-lg"
            >
              🎮 Play Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="spring-btn w-full py-4 glass rounded-full font-bold text-lg text-[#3e644a]"
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </PageWrapper>
  )
}