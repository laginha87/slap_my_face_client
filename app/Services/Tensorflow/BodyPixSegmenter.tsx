import { FC, useCallback, useEffect, MutableRefObject, useState } from 'react'
import {
  requestVideoAccess,
  VIDEO_CONSTRAINTS
} from 'app/Services/Tensorflow/requestVideoAccess'
import { useBodyPixClient } from 'app/Services/Tensorflow/useBodyPixClient'
import { segmentImage } from 'app/Services/Tensorflow/segmentImage'
import { useCatchError } from 'app/Error/useCatchError'

interface PropTypes {
  preview?: string
  canvasRef: MutableRefObject<HTMLCanvasElement>
}

export const BodyPixSegmenter: FC<PropTypes> = ({
  preview = '',
  canvasRef
}) => {
  const throwErr = useCatchError()

  const [videoStream, setVideoStream] = useState<HTMLVideoElement>()
  const bodyPixClientPromise = useBodyPixClient()

  useEffect(() => {
    void requestVideoAccess().then((v: MediaStream) => {
      const { width, height } = v.getVideoTracks()[0].getSettings()
      const video = document.createElement('video')
      video.srcObject = v
      video.width = width as number
      video.height = height as number
      video.addEventListener('loadedmetadata', () => {
        void video.play()
      })
      video.addEventListener('loadeddata', () => {
        setVideoStream(video)
      })
    }).catch(throwErr)
  }, [throwErr])

  const drawImage = useCallback(async () => {
    if (videoStream === undefined || canvasRef.current === undefined) {
      return
    }
    const bodyPixClient = await Promise.resolve(bodyPixClientPromise.current)
    await segmentImage(bodyPixClient, videoStream, canvasRef.current)
    requestAnimationFrame(drawImage as () => void)
  }, [bodyPixClientPromise, canvasRef, videoStream])

  useEffect(() => {
    if (videoStream !== undefined) {
      void drawImage()
    }
  }, [drawImage, videoStream])

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
