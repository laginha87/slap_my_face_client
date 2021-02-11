import { useCallback } from 'react'
import { useBodyPixClient } from 'app/Services/Tensorflow/useBodyPixClient'
import { convertFileToImage } from 'app/Services/Tensorflow/convertFileToImage'
import { createCanvasFromImage } from 'app/Services/Tensorflow/createCanvasFromImage'
import { segmentImage } from 'app/Services/Tensorflow/segmentImage'

export const useSegmentImageFile: (
  setImageCb: (image: string) => void
) => (f: File) => void = (setImageCb) => {
  const bodyPixClientPromise = useBodyPixClient()

  const loadFile = useCallback(
    async (f: File) => {
      const bodyPix = await Promise.resolve(bodyPixClientPromise.current)
      const img = await convertFileToImage(f)
      const canvas = createCanvasFromImage(img)
      await segmentImage(bodyPix, img, canvas)
      setImageCb(canvas.toDataURL())
    },
    [bodyPixClientPromise, setImageCb]
  )

  return loadFile
}
