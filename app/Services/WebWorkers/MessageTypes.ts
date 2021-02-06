export const SEGMENT_IMAGE_RESPONSE = 'SEGMENT_IMAGE_RESPONSE'
export const SEGMENT_IMAGE_REQUEST = 'SEGMENT_IMAGE_REQUEST'
export const READY_MESSAGE = 'READY_MESSAGE'

export interface SegmentImageRequest {
  type: typeof SEGMENT_IMAGE_REQUEST
  buffer: ArrayBuffer
  width: number
  height: number
}

export interface SegmentImageResponse {
  type: typeof SEGMENT_IMAGE_RESPONSE
  data: ArrayBuffer
  width: number
  height: number
}

export interface ReadyMessage {
  type: typeof READY_MESSAGE
}

export type TensorFlowResponse = SegmentImageResponse | ReadyMessage
export type TensorFlowRequest = SegmentImageRequest

export interface BaseMessage {
  type: string
}
