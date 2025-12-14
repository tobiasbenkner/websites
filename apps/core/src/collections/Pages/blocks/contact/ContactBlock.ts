import { Block } from 'payload'
import { SectionTab } from '@/fields/section/SectionTab'

export const ContactBlock: Block = {
  slug: 'contact',
  labels: {
    plural: 'Contacts',
    singular: 'Contact',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [SectionTab],
    },
  ],
}
