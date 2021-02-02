import { FC } from 'react'
import { SlapArea } from 'app/Slap/SlapArea'

import { Loading } from 'app/Slap/Loading'
import { useAudio } from 'app/Slap/useAudio'
import { useImage } from 'app/Slap/useImage'

export const Slap: FC<{
  center: string
  left: string
  right: string
  loading?: boolean
  name?: string
  message?: string
  hideCounter?: boolean
}> = ({ center, left, right, name, message, loading = false, hideCounter }) => {
  const [isLoadingAudio, audio] = useAudio('slap')

  const centerLoading = useImage(center)
  const leftLoading = useImage(left)
  const rightLoading = useImage(right)
  if (
    centerLoading ||
    leftLoading ||
    rightLoading ||
    isLoadingAudio ||
    loading
  ) {
    return (
      <div className='flex justify-center'>
        <Loading width={640} height={320} />
      </div>
    )
  } else {
    return (
      <>
        <h2 className='text-2xl text-center'>{name}</h2>
        <SlapArea
          right={right}
          left={left}
          center={center}
          audio={audio as any}
          hideCounter={hideCounter}
        />
        <div>
          <div className='px-4 py-2 border-white mt-4 border-t w-96 mx-auto'>
            {message}
          </div>
        </div>
      </>
    )
  }
}
