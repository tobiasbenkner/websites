export function t(translations: Record<string, string>, lang: string) {
  return translations?.[lang] ?? translations?.es ?? ''
}
