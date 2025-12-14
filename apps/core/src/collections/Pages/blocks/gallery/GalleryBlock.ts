import { Block } from 'payload'
import {
  defaultSlidesPerView,
  defaultBumpySpeed as defaultBumpySpeed,
  defaultSmoothSpeed,
  defaultSliderGap,
} from './GalleryConfig'
import { SectionTab } from '@/fields/section/SectionTab'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Images',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Bilder',
              required: true,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'layout',
              type: 'select',
              label: 'Layout',
              required: true,
              defaultValue: 'gallery',
              options: [
                { label: 'Bildergalerie', value: 'gallery' },
                { label: 'Bildseparator', value: 'separator' },
                { label: 'Slider (automatisch)', value: 'slider' },
              ],
            },
            {
              name: 'slidesPerView',
              type: 'number',
              label: 'slidesPerView',
              admin: {
                condition: (_, siblingData) => siblingData.layout === 'slider',
              },
              defaultValue: defaultSlidesPerView,
            },
            {
              name: 'showAsCard',
              type: 'checkbox',
              label: 'Show as Card',
              admin: {
                condition: (_, siblingData) => siblingData.layout === 'slider',
              },
              defaultValue: false,
            },
            {
              name: 'slideGap',
              label: 'Slide Abstand (px)',
              type: 'number',
              defaultValue: defaultSliderGap,
              admin: {
                description: 'Abstand zwischen den Slides in Pixeln',
              },
            },
            {
              name: 'cardHeight',
              label: 'Card Height (rem)',
              type: 'number',
              defaultValue: defaultSliderGap,
              admin: {
                description: 'Höhe in REM',
              },
            },
            {
              name: 'motionType',
              type: 'select',
              label: 'motionType',
              required: true,
              defaultValue: 'smooth',
              options: [
                { label: 'Smooth', value: 'smooth' },
                { label: 'Bumpy', value: 'bumpy' },
              ],
            },
            {
              name: 'bumpySpeed',
              type: 'number',
              label: 'Bumpy Speed (ms)',
              admin: {
                condition: (_, siblingData) => siblingData.motionType === 'bumpy',
              },
              defaultValue: defaultBumpySpeed,
            },
            {
              name: 'smoothSpeed',
              type: 'number',
              label: 'Smooth Geschwindigkeit (seconds)',
              admin: {
                condition: (_, siblingData) => siblingData.motionType === 'smooth',
              },
              defaultValue: defaultSmoothSpeed,
            },
          ],
        },
        SectionTab,
      ],
    },
  ],
}
