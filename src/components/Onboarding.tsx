import { useState } from 'react';
import { useLanguage } from '../store/useLanguage';

interface Props {
  onComplete: (name: string) => void;
}

const slides = [
  {
    emoji: '🧠',
    titleKey: 'appName' as const,
    descKey: 'onboardDesc1' as const,
  },
  {
    emoji: '🎮',
    titleKey: 'playGame' as const,
    descKey: 'onboardDesc2' as const,
  },
  {
    emoji: '⏰',
    titleKey: 'myReminders' as const,
    descKey: 'onboardDesc3' as const,
  },
];

function Onboarding({ onComplete }: Props) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const isNameStep = step === slides.length;

  const handleNext = () => {
    if (step < slides.length) {
      setStep((s) => s + 1);
    }
  };

  const handleFinish = () => {
    onComplete(name.trim() || 'Friend');
  };

  if (isNameStep) {
    return (
      <div className="min-h-screen bg-[#fef9ea] flex flex-col items-center justify-center px-6 gap-8">
        <div className="text-8xl">👋</div>
        <div className="text-center">
          <h1
            className="text-3xl font-bold text-[#3e644a] mb-2"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t.whatsYourName}
          </h1>
          <p className="text-[#424942]">{t.nameHint}</p>
        </div>
        <div className="w-full max-w-md flex flex-col gap-1">
          <label
            htmlFor="user-name"
            className="text-sm font-semibold text-[#1d1c13]"
          >
            {t.yourName}
          </label>
          <input
            id="user-name"
            type="text"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl p-4 border-2 border-[#e7e2d4] rounded-2xl w-full"
            autoFocus
          />
        </div>
        <button
          onClick={handleFinish}
          className="w-full max-w-md py-4 bg-[#3e644a] text-white rounded-full font-bold text-xl shadow-md"
        >
          {t.letsBegin} →
        </button>
        <button
          onClick={() => handleFinish()}
          className="text-[#727972] text-sm underline"
        >
          {t.skipName}
        </button>
      </div>
    );
  }

  const slide = slides[step];

  return (
    <div className="min-h-screen bg-[#fef9ea] flex flex-col items-center justify-between px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
        <div className="w-32 h-32 rounded-full bg-[#f3eedf] flex items-center justify-center text-7xl shadow-md">
          {slide.emoji}
        </div>
        <div>
          <h1
            className="text-3xl font-bold text-[#3e644a] mb-3"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t[slide.titleKey]}
          </h1>
          <p className="text-lg text-[#424942] max-w-xs mx-auto">
            {t[slide.descKey]}
          </p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mb-8" aria-label="Onboarding progress">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === step ? 'w-8 bg-[#3e644a]' : 'w-2 bg-[#e7e2d4]'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        className="w-full max-w-md py-4 bg-[#3e644a] text-white rounded-full font-bold text-xl shadow-md"
        aria-label={`Continue to next slide, ${step + 1} of ${slides.length}`}
      >
        {t.next} →
      </button>
    </div>
  );
}

export default Onboarding;
