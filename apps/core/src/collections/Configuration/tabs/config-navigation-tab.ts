import { LinkGroup } from '@/fields/link'
import { Tab } from 'payload'

export const ConfigNavigationTab: Tab = {
  label: 'Navigation',
  name: 'navigation',
  fields: [
    {
      name: 'logo',
      label: {
        en: 'Logo',
        es: 'Logo',
        de: 'Logo',
      },
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'sticky',
      label: {
        en: 'Sticky',
        es: 'Sticky',
        de: 'Sticky',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'transparent',
      label: {
        en: 'Transparent',
        es: 'Transparent',
        de: 'Transparent',
      },
      type: 'checkbox',
    },
    {
      name: 'heroMode',
      label: {
        en: 'Hero Mode',
        es: 'Hero Mode',
        de: 'Hero Mode',
      },
      type: 'checkbox',
    },
    {
      name: 'borderBottom',
      label: {
        en: 'Border Bottom',
        es: 'Border Bottom',
        de: 'Border Bottom',
      },
      type: 'checkbox',
    },
    LinkGroup({ appearance: false }),
    LinkGroup({ appearance: false, name: 'actions' }),
  ],
}
