import { BodyPix, load } from '@tensorflow-models/body-pix'
import { useEffect, useState } from 'react'
import { ExaustablePromise } from 'app/Utils/ExaustablePromise'

export const useBodyPixClient: () => ExaustablePromise<BodyPix> = () => {
  const [bodyPixPromise] = useState<ExaustablePromise<BodyPix>>(
    () =>
      new ExaustablePromise(
        load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75,
          quantBytes: 2
        })
      )
  )

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      void Promise.resolve(bodyPixPromise.current).then((t) => t.dispose())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return bodyPixPromise
}
