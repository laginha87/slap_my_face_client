import { FC, useCallback } from 'react'
import {
  getSelectedImage,
  resetImagesAction,
  setStepAction,
  StepPropTypes,
  UPLOAD_STEP
} from 'app/Generator/Reducer'
import { Button } from 'app/Common/Button'
import { Slap } from 'app/Slap/Slap'

export const ReviewStep: FC<StepPropTypes> = ({ state, dispatch }) => {
  const startOver = useCallback(() => {
    dispatch(resetImagesAction())
  }, [dispatch])

  const finish = useCallback(() => {
    dispatch(setStepAction(UPLOAD_STEP))
  }, [dispatch])

  return (
    <div>
      <Slap
        hideCounter
        center={getSelectedImage(state, 'center')}
        left={getSelectedImage(state, 'left')}
        right={getSelectedImage(state, 'right')}
      />
      <div className='flex justify-center'>
        <Button onClick={startOver} theme='secondary'>
          Start Over
        </Button>
        <Button onClick={finish} ml='2'>
          Looks good
        </Button>
      </div>
    </div>
  )
}
