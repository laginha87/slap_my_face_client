import { Hoc } from 'app/Slap/Hoc'
import { Loadable, LoadableComponent } from 'app/Slap/Loading'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { useAudio } from 'app/Slap/useAudio'
import { Controlled } from 'app/Slap/WithControls'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from 'app/Common/Icon'

export const WithAudio: Hoc<Loadable<Controlled<SlapAreaPropTypes>>> = (
  Fc
) => {
  const ResComponent: LoadableComponent<Controlled<SlapAreaPropTypes>> = ({
    slapped,
    loading,
    controls = [],
    ...props
  }) => {
    const [audioEnabled, setAudioEnabled] = useState(true)
    const [, audio] = useAudio('slap')
    const [audioIndex, setAudioIndex] = useState(0)
    const [audioSources, setAudioSources] = useState<HTMLAudioElement[]>([])

    const toggleAudioCallback = useCallback(() => setAudioEnabled((a) => !a), [])

    const newControls = useMemo(() => [...controls, <Icon key="mute" size='3xl' onClick={toggleAudioCallback} type={audioEnabled ? 'volume-up' : 'volume-off'}/>], [audioEnabled, controls, toggleAudioCallback])
    useEffect(() => {
      setAudioSources(
        Array(100)
          .fill(undefined)
          .map(() => new Audio(audio.src))
      )
    }, [audio.src])
    const newSlapped = useCallback(() => {
      slapped?.()
      const nextAudio = audioSources[audioIndex]
      nextAudio.volume = 0.4
      audioEnabled && void audioSources[audioIndex].play()
      setAudioIndex((n) => (n + 1) % audioSources.length)
    }, [slapped, audioSources, audioIndex, audioEnabled])

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

    return <Fc slapped={newSlapped} loading={loading} controls={newControls} {...props} />
  }
  ResComponent.displayName = `WithAudio${Fc.displayName === undefined ? '' : Fc.displayName}`
  return ResComponent
}
