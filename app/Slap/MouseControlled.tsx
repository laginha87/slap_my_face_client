import { useCallback, useState, MouseEvent } from 'react'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { useSlap } from 'app/Slap/useSlap'
import { LoadableComponent } from 'app/Slap/Loading'

export function MouseControlled (
  Fc: LoadableComponent<SlapAreaPropTypes>
): LoadableComponent<SlapAreaPropTypes> {
  const NewComponent: LoadableComponent<SlapAreaPropTypes> = ({ side: _side, ...props }) => {
    const [mouseEnterPos, setMouseEnterPos] = useState(0)
    const [side, setSide] = useSlap()
    const [cursorSide, setCursorSide] = useState('left')
    const onMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        setMouseEnterPos(e.pageX)
      },
      [setMouseEnterPos]
    )

    const onMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        e.pageX < mouseEnterPos ? setSide('left') : setSide('right')
      },
      [mouseEnterPos, setSide]
    )

    const onMouseMove = useCallback((e: MouseEvent): void => {
      setCursorSide(e.clientX > window.innerWidth / 2 ? 'left' : 'right')
    }, [])

    return (
      <div className={`relative ${cursorSide}`} onMouseMove={onMouseMove}>
        <Fc side={side} {...props} />
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="absolute top-0 left-1/4 w-1/2 h-full" />
      </div>
    )
  }

  NewComponent.displayName = `MouseControlled${Fc.displayName === undefined ? '' : Fc.displayName}`
  return NewComponent
}

MouseControlled.displayName = 'MouseControlled'
