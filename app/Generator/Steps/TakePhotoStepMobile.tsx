import { Button } from 'app/Common/Button'
import {
  addImagesAction,
  REVIEW_STEP,
  setStepAction,
  Side,
  StepPropTypes
} from 'app/Generator/Reducer'
import { useSegmentImageFile } from 'app/Services/Tensorflow/useSegmentImageFile'
import { WithLoading } from 'app/Slap/Loading'
import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'

interface SideText {
  side: Side
  text: string
}

const SIDES = [
  { side: 'center', text: 'Take a photo looking at the camera' },
  { side: 'left', text: 'Take a photo looking to the right' },
  { side: 'right', text: 'Take a photo looking to the left' }
] as SideText[]

interface ImagePreviewProps {
  image: string
  retry: () => {}
  next: () => {}
}

const ImagePreview: FC<ImagePreviewProps> = ({ image, retry, next }) => {
  return (
    <>
      <img src={image} />
      <div className='flex justify-center'>
        <Button theme='secondary' onClick={retry}>
          Try Again
        </Button>
        <Button onClick={next} ml='2'>
          Next
        </Button>
      </div>
    </>
  )
}

const LoadablePreview = WithLoading<{
  image: string
  retry: () => void
  next: () => void
}>(
  640,
  400
)(ImagePreview)

export const TakePhotoStepMobile: FC<StepPropTypes> = ({ dispatch, state }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const { side, text: instructionText } = SIDES[currentStep]
  const [image, setImage] = useState('')
  const fileInputRef = useRef<HTMLLabelElement>(null)

  const onImageSegmented = useCallback((image: string) => {
    setImage(image)
    setLoading(false)
  }, [])

  const segmentImageFile = useSegmentImageFile(onImageSegmented)

  const next = useCallback(() => {
    if (currentStep >= SIDES.length - 1) {
      dispatch(addImagesAction([image], side))
      dispatch(setStepAction(REVIEW_STEP))
    } else {
      dispatch(addImagesAction([image], side))
      setImage('')
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, side, image])

  const processImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setLoading(true)
      const input = e.target
      if (input.files !== null && input.files.length > 0) {
        segmentImageFile(input.files[0])
      }
    },
    [side, segmentImageFile]
  )

  const retry = useCallback(() => {
    setImage('')
    fileInputRef.current?.click()
  }, [])

  return (
    <div>
      {image === '' && !loading ? (
        <label ref={fileInputRef}>
          <div className='bg-white text-black rounded p-40 text-3xl text-center'>
            {instructionText}
          </div>
          <input
            className='hidden'
            type='file'
            accept='image/*'
            capture='user'
            onChange={processImage}
          />
        </label>
      ) : (
        <LoadablePreview
          image={image}
          retry={retry}
          loading={loading}
          next={next}
        />
      )}
    </div>
  )
}
