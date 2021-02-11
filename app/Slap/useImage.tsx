import { useEffect, useState } from 'react'

export function useImage (path: string): boolean {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const newImg = new Image()
    newImg.onload = () => {
      setIsLoading(false)
    }
    newImg.src = path
  }, [path])

  return isLoading
}

// TODO Fix this hook can probably lead to issues
export function useImages (...path: string[]): boolean {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return path.map((e) => useImage(e)).some((e) => e)
}
