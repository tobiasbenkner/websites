import { Page } from '@/payload-types'

type HeroBlock = Extract<Page['layout'][number], { blockType: 'hero' }>
type LinkItem = NonNullable<HeroBlock['links']>[number]
type Link = LinkItem['link']

export function getUrlFromLink(link: Link, tenantSlug: string, lang: string) {
  let url = link?.url ?? ''
  if (typeof link?.reference?.value === 'object') {
    const slug = link.reference?.value.slug
    url = `${tenantSlug ? '/' + tenantSlug : ''}/${lang}/${slug}`
  }
  return url
}
