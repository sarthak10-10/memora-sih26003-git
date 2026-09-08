export function useHaptic() {
    const vibrate = (pattern: number | number[]) => {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern)
      }
    }
  
    return {
      correct: () => vibrate([50, 30, 50]),
      wrong: () => vibrate([200]),
      tap: () => vibrate(10),
      complete: () => vibrate([50, 30, 50, 30, 100]),
    }
  }