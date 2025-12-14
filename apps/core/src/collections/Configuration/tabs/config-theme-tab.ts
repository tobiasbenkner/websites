import {
  background,
  onBackground,
  primary,
  onPrimary,
  secondary,
  onSecondary,
  surface,
  onSurface,
  error,
  onError,
  border,
} from '@/components/theme/ThemeConfig'
import { Tab } from 'payload'

export const ConfigThemeTab: Tab = {
  label: 'Theme',
  name: 'theme',
  fields: [
    {
      label: 'Background',
      type: 'group',
      fields: [
        {
          label: 'Background Color',
          type: 'text',
          name: 'background',
          defaultValue: background,
          admin: {
            placeholder: background,
          },
        },
        {
          label: 'On Background',
          type: 'text',
          name: 'fontColor',
          defaultValue: onBackground,
          admin: {
            placeholder: onBackground,
          },
        },
      ],
    },
    {
      label: 'Surface',
      type: 'group',
      fields: [
        {
          label: 'Surface Color',
          type: 'text',
          name: 'surface',
          defaultValue: surface,
          admin: {
            placeholder: surface,
          },
        },
        {
          label: 'On Surface',
          type: 'text',
          name: 'onSurface',
          defaultValue: onSurface,
          admin: {
            placeholder: onSurface,
          },
        },
      ],
    },
    {
      label: 'Primary',
      type: 'group',
      fields: [
        {
          label: 'Primary Color',
          type: 'text',
          name: 'primary',
          defaultValue: primary,
          admin: {
            placeholder: primary,
          },
        },
        {
          label: 'On Primary',
          type: 'text',
          name: 'onPrimary',
          defaultValue: onPrimary,
          admin: {
            placeholder: onPrimary,
          },
        },
      ],
    },
    {
      label: 'Secondary',
      type: 'group',
      fields: [
        {
          label: 'Secondary Color',
          type: 'text',
          name: 'secondary',
          defaultValue: secondary,
          admin: {
            placeholder: secondary,
          },
        },
        {
          label: 'On Secondary',
          type: 'text',
          name: 'onSecondary',
          defaultValue: onSecondary,
          admin: {
            placeholder: onSecondary,
          },
        },
      ],
    },
    {
      label: 'Error',
      type: 'group',
      fields: [
        {
          label: 'Error Color',
          type: 'text',
          name: 'error',
          defaultValue: error,
          admin: {
            placeholder: error,
          },
        },
        {
          label: 'On Error',
          type: 'text',
          name: 'onError',
          defaultValue: onError,
          admin: {
            placeholder: onError,
          },
        },
      ],
    },
    {
      label: 'Border',
      type: 'text',
      name: 'border',
      defaultValue: border,
      admin: {
        placeholder: border,
      },
    },
  ],
}
