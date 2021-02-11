import { useCallback, useState, MouseEvent, useEffect } from 'react'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { useSlap } from 'app/Slap/useSlap'
import { LoadableComponent } from 'app/Slap/Loading'

export function MouseControlled (
  Fc: LoadableComponent<SlapAreaPropTypes>
): LoadableComponent<SlapAreaPropTypes> {
  const NewComponent: LoadableComponent<SlapAreaPropTypes> = ({ side: _side, ...props }) => {
    const [mouseEnterPos, setMouseEnterPos] = useState(0)
    const [side, setSide] = useSlap()

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

    // TODO Extract
    useEffect(() => {
      const app = document.getElementById('app') as HTMLDivElement
      const listener = (e: MouseEvent): void => {
        const cursor = e.clientX > window.innerWidth / 2 ? 'left' : 'right'
        app.classList.remove('right', 'left')
        app.classList.add(cursor)
      }
      app.addEventListener('mousemove', listener as any)

      return () => {
        app.classList.remove('right', 'left')
        app.removeEventListener('mousemove', listener as any)
      }
    }, [])
    return (
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Fc side={side} {...props} />
      </div>
    )
  }

  NewComponent.displayName = `MouseControlled${Fc.displayName === undefined ? '' : Fc.displayName}`
  return NewComponent
}

MouseControlled.displayName = 'MouseControlled'
