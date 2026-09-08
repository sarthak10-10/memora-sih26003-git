import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../store/useLanguage';

interface JournalEntry {
  id: string;
  text: string;
  date: string;
}

const STORAGE_KEY = 'memora-journal';

function loadEntries(): JournalEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function Journal() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntries());
  const [text, setText] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!text.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setEntries((e) => [newEntry, ...e]);
    setText('');
  };

  const handleDelete = (id: string) => {
    setEntries((e) => e.filter((entry) => entry.id !== id));
  };

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
          <h1
            className="text-2xl font-bold text-[#1d1c13]"
            style={{ fontFamily: 'Quicksand' }}
          >
            {t.journalTitle}
          </h1>
          <div className="w-20" />
        </div>

        {/* Add entry */}
        <div className="bg-white rounded-2xl p-5 shadow-md flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="journal-entry"
              className="text-sm font-semibold text-[#1d1c13]"
            >
              {t.journalToday}
            </label>
            <textarea
              id="journal-entry"
              placeholder={t.journalPlaceholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="text-lg p-3 border-2 border-[#e7e2d4] rounded-xl resize-none"
            />
          </div>
          <button
            onClick={handleSave}
            aria-label="Save this memory"
            className="w-full py-3 bg-[#3e644a] text-white rounded-full font-bold shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              bookmark
            </span>
            {t.journalSave}
          </button>
        </div>

        {/* Entries list */}
        <div className="flex flex-col gap-3">
          {entries.length === 0 && (
            <div className="text-center text-[#424942] py-4">
              {t.journalEmpty}
            </div>
          )}
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-2"
              aria-label={`Journal entry from ${entry.date}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3e644a]">
                  {entry.date}
                </span>
                <button
                  onClick={() => handleDelete(entry.id)}
                  aria-label="Delete this memory"
                  className="text-[#ba1a1a] w-8 h-8 flex items-center justify-center rounded-full"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    aria-hidden="true"
                  >
                    delete
                  </span>
                </button>
              </div>
              <p className="text-[#1d1c13] text-lg leading-relaxed">
                {entry.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Journal;
