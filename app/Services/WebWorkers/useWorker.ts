import {
  BaseMessage,
  TensorFlowRequest,
  TensorFlowResponse
} from 'app/Services/WebWorkers/MessageTypes'
import { useCallback, useEffect, useState } from 'react'

type WorkerHook<Request, Response extends BaseMessage> = (
  mh: MessageHandler<Response>
) => [boolean, MessagePoster<Request>]

type MessageHandler<T extends BaseMessage> = (
  messageData: T
) => void | Promise<void>

type MessagePoster<T> = (messageData: T, transfer?: Transferable[]) => void

export function useWorker<Request, Response extends BaseMessage>(
  generateWorker: () => Worker,
  onMessage: MessageHandler<Response>
): [ready: boolean, sendMessage: MessagePoster<Request>] {
  const [ready, setReady] = useState(false)
  const [worker] = useState(generateWorker)

  useEffect(() => {
    worker.onmessage = async (e: MessageEvent<Response>) => {
      switch (e.data.type) {
        case 'READY_MESSAGE':
          setReady(true)
          return
        default:
          void (await onMessage(e.data))
      }
    }
  }, [worker, onMessage])

  useEffect(() => {
    return () => worker.terminate()
  }, [])

  const sendMessage = useCallback(
    (e: Request, transfer?: Transferable[]) => {
      transfer !== undefined
        ? worker.postMessage(e, transfer)
        : worker.postMessage(e)
    },
    [worker]
  )

  return [ready, sendMessage]
}

export const useSegmentationWorker: WorkerHook<
  TensorFlowRequest,
  TensorFlowResponse
> = (mh) => useWorker(() => new Worker('./Segmentation.ts'), mh)
