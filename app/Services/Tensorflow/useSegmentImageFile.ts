import { useCallback } from 'react'
import { useBodyPixClient } from 'app/Services/Tensorflow/useBodyPixClient'
import { convertFileToImage } from 'app/Services/Tensorflow/convertFileToImage'
import { createCanvasFromImage } from 'app/Services/Tensorflow/createCanvasFromImage'
import { segmentImage } from 'app/Services/Tensorflow/segmentImage'
import { useCatchError } from 'app/Error/useCatchError'

export const useSegmentImageFile: (
  setImageCb: (image: string) => void
) => (f: File) => void = (setImageCb) => {
  const bodyPixClientPromise = useBodyPixClient()
  const catchErr = useCatchError()
  const loadFile = useCallback(
    async (f: File) => {
      try {
        const bodyPix = await Promise.resolve(bodyPixClientPromise.current)
        const img = await convertFileToImage(f)
        const canvas = createCanvasFromImage(img)
        await segmentImage(bodyPix, img, canvas)
        setImageCb(canvas.toDataURL())
      } catch (error) {
        catchErr(error)
      }
    },
    [bodyPixClientPromise, catchErr, setImageCb]
  )

  return loadFile
}
