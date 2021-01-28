import * as React from 'react';
import { Button } from '../../Common/Button';
import { TAKE_PHOTO_STEP, Dispatch } from '../Reducer';
import { useBodyPixContext } from '../useBodyPix';
import { useStep } from '../useStep';
import { VIDEO_CONSTRAINTS } from '../useVideoStream';

interface PropTypes {
  dispatch: Dispatch
}

const Spinner = ({ loading }) => {
  return loading ? <svg className="animate-spin h-5 w-5  inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg> : <div className="h-5 w-5 inline-block"> </div>;
}

export const InstructionsStep = ({ dispatch }: PropTypes) => {
  const { isLoaded } = useBodyPixContext();

  const next = useStep(dispatch, TAKE_PHOTO_STEP);
  return (
    <div style={VIDEO_CONSTRAINTS} className="mx-auto">
      <div className='flex items-center flex-col justify-center h-full'>
        <ol className="list-decimal font-title text-lg pb-2">
          <li>Authorize browser to use camera</li>
          <li>Follow wizard to take pics</li>
          <li>Preview & Upload</li>
        </ol>
        <Button onClick={next}>
          NEXT <Spinner loading={!isLoaded} /></Button>
      </div>
    </div>

  )
}
