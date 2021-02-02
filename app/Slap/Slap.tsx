import { FC } from 'react'
import { SlapArea } from 'app/Slap/SlapArea'
import { useImages } from 'app/Slap/useImage'
import { WithLoading } from 'app/Slap/Loading'
import { TouchControlled } from 'app/Slap/TouchControlled'
import { MouseControlled } from 'app/Slap/MouseControlled'
import { IS_DESKTOP } from 'app/Utils/isDesktop'
import { useCounter } from 'app/Slap/useCounter'
import { WithAudio } from 'app/Slap/WithAudio'

const LoadingSlapArea = WithAudio(
  (IS_DESKTOP ? MouseControlled : TouchControlled)(
    WithLoading(SlapArea, 640, 320)
  )
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
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-2xl'>{name}</h2>
      <LoadingSlapArea
        right={right}
        left={left}
        center={center}
        slapped={incCounter}
        loading={imagesLoading || loading}
      />
      <div className='py-5 text-3xl'>{counter}</div>
      <div className='px-4 py-2 border-white mt-4 border-t w-96'>{message}</div>
    </div>
  )
}
