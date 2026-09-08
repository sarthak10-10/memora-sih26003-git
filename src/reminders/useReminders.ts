import { useState, useEffect } from 'react';

export interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medicine' | 'water' | 'appointment' | 'other';
  done: boolean;
}
export const reminderIcons: Record<Reminder['type'], string> = {
  medicine: 'medication',
  water: 'water_drop',
  appointment: 'event',
  other: 'notifications',
};

const STORAGE_KEY = 'memory-companion-reminders';

function loadReminders(): Reminder[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => loadReminders());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (title: string, time: string, type: Reminder['type']) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      time,
      type,
      done: false,
    };
    setReminders((r) => [...r, newReminder]);
  };

  const toggleDone = (id: string) => {
    setReminders((r) =>
      r.map((rem) => (rem.id === id ? { ...rem, done: !rem.done } : rem))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((r) => r.filter((rem) => rem.id !== id));
  };

  return { reminders, addReminder, toggleDone, deleteReminder };
}
