import * as React from 'react'
import { INSTRUCTIONS_STEP, UPLOAD_STEP } from '../Generator/Reducer'
import { StepCounter } from '../Generator/StepCounter'
import { Button } from './Button'
import { ProgressBar } from './ProgressBar'

export const Components = () => {
  return (
    <div>
      <Button>Cenas</Button>
      <Button theme="secondary">Cenas</Button>
      <ProgressBar value={2} total={10} />
      <ProgressBar value={5} total={10} />
      <ProgressBar value={10} total={10} />
      <StepCounter step={INSTRUCTIONS_STEP} />
      <StepCounter step={UPLOAD_STEP} />
    </div>
  )
}
