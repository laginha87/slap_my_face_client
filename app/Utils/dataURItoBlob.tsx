
export function dataURItoBlob (dataURI: string): Blob {
  const binary = atob(dataURI.split(',')[1])
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/jpeg' })
}
