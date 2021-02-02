import { useEffect, useState } from 'react'

type AudioType = 'slap' | 'shutter'

export function useAudio (path: AudioType): [boolean, HTMLAudioElement] {
  const [isLoading, setIsLoading] = useState(true)
  const [audio] = useState<HTMLAudioElement>(
    () => document.getElementById(`${path}Audio`) as HTMLAudioElement
  )

  useEffect(() => {
    audio.addEventListener('canplaythrough', () => {
      setIsLoading(false)
    })
  }, [])

  return [isLoading, audio]
}
