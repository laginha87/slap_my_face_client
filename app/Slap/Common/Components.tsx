import * as React from 'react'
import { useState, useEffect } from 'react';
import { INSTRUCTIONS_STEP, UPLOAD_STEP } from '../Generator/Reducer'
import { StepCounter } from '../Generator/StepCounter'
import { Button } from './Button'
import { Link } from './Link';
import { ProgressBar } from './ProgressBar'

export const Components = () => {
  const [t, setT] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => setT(Math.ceil(Math.random() * 10)), 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <h1>Links</h1>
      <Link href="#">This is a link</Link>
      <h1> Buttons</h1>
      <Button>Cenas</Button>
      <Button theme="secondary">Cenas</Button>
      <h1>Progress bars</h1>
      <ProgressBar value={t} total={10} />
      <ProgressBar value={5} total={10} />
      <ProgressBar value={10} total={10} />
      <h1>Step Counters</h1>
      <StepCounter step={INSTRUCTIONS_STEP} />
      <StepCounter step={UPLOAD_STEP} />
    </div>
  )
}
