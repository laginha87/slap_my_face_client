import * as React from 'react'
import { useCallback } from 'react';
import { Dispatch, getSelectedImage, IState, resetImagesAction, setStepAction, UPLOAD_STEP } from '../Reducer'
import { Button } from '../../Common/Button';
import { SlapArea } from '../../Slap/SlapArea';

interface PropTypes {
  dispatch: Dispatch,
  state: IState
}

export const ReviewStep = ({ state, dispatch }: PropTypes) => {
  const startOver = useCallback(() => {
    dispatch(resetImagesAction());
  }, [dispatch]);

  const finish = useCallback(() => {
    dispatch(setStepAction(UPLOAD_STEP));
  }, [dispatch]);

  return (
    <div>
      <SlapArea
        hideCounter
        center={getSelectedImage(state, 'center')}
        left={getSelectedImage(state, 'left')}
        right={getSelectedImage(state, 'right')}
      />
      <div className="flex justify-center">
        <Button onClick={startOver} theme="secondary">Start Over</Button>
        <Button onClick={finish} ml='2'>Looks good</Button>
      </div>
    </div>
  )
}
