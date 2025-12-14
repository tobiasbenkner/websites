import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .normalize('NFD') // zerlegt Unicode-Zeichen in Basiszeichen + Diakritika
    .replace(/[\u0300-\u036f]/g, '') // entfernt Diakritika (z. B. é -> e, ü -> u)
    .replace(/ß/g, 'ss') // spezifische Ersetzungen
    .replace(/ñ/g, 'n')
    .replace(/[^a-zA-Z0-9 -]/g, '') // entfernt alle nicht-alphanumerischen Zeichen außer Leerzeichen und Bindestriche
    .replace(/\s+/g, '-') // ersetzt Leerzeichen durch Bindestrich
    .replace(/-+/g, '-') // ersetzt mehrere Bindestriche durch einen
    .toLowerCase()
    .trim()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
