import { Loadable, LoadableComponent } from 'app/Slap/Loading'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { useAudio } from 'app/Slap/useAudio'
import { FC, useCallback, useEffect, useState } from 'react'

type Hoc<T> = (Fc: FC<T>) => FC<T>

export const WithAudio: Hoc<Loadable<SlapAreaPropTypes>> = (
  Fc
) => {
  const ResComponent: LoadableComponent<SlapAreaPropTypes> = ({
    slapped,
    loading,
    ...props
  }) => {
    const [, audio] = useAudio('slap')
    const [audioIndex, setAudioIndex] = useState(0)
    const [audioSources, setAudioSources] = useState<HTMLAudioElement[]>([])

    useEffect(() => {
      setAudioSources(
        Array(100)
          .fill(undefined)
          .map(() => new Audio(audio.src))
      )
    }, [audio.src])
    const newSlapped = useCallback(() => {
      slapped?.()
      void audioSources[audioIndex].play()
      setAudioIndex((n) => (n + 1) % audioSources.length)
    }, [slapped, audioSources, audioIndex])

    // Audio on ios just sucks
    useEffect(() => {
      const a = (): void => {
        void audio.play()
        document.body.removeEventListener('click', a)
        document.body.removeEventListener('touchstart', a)
      }
      document.body.addEventListener('click', a)
      document.body.addEventListener('touchstart', a)
    }, [audio])

    return <Fc slapped={newSlapped} loading={loading} {...props} />
  }
  ResComponent.displayName = `WithAudio${Fc.displayName === undefined ? '' : Fc.displayName}`
  return ResComponent
}
