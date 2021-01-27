import { useCallback } from 'react';
import { Dispatch, setStepAction, SlapStep } from './Reducer';

export const useStep = (dispatch: Dispatch, step: SlapStep) => useCallback(() => {
  dispatch(setStepAction(step));
}, [step, dispatch]);
