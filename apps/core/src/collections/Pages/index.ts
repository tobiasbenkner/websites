import type { CollectionConfig } from 'payload'

import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { SeoTab } from './tabs/seo-tab'
import { ContentTab } from './tabs/content-tab'
import { slugField } from '@/fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  labels: {
    singular: {
      en: 'Page',
      de: 'Webseite',
      es: 'Pagina',
    },
    plural: {
      en: 'Pages',
      de: 'Webseiten',
      es: 'Paginas',
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
      schedulePublish: true,
      validate: false,
    },
    maxPerDoc: 50,
  },

  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: async ({ data, locale, req }) => {
        const tenantId = data.tenant
        const foundTenant = await req.payload.findByID({
          collection: 'tenants',
          id: tenantId,
        })
        const url =
          '/' + [foundTenant.slug, locale.code, data.slug].filter((it) => Boolean(it)).join('/')
        return url
      },
    },
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        es: 'Titulo',
        de: 'Titel',
      },
      type: 'text',
      localized: true,
    },
    ...slugField('title', {
      slugOverrides: {
        localized: true,
        name: 'slug',
      },
    }),
    {
      type: 'tabs',
      tabs: [ContentTab, SeoTab],
    },
  ],
}
