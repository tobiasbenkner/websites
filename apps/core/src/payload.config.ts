import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import type { Config } from './payload-types'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Tenants } from './collections/Tenants'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { isSuperAdmin } from './access/isSuperAdmin'
import { getUserTenantIDs } from './utilities/getUserTenantIDs'
import Users from './collections/Users'
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'
import { es } from '@payloadcms/translations/languages/es'
import { Videos } from './collections/Videos'
import { Configuration } from './collections/Configuration'
import { Products } from './collections/Products'
import { ProductCategory } from './collections/ProductsCategory'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { es, de, en },
    fallbackLanguage: 'es',
  },
  localization: {
    locales: [
      {
        code: 'es',
        label: 'Español',
      },
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'de',
        label: 'Deutsch',
      },
      {
        code: 'es-ar',
        label: 'Argentino',
      },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  admin: {
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'tobias@pulpo.cloud',
            password: '123456',
            prefillOnly: true,
          }
        : false,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/payload/Logo.tsx',
        Icon: '@/components/payload/Icon.tsx',
      },
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Pages, Configuration, Media, Videos, Products, ProductCategory, Users, Tenants],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    formBuilderPlugin({}),
    importExportPlugin({
      collections: ['products', 'productCategories'],
      disableSave: true,
    }),
    seoPlugin({
      async generateTitle({ doc, req }) {
        const tenantId = doc.tenant
        const {
          docs: [tenant],
        } = await req.payload.find({
          collection: 'tenants',
          where: {
            id: {
              equals: tenantId,
            },
          },
        })

        if (!tenant) {
          return doc.title
        }

        return `${doc.title} - ${tenant.name}`
      },
    }),
    multiTenantPlugin<Config>({
      collections: {
        pages: {},
        media: {},
        videos: {},
        products: {},
        productCategories: {},
        configuration: {
          isGlobal: true,
        },
      },
      tenantField: {
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) {
              return true
            }
            return getUserTenantIDs(req.user).length > 0
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],
})
