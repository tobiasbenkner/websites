"use client";

import { Configuration, Page } from "@/payload-types";
import { getImageInfo } from "@/utilities/getImageInfo";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";
import { getUrlFromLink } from "@/utilities/getUrlFromLink";
import { isEmptyRichText } from "@/utilities/isEmptyEditorState";
import { SectionContainer } from "../SectionContainer";
import { navHeight } from "@/components/navigation/config";

type HeroProps = Extract<Page['layout'][0], { blockType: 'hero' }>

type Props = {
    block: HeroProps;
    lang: string;
    tenantSlug: string;
    index: number;
    configuration?: Configuration;
}

export function HeroComponent({ block, lang, tenantSlug, index, configuration }: Props) {
    const {
        title,
        subtitle,
        links,
        background,
        video,
        logo,
        contentPlacement = 'center',
        logoPosition = "center",
        height = 'fullscreen',
        logoSize = 'medium',
        overlay = 'dark',
        textColor = 'light',
        is_animated: isAnimated,
    } = block;



    const isHeroMode = !!configuration?.navigation?.heroMode;
    const isFirstElement = index === 0;

    const backgroundInfo = getImageInfo(background);
    const logoInfo = getImageInfo(logo);

    const isDarkText = textColor === 'dark';
    const styleHeight = isHeroMode && isFirstElement ? heightCalc[height!] : `calc(${heightCalc[height!]} - ${navHeight}px)`

    return (
        <SectionContainer
            section={{
                fullWidth: true,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            }}
            index={index}
            configuration={configuration}
        >
            <section
                className={clsx(
                    "relative w-full overflow-hidden flex z-10",
                )}
                style={{ height: styleHeight }}
            >
                <div className="absolute inset-0 z-[-1]">
                    {!!video && typeof video === "object" && video.url ? (
                        <video
                            className="w-full h-full object-cover"
                            src={video.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <div
                            className="w-full h-full bg-cover bg-no-repeat"
                            style={{
                                backgroundImage: backgroundInfo.url ? `url("${backgroundInfo.url}")` : undefined,
                                backgroundPosition: backgroundInfo.url ? `${backgroundInfo.focalX}% ${backgroundInfo.focalY}%` : undefined,
                            }}
                        />
                    )}
                </div>

                {/* Overlay */}
                {overlay !== 'none' && (
                    <div className={clsx("absolute inset-0", overlayClasses[overlay!])} />
                )}

                {/* Inhalt */}
                <div className={clsx(
                    "relative z-10 w-full flex p-8 md:p-12",
                    placementClasses[contentPlacement ?? "center"]
                )}>
                    <motion.div
                        className="container"
                        variants={isAnimated ? containerVariants : undefined}
                        initial="hidden"
                        animate="visible"
                    >
                        {logoInfo.url && (
                            <motion.div
                                variants={isAnimated ? itemVariants : undefined}
                                className="mb-8"
                            >
                                <img
                                    src={logoInfo.url}
                                    alt="Logo"
                                    className={clsx(
                                        "h-auto w-full",
                                        {
                                            'mx-auto': logoPosition === "center",
                                            'ml-0 mr-auto': logoPosition === "left",
                                            'ml-auto mr-0': logoPosition === "right",
                                        },
                                        logoSizeClasses[logoSize ?? "medium"],
                                        { 'mx-0': (contentPlacement ?? "center").includes('left') } // Logo linksbündig bei linkem Content
                                    )}
                                />
                            </motion.div>
                        )}

                        {title && (
                            <motion.h1
                                variants={isAnimated ? itemVariants : undefined}
                                className={clsx(
                                    "whitespace-pre-line text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-lg",
                                    isDarkText ? 'text-gray-900' : 'text-white' // NEU: Dynamische Textfarbe
                                )}
                            >
                                {title}
                            </motion.h1>
                        )}

                        {!isEmptyRichText(subtitle) && (
                            <motion.div
                                variants={isAnimated ? itemVariants : undefined}
                                className={clsx(
                                    "prose prose-p:text-lg md:prose-p:text-xl max-w-none mt-6",
                                    isDarkText ? 'prose-p:text-gray-700' : 'prose-invert prose-p:text-white/80'
                                )}
                            >
                                <RichText data={subtitle!} />
                            </motion.div>
                        )}

                        {links && links.length > 0 && (
                            <motion.div
                                variants={isAnimated ? itemVariants : undefined}
                                className={clsx(
                                    "gap-4 flex",
                                    // Passt die Ausrichtung der Buttons an die des restlichen Inhalts an
                                    {
                                        'justify-start': (contentPlacement ?? "center").includes('left'),
                                        'justify-center': contentPlacement === 'center',
                                        'items-center': contentPlacement === 'center',
                                    },
                                    (title || !isEmptyRichText(subtitle)) ? "mt-10" : ""
                                )}
                            >
                                {links.map((cta) => {
                                    const url = getUrlFromLink(cta.link, tenantSlug, lang);
                                    const appearance = cta.link?.appearance ?? "primary";
                                    const finalButtonStyles = isDarkText ? buttonStylesDark : buttonStylesLight;

                                    return (
                                        <Link
                                            key={cta.id}
                                            href={url}
                                            target={!!cta.link?.newTab ? "_blank" : "_self"}
                                            className={clsx(
                                                "inline-block rounded-md px-8 py-3 text-lg font-semibold transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                                finalButtonStyles[appearance],
                                                isDarkText ? 'focus-visible:ring-offset-white' : 'focus-visible:ring-offset-gray-900'
                                            )}
                                        >
                                            {cta.link?.label}
                                        </Link>
                                    )
                                })}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section >
        </SectionContainer>
    );
}

const placementClasses = {
    'bottom-left': 'justify-start items-end text-left',
    'center': 'justify-center items-center text-center',
    'top-left': 'justify-start items-start text-left',
};

const buttonStylesLight = {
    primary: 'bg-white text-gray-900 hover:bg-gray-200 focus-visible:ring-white',
    secondary: 'bg-transparent text-white border border-white hover:bg-white/10 focus-visible:ring-white',
};

const buttonStylesDark = {
    primary: 'bg-gray-900 text-white hover:bg-gray-700 focus-visible:ring-gray-900',
    secondary: 'bg-transparent text-gray-900 border border-gray-900 hover:bg-black/10 focus-visible:ring-gray-900',
};


const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const heightCalc = {
    fullscreen: '100svh',
    large: '75svh',
    medium: '50svh',
    small: '30svh',
};

const logoSizeClasses = {
    small: 'max-w-48',  // 192px
    medium: 'max-w-96', // 384px
    large: 'max-w-xl',  // 672px
    xlarge: 'max-w-3xl',// 896px
};

const overlayClasses = {
    none: '',
    dark: 'bg-gradient-to-t from-black/70 to-black/20',
    light: 'bg-gradient-to-t from-white/70 to-white/20',
};