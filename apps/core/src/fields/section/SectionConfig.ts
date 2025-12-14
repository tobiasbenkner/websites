export const defaultPaddingRight = 16
export const defaultPaddingLeft = 16

export const defaultPaddingTop = 80
export const defaultPaddingBottom = 80

export const getResponsivePadding = (basePadding: number) => {
  if (basePadding === 0) return '0px' // explizit kein Abstand
  return `clamp(${Math.round(basePadding * 0.6)}px, ${Math.round(basePadding / 10)}vw, ${Math.round(basePadding * 1.2)}px)`
}
