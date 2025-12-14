import { Tab } from 'payload'

export const ConfigContactTab: Tab = {
  label: 'Contact',
  name: 'contact',
  fields: [
    {
      type: 'group',
      fields: [
        {
          label: 'Öffnungszeiten',
          name: 'schedule',
          type: 'array',
          fields: [
            {
              name: 'day',
              type: 'text',
              label: 'Tag',
              localized: true,
            },
            {
              name: 'time',
              type: 'textarea',
              label: 'Zeit',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'phone',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'phone',
          options: [
            {
              label: 'Phone',
              value: 'phone',
            },
            {
              label: 'WhatsApp',
              value: 'whatsapp',
            },
            {
              label: 'E-Mail',
              value: 'email',
            },
          ],
        },
        {
          name: 'link',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      label: 'Address',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'textarea',
        },
        {
          name: 'maps',
          type: 'text',
        },
      ],
    },
  ],
}
