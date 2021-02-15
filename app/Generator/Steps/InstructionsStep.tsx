import { FC } from 'react'
import { Button } from 'app/Common/Button'
import { TAKE_PHOTO_STEP, StepPropTypes } from 'app/Generator/Reducer'
import { useStep } from 'app/Generator/useStep'
import { IS_DESKTOP } from 'app/Utils/isDesktop'

const DesktopInstructionsStep: FC<StepPropTypes> = ({ dispatch }) => {
  const next = useStep(dispatch, TAKE_PHOTO_STEP)
  // TODO ADD REQUEST VIDEO ACCESS
  return (
    <div style={{ height: 400 }} className='mx-auto'>
      <div className='flex items-center flex-col justify-center h-full'>
        <ol className='list-decimal text-lg pb-2'>
          <li>Authorize browser to use camera</li>
          <li>Follow wizard to take pics</li>
          <li>Preview & Upload</li>
        </ol>
        <Button onClick={next}>NEXT</Button>
      </div>
    </div>
  )
}

const MobileInstructionsStep: FC<StepPropTypes> = ({ dispatch }) => {
  const next = useStep(dispatch, TAKE_PHOTO_STEP)
  return (
    <div style={{ height: 400 }} className='mx-auto'>
      <div className='flex items-center flex-col justify-center h-full'>
        <ol className='list-decimal text-lg pb-4'>
          <li>Follow wizard to take pics</li>
          <li>Preview</li>
          <li>Upload</li>
        </ol>
        <Button onClick={next}>GET STARTED</Button>
      </div>
    </div>
  )
}

export const InstructionsStep = IS_DESKTOP
  ? DesktopInstructionsStep
  : MobileInstructionsStep
