import { SectionTab } from '@/fields/section/SectionTab'
import { Block } from 'payload'

export const ProductsBlock: Block = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Speisekarte',
          name: 'menu',
          fields: [
            {
              type: 'select',
              name: 'allergens',
              options: [
                {
                  value: '1',
                  label: 'Color',
                },
                {
                  value: '2',
                  label: 'Black / White',
                },
              ],
              defaultValue: '1',
            },
          ],
        },
        SectionTab,
      ],
    },
  ],
}
