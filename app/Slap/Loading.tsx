import { FC, useEffect, useState } from 'react'

interface LoadingProps {
  width: number
  height: number
}

export const Loading: FC<LoadingProps> = ({ width, height }) => {
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

export type LoadableComponent<T> = FC<T & { loading: boolean }>

export const WithLoading = <T extends {} = {}>(
  width: number,
  height: number
) => (Fc: FC<T>): LoadableComponent<T> => ({ loading, ...props }) => {
    if (loading) {
      return (
      <div className='flex justify-center'>
        <Loading width={width} height={height} />
      </div>
      )
    } else {
      return <Fc {...(props as T)} />
    }
  }
