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
  const [audioLoading, audio] = useAudio('slap')
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
    slapped()
    audioSources[audioIndex].play()
    setAudioIndex((n) => (n + 1) % audioSources.length)
  }, [audioSources, audioIndex])

  return (
    <Fc slapped={newSlapped} loading={loading || audioLoading} {...props} />
  )
}
