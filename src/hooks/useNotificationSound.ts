'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hook para reproducir tonos de alerta médicos de alta fidelidad sin requerir archivos mp3 externos,
 * utilizando la Web Audio API estándar de todos los navegadores modernos.
 */
export function useNotificationSound() {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(0.8) // 0.0 a 1.0
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Inicializar AudioContext en interacción del usuario
    const initAudio = () => {
      if (!audioCtxRef.current && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx()
        }
      }
    }

    window.addEventListener('click', initAudio, { once: true })
    window.addEventListener('keydown', initAudio, { once: true })

    return () => {
      window.removeEventListener('click', initAudio)
      window.removeEventListener('keydown', initAudio)
    }
  }, [])

  const playTone = useCallback((type: 'message' | 'arrival' | 'urgent' = 'message') => {
    if (!soundEnabled) return

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }

      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const now = ctx.currentTime
      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(volume * 0.25, now)
      gainNode.connect(ctx.destination)

      if (type === 'message') {
        // Tono doble clínico elegante (acorde suave ascendente: 523Hz -> 659Hz)
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        osc1.type = 'sine'
        osc2.type = 'sine'
        osc1.frequency.setValueAtTime(523.25, now) // C5
        osc2.frequency.setValueAtTime(659.25, now + 0.08) // E5

        osc1.connect(gainNode)
        osc2.connect(gainNode)

        osc1.start(now)
        osc1.stop(now + 0.12)
        osc2.start(now + 0.08)
        osc2.stop(now + 0.24)

        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
      } else if (type === 'arrival') {
        // Campanada de recepción suave (Doble chime de atención)
        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(880, now) // A5
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3)

        osc.connect(gainNode)
        osc.start(now)
        osc.stop(now + 0.35)
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      } else if (type === 'urgent') {
        // Alerta de urgencia médica (tres pulsos cortos)
        [0, 0.1, 0.2].forEach((offset, idx) => {
          const osc = ctx.createOscillator()
          osc.type = 'square'
          osc.frequency.setValueAtTime(784, now + offset) // G5
          osc.connect(gainNode)
          osc.start(now + offset)
          osc.stop(now + offset + 0.06)
        })
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
      }
    } catch {
      // Ignorar restricciones de autoplay si aún no ha habido interacción
    }
  }, [soundEnabled, volume])

  return {
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume,
    playTone,
  }
}
