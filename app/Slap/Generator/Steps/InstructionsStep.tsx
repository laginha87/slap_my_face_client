import { FC } from 'react'
import { ButtonWithSpinner } from 'app/Slap/Common/Button'
import { TAKE_PHOTO_STEP, StepPropTypes } from 'app/Slap/Generator/Reducer'
import { useBodyPixContext } from 'app/Slap/Generator/useBodyPix'
import { useStep } from 'app/Slap/Generator/useStep'
import { VIDEO_CONSTRAINTS } from 'app/Slap/Generator/useVideoStream'

export const InstructionsStep: FC<StepPropTypes> = ({ dispatch }) => {
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
        <ButtonWithSpinner onClick={next} loading={!isLoaded}>
          NEXT
        </ButtonWithSpinner>
      </div>
    </div>
  )
}
