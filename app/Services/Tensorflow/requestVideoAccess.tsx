export const VIDEO_CONSTRAINTS = {
  width: 640,
  height: 400
}

const constraints = {
  width: { min: 640, ideal: 1920, max: 1920 },
  height: { min: 400, ideal: 1080 },
  aspectRatio: 1.777777778
}

export const requestVideoAccess = async (): Promise<MediaStream> => {
  return await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: constraints
  })
}
