import {
  getSelectedImage,
  resetImagesAction,
  setTextElementsAction,
  StepPropTypes
} from 'app/Generator/Reducer'
import { SlapForm } from 'app/Generator/SlapForm'
import { FC, useCallback } from 'react'

export const ReviewStep: FC<StepPropTypes> = ({ state, dispatch }) => {
  const startOver = useCallback(() => {
    dispatch(resetImagesAction())
  }, [dispatch])

  const finish = useCallback(
    ({ name, message }) => {
      dispatch(setTextElementsAction(name, message))
    },
    [dispatch]
  )

  return (
    <SlapForm
      onSubmit={finish}
      onCancel={startOver}
      center={getSelectedImage(state, 'center')}
      left={getSelectedImage(state, 'left')}
      right={getSelectedImage(state, 'right')}
    />
  )
}
