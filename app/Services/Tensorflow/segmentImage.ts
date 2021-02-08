import { BodyPix } from '@tensorflow-models/body-pix'

export const segmentImage = async (
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
