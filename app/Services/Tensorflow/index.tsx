import { BodyPix, load, SemanticPartSegmentation } from '@tensorflow-models/body-pix'
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-backend-cpu'
import { MutableRefObject, useContext, useRef, createContext, useCallback, useEffect, useState } from 'react'

import { useVideoStream, VIDEO_CONSTRAINTS } from 'app/Generator/useVideoStream'

const BodyPixContext = createContext<{
  bodyPix: BodyPix
  isLoaded: boolean
  videoRef: MutableRefObject<HTMLVideoElement>
  canvasRef: MutableRefObject<HTMLCanvasElement>
  segIt: () => Promise<SemanticPartSegmentation>
}>({
      bodyPix: null,
      isLoaded: false,
      videoRef: null,
      canvasRef: null,
      segIt: () => null
    })

export const useBodyPixContext = () => useContext(BodyPixContext)

export const BodyPixProvider = ({ children }) => {
  const [videoRef, videoPlay] = useVideoStream()
  const canvasRef = useRef<HTMLCanvasElement>()
  const { bodyPix, isLoaded, loadBodyPix, segIt } = useBodyPix(videoRef)

  return (
    <BodyPixContext.Provider value={{
      bodyPix,
      isLoaded,
      videoRef,
      canvasRef,
      segIt
    }}
    >
      <video style={{ display: 'none' }} ref={videoRef} onLoadedMetadata={videoPlay} onLoadedData={loadBodyPix} {...VIDEO_CONSTRAINTS} />
      {children}
    </BodyPixContext.Provider>
  )
}

export const useBodyPix = (videoRef): {
  bodyPix: BodyPix
  isLoaded: boolean
  loadBodyPix: () => void
  segIt: () => Promise<SemanticPartSegmentation>
} => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bodyPix, setBodyPix] = useState<BodyPix>()

  const loadBodyPix = useCallback(async () => {
    setBodyPix(await load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 0.75,
      quantBytes: 2
    }))
    setIsLoaded(true)
  }, [])

  const segIt = useCallback(async () => {
    return await bodyPix.segmentPersonParts(videoRef.current, {
      flipHorizontal: true,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    })
  }, [bodyPix])

  return {
    bodyPix, isLoaded, loadBodyPix, segIt
  }
}

export const BodyPixSegmenter = ({ enabled, preview }) => {
  const { canvasRef, bodyPix, videoRef, segIt } = useBodyPixContext()

  const drawImage = useCallback(async () => {
    const res = await segIt()
    const context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, videoRef.current.width, videoRef.current.height)
    var imageData = context.getImageData(0, 0, videoRef.current.width, videoRef.current.height)
    var pixel = imageData.data
    for (var p = 0; p < pixel.length; p += 4) {
      if (res.data[p / 4] !== 0 && res.data[p / 4] !== 1) {
        pixel[p + 3] = 0
      }
    }
    context.imageSmoothingEnabled = true
    context.putImageData(imageData, 0, 0)

    requestAnimationFrame(drawImage)
  }, [bodyPix])

  useEffect(() => { drawImage() }, [])

  return (
    <div className='relative'>
      <canvas ref={canvasRef} {...VIDEO_CONSTRAINTS} />
      {preview && <img className='absolute top-0 left-0 bg-black' src={preview} style={VIDEO_CONSTRAINTS} />}
    </div>
  )
}
