"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { defaultSlidesPerView, defaultBumpySpeed, defaultSmoothSpeed, defaultSliderGap, defaultCardHeight } from "./GalleryConfig";
import { useSlidesPerView } from "./useSlides";
import { getImageInfo } from "@/utilities/getImageInfo";
import { GalleryProps } from "./GalleryComponent";
import AutoScroll from "embla-carousel-auto-scroll";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { Card } from "@/components/Card";
import clsx from "clsx";

export function GalleryLayoutSlider({
    id,
    layout,
    images,
    motionType,
    slidesPerView,
    bumpySpeed,
    smoothSpeed,
    showAsCard = false,
    slideGap = defaultSliderGap,
    cardHeight = defaultCardHeight
}: GalleryProps) {
    const countSlides = useSlidesPerView(slidesPerView ?? defaultSlidesPerView);

    const options: EmblaOptionsType = {
        loop: true,
        direction: "ltr",
        align: "start",
        dragFree: true,
    };

    const plugins: EmblaPluginType[] = [];
    if (motionType === "smooth") {
        plugins.push(AutoScroll({ playOnInit: true, speed: smoothSpeed ?? defaultSmoothSpeed }));
    } else {
        plugins.push(Autoplay({ delay: bumpySpeed ?? defaultBumpySpeed, stopOnInteraction: false }));
    }

    const [emblaRef] = useEmblaCarousel(options, plugins);

    if (layout !== "slider") return null;

    const MaybeCard = showAsCard ? Card : "div";

    return (

        <div
            className="relative overflow-hidden"
            ref={emblaRef}
        >
            <div
                className="flex"
                style={{
                    gap: slideGap ?? defaultSliderGap,
                    paddingLeft: slideGap ?? defaultSliderGap,
                    paddingRight: slideGap ?? defaultSliderGap
                }}
            >
                {images.map((img) => {
                    const imgInfo = getImageInfo(img.image, "tablet");
                    return (
                        <MaybeCard
                            key={`${id}-${img.id}`}
                            style={{
                                flex: `0 0 ${100 / countSlides}%`,
                            }}
                            className={`min-w-0 relative`}
                        >
                            <div
                                style={{ height: `${cardHeight ?? defaultCardHeight}rem` }}
                                className={clsx(
                                    `w-full flex items-center justify-center`,
                                    showAsCard ? "p-4" : undefined
                                )}
                            >
                                <img
                                    src={imgInfo.url}
                                    alt={imgInfo.alt}
                                    className="max-w-full max-h-full object-contain"
                                    // fetchPriority="high"
                                    loading="lazy"
                                />
                            </div>
                        </MaybeCard>
                    );
                })}
            </div>
        </div>

    );
}

