import { FC } from 'react'
import { SlapArea } from 'app/Slap/SlapArea'
import { useImages } from 'app/Slap/useImage'
import { WithLoading } from 'app/Slap/Loading'
import { TouchControlled } from 'app/Slap/TouchControlled'
import { MouseControlled } from 'app/Slap/MouseControlled'
import { IS_DESKTOP } from 'app/Utils/isDesktop'
import { useCounter } from 'app/Slap/useCounter'
import { WithAudio } from 'app/Slap/WithAudio'

import { compose } from 'lodash/fp'
import { ColLayout } from 'app/Common/Layouts'
import { Title } from 'app/Common/Typography'

const LoadingSlapArea = compose(
  WithAudio,
  IS_DESKTOP ? MouseControlled : TouchControlled,
  WithLoading(400))(
  SlapArea
)

export const Slap: FC<{
  center: string
  left: string
  right: string
  loading?: boolean
  name?: string
  message?: string
}> = ({ center, left, right, name, message, loading = false }) => {
  const imagesLoading = useImages(center, left, right)
  const [counter, incCounter] = useCounter()

  return (
    <ColLayout>
      <Title>{name}</Title>
      <LoadingSlapArea
        right={right}
        left={left}
        center={center}
        slapped={incCounter}
        loading={imagesLoading || loading}
      />
      <div className='py-5 text-3xl'>{counter}</div>
      <div className='px-4 py-2 border-white mt-4 border-t w-96'>{message}</div>

    </ColLayout>
  )
}
