import { FC, useEffect, useState } from 'react'

export const Loading: FC<{ width: number, height: number }> = ({
  width,
  height
}) => {
  const [loadtext, setLoadtext] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadtext((v) =>
        Array(((v.length + 1) % 3) + 1)
          .fill('.')
          .join('')
      )
    }, 200)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div style={{ height, width }} className='text-3xl relative'>
      <div className='absolute top-1/2 left-1/2 -ml-32'>
        {' '}
        Loading {loadtext}
      </div>
    </div>
  )
}
