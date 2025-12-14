import { Tab } from 'payload'
import {
  defaultPaddingBottom,
  defaultPaddingLeft,
  defaultPaddingRight,
  defaultPaddingTop,
} from './SectionConfig'

export const SectionTab: Tab = {
  label: 'Section',
  name: 'section',
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'align',
      type: 'select',
      defaultValue: 'center',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'withLine',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'fullWidth',
      label: 'Full Width',
      type: 'checkbox',
    },
    {
      name: 'padding',
      label: 'Padding',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'top',
              label: 'Top',
              type: 'number',
              defaultValue: defaultPaddingTop,
              admin: {
                width: '50%',
                placeholder: defaultPaddingTop.toString(),
              },
            },
            {
              name: 'bottom',
              label: 'Bottom',
              type: 'number',
              defaultValue: defaultPaddingBottom,
              admin: {
                width: '50%',
                placeholder: defaultPaddingBottom.toString(),
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'left',
              label: 'Left',
              type: 'number',
              defaultValue: defaultPaddingLeft,
              admin: {
                width: '50%',
                placeholder: defaultPaddingLeft.toString(),
              },
            },
            {
              name: 'right',
              label: 'Right',
              type: 'number',
              defaultValue: defaultPaddingRight,
              admin: {
                width: '50%',
                placeholder: defaultPaddingRight.toString(),
              },
            },
          ],
        },
      ],
    },
  ],
}
