import { Tab } from 'payload'

export const ConfigFooterTab: Tab = {
  label: 'Footer',
  name: 'footer',
  fields: [
    {
      name: 'minimal',
      label: {
        en: 'Minimal',
        es: 'Minimal',
        de: 'Minimal',
      },
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
