import { FC, useCallback, useEffect, MutableRefObject, useState } from 'react'
import {
  requestVideoAccess,
  VIDEO_CONSTRAINTS
} from 'app/Services/Tensorflow/requestVideoAccess'
import { useBodyPixClient } from 'app/Services/Tensorflow/useBodyPixClient'
import { segmentImage } from 'app/Services/Tensorflow/segmentImage'

interface PropTypes {
  preview?: string
  canvasRef: MutableRefObject<HTMLCanvasElement>
}

export const BodyPixSegmenter: FC<PropTypes> = ({
  preview = '',
  canvasRef
}) => {
  const [videoStream, setVideoStream] = useState<HTMLVideoElement>()
  const bodyPixClientPromise = useBodyPixClient()

  useEffect(() => {
    void requestVideoAccess().then((v: MediaStream) => {
      const { width, height } = v.getVideoTracks()[0].getSettings()
      const video = document.createElement('video')
      video.srcObject = v
      video.width = width
      video.height = height
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      video.addEventListener('loadeddata', () => {
        setVideoStream(video)
      })
    })
  }, [])

  const drawImage = useCallback(async () => {
    if (videoStream === undefined || canvasRef.current === undefined) {
      return
    }
    const bodyPixClient = await Promise.resolve(bodyPixClientPromise.current)
    await segmentImage(bodyPixClient, videoStream, canvasRef.current)
    requestAnimationFrame(drawImage)
  }, [videoStream])

  useEffect(() => {
    if (videoStream !== undefined) {
      drawImage()
    }
  }, [videoStream])

  return (
    <div className='relative'>
      <canvas ref={canvasRef} {...VIDEO_CONSTRAINTS} />
      {preview !== '' && (
        <img
          className='absolute top-0 left-0 bg-black'
          src={preview}
          style={VIDEO_CONSTRAINTS}
        />
      )}
    </div>
  )
}
