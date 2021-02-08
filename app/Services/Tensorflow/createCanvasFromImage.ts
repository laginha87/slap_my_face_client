export const createCanvasFromImage = (
  img: HTMLImageElement
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = (img.height / img.width) * 640
  return canvas
}
