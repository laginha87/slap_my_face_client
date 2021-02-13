import { FC, useCallback, useState, TouchEvent } from 'react'
import { SlapAreaPropTypes } from 'app/Slap/SlapArea'
import { useSlap } from 'app/Slap/useSlap'
import { Loadable, LoadableComponent } from 'app/Slap/Loading'

type Hoc<T> = (Fc: FC<T>) => FC<T>

export const TouchControlled: Hoc<Loadable<SlapAreaPropTypes>> = (
  Fc
) => {
  const NewComponent: LoadableComponent<SlapAreaPropTypes> = ({ side: _side, ...props }: Loadable<SlapAreaPropTypes>) => {
    const [touchStartPos, setTouchStartPos] = useState(0)
    const [side, setSide] = useSlap()

    const onTouchStart = useCallback(
      (e: TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 1) {
          setTouchStartPos(e.touches[0].pageX)
        }
      },
      [setTouchStartPos]
    )

    const onTouchEnd = useCallback(
      (e: TouchEvent<HTMLDivElement>) => {
        if (e.changedTouches.length === 1) {
          e.changedTouches[0].pageX < touchStartPos
            ? setSide('left')
            : setSide('right')
        }
      },
      [setSide, touchStartPos]
    )

    return (
      <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'none' }}
    >
        <Fc side={side} {...props} />
      </div>
    )
  }

  NewComponent.displayName = `TouchControlled${Fc.displayName === undefined ? '' : Fc.displayName}`
  return NewComponent
}
