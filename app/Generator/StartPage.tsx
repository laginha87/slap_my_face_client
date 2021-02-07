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

const STEPS_TEXTS = {
  [INSTRUCTIONS_STEP]: 'Instructions',
  [TAKE_PHOTO_STEP]: 'Take Photos',
  [REVIEW_STEP]: 'Review',
  [UPLOAD_STEP]: 'Almost done'
}

const Title: FC<{ step: SlapStep }> = ({ step }) => {
  return <h1 className='text-5xl text-center my-5'>{STEPS_TEXTS[step]}</h1>
}

const Step = lazy(async () => await import('app/Generator/Step'))

export const StartPage: FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  return (
    <div className='mx-auto container'>
      <h1 className='text-4xl text-center'>Slap My Face</h1>

      <StepCounter step={state.step} />
      <Title step={state.step} />
      <Suspense fallback={<Loading width={640} height={400} />}>
        <Step state={state} dispatch={dispatch} />
      </Suspense>
    </div>
  )
}
