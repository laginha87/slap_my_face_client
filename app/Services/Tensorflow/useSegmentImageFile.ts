import { BodyPix, load } from '@tensorflow-models/body-pix'
import { useCallback, useEffect, useState } from 'react'

class ExaustablePromise<T> {
  private readonly p: Promise<T>
  private fulfilled: boolean = false
  private v?: T
  constructor(p: Promise<T>) {
    this.p = p.then((b: T) => {
      this.fulfilled = true
      this.v = b
      return b
    })
  }

  get current(): Promise<T> | T {
    if (this.fulfilled) {
      return this.v as T
    } else {
      return this.p
    }
  }
}

const useBodyPixClient: () => ExaustablePromise<BodyPix> = () => {
  const [bodyPixPromise] = useState<ExaustablePromise<BodyPix>>(
    () =>
      new ExaustablePromise(
        load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 1
        })
      )
  )

  useEffect(() => {
    return () => {
      void bodyPixPromise.value.then((t) => t.dispose())
    }
  }, [])

  return bodyPixPromise
}

const fileToImage = async (f: File): Promise<HTMLImageElement> => {
  return await new Promise((resolve) => {
    const imgAsDataUrl = URL.createObjectURL(f)
    const img = new Image()
    img.addEventListener(
      'load',
      () => {
        URL.revokeObjectURL(imgAsDataUrl)
        resolve(img)
      },
      false
    )
    img.src = imgAsDataUrl
  })
}

const newCanvasFromImage = (img: HTMLImageElement): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = (img.height / img.width) * 640
  return canvas
}

export const useSegmentImageFile: (
  setImageCb: (image: string) => void
) => (f: File) => void = (setImageCb) => {
  const bodyPixClientPromise = useBodyPixClient()

  const loadFile = useCallback(
    async (f: File) => {
      const bodyPix = await Promise.resolve(bodyPixClientPromise.current)
      const img = await fileToImage(f)
      const canvas = newCanvasFromImage(img)
      await segmentImage(bodyPix, img, canvas)
      setImageCb(canvas.toDataURL())
    },
    [bodyPixClientPromise]
  )

  return loadFile
}

const segmentImage = async (
  bodyPix: BodyPix,
  image: HTMLImageElement | HTMLVideoElement,
  canvas: HTMLCanvasElement
): Promise<void> => {
  const context = canvas.getContext('2d')
  if (context === null) {
    throw new Error("Couldn't load context")
  }
  context.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    canvas.width,
    canvas.height
  )
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height)
  var pixel = imageData.data
  const res = await bodyPix.segmentPersonParts(imageData, {
    flipHorizontal: true,
    internalResolution: 'low',
    segmentationThreshold: 0.7,
    maxDetections: 1
  })

  for (var p = 0; p < pixel.length; p += 4) {
    if (res.data[p / 4] !== 0 && res.data[p / 4] !== 1) {
      pixel[p + 3] = 0
    }
  }
  context.imageSmoothingEnabled = true
  context.putImageData(imageData, 0, 0)
}
