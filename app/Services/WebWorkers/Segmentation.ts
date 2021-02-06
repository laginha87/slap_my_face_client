import 'regenerator-runtime/runtime'
import { loadBodyPix, segmentImage } from 'app/Services/Tensorflow'
import {
  TensorFlowRequest,
  TensorFlowResponse
} from 'app/Services/WebWorkers/MessageTypes'
import { BodyPix } from '@tensorflow-models/body-pix'

let bodyPix: BodyPix

loadBodyPix().then((bp) => {
  bodyPix = bp
  postMessage({
    type: 'READY_MESSAGE'
  })
})

async function handleSegmentImage(
  arrayBuffer: ArrayBuffer,
  width: number,
  height: number
): Promise<void> {
  const imageData = new ImageData(
    new Uint8ClampedArray(arrayBuffer),
    width,
    height
  )
  await segmentImage(bodyPix, imageData)
  const data = imageData.data
  const response: TensorFlowResponse = {
    type: 'SEGMENT_IMAGE_RESPONSE',
    data,
    width,
    height
  }
  postMessage(response, '*', [data])
}

onmessage = (e: MessageEvent<TensorFlowRequest>) => {
  switch (e.data.type) {
    case 'SEGMENT_IMAGE_REQUEST':
      void handleSegmentImage(e.data.buffer, e.data.width, e.data.height)
      break
    default:
      break
  }
}
