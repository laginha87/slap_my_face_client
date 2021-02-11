import { FC, useEffect, useState } from 'react'

interface LoadingProps {
  height: number
}

export const Loading: FC<LoadingProps> = ({ height }) => {
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
    <div style={{ height }} className='text-3xl flex justify-center w-full items-center'>
      <div>
        Loading {loadtext}
      </div>
    </div>
  )
}

export type LoadableComponent<T> = FC<Loadable<T>>
export type Loadable<T> = T & { loading: boolean }

export const WithLoading = <T extends {} = {}>(
  height: number
) => (Fc: FC<T>): LoadableComponent<T> => ({ loading, ...props }) => {
    if (loading) {
      return (
        <div className='flex justify-center'>
          <Loading height={height} />
        </div>
      )
    } else {
      return <Fc {...(props as T)} />
    }
  }
