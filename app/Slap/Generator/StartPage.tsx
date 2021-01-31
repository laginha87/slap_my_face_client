
import { FC, useReducer } from 'react'

import {
  Dispatch,
  INITIAL_STATE,
  INSTRUCTIONS_STEP,
  IState,
  reducer,
  REVIEW_STEP,
  SlapStep,
  TAKE_PHOTO_STEP,
  UPLOAD_STEP
} from './Reducer'
import { StepCounter } from './StepCounter'
import { InstructionsStep, ReviewStep, UploadStep } from './Steps'
import { TakePhotoStep } from './Steps/TakePhotoStep'
import { BodyPixProvider } from './useBodyPix'

const Step: FC<{ state: IState, dispatch: Dispatch }> = ({ state, dispatch }) => {
  switch (state.step) {
    case INSTRUCTIONS_STEP:
      return <InstructionsStep dispatch={dispatch} />
    case TAKE_PHOTO_STEP:
      return <TakePhotoStep dispatch={dispatch} state={state} />
    case UPLOAD_STEP:
      return <UploadStep dispatch={dispatch} state={state} />
    case REVIEW_STEP:
      return <ReviewStep dispatch={dispatch} state={state} />
    default:
      return <div />
  };
}

const STEPS_TEXTS =
{
  [INSTRUCTIONS_STEP]: 'Instructions',
  [TAKE_PHOTO_STEP]: 'Take Photos',
  [REVIEW_STEP]: 'Review',
  [UPLOAD_STEP]: 'Generate'
}

const Title: FC<{ step: SlapStep }> = ({ step }) => {
  return <h1 className='text-5xl text-center my-5'>{STEPS_TEXTS[step]}</h1>
}

export const StartPage = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <div className='mx-auto container'>
      <h1 className='text-4xl text-center'>Slap My Face</h1>
      <BodyPixProvider>
        <StepCounter step={state.step} />
        <Title step={state.step} />
        <Step state={state} dispatch={dispatch} />
      </BodyPixProvider>
    </div>
  )
}
