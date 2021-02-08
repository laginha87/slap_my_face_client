export const convertFileToImage = async (
  f: File
): Promise<HTMLImageElement> => {
  return await new Promise((resolve) => {
    const imgAsDataUrl = URL.createObjectURL(f)
    const img = new Image()
    img.addEventListener(
      'load',
      () => {
        URL.revokeObjectURL(imgAsDataUrl)
        resolve(img)
      },
      false
    )
    img.src = imgAsDataUrl
  })
}
