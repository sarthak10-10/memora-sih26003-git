import { useNavigate } from 'react-router-dom'
import { useVoiceCommand } from '../store/useVoiceCommand'
import { useLanguage } from '../store/useLanguage'
import { languageNames } from '../store/translations'
import type { Language } from '../store/translations'
import { useReminders } from '../reminders/useReminders'
import { PageWrapper } from './PageWrapper'
import { ParticleBackground } from './ParticleBackground'
import { useSounds } from '../store/useSounds'

function Home({ userName }: { userName: string }) {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const { reminders } = useReminders()
  const sounds = useSounds()

  const todayDone = reminders.filter((r) => r.done).length
  const todayTotal = reminders.length

  const cards = [
    {
      title: t.playGame,
      subtitle: t.playGameDesc,
      icon: 'extension',
      bg: '#3e644a',
      text: '#ffffff',
      path: '/game',
    },
    {
      title: t.myReminders,
      subtitle: todayTotal > 0 ? `${todayDone}/${todayTotal} ${t.done}` : t.myRemindersDesc,
      icon: 'alarm',
      bg: '#825500',
      text: '#ffffff',
      path: '/reminders',
    },
    {
      title: t.caregiverDashboard,
      subtitle: t.caregiverDashboardDesc,
      icon: 'supervisor_account',
      bg: '#8d6e59',
      text: '#fffbff',
      path: '/caregiver',
    },
    {
      title: t.breathe,
      subtitle: t.breatheDesc,
      icon: 'air',
      bg: '#567d62',
      text: '#ffffff',
      path: '/breathe',
    },
    {
      title: t.memoryJournal,
      subtitle: t.memoryJournalDesc,
      icon: 'menu_book',
      bg: '#6d5a4e',
      text: '#ffffff',
      path: '/journal',
    },
  ]

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const { listening, startListening } = useVoiceCommand((transcript) => {
    if (transcript.includes('game') || transcript.includes('खेल') || transcript.includes('গেম')) {
      sounds.navigate()
      navigate('/game')
    } else if (transcript.includes('reminder') || transcript.includes('अनुस्मारक') || transcript.includes('রিমাইন্ডার')) {
      sounds.navigate()
      navigate('/reminders')
    } else if (transcript.includes('caregiver') || transcript.includes('dashboard') || transcript.includes('देखभाल') || transcript.includes('কেয়ার')) {
      sounds.navigate()
      navigate('/caregiver')
    } else if (transcript.includes('breath') || transcript.includes('calm') || transcript.includes('सांस') || transcript.includes('শ্বাস')) {
      sounds.navigate()
      navigate('/breathe')
    } else if (transcript.includes('journal') || transcript.includes('diary') || transcript.includes('डायरी') || transcript.includes('ডায়েরি')) {
      sounds.navigate()
      navigate('/journal')
    } else {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance("Sorry, I didn't understand. Try saying play a game, reminders, or caregiver.")
      )
    }
  })

  const handleReadAloud = () => {
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(
      `${t.welcomeBack}, ${userName}. ${t.todayIs} ${today}. ${t.playGame}, ${t.myReminders}, ${t.caregiverDashboard}.`
    )
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <ParticleBackground />
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center px-5 py-8 gap-6">
          {/* Language selector */}
          <div className="flex gap-2 mb-2" role="group" aria-label="Choose language">
            {(['en', 'hi', 'bn'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`spring-btn px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  language === lang ? 'bg-[#3e644a] text-white shadow-lg' : 'glass text-[#1d1c13]'
                }`}
              >
                {languageNames[lang]}
              </button>
            ))}
          </div>

          {/* Logo + header */}
          <div className="w-24 h-24 rounded-full glass-card flex items-center justify-center shadow-lg p-3">
            <img src="/pwa-512x512.png" alt="Memora app logo, a green brain icon" className="w-full h-full object-contain rounded-full" />
          </div>

          <div className="flex flex-col items-center text-center gap-1">
            <h1
              className="text-[38px] leading-[48px] font-bold gradient-text"
              style={{ fontFamily: 'Quicksand' }}
            >
              {t.appName}
            </h1>
            <p className="text-[20px] text-[#424942] font-medium" style={{ fontFamily: 'Nunito Sans' }}>
              {t.welcomeBack}, {userName}
            </p>
            <div className="inline-flex items-center gap-2 mt-1 px-4 py-1 rounded-full glass text-[#5c4d33]">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">spa</span>
              <span className="text-sm font-semibold" style={{ fontFamily: 'Nunito Sans' }}>
                {t.tagline}
              </span>
            </div>
          </div>

          {/* Menu cards */}
          <nav className="flex flex-col w-full max-w-md gap-4" aria-label="Main navigation">
            {cards.map((card) => (
              <button
                key={card.path}
                onClick={() => {
                  sounds.navigate()
                  navigate(card.path)
                }}
                aria-label={`${card.title}. ${card.subtitle}`}
                className="spring-btn w-full text-left rounded-2xl p-5 shadow-lg active:scale-[0.98] transition-transform flex items-center gap-5 min-h-[88px]"
                style={{ backgroundColor: card.bg }}
              >
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl" aria-hidden="true" style={{ color: card.text }}>
                    {card.icon}
                  </span>
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="text-[22px] leading-[30px] font-bold" style={{ color: card.text, fontFamily: 'Quicksand' }}>
                    {card.title}
                  </span>
                  <span className="text-[14px] opacity-90" style={{ color: card.text, fontFamily: 'Nunito Sans' }}>
                    {card.subtitle}
                  </span>
                </div>
                <span className="material-symbols-outlined text-2xl opacity-70 shrink-0" aria-hidden="true" style={{ color: card.text }}>
                  chevron_right
                </span>
              </button>
            ))}
          </nav>

          {/* Date bar */}
          <div className="w-full max-w-md glass-card rounded-2xl py-3 px-4 flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[#6b4c00] text-xl" aria-hidden="true">wb_sunny</span>
            <span className="text-sm font-semibold text-[#1d1c13]" style={{ fontFamily: 'Nunito Sans' }}>
              {t.todayIs} {today}
            </span>
          </div>

          {/* Voice command */}
          <button
            onClick={startListening}
            aria-pressed={listening}
            aria-label={listening ? 'Listening for a voice command' : 'Tap to speak a command'}
            className={`spring-btn w-full max-w-md py-4 rounded-full flex items-center justify-center gap-2.5 shadow-sm font-bold transition-all ${
              listening ? 'bg-[#3e644a] text-white animate-pulse' : 'glass text-[#1d1c13]'
            }`}
            style={{ fontFamily: 'Nunito Sans' }}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {listening ? 'mic' : 'mic_none'}
            </span>
            {listening ? t.listening : t.tapToSpeak}
          </button>

          {/* Read aloud + help */}
          <div className="flex items-center gap-3 w-full max-w-md">
            <button
              onClick={handleReadAloud}
              aria-label="Read this page aloud"
              className="spring-btn flex-1 glass text-[#1d1c13] py-3.5 px-4 rounded-full flex items-center justify-center gap-2.5 shadow-sm min-h-[56px]"
            >
              <span className="material-symbols-outlined text-[#3e644a] text-2xl" aria-hidden="true">volume_up</span>
              <span className="font-bold" style={{ fontFamily: 'Nunito Sans' }}>{t.readPageAloud}</span>
            </button>
            <button
              aria-label="Help"
              className="spring-btn w-14 h-14 rounded-full glass flex items-center justify-center shrink-0 shadow-sm"
            >
              <span className="material-symbols-outlined text-[#5c4a3a] text-2xl" aria-hidden="true">help</span>
            </button>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}

export default Home