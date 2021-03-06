import { FC, useEffect, useState } from 'react'

export interface SlapAreaPropTypes {
  left: string
  right: string
  center: string
  side?: 'left' | 'right' | 'center'
  slapped?: () => void
}

export const SlapArea: FC<SlapAreaPropTypes> = ({
  side = 'center',
  slapped = () => {},
  ...props
}) => {
  const [currentImage, setCurrentImage] = useState(props.center)

  useEffect(() => {
    setCurrentImage(props[side])
    side !== 'center' && slapped()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side])

  return (
    <div>
      <img
        src={currentImage}
        className='mx-auto'
        style={{ width: 640, height: '100%' }}
      />
    </div>
  )
}
