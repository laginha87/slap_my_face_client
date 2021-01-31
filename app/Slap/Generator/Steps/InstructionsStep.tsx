
import { FC } from 'react'
import { Button } from 'app/Slap/Common/Button'
import { TAKE_PHOTO_STEP, Dispatch } from 'app/Slap/Generator/Reducer'
import { useBodyPixContext } from 'app/Slap/Generator/useBodyPix'
import { useStep } from 'app/Slap/Generator/useStep'
import { VIDEO_CONSTRAINTS } from 'app/Slap/Generator/useVideoStream'

interface PropTypes {
  dispatch: Dispatch
}

const Spinner: FC<{ loading: boolean }> = ({ loading }) => {
  return loading ? (
    <svg className='animate-spin h-5 w-5  inline-block' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' />
    </svg>) : <div className='h-5 w-5 inline-block'> </div>
}

export const InstructionsStep: FC<PropTypes> = ({ dispatch }) => {
  const { isLoaded } = useBodyPixContext()

  const next = useStep(dispatch, TAKE_PHOTO_STEP)
  return (
    <div style={VIDEO_CONSTRAINTS} className='mx-auto'>
      <div className='flex items-center flex-col justify-center h-full'>
        <ol className='list-decimal text-lg pb-2'>
          <li>Authorize browser to use camera</li>
          <li>Follow wizard to take pics</li>
          <li>Preview & Upload</li>
        </ol>
        <Button onClick={next}>
          NEXT <Spinner loading={!isLoaded} />
        </Button>
      </div>
    </div>

  )
}
