import { FC } from 'react'
import { SlapArea } from 'app/Slap/Slap/SlapArea'
// import slapAudio from 'app/assets/audio/slap.wav'
import { Loading } from 'app/Slap/Slap/Loading'
import { useAudio } from 'app/Slap/Slap/useAudio'
import { useImage } from 'app/Slap/Slap/useImage'

export const Slap: FC<{
  center: string
  left: string
  right: string
  loading?: boolean
  name?: string
  message?: string
  hideCounter?: boolean
}> = ({ center, left, right, name, message, loading, hideCounter }) => {
  const [isLoadingAudio, audio] = useAudio('slapAudio')
  const isLoading = [
    useImage(center),
    useImage(left),
    useImage(right),
    loading,
    isLoadingAudio
  ].some((e) => e)

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loading width={640} height={320} />
        </div>
      ) : (
        <>
          <h2 className='text-2xl text-center'>{name}</h2>
          <SlapArea
            right={right}
            left={left}
            center={center}
            audio={audio}
            hideCounter={hideCounter}
          />
          <div>
            <div className='px-4 py-2 border-white mt-4 border-t w-96 mx-auto'>
              {message}
            </div>
          </div>
        </>
      )}
    </>
  )
}
