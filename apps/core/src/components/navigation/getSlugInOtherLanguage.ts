'use server'

import config from '@/payload.config'
import { getPayload } from 'payload'

export async function getSlugInOtherLanguage(pageId: string, targetLang: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { slug } = await payload.findByID({
    collection: 'pages',
    id: pageId,
    depth: 0,
    locale: targetLang as any,
  })

  if (!slug) {
    return ''
  }

  return slug
}
