import { BodyPix, load } from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'

export const segmentImage = async (
  bodyPix: BodyPix,
  input: ImageData
): Promise<ImageData> => {
  const segmented = await bodyPix.segmentPersonParts(input, {
    flipHorizontal: true,
    internalResolution: 'medium',
    segmentationThreshold: 0.7
  })

  var pixel = input.data
  for (var p = 0; p < pixel.length; p += 4) {
    if (segmented.data[p / 4] !== 0 && segmented.data[p / 4] !== 1) {
      pixel[p + 3] = 0
    }
  }

  // context.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height)
  return input
}

export const loadBodyPix = async (): Promise<BodyPix> =>
  await load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  })
