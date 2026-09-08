import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { items, rooms, roomIcons } from './gameData';
import type { GameItem } from './gameData';
import { useGameStats } from '../../store/useGameStats';
import { useVoiceCommand } from '../../store/useVoiceCommand';
import { useLanguage } from '../../store/useLanguage';
import {
  itemNames,
  roomNames,
  speechLangCodes,
} from '../../store/translations';

function getRandomItem(exclude?: string): GameItem {
  const pool = items.filter((i) => i.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

const QUESTIONS_PER_ROUND = 5;

function Game() {
  const navigate = useNavigate();
  const { recordSession } = useGameStats();
  const { language, t } = useLanguage();

  const [gameStarted, setGameStarted] = useState(false);
  const [current, setCurrent] = useState<GameItem>(() => getRandomItem());
  const [score, setScore] = useState(0);
  const [, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [questionNum, setQuestionNum] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const handleGoHome = () => {
    recordSession(score, difficulty);
    navigate('/');
  };

  const getOptions = () => {
    const distractors = rooms.filter((r) => r !== current.correctRoom);
    const shuffled = distractors
      .sort(() => Math.random() - 0.5)
      .slice(0, difficulty - 1);
    return [...shuffled, current.correctRoom].sort(() => Math.random() - 0.5);
  };

  const options = useMemo(() => getOptions(), [current, difficulty]);

  const handleSelect = (room: string) => {
    setSelected(room);
    setWasCorrect(room === current.correctRoom);
  };

  const { listening, startListening } = useVoiceCommand((transcript) => {
    const matchedRoom = options.find((room) => {
      const translatedName =
        roomNames[room]?.[language]?.toLowerCase() || room.toLowerCase();
      return (
        transcript.includes(translatedName) ||
        transcript.includes(room.toLowerCase())
      );
    });
    if (matchedRoom && !selected) {
      handleSelect(matchedRoom);
    } else {
      speechSynthesis.speak(
        new SpeechSynthesisUtterance("I didn't catch that. Please try again.")
      );
    }
  });

  const handleContinue = () => {
    const isCorrect = selected === current.correctRoom;

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        if (newStreak % 3 === 0 && difficulty < rooms.length) {
          setDifficulty((d) => d + 1);
        }
        return newStreak;
      });
    } else {
      setStreak(0);
      if (difficulty > 2) setDifficulty((d) => d - 1);
    }

    if (questionNum >= QUESTIONS_PER_ROUND) {
      recordSession(score + (isCorrect ? 1 : 0), difficulty);
      navigate('/');
      return;
    }

    setQuestionNum((q) => q + 1);
    setCurrent(getRandomItem(current.id));
    setSelected(null);
    setWasCorrect(null);
  };

  const itemDisplayName = itemNames[current.id]?.[language] || current.name;

  const handleReadAloud = () => {
    speechSynthesis.cancel();
    const optionNames = options.map((r) => roomNames[r]?.[language] || r);
    const msg = new SpeechSynthesisUtterance(
      `${t.whereDoesThisBelong} ${itemDisplayName}. ${optionNames.join(', ')}?`
    );
    msg.lang = speechLangCodes[language];
    msg.rate = 0.85;
    speechSynthesis.speak(msg);
  };

  const progressPct = (questionNum / QUESTIONS_PER_ROUND) * 100;

  // Difficulty selection screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-[#fef9ea] w-full flex justify-center">
        <div className="px-5 py-6 flex flex-col gap-6 max-w-md w-full">
          <button
            onClick={() => navigate('/')}
            aria-label="Go back to Home"
            className="flex items-center gap-2 px-4 py-2 bg-[#f3eedf] rounded-full text-[#3e644a] font-semibold shadow-sm w-fit"
          >
            <span
              className="material-symbols-outlined text-2xl"
              aria-hidden="true"
            >
              arrow_back
            </span>
            {t.home}
          </button>

          <div className="text-center mt-4">
            <div className="text-6xl mb-4">🧠</div>
            <h1
              className="text-3xl font-bold text-[#3e644a]"
              style={{ fontFamily: 'Quicksand' }}
            >
              {t.whereDoesItBelong}
            </h1>
            <p className="text-[#424942] mt-2">{t.chooseDifficulty}</p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {[
              {
                label: t.easy,
                desc: t.easyDesc,
                value: 2,
                bg: '#c2edcb',
                text: '#1a4a2a',
                icon: '🌱',
              },
              {
                label: t.medium,
                desc: t.mediumDesc,
                value: 3,
                bg: '#ffc166',
                text: '#5a3800',
                icon: '⭐',
              },
              {
                label: t.hard,
                desc: t.hardDesc,
                value: 5,
                bg: '#ffdad6',
                text: '#7a0000',
                icon: '🔥',
              },
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => {
                  setDifficulty(level.value);
                  setGameStarted(true);
                }}
                aria-label={`${level.label}: ${level.desc}`}
                className="w-full p-5 rounded-2xl shadow-md text-left flex items-center gap-4 transition-all active:scale-[0.98]"
                style={{ backgroundColor: level.bg }}
              >
                <div className="text-4xl">{level.icon}</div>
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: level.text, fontFamily: 'Quicksand' }}
                  >
                    {level.label}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: level.text }}>
                    {level.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="min-h-screen bg-[#fef9ea] w-full flex justify-center">
      <div className="px-5 py-6 flex flex-col gap-4 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleGoHome}
            aria-label="Go back to Home"
            className="flex items-center gap-2 px-4 py-2 bg-[#f3eedf] rounded-full text-[#3e644a] font-semibold shadow-sm"
          >
            <span
              className="material-symbols-outlined text-2xl"
              aria-hidden="true"
            >
              arrow_back
            </span>
            {t.home}
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ede8d9] rounded-full text-sm font-semibold text-[#1d1c13]">
            <span
              className="material-symbols-outlined text-xl"
              aria-hidden="true"
            >
              psychology
            </span>
            {t.whereDoesItBelong}
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 bg-[#ffc166] rounded-full text-[#5a3800] font-bold shadow-sm"
            aria-label={`Score: ${score} points`}
          >
            <span
              className="material-symbols-outlined text-xl"
              aria-hidden="true"
            >
              stars
            </span>
            {score} pts
          </div>
        </div>

        {/* Progress */}
        <div className="bg-[#f8f3e4] rounded-2xl p-3 shadow-sm flex flex-col gap-1.5">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-[#3e644a]">
              {t.question} {questionNum} {t.of} {QUESTIONS_PER_ROUND}
            </span>
            <span className="text-[#5c4a3a]">{t.stepByStep}</span>
          </div>
          <div
            className="w-full h-3.5 bg-[#e7e2d4] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={questionNum}
            aria-valuemin={1}
            aria-valuemax={QUESTIONS_PER_ROUND}
            aria-label={`Question ${questionNum} of ${QUESTIONS_PER_ROUND}`}
          >
            <div
              className="h-full bg-[#3e644a] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Prompt */}
        <div className="text-center pt-1">
          <h1
            className="text-2xl font-bold text-[#3e644a]"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t.whereDoesThisBelong}
          </h1>
          <p className="text-[#424942] mt-1">{t.tapRoomHint}</p>
        </div>

        {/* Object card */}
        <section
          aria-label={`Current object: ${itemDisplayName}`}
          className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center"
        >
          <div
            className="w-24 h-24 rounded-full bg-[#f3eedf] flex items-center justify-center mb-3 text-8xl"
            aria-hidden="true"
          >
            {current.emoji}
          </div>
          <h2
            className="text-2xl font-bold text-[#1d1c13] mb-3"
            style={{ fontFamily: 'Quicksand' }}
          >
            {itemDisplayName}
          </h2>
          <button
            onClick={handleReadAloud}
            aria-label={`Read the question aloud: Where does ${itemDisplayName} belong?`}
            className="flex items-center gap-2 px-5 py-2 bg-[#ede8d9] rounded-full text-[#1d1c13] font-semibold shadow-sm"
          >
            <span
              className="material-symbols-outlined text-[#3e644a]"
              aria-hidden="true"
            >
              volume_up
            </span>
            {t.tapToListen}
          </button>
          <button
            onClick={startListening}
            disabled={!!selected}
            aria-pressed={listening}
            aria-label={
              listening
                ? 'Listening for room name'
                : 'Tap to speak the room name'
            }
            className={`mt-3 flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-sm transition-all ${
              listening
                ? 'bg-[#3e644a] text-white animate-pulse'
                : 'bg-[#ede8d9] text-[#1d1c13]'
            }`}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {listening ? 'mic' : 'mic_none'}
            </span>
            {listening ? t.listening : t.speakRoomName}
          </button>
        </section>

        {/* Options */}
        <section aria-label="Room options" className="flex flex-col gap-3">
          {options.map((room) => {
            const isSelected = selected === room;
            const showCorrectness = selected !== null && isSelected;
            const roomDisplayName = roomNames[room]?.[language] || room;

            return (
              <button
                key={room}
                onClick={() => !selected && handleSelect(room)}
                disabled={!!selected}
                aria-pressed={isSelected}
                aria-label={`${roomDisplayName}${
                  showCorrectness
                    ? wasCorrect
                      ? ', correct!'
                      : ', incorrect'
                    : ''
                }`}
                className={`w-full p-4 rounded-2xl shadow-sm text-left flex items-center justify-between transition-all min-h-[72px] ${
                  showCorrectness
                    ? wasCorrect
                      ? 'bg-[#c2edcb]'
                      : 'bg-[#ffdad6]'
                    : selected && room === current.correctRoom
                    ? 'bg-[#c2edcb]'
                    : 'bg-[#f8f3e4]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ede8d9] flex items-center justify-center text-[#3e644a]">
                    <span
                      className="material-symbols-outlined text-2xl"
                      aria-hidden="true"
                    >
                      {roomIcons[room] || 'home'}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-[#1d1c13]">
                    {roomDisplayName}
                  </span>
                </div>
                <span
                  className="material-symbols-outlined text-2xl text-[#727972]"
                  aria-hidden="true"
                >
                  {showCorrectness
                    ? wasCorrect
                      ? 'check_circle'
                      : 'cancel'
                    : 'radio_button_unchecked'}
                </span>
              </button>
            );
          })}
        </section>

        {selected && !wasCorrect && (
          <div
            className="bg-[#fff3cd] rounded-2xl p-4 text-center shadow-sm"
            role="alert"
          >
            <p className="font-semibold text-[#5c3d00]">
              {t.correctAnswerWas}:{' '}
              {roomNames[current.correctRoom]?.[language] ||
                current.correctRoom}
            </p>
          </div>
        )}

        {/* Reassurance */}
        <aside className="bg-[#f3eedf] rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#c2edcb] flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-[#294e36]"
              aria-hidden="true"
            >
              favorite
            </span>
          </div>
          <div>
            <p className="font-semibold text-[#1d1c13]">{t.takeYourTime}</p>
            <p className="text-sm text-[#424942]">{t.noRush}</p>
          </div>
        </aside>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          aria-label={
            questionNum >= QUESTIONS_PER_ROUND
              ? 'Finish the game'
              : 'Continue to next question'
          }
          style={{
            backgroundColor: selected ? '#3e644a' : '#a8bfae',
            color: '#ffffff',
          }}
          className="w-full py-4 rounded-full font-bold shadow-md flex items-center justify-center gap-2 transition-all"
        >
          {questionNum >= QUESTIONS_PER_ROUND ? t.finish : t.continueNext}
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}

export default Game;
