import { Side } from 'app/Generator/Reducer'
import { useEffect, useState } from 'react'

export const useSlap = (): [Side, (s: Side) => void] => {
  const [side, setSide] = useState<Side>('center')
  useEffect(() => {
    if (side === 'center') {
      return
    }
    const timeout = setTimeout(() => {
      setSide('center')
    }, 400)
    return () => {
      clearTimeout(timeout)
    }
  }, [side])
  return [side, setSide]
}
