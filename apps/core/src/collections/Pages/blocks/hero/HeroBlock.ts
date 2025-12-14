import { Link } from '@/fields/link'
import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heros',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'richText',
      required: false,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Media',
          fields: [
            {
              name: 'background',
              label: {
                es: 'Background',
                en: 'Background',
                de: 'Hintergrund',
              },
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'videos',
              admin: {
                description:
                  'Optional. Wenn ein Video hinzugefügt wird, ersetzt es das Hintergrundbild.',
              },
            },
            {
              name: 'logo',
              label: {
                es: 'Logo',
                en: 'Logo',
                de: 'Logo',
              },
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'logoSize',
              label: 'Logogröße',
              type: 'select',
              defaultValue: 'medium',
              admin: {
                condition: (_, siblingData) => siblingData.logo,
              },
              options: [
                {
                  label: {
                    es: 'Pequeño',
                    de: 'Klein',
                    en: 'Small',
                  },
                  value: 'small',
                },
                { label: 'Mittel', value: 'medium' },
                { label: 'Groß', value: 'large' },
                { label: 'Extra Groß', value: 'xlarge' },
              ],
            },
            {
              name: 'logoPosition',
              label: 'LogoPosition',
              type: 'select',
              defaultValue: 'center',
              admin: {
                condition: (_, siblingData) => siblingData.logo,
              },
              options: [
                {
                  label: {
                    es: 'Izquierda',
                    de: 'Links',
                    en: 'Left',
                  },
                  value: 'left',
                },
                {
                  label: {
                    es: 'Centro',
                    de: 'Mitte',
                    en: 'Center',
                  },
                  value: 'center',
                },

                {
                  label: {
                    es: 'Derecha',
                    de: 'Rechts',
                    en: 'Right',
                  },
                  value: 'right',
                },
              ],
            },
          ],
        },
        {
          label: 'Links',
          fields: [
            {
              name: 'links',
              type: 'array',
              maxRows: 2,
              fields: [
                Link({
                  appearance: true,
                }),
              ],
            },
          ],
        },
        {
          label: 'Darstellung & Layout',
          fields: [
            {
              name: 'contentPlacement',
              label: 'Position des Inhalts',
              type: 'select',
              defaultValue: 'center',
              options: [
                { label: 'Oben Links', value: 'top-left' },
                { label: 'Zentriert', value: 'center' },
                { label: 'Unten Links', value: 'bottom-left' },
              ],
            },
            // NEU: Einstellung für die Höhe der Sektion
            {
              name: 'height',
              label: 'Höhe der Sektion',
              type: 'select',
              defaultValue: 'fullscreen',
              options: [
                { label: 'Vollbild', value: 'fullscreen' },
                { label: 'Groß (75% der Höhe)', value: 'large' },
                { label: 'Mittel (50% der Höhe)', value: 'medium' },
                { label: 'Klein (30% der Höhe)', value: 'small' },
              ],
            },
            {
              name: 'overlay',
              label: 'Hintergrund-Overlay',
              type: 'select',
              defaultValue: 'dark',
              options: [
                { label: 'Dunkel', value: 'dark' },
                { label: 'Kein Overlay', value: 'none' },
              ],
            },
            {
              name: 'textColor',
              label: 'Textfarbe',
              type: 'select',
              defaultValue: 'light',
              admin: {
                description:
                  'Helle Schrift für dunkle Hintergründe, dunkle Schrift für helle Hintergründe.',
              },
              options: [
                { label: 'Hell (Weiß)', value: 'light' },
                { label: 'Dunkel (Schwarz)', value: 'dark' },
              ],
            },
            {
              label: 'Animation aktivieren',
              type: 'checkbox',
              name: 'is_animated',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
}
