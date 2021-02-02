import { FC, useEffect, useState } from 'react'

export interface SlapAreaPropTypes {
  left: string
  right: string
  center: string
  side: 'left' | 'right' | 'center'
  slapped: () => void
}

export const SlapArea: FC<SlapAreaPropTypes> = ({
  side,
  slapped,
  ...props
}) => {
  const [currentImage, setCurrentImage] = useState(props.center)
  // const [mouseEnterPos, setMouseEnterPos] = useState(0)
  // const [slapCount, setSlapCount] = useState(0)

  // const [audioIndex, setAudioIndex] = useState(0)

  // const [audioSources, setAudioSources] = useState<HTMLAudioElement[]>([])

  // useEffect(() => {
  //   setAudioSources(
  //     Array(100)
  //       .fill(undefined)
  //       .map(() => new Audio(audio.src))
  //   )
  // }, [])

  // const onMouseEnter = useCallback(
  //   (e) => {
  //     setMouseEnterPos(e.pageX)
  //   },
  //   [setMouseEnterPos]
  // )

  // const slap = useCallback(
  //   (e) => {
  //     e.pageX < mouseEnterPos ? setCurrentImage(left) : setCurrentImage(right)
  //     audioSources[audioIndex].play()
  //     setAudioIndex((n) => (n + 1) % audioSources.length)
  //     setSlapCount((s) => s + 1)
  //   },
  //   [mouseEnterPos, setCurrentImage]
  // )

  useEffect(() => {
    setCurrentImage(props[side])
    side !== 'center' && slapped()
  }, [side])

  return (
    <div>
      <img src={currentImage} className='mx-auto' />
    </div>
  )
}
