import { Media } from '@/payload-types'

type ImageInfo = {
  url: string
  alt: string
  focalX: number
  focalY: number
}

const sizeOrder = ['desktop', 'tablet', 'card', 'thumbnail'] as const
type ImageSizeKey = (typeof sizeOrder)[number]

export function getImageInfo(
  image: string | Media | null | undefined,
  maxSize?: ImageSizeKey,
): ImageInfo {
  const result: ImageInfo = {
    url: '',
    alt: '',
    focalX: 50,
    focalY: 50,
  }

  if (!image || typeof image === 'string') {
    return result
  }

  const originalUrl = image.url
  if (!originalUrl) {
    return result
  }

  result.focalX = image.focalX ?? 50
  result.focalY = image.focalY ?? 50
  result.alt = image.alt ?? ''

  const allowedSizes = maxSize ? sizeOrder.slice(sizeOrder.indexOf(maxSize)) : sizeOrder
  const bestSizeUrl =
    allowedSizes.map((size) => image.sizes?.[size]?.url).find((url) => !!url) || originalUrl

  result.url = bestSizeUrl

  return result
}
