import { Block } from 'payload'
import { SectionTab } from '@/fields/section/SectionTab'

export const TextBlock: Block = {
  slug: 'text',
  labels: {
    singular: 'Text',
    plural: 'Textes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Photo',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Bilder',
              required: false,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              label: 'Text',
              type: 'richText',
              name: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'Links', value: 'left' },
                { label: 'Rechts', value: 'right' },
              ],
              defaultValue: 'left',
            },
          ],
        },
        SectionTab,
      ],
    },
  ],
}
