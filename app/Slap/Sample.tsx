import { Slap } from 'app/Slap/Slap'
import left from 'app/assets/left.png'
import right from 'app/assets/right.png'
import center from 'app/assets/center.png'
import { FC } from 'react'

export const SlapSample: FC = () => {
  return (
    <Slap
      loading={false}
      left={left}
      right={right}
      center={center}
      name='Filipe'
      message='Hi I built this, checkout the link below on how to create your own'
    />
  )
}
