import { SectionTab } from '@/fields/section/SectionTab'
import { Block } from 'payload'

export const EmbedBlock: Block = {
  slug: 'embed',
  labels: {
    singular: 'embed',
    plural: 'embed',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'embed',
          name: 'embed',
          fields: [
            {
              type: 'text',
              name: 'url',
            },
          ],
        },
        SectionTab,
      ],
    },
  ],
}
