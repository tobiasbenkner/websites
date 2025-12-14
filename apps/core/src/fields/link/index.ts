import { Field, GroupField } from 'payload'

type Props = {
  appearance?: boolean
  name?: string
}

export const Link = ({ appearance = true, name }: Props): GroupField => {
  const field: GroupField = {
    name: name ? name : 'link',
    type: 'group',
    fields: [
      {
        label: 'Label',
        name: 'label',
        type: 'text',
        localized: true,
      },
      {
        name: 'newTab',
        type: 'checkbox',
        admin: {
          style: {
            alignSelf: 'flex-end',
          },
          width: '50%',
        },
        label: 'Open in new tab',
      },
      {
        name: 'type',
        type: 'radio',
        admin: {
          layout: 'horizontal',
          width: '50%',
        },
        defaultValue: 'reference',
        options: [
          {
            label: 'Internal link',
            value: 'reference',
          },
          {
            label: 'Custom URL',
            value: 'custom',
          },
        ],
      },

      {
        name: 'reference',
        type: 'relationship',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
        label: 'Document to link to',
        relationTo: ['pages'],
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
        label: 'Custom URL',
        required: true,
      },
    ],
  }

  if (appearance) {
    field.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'primary',
      options: [
        { label: { es: 'Primero', en: 'Primary', de: 'Primär' }, value: 'primary' },
        { label: { es: 'Secundo', en: 'Secondary', de: 'Secondär' }, value: 'secondary' },
      ],
    })
  }

  return field
}

export const LinkGroup = ({ appearance = true, name }: Props): Field => {
  const generatedLinkGroup: Field = {
    name: name ? name : 'links',
    type: 'array',
    fields: [
      Link({
        appearance,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  }

  return generatedLinkGroup
}
