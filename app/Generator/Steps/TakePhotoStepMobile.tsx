import { Button } from 'app/Common/Button'
import {
  addImagesAction,
  REVIEW_STEP,
  setStepAction,
  Side,
  StepPropTypes
} from 'app/Generator/Reducer'
import { useSegmentImage } from 'app/Services/Tensorflow/hooks'
import { TensorFlowMessage } from 'app/Services/WebWorkers/MessageTypes'
import { useSegmentationWorker } from 'app/Services/WebWorkers/useWorker'
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

const ImagePreview: FC<{ image: string; retry: () => {}; next: () => {} }> = ({
  image,
  retry,
  next
}) => {
  return (
    <>
      <img src={image} />
      <Button theme='secondary' onClick={retry}>
        Try Again
      </Button>
      <Button onClick={next} ml='2'>
        Next
      </Button>
    </>
  )
}

const LoadablePreview = WithLoading<{
  image: string
  retry: () => void
  next: () => void
}>(
  640,
  320
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
  const [ready, segmentImage] = useSegmentImage(onImageSegmented)

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
        segmentImage(input.files[0])
        // var reader = new FileReader()
        // const readerPromise = new Promise<string>((resolve) => {
        //   reader.onload = function (e) {
        //     if (e?.target?.result !== null) {
        //       resolve(e.target.result as string)
        //     }
        //   }
        // })
        // reader.readAsDataURL(input.files[0])
        // const imgAsUrl = await readerPromise

        // setLoading(true)
        // const canvas = document.createElement('canvas')

        // const image = await new Promise<HTMLImageElement>((resolve) => {
        //   const img = new Image()
        //   img.src = imgAsUrl
        //   img.addEventListener('load', () => {
        //     resolve(img)
        //   })
        // })

        // canvas.width = 640
        // canvas.height = (640 * image.width) / image.height
        // const context = canvas.getContext('2d') as CanvasRenderingContext2D
        // context.drawImage(
        //   image,
        //   0,
        //   0,
        //   image.width,
        //   image.height,
        //   0,
        //   0,
        //   canvas.width,
        //   canvas.height
        // )
        // var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        // sendSegmentationRequest({
        //   type: 'SEGMENT_IMAGE_MESSAGE',
        //   imageData: imageData
        // })
      }
    },
    [side]
  )

  const retry = useCallback(() => {
    setImage('')
    fileInputRef.current?.click()
  }, [])

  return (
    <div>
      {image === '' && ready && !loading ? (
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
          loading={loading || !ready}
          next={next}
        />
      )}
    </div>
  )
}
