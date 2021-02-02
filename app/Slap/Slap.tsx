import { FC, useCallback, useState } from 'react'
import { SlapArea } from 'app/Slap/SlapArea'
import { useAudio } from 'app/Slap/useAudio'
import { useImages } from 'app/Slap/useImage'
import { WithLoading } from 'app/Slap/Loading'
import { TouchControlled } from 'app/Slap/TouchControlled'
import { MouseControlled } from 'app/Slap/MouseControlled'
import { IS_DESKTOP } from 'app/Utils/isDesktop'

const LoadingSlapArea = WithLoading(
  (IS_DESKTOP ? MouseControlled : TouchControlled)(SlapArea),
  640,
  320
)

const useCounter = (): [number, () => void] => {
  const [counter, setCounter] = useState(0)
  const incCounter = useCallback(() => {
    setCounter((e) => e + 1)
  }, [])
  return [counter, incCounter]
}
export const Slap: FC<{
  center: string
  left: string
  right: string
  loading?: boolean
  name?: string
  message?: string
}> = ({ center, left, right, name, message, loading = false }) => {
  const [isLoadingAudio, audio] = useAudio('slap')
  const imagesLoading = useImages(center, left, right)
  const [counter, incCounter] = useCounter()

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-2xl'>{name}</h2>
      <LoadingSlapArea
        right={right}
        left={left}
        center={center}
        audio={audio as any}
        slapped={incCounter}
        loading={imagesLoading || isLoadingAudio || loading}
      />
      <div className='py-5 text-3xl'>{counter}</div>
      <div className='px-4 py-2 border-white mt-4 border-t w-96'>{message}</div>
    </div>
  )
}
