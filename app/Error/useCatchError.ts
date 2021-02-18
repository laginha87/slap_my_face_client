import { useCallback, useState } from 'react'

export const useCatchError = (): (e: Error) => void => {
  const [, setState] = useState()

  const throwErr = useCallback(
    (err) => {
      setState(() => { throw err })
    },
    [setState]
  )
  return throwErr
}
