import { Tab } from 'payload'

export const ConfigI18nTab: Tab = {
  label: 'Translations',
  name: 'i18n',
  fields: [
    {
      name: 'es',
      label: {
        es: 'Español',
        en: 'Spanish',
        de: 'Spanisch',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'en',
      label: {
        es: 'Ingles',
        en: 'English',
        de: 'Englisch',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'de',
      label: {
        es: 'Aleman',
        en: 'German',
        de: 'Deutsch',
      },
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'es-ar',
      label: {
        es: 'Argentino',
        en: 'Argentine',
        de: 'Argentinisch',
      },
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
