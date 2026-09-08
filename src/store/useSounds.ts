function createTone(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume = 0.3
  ) {
    try {
      const ctx = new AudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
  
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator.type = type
      oscillator.frequency.value = frequency
  
      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration)
  
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (e) {
      console.warn('Audio not supported')
    }
  }
  
  export function useSounds() {
    return {
      correct: () => {
        createTone(523, 0.1)
        setTimeout(() => createTone(659, 0.1), 100)
        setTimeout(() => createTone(784, 0.2), 200)
      },
      wrong: () => {
        createTone(300, 0.3, 'sawtooth', 0.15)
      },
      navigate: () => {
        createTone(440, 0.08, 'sine', 0.15)
      },
      complete: () => {
        [523, 659, 784, 1047].forEach((freq, i) => {
          setTimeout(() => createTone(freq, 0.15), i * 100)
        })
      },
    }
  }
  