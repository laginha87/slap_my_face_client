import { useCallback } from 'react'
import { Dispatch, setStepAction, SlapStep } from 'app/Generator/Reducer'

export const useStep = (dispatch: Dispatch, step: SlapStep): () => void => useCallback(() => {
  dispatch(setStepAction(step))
}, [step, dispatch])
