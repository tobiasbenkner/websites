"use client";

import { Configuration } from "@/payload-types";
import { getUrlFromLink } from "@/utilities/getUrlFromLink";
import clsx from "clsx";
import Link from "next/link";
import { useHeroMode } from "./useHeroMode";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "./LanguageSelector";

type Props = {
    configuration?: Configuration;
    lang: string;
    tenantSlug: string;
    pageId: string;
}

export function DesktopLinks({ configuration, lang, tenantSlug, pageId }: Props) {

    const pathname = usePathname();
    const isHeroModeActive = useHeroMode(configuration);
    const actions = configuration?.navigation?.actions ?? [];
    const links = configuration?.navigation?.links ?? [];

    return <>
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {links.map((cta) => {
                const url = getUrlFromLink(cta.link, tenantSlug, lang);
                const isActive = pathname === url;

                return (
                    <Link
                        key={cta.id}
                        href={url}
                        target={!!cta.link?.newTab ? "_blank" : "_self"}
                        className={clsx(
                            "font-medium py-2 px-3 transition-colors duration-200 relative group",
                            // Hero mode styles (nicht gescrollt)
                            isHeroModeActive && "text-white drop-shadow-sm hover:text-white/80",
                            // Normal mode styles (gescrollt)
                            !isHeroModeActive && "text-foreground hover:text-primary",
                            // Active state
                            isActive && isHeroModeActive && "text-white font-semibold",
                            isActive && !isHeroModeActive && "text-primary"
                        )}
                    >
                        {cta.link?.label}

                        {/* Active indicator */}
                        {isActive && (
                            <span
                                className={clsx(
                                    "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-full transition-all duration-200",
                                    isHeroModeActive ? "bg-white" : "bg-primary"
                                )}
                            />
                        )}

                        {/* Hover indicator */}
                        {!isActive && (
                            <span
                                className={clsx(
                                    "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-0 group-hover:w-full transition-all duration-200",
                                    isHeroModeActive ? "bg-white/50" : "bg-primary/50"
                                )}
                            />
                        )}
                    </Link>
                );
            })}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
            {actions.map((cta) => {
                const url = getUrlFromLink(cta.link, tenantSlug, lang);

                return (
                    <Link
                        key={cta.id}
                        href={url}
                        target={!!cta.link?.newTab ? "_blank" : "_self"}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
                            "bg-primary text-primary-foreground hover:opacity-90"
                        )}
                    >
                        {cta.link?.label}
                    </Link>
                );
            })}
        </div>

        <div className="hidden md:flex">
            <LanguageSelector lang={lang} tenantSlug={tenantSlug} pageId={pageId} configuration={configuration} />
        </div>
    </>
}