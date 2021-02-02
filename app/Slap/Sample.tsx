import { Slap } from 'app/Slap/Slap'
import left from 'app/assets/left.png'
import right from 'app/assets/right.png'
import center from 'app/assets/center.png'
import { FC } from 'react'

export const SlapSample: FC = () => {
  return (
    <div>
      <h1 className='text-4xl text-center'>Slap My Face</h1>
      <Slap
        loading={false}
        left={left}
        right={right}
        center={center}
        name='Sample'
        message='Sample Message'
      />
    </div>
  )
}
