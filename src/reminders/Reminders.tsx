import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReminders, reminderIcons } from './useReminders';
import type { Reminder } from './useReminders';
import { useLanguage } from '../store/useLanguage';
import { useReminderAlarm } from '../store/useReminderAlarm';

function Reminders() {
  const navigate = useNavigate();
  const { reminders, addReminder, toggleDone, deleteReminder } = useReminders();
  useReminderAlarm(reminders);
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
  const { t } = useLanguage();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState<Reminder['type']>('medicine');

  const handleAdd = () => {
    if (!title || !time) return;
    addReminder(title, time, type);
    setTitle('');
    setTime('');
    setShowForm(false);
  };

  const sorted = [...reminders].sort((a, b) => a.time.localeCompare(b.time));
  const doneCount = reminders.filter((r) => r.done).length;
  const upcomingCount = reminders.length - doneCount;

  const handleReadAloud = () => {
    speechSynthesis.cancel();
    if (sorted.length === 0) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(t.noRemindersYet));
      return;
    }
    const text = sorted
      .map((r) => `${r.title} at ${r.time}${r.done ? ', ' + t.done : ''}`)
      .join('. ');
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.9;
    speechSynthesis.speak(msg);
  };

  return (
    <div className="min-h-screen bg-[#fef9ea] w-full flex justify-center">
      <div className="px-5 py-6 flex flex-col gap-4 max-w-md w-full">
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
          <h1
            className="text-2xl font-bold text-[#1d1c13]"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t.myReminders2}
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#ffddb2] rounded-full text-[#5a3800] text-sm font-semibold">
            <span
              className="material-symbols-outlined text-lg"
              aria-hidden="true"
            >
              wb_sunny
            </span>
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Summary */}
        <section
          aria-label="Reminder summary"
          className="bg-[#f8f3e4] rounded-2xl p-5 shadow-sm flex flex-col gap-3"
        >
          <div>
            <h2
              className="text-xl font-bold text-[#1d1c13]"
              style={{ fontFamily: 'Quicksand' }}
            >
              {t.takeEachMoment}
            </h2>
            <p className="text-[#424942]">{t.doingWonderfully}</p>
          </div>
          <div className="flex gap-3">
            <div className="h-10 px-4 bg-[#c2edcb] rounded-full flex items-center gap-2 text-[#1a4a2a] font-semibold text-sm">
              <span
                className="material-symbols-outlined text-lg"
                aria-hidden="true"
              >
                check_circle
              </span>
              {doneCount} {t.done}
            </div>
            <div className="h-10 px-4 bg-[#e7e2d4] rounded-full flex items-center gap-2 text-[#2a2a2a] font-semibold text-sm">
              <span
                className="material-symbols-outlined text-lg"
                aria-hidden="true"
              >
                schedule
              </span>
              {upcomingCount} {t.upcoming}
            </div>
          </div>
        </section>

        {/* Read aloud */}
        <button
          onClick={handleReadAloud}
          aria-label="Read all reminders aloud"
          className="w-full py-4 bg-[#ede8d9] rounded-full shadow-sm flex items-center justify-center gap-2 text-[#3e644a] font-bold"
        >
          <span
            className="material-symbols-outlined text-2xl"
            aria-hidden="true"
          >
            volume_up
          </span>
          {t.readRemindersAloud}
        </button>

        {/* Reminder list */}
        <ul
          className="flex flex-col gap-3 list-none p-0 m-0"
          aria-label="Your reminders"
        >
          {sorted.length === 0 && (
            <li className="text-center text-[#424942] py-4">
              {t.noRemindersYet}
            </li>
          )}
          {sorted.map((rem) => (
            <li key={rem.id}>
              <article
                className={`bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 ${
                  rem.done ? 'opacity-80' : ''
                }`}
                aria-label={`${rem.title} at ${rem.time}, ${
                  rem.done ? t.done : t.upcoming
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#f3eedf] flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-2xl text-[#3e644a]"
                      aria-hidden="true"
                    >
                      {reminderIcons[rem.type]}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#3e644a]">
                      {rem.time} {rem.done ? `• ${t.done}` : ''}
                    </span>
                    <h3
                      className={`text-lg font-bold text-[#1d1c13] truncate ${
                        rem.done ? 'line-through decoration-2' : ''
                      }`}
                      style={{ fontFamily: 'Quicksand' }}
                    >
                      {rem.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleDone(rem.id)}
                    aria-label={
                      rem.done
                        ? `Mark ${rem.title} as not done`
                        : `Mark ${rem.title} as done`
                    }
                    aria-pressed={rem.done}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-sm ${
                      rem.done
                        ? 'bg-[#3e644a] text-white'
                        : 'bg-[#ede8d9] text-[#424942]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-2xl"
                      aria-hidden="true"
                    >
                      {rem.done ? 'check' : 'radio_button_unchecked'}
                    </span>
                  </button>
                  <button
                    onClick={() => deleteReminder(rem.id)}
                    aria-label={`Delete reminder: ${rem.title}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#ba1a1a]"
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      aria-hidden="true"
                    >
                      delete
                    </span>
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Add reminder */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            aria-label="Add a new reminder"
            className="w-full py-4 bg-[#3e644a] text-white rounded-full shadow-md flex items-center justify-center gap-2 font-bold"
          >
            <span
              className="material-symbols-outlined text-2xl"
              aria-hidden="true"
            >
              add_circle
            </span>
            {t.addReminder}
          </button>
        ) : (
          <div
            className="bg-white rounded-2xl p-5 shadow-md flex flex-col gap-3"
            role="form"
            aria-label="Add new reminder form"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="reminder-title"
                className="text-sm font-semibold text-[#1d1c13]"
              >
                {t.whatsReminder}
              </label>
              <input
                id="reminder-title"
                type="text"
                placeholder={t.whatsReminder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg p-3 border-2 border-[#e7e2d4] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="reminder-time"
                className="text-sm font-semibold text-[#1d1c13]"
              >
                Time
              </label>
              <input
                id="reminder-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-lg p-3 border-2 border-[#e7e2d4] rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="reminder-type"
                className="text-sm font-semibold text-[#1d1c13]"
              >
                Type
              </label>
              <select
                id="reminder-type"
                value={type}
                onChange={(e) => setType(e.target.value as Reminder['type'])}
                className="text-lg p-3 border-2 border-[#e7e2d4] rounded-xl"
              >
                <option value="medicine">💊 {t.medicine}</option>
                <option value="water">💧 {t.water}</option>
                <option value="appointment">📅 {t.appointment}</option>
                <option value="other">📝 {t.other}</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(false)}
                aria-label="Cancel adding reminder"
                className="flex-1 py-3 bg-[#e7e2d4] text-[#1d1c13] rounded-full font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleAdd}
                aria-label="Save new reminder"
                className="flex-1 py-3 bg-[#3e644a] text-white rounded-full font-semibold"
              >
                {t.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reminders;
