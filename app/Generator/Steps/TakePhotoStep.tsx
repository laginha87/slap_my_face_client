import { FC, useCallback, useState, useEffect } from 'react'
import { Button } from 'app/Common/Button'
import {
  addImagesAction,
  REVIEW_STEP,
  setStepAction,
  Side,
  StepPropTypes
} from 'app/Generator/Reducer'
import { BodyPixSegmenter, useBodyPixContext } from 'app/Services/Tensorflow'
import { VIDEO_CONSTRAINTS } from 'app/Generator/useVideoStream'
import { useAudio } from 'app/Slap/useAudio'

interface SideText {
  side: Side
  text: string
}

const SIDES = [
  { side: 'center', text: 'Look at the camera' },
  { side: 'left', text: 'Look to the right' },
  { side: 'right', text: 'Look to the left' }
] as SideText[]

const waitFor = async (ms: number): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const TakePhotoStepDesktop: FC<StepPropTypes> = ({
  dispatch,
  state
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [, shutterAudio] = useAudio('shutter')
  const { side, text: instructionText } = SIDES[currentStep]
  const preview = state.takenImages[side][state.selectedImages[side]]
  const { canvasRef } = useBodyPixContext()

  const takePic = useCallback(async () => {
    dispatch(addImagesAction([canvasRef.current.toDataURL()], side))
    return await (shutterAudio !== null
      ? shutterAudio.play()
      : new Promise(() => {}))
  }, [side])

  const [firstPass, setFirstPass] = useState(true)
  const [text, setText] = useState<string>('')
  const [done, setDone] = useState(false)

  const ready = useCallback(async () => {
    setFirstPass(false)
    setText(instructionText)
    await waitFor(1000)
    setText('3')
    await waitFor(1000)
    setText('2')
    await waitFor(1000)
    setText('1')
    await waitFor(1000)
    takePic()
    setDone(true)
  }, [instructionText])

  const tryAgain = useCallback(async () => {
    setDone(false)
    setText('')
    await ready()
  }, [])

  const next = useCallback(() => {
    setDone(false)
    setText('')
    if (currentStep >= SIDES.length - 1) {
      dispatch(setStepAction(REVIEW_STEP))
    } else {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep])

  useEffect(() => {
    currentStep > 0 && ready()
  }, [currentStep])
  return (
    <div>
      <div className='mx-auto' style={VIDEO_CONSTRAINTS}>
        <BodyPixSegmenter enabled={!done} preview={preview} />
      </div>
      <div className='absolute z-10 top-0 left-0 w-full h-full flex items-end pb-4 justify-center'>
        {firstPass && <Button onClick={ready}>Ready? </Button>}
        {!done && <div className='text-5xl'>{text}</div>}
        {done && (
          <>
            <Button onClick={tryAgain} theme='secondary'>
              Try Again
            </Button>
            <Button onClick={next} ml='2'>
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
