import { FC } from 'react'
import { ButtonWithSpinner } from 'app/Common/Button'
import { TAKE_PHOTO_STEP, StepPropTypes } from 'app/Generator/Reducer'
import { useBodyPixContext } from 'app/Services/Tensorflow'
import { useStep } from 'app/Generator/useStep'

export const InstructionsStep: FC<StepPropTypes> = ({ dispatch }) => {
  const { isLoaded } = useBodyPixContext()

  const next = useStep(dispatch, TAKE_PHOTO_STEP)
  return (
    <div style={{ height: 400 }} className='mx-auto'>
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
