import { FC } from 'react'

import {
  StepPropTypes,
  INSTRUCTIONS_STEP,
  REVIEW_STEP,
  SlapStep,
  TAKE_PHOTO_STEP,
  UPLOAD_STEP
} from 'app/Generator/Reducer'

import { InstructionsStep, ReviewStep, UploadStep } from 'app/Generator/Steps'

import { BodyPixProvider } from 'app/Services/Tensorflow/hooks'
import { TakePhotoStepMobile } from 'app/Generator/Steps/TakePhotoStepMobile'

const STEPS: { [k in SlapStep]: FC<StepPropTypes> } = {
  [INSTRUCTIONS_STEP]: InstructionsStep,
  [TAKE_PHOTO_STEP]: TakePhotoStepMobile,
  [UPLOAD_STEP]: UploadStep,
  [REVIEW_STEP]: ReviewStep
}

const Step: FC<StepPropTypes> = ({ state, dispatch }) => {
  const Component = STEPS[state.step]
  return (
    <BodyPixProvider>
      <Component state={state} dispatch={dispatch} />{' '}
    </BodyPixProvider>
  )
}

export default Step
