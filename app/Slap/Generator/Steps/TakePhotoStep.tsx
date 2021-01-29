import * as React from 'react';
import { FC, useCallback, useState, useEffect, useRef } from 'react'
import { Button } from '../../Common/Button'
import { addImagesAction, Dispatch, IState, REVIEW_STEP, setStepAction, Side } from '../Reducer'
import { BodyPixSegmenter, useBodyPixContext } from '../useBodyPix'
import { VIDEO_CONSTRAINTS } from '../useVideoStream';
import shutter from './../../../assets/audio/shutter.mp3';

const SIDES = [
  { side: 'center', text: "Look at the camera" },
  { side: 'left', text: "Look to the right" },
  { side: 'right', text: "Look to the left" }] as { side: Side, text: string }[];

const waitFor = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
}



export const TakePhotoStep: FC<{ dispatch: Dispatch, state: IState }> = ({ dispatch, state }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement>();
  const { side, text: instructionText } = SIDES[currentStep];
  const preview = state.takenImages[side][state.selectedImages[side]];
  const { canvasRef } = useBodyPixContext();

  const takePic = useCallback(() => {
    dispatch(addImagesAction([canvasRef.current.toDataURL()], side));
    audioRef.current.play();
  }, [side]);

  const [firstPass, setFirstPass] = useState(true);
  const [text, setText] = useState(null);
  const [done, setDone] = useState(false);

  const ready = useCallback(async () => {
    setFirstPass(false);
    setText(instructionText);
    // await waitFor(1000);
    // setText(3);
    // await waitFor(1000);
    // setText(2);
    // await waitFor(1000);
    // setText(1);
    // await waitFor(1000);
    takePic();
    setDone(true);
  }, [instructionText]);

  const tryAgain = useCallback(() => {
    setDone(false);
    setText(undefined);
    ready();
  }, []);

  const next = useCallback(() => {
    setDone(false);
    setText(undefined);
    if (currentStep >= SIDES.length - 1) {
      dispatch(setStepAction(REVIEW_STEP));
    } else {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  useEffect(() => {
    currentStep > 0 && ready();
  }, [currentStep])
  return (
    <div>
      <audio src={shutter} ref={audioRef} />
      <div className="mx-auto" style={VIDEO_CONSTRAINTS}>
        <BodyPixSegmenter enabled={!done} preview={preview} />
      </div>
      <div className="absolute z-10 top-0 left-0 w-full h-full flex items-end pb-4 justify-center">
        {firstPass && <Button onClick={ready}>Ready? </Button>}
        {!done && <div className="text-5xl">{text}</div>}
        {done && <>
          <Button onClick={tryAgain} theme='secondary'>Try Again</Button>
          <Button onClick={next} ml='2'>Next</Button>
        </>}
      </div>
    </div>
  )
}
