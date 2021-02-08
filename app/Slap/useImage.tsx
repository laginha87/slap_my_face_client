import { useEffect, useState } from 'react'

export function useImage (path: string): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const newImg = new Image()
    newImg.onload = () => {
      setIsLoading(false)
    }
    newImg.src = path
  }, [])

  return isLoading
}

export function useImages (...path: string[]): boolean {
  return path.map((e) => useImage(e)).some((e) => e)
}
