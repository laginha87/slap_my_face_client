import {
  MutableRefObject,
  useContext,
  useRef,
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react'

import { useVideoStream, VIDEO_CONSTRAINTS } from 'app/Generator/useVideoStream'
import { BodyPix, SemanticPartSegmentation } from '@tensorflow-models/body-pix'
import { loadBodyPix, segmentImage } from 'app/Services/Tensorflow'
import { TensorFlowMessage } from 'app/Services/WebWorkers/MessageTypes'
import { useSegmentationWorker } from 'app/Services/WebWorkers/useWorker'

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
    <BodyPixContext.Provider
      value={{
        bodyPix,
        isLoaded,
        videoRef,
        canvasRef,
        segIt
      }}
    >
      <video
        style={{ display: 'none' }}
        ref={videoRef}
        onLoadedMetadata={videoPlay}
        onLoadedData={loadBodyPix}
        {...VIDEO_CONSTRAINTS}
      />
      {children}
    </BodyPixContext.Provider>
  )
}

export const useBodyPixClient = (): [boolean, BodyPix?] => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bodyPix, setBodyPix] = useState<BodyPix>()

  useEffect(() => {
    const loadIt = async (): Promise<void> => {
      const bodyPix = await loadBodyPix()
      setBodyPix(bodyPix)
      setIsLoaded(true)
    }
    loadIt()
  }, [])

  return [isLoaded, bodyPix]
}

export const useBodyPixSegmenter = (
  bodyPix: BodyPix
): ((input: string) => Promise<string>) =>
  useCallback((input: string) => segmentImage(bodyPix, input), [bodyPix])

export const useBodyPix = (
  videoRef
): {
  bodyPix: BodyPix
  isLoaded: boolean
  loadBodyPix: () => void
  segIt: () => Promise<SemanticPartSegmentation>
} => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bodyPix, setBodyPix] = useState<BodyPix>()

  const tmpLoadBodyPix = useCallback(async () => {
    setBodyPix(await loadBodyPix())
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
    bodyPix,
    isLoaded,
    loadBodyPix: tmpLoadBodyPix,
    segIt
  }
}

export const BodyPixSegmenter = ({ enabled, preview }) => {
  const { canvasRef, bodyPix, videoRef, segIt } = useBodyPixContext()

  const drawImage = useCallback(async () => {
    const res = await segIt()
    const context = canvasRef.current.getContext('2d')
    context.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.width,
      videoRef.current.height
    )
    var imageData = context.getImageData(
      0,
      0,
      videoRef.current.width,
      videoRef.current.height
    )
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

  useEffect(() => {
    drawImage()
  }, [])

  return (
    <div className='relative'>
      <canvas ref={canvasRef} {...VIDEO_CONSTRAINTS} />
      {preview && (
        <img
          className='absolute top-0 left-0 bg-black'
          src={preview}
          style={VIDEO_CONSTRAINTS}
        />
      )}
    </div>
  )
}

export const useSegmentImage = (
  setImage: (img: string) => void
): [ready: boolean, segmentCallback: (f: File) => void] => {
  const onMessage = useCallback(
    (e: TensorFlowMessage) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (e.type === 'SEGMENT_IMAGE_MESSAGE') {
        const imageData = new ImageData(
          new Uint8ClampedArray(e.data),
          e.width,
          e.height
        )
        ctx?.putImageData(imageData, 0, 0)
        setImage(canvas.toDataURL())
      }
    },
    [setImage]
  )
  const [ready, sendSegmentationRequest] = useSegmentationWorker(onMessage)

  const segmentCallback = useCallback(async (f: File) => {
    const [buffer, width, height] = await readFile(f)
    sendSegmentationRequest(
      {
        type: 'SEGMENT_IMAGE_REQUEST',
        buffer,
        width,
        height
      },
      [buffer]
    )
  }, [])
  return [ready, segmentCallback]
}

const readFile = async (
  f: File
): Promise<[buffer: ArrayBuffer, width: number, height: number]> => {
  const reader = new FileReader()
  const res = new Promise<[buffer: ArrayBuffer, width: number, height: number]>(
    (resolve) => {
      reader.onload = (result) => {
        const img = new Image()
        img.src = result?.target?.result as string

        img.onload = async (i) => {
          const buff = await f.arrayBuffer()
          resolve([buff, img.width, img.height])
        }
      }
    }
  )
  reader.readAsDataURL(f)
  return await res
}
