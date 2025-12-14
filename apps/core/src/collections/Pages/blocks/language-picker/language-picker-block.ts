import { Block } from 'payload'
import { SectionTab } from '@/fields/section/SectionTab'

export const LanguagePickerBlock: Block = {
  slug: 'language-picker',
  labels: {
    singular: 'Language Picker',
    plural: 'Language Pickers',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Langauge Picker',
          name: 'picker',
          fields: [
            {
              name: 'size',
              type: 'select',
              options: [
                {
                  value: 'small',
                  label: 'small',
                },
                {
                  value: 'medium',
                  label: 'medium',
                },
                {
                  value: 'large',
                  label: 'large',
                },
              ],
              defaultValue: 'medium',
            },
            {
              name: 'rounded',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
        SectionTab,
      ],
    },
  ],
}
