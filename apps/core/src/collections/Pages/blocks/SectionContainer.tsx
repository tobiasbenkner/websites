"use client";

import { defaultPaddingBottom, defaultPaddingLeft, defaultPaddingRight, defaultPaddingTop, getResponsivePadding } from "@/fields/section/SectionConfig";
import { Configuration, Page } from "@/payload-types";
import { getImageInfo } from "@/utilities/getImageInfo";
import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { SectionTitle } from "./SectionTitle";
import { navHeight } from "@/components/navigation/config";

type PageLayout = Page['layout'][number];

type GalleryBlock = Extract<PageLayout, { blockType: 'gallery' }>
type SectionType = GalleryBlock['section'];

interface SectionContainerProps {
    section?: SectionType;
    configuration?: Configuration;
    children: ReactNode;
    index: number
}
export function SectionContainer({
    section,
    children,
    configuration,
    index
}: SectionContainerProps) {

    const isHeroMode = !!configuration?.navigation?.heroMode;
    const isFirstElement = index === 0;

    const style: CSSProperties = {
        backgroundColor: section?.backgroundColor ?? undefined,
        marginTop: isHeroMode && isFirstElement ? 0 : navHeight,
    }

    if (section?.backgroundImage) {
        const info = getImageInfo(section.backgroundImage);
        style.backgroundImage = `url(${info.url})`;
        style.backgroundPosition = `${info.focalX}% ${info.focalY}%`;
        style.backgroundSize = "cover";
    }

    const title = section?.title ?? "";
    const subtitle = section?.subtitle ?? "";
    const titleAlignment = section?.align ?? "center";

    return (
        <section
            style={style}
        >
            <div
                style={{
                    paddingLeft: getResponsivePadding(section?.padding?.left ?? defaultPaddingLeft),
                    paddingRight: getResponsivePadding(section?.padding?.right ?? defaultPaddingRight),
                    paddingTop: getResponsivePadding(section?.padding?.top ?? defaultPaddingTop),
                    paddingBottom: getResponsivePadding(section?.padding?.bottom ?? defaultPaddingBottom),
                }}
                className={clsx(
                    section?.fullWidth ? "" : "container",
                    "mx-auto"
                )}>

                {title && (
                    <SectionTitle
                        title={title}
                        subtitle={subtitle}
                        align={titleAlignment}
                    />
                )}

                {children}
            </div>
        </section>
    );
}