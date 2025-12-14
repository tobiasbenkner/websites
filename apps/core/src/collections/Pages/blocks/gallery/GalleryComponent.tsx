import { Configuration, Page } from '@/payload-types';
import React from 'react';
import { GalleryLayoutGallery } from './GalleryLayoutGallery';
import { GalleryLayoutSeparator } from './GalleryLayoutSeparator';
import { GalleryLayoutSlider } from './GalleryLayoutSlider';
import { SectionContainer } from '../SectionContainer';

export type GalleryProps = Extract<Page['layout'][0], { blockType: 'gallery' }>

type Props = {
  block: GalleryProps;
  lang: string;
  tenantSlug: string;
  index: number;
  configuration?: Configuration;
}

export function GalleryComponent({
  block,
  configuration,
  index
}: Props) {

  return <SectionContainer
    section={block.section}
    index={index}
    configuration={configuration}
  >
    <GalleryLayoutGallery {...block} />
    <GalleryLayoutSeparator {...block} />
    <GalleryLayoutSlider {...block} />
  </SectionContainer>
}
