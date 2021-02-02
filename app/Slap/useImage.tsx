import { useEffect, useState } from 'react'

export function useImage (path: string): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    var newImg = new Image()
    newImg.onload = () => {
      setIsLoading(false)
    }
    newImg.src = path
  }, [])

  return isLoading
}
