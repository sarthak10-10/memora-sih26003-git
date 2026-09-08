import { useNavigate } from 'react-router-dom';
import { useGameStats } from '../store/useGameStats';
import { useReminders, reminderIcons } from '../reminders/useReminders';
import { useLanguage } from '../store/useLanguage';

function Caregiver() {
  const navigate = useNavigate();
  const { sessions } = useGameStats();
  const { reminders } = useReminders();
  const { t } = useLanguage();

  const totalSessions = sessions.length;
  const avgScore =
    totalSessions > 0
      ? Math.round(
          (sessions.reduce((sum, s) => sum + s.score, 0) / totalSessions) * 20
        )
      : 0;
  const bestDifficulty =
    totalSessions > 0
      ? Math.max(...sessions.map((s) => s.difficultyReached))
      : 0;
  const recentSessions = [...sessions].reverse().slice(0, 5);

  const doneCount = reminders.filter((r) => r.done).length;
  const totalReminders = reminders.length;

  return (
    <div className="min-h-screen bg-[#fef9ea] w-full flex justify-center">
      <div className="px-5 py-6 flex flex-col gap-5 max-w-md w-full pb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
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
          <div
            className="flex items-center gap-2 px-3 py-1.5 bg-[#c2edcb] rounded-full"
            aria-label="Status: All clear"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3e644a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3e644a]"></span>
            </span>
            <span className="text-xs font-semibold text-[#1a4a2a]">
              {t.allClear}
            </span>
          </div>
        </div>

        <div>
          <h1
            className="text-3xl font-bold text-[#1d1c13]"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t.caregiverDashboard2}
          </h1>
          <p className="text-[#424942] mt-1">{t.overviewText}</p>
        </div>

        {/* Game stats */}
        <section
          aria-label="Brain game activity summary"
          className="bg-[#f3eedf] rounded-2xl p-5 shadow-sm flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#3e644a] text-2xl"
              aria-hidden="true"
            >
              psychology
            </span>
            <h2
              className="text-lg font-bold text-[#1d1c13]"
              style={{ fontFamily: 'Quicksand' }}
            >
              {t.brainGameActivity}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div
                className="text-2xl font-bold text-[#3e644a]"
                aria-label={`${totalSessions} sessions`}
              >
                {totalSessions}
              </div>
              <div className="text-xs text-[#424942] mt-1">{t.sessions}</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div
                className="text-2xl font-bold text-[#6b4400]"
                aria-label={`Average recall: ${avgScore} percent`}
              >
                {avgScore}%
              </div>
              <div className="text-xs text-[#424942] mt-1">{t.avgRecall}</div>
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm">
              <span
                className="material-symbols-outlined text-[#3e644a] text-2xl"
                aria-hidden="true"
              >
                emoji_events
              </span>
              <div
                className="text-xs text-[#424942] mt-1"
                aria-label={`Current level: ${bestDifficulty}`}
              >
                {t.level} {bestDifficulty}
              </div>
            </div>
          </div>

          {totalSessions === 0 && (
            <p className="text-center text-[#424942] text-sm">
              {t.noSessionsYet}
            </p>
          )}
        </section>

        {/* Recent sessions */}
        <section
          aria-label="Recent game results"
          className="flex flex-col gap-3"
        >
          <h2
            className="text-lg font-bold text-[#1d1c13]"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t.recentGameResults}
          </h2>
          {recentSessions.length === 0 && (
            <p className="text-[#424942] text-sm">{t.nothingRecorded}</p>
          )}
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {recentSessions.map((s, i) => (
              <li
                key={i}
                className="bg-[#f8f3e4] rounded-2xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#c2edcb] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#294e36] text-xl"
                      aria-hidden="true"
                    >
                      grid_view
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1d1c13]">
                      {t.whereDoesItBelong}
                    </div>
                    <div className="text-xs text-[#424942]">
                      {new Date(s.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#3e644a]">
                    {t.score}: {s.score}
                  </div>
                  <div className="text-xs text-[#424942]">
                    {t.level} {s.difficultyReached}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Reminders status */}
        <section
          aria-label="Today's reminders overview"
          className="bg-[#f3eedf] rounded-2xl p-5 shadow-sm flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold text-[#1d1c13]"
              style={{ fontFamily: 'Quicksand' }}
            >
              {t.todaysReminders}
            </h2>
            <span className="px-3 py-1 bg-[#c2edcb] text-[#1a4a2a] rounded-full text-xs font-semibold">
              {doneCount} {t.of} {totalReminders} {t.complete}
            </span>
          </div>

          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {reminders.map((r) => (
              <li
                key={r.id}
                className="bg-white rounded-xl p-3 flex items-center justify-between shadow-sm"
                aria-label={`${r.title} at ${r.time}, ${
                  r.done ? t.done : t.pending
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f3eedf] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#3e644a] text-lg"
                      aria-hidden="true"
                    >
                      {reminderIcons[r.type]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1d1c13]">
                      {r.title}
                    </div>
                    <div className="text-xs text-[#424942]">{r.time}</div>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    r.done
                      ? 'bg-[#c2edcb] text-[#1a4a2a]'
                      : 'bg-[#e7e2d4] text-[#2a2a2a]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-sm"
                    aria-hidden="true"
                  >
                    {r.done ? 'check_circle' : 'schedule'}
                  </span>
                  {r.done ? t.done : t.pending}
                </span>
              </li>
            ))}
            {reminders.length === 0 && (
              <li className="text-center text-[#424942] text-sm">
                {t.noRemindersSet}
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Caregiver;
