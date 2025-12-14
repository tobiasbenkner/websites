import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import type { CollectionConfig } from 'payload'
import { queueVideoCompression } from './hooks/queueVideoCompression'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: () => true,
    create: superAdminOrTenantAdminAccess,
    update: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'compressionStatus',
      type: 'select',
      options: ['pending', 'processing', 'completed', 'failed'],
      defaultValue: 'pending',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'size',
      type: 'number',
      admin: {
        readOnly: true,
      },
    },
  ],
  upload: {
    staticDir: 'videos',
    // adminThumbnail: 'thumbnail',
    mimeTypes: ['video/mp4', 'video/quicktime'],
    crop: true,
    focalPoint: true,
  },
  hooks: {
    afterChange: [queueVideoCompression],
  },
}
