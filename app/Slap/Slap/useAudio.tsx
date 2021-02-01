import { useEffect, useState } from 'react'

export function useAudio(path: string): [boolean, HTMLAudioElement] {
  const [isLoading, setIsLoading] = useState(true)
  const [audio, setAudio] = useState(null)

  useEffect(() => {
    const audio = new Audio(path)
    setAudio(audio)
    audio.addEventListener('canplaythrough', () => {
      setIsLoading(false)
    })
  }, [])

  return [isLoading, audio!]
}
