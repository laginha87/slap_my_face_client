import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { useAudio } from 'app/Slap/useAudio'
import { FC, useCallback, useEffect, useState } from 'react'

export const WithAudio = (
  Fc: FC<SlapAreaPropTypes & { loading: boolean }>
) => ({
  slapped,
  loading,
  ...props
}: SlapAreaPropTypes & { loading: boolean }) => {
  const [, audio] = useAudio('slap')
  const [audioIndex, setAudioIndex] = useState(0)
  const [audioSources, setAudioSources] = useState<HTMLAudioElement[]>([])

  useEffect(() => {
    setAudioSources(
      Array(100)
        .fill(undefined)
        .map(() => new Audio(audio.src))
    )
  }, [])
  const newSlapped = useCallback(() => {
    slapped && slapped()
    audioSources[audioIndex].play()
    setAudioIndex((n) => (n + 1) % audioSources.length)
  }, [audioSources, audioIndex])

  // Audio on ios just sucks
  useEffect(() => {
    const a = (): void => {
      audio.play()
      document.body.removeEventListener('click', a)
      document.body.removeEventListener('touchstart', a)
    }
    document.body.addEventListener('click', a)
    document.body.addEventListener('touchstart', a)
  }, [audio])

  return <Fc slapped={newSlapped} loading={loading} {...props} />
}
