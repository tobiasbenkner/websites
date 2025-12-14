import { Tab } from 'payload'
import { allBlocks } from '../blocks/all-blocks'

export const ContentTab: Tab = {
  label: 'Content',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: allBlocks,
    },
  ],
}
