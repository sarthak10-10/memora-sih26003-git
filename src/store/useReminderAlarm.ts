import { useEffect, useRef } from 'react';
import type { Reminder } from '../reminders/useReminders';

function playChime() {
  try {
    const ctx = new AudioContext();

    const frequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.value = freq;

      const startTime = ctx.currentTime + i * 0.25;
      const endTime = startTime + 0.4;

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, endTime);

      oscillator.start(startTime);
      oscillator.stop(endTime);
    });
  } catch (e) {
    console.warn('Audio not supported:', e);
  }
}

export function useReminderAlarm(reminders: Reminder[]) {
  const lastFiredRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      reminders.forEach((reminder) => {
        if (
          reminder.time === currentTime &&
          !reminder.done &&
          !lastFiredRef.current.has(reminder.id)
        ) {
          playChime();
          lastFiredRef.current.add(reminder.id);

          if (
            'Notification' in window &&
            Notification.permission === 'granted'
          ) {
            new Notification(`⏰ Memora Reminder`, {
              body: reminder.title,
              icon: '/pwa-192x192.png',
            });
          }
        }
      });

      // Reset fired reminders at midnight
      if (currentTime === '00:00') {
        lastFiredRef.current.clear();
      }
    }, 30000); // check every 30 seconds

    return () => clearInterval(interval);
  }, [reminders]);
}
