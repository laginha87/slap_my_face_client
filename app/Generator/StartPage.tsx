import { Loading } from 'app/Slap/Loading'
import { FC, lazy, Suspense, useReducer } from 'react'

import {
  INITIAL_STATE,
  INSTRUCTIONS_STEP,
  reducer,
  REVIEW_STEP,
  SlapStep,
  TAKE_PHOTO_STEP,
  UPLOAD_STEP
} from 'app/Generator/Reducer'
import { StepCounter } from 'app/Generator/StepCounter'
import { ErrorWrapper } from 'app/Error/ErrorWrapper'

const STEPS_TEXTS = {
  [INSTRUCTIONS_STEP]: 'Instructions',
  [TAKE_PHOTO_STEP]: 'Take Photos',
  [REVIEW_STEP]: 'Review',
  [UPLOAD_STEP]: 'Almost done'
}

const Title: FC<{ step: SlapStep }> = ({ step }) => {
  return <h1 className='text-5xl text-center my-5'>{STEPS_TEXTS[step]}</h1>
}

const handleBodyPixError = (error: any): string => {
  switch (error.toString()) {
    case 'NotAllowedError: Permission denied':
      return 'You need to allow the use of webcam'
    default:
      return 'Something went Wrong'
  }
}

const Step = lazy(async () => await import('app/Generator/Step'))

export const StartPage: FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <>
      <StepCounter step={state.step} />
      <Title step={state.step} />
      <Suspense fallback={<Loading height={400} />}>
        <ErrorWrapper handleError={handleBodyPixError}>
          <Step state={state} dispatch={dispatch} />
        </ErrorWrapper>
      </Suspense>
    </>
  )
}
