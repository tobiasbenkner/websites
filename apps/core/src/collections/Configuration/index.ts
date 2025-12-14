import { CollectionConfig } from 'payload'
import { ConfigThemeTab } from './tabs/config-theme-tab'
import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { ConfigContactTab } from './tabs/config-contact-tab'
import { ConfigSocialTab } from './tabs/config-social-tab'
import { ConfigNavigationTab } from './tabs/config-navigation-tab'
import { ConfigFooterTab } from './tabs/config-footer-tab'
import { ConfigI18nTab } from './tabs/config-i18n'

export const Configuration: CollectionConfig = {
  slug: 'configuration',
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1500,
      },
      schedulePublish: false,
      validate: false,
    },
    maxPerDoc: 50,
  },
  admin: {
    livePreview: {
      url: async ({ data, locale, req }) => {
        const tenantId = data.tenant
        const foundTenant = await req.payload.findByID({
          collection: 'tenants',
          id: tenantId,
        })
        const url = '/' + [foundTenant.slug, locale.code].filter((it) => Boolean(it)).join('/')
        return url
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        ConfigContactTab,
        ConfigSocialTab,
        ConfigNavigationTab,
        ConfigFooterTab,
        ConfigThemeTab,
        ConfigI18nTab,
      ],
    },
  ],
}
