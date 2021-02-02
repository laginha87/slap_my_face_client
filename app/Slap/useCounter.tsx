import { useCallback, useState } from 'react'

export const useCounter = (): [number, () => void] => {
  const [counter, setCounter] = useState(0)
  const incCounter = useCallback(() => {
    setCounter((e) => e + 1)
  }, [])
  return [counter, incCounter]
}
