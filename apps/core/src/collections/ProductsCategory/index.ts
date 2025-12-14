import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import { CollectionConfig } from 'payload'
import { allBlocks } from '../Pages/blocks/all-blocks'

export const ProductCategory: CollectionConfig = {
  slug: 'productCategories',
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
      validate: false,
    },
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Kategorie Name',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      localized: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Reihenfolge',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'products',
      type: 'join',
      collection: 'products',
      on: 'category',
      defaultLimit: 1000,
      maxDepth: 2,
    },
    {
      name: 'additionalContent',
      type: 'blocks',
      label: 'Zusätzliche Inhalte',
      blocks: allBlocks,
    },
  ],
}
