import { superAdminOrTenantAdminAccess } from '@/access/superAdminOrTenantAdmin'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: superAdminOrTenantAdminAccess,
    delete: superAdminOrTenantAdminAccess,
    read: () => true,
    update: superAdminOrTenantAdminAccess,
  },
  fields: [
    {
      name: 'alt',
      label: {
        en: 'Description',
        de: 'Beschreibung',
        es: 'Descripción',
      },
      type: 'text',
      required: true,
      admin: {
        description: {
          en: 'Search engines use alt text to understand the content of an image, as they cannot "see" images themselves.',
          de: 'Suchmaschinen nutzen den alt-Text, um den Inhalt eines Bildes zu verstehen, da sie Bilder selbst nicht "sehen" können.',
          es: 'Los motores de búsqueda utilizan el texto alternativo para comprender el contenido de una imagen, ya que no pueden "ver" las imágenes por sí mismos.',
        },
        placeholder: {
          en: 'Smiling woman with laptop in office',
          es: 'Mujer sonriente con un ordenador portátil en la oficina',
          de: 'Lächelnde Frau mit Laptop im Büro',
        },
      },
    },
  ],
  upload: {
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    crop: true,
    focalPoint: true,
    // Convert original upload to WebP
    formatOptions: {
      format: 'webp',
      options: {
        quality: 95,
        effort: 6,
        smartSubsample: true,
      },
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
            effort: 6,
          },
        },
      },
      {
        name: 'card',
        width: 768,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
            effort: 6,
          },
        },
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
            effort: 6,
          },
        },
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
            effort: 6,
          },
        },
      },
      {
        name: 'seo',
        width: 1200,
        height: 630,
        withoutEnlargement: false,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
            effort: 6,
          },
        },
      },
    ],
  },
}
