"use client";

import { Configuration, Page } from "@/payload-types";
import { SectionContainer } from "../SectionContainer";
import clsx from "clsx";
import { isEmptyRichText } from "@/utilities/isEmptyEditorState";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getImageInfo } from "@/utilities/getImageInfo";
import { motion } from "framer-motion";

type TextProps = Extract<Page["layout"][0], { blockType: "text" }>;

type Props = {
    block: TextProps;
    configuration?: Configuration;
    index: number;
};

export function TextComponent({ block, index, configuration }: Props) {
    const text = block?.text;
    const imagePosition = block.imagePosition ?? "left";
    const isLeft = imagePosition === "left";
    const images = block.images ?? [];
    const variant = images?.length > 1 ? "grid" : "single";
    const hasImages = images.length > 0;

    return (
        <SectionContainer section={block.section} index={index} configuration={configuration}>
            <div
                className={clsx(
                    "flex flex-col gap-8 items-center",
                    hasImages && "md:flex-row",
                    hasImages && !isLeft && "md:flex-row-reverse"
                )}
            >
                {/* Bild-Bereich */}
                {hasImages && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className={clsx(
                            variant === "grid" && "grid grid-cols-2 gap-4 xl:gap-8 md:w-1/2",
                            variant === "single" && "md:w-1/2"
                        )}
                    >
                        {images.map((it, idx) => {
                            const info = getImageInfo(it.image);
                            return (
                                <div
                                    key={`${block.id}-${idx}`}
                                    className="overflow-hidden rounded-xl shadow-lg"
                                >
                                    <img
                                        src={info.url}
                                        alt={info.alt}
                                        className={clsx(
                                            "w-full h-auto object-cover transition-transform duration-500 hover:scale-105",
                                            variant === "grid" && "aspect-square"
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </motion.div>
                )}

                {/* Text-Bereich */}
                {!isEmptyRichText(text) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className={clsx(
                            "prose max-w-none text-lg md:text-xl",
                            hasImages && "md:w-1/2",
                            !hasImages && "w-full",
                            variant === "grid" && "p-8 rounded-xl shadow-lg"
                        )}
                    >
                        <RichText data={text!} />
                    </motion.div>
                )}
            </div>
        </SectionContainer>
    );
}