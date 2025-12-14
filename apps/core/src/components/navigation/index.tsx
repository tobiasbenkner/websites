"use client";

import { Configuration } from "@/payload-types"
import { getUrlFromLink } from "@/utilities/getUrlFromLink";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { NavLogo } from "./Logo";
import { useHeroMode } from "./useHeroMode";
import { DesktopLinks } from "./DesktopLinks";
import { LanguageSelector } from "./LanguageSelector";
import { navHeight } from "./config";

type Props = {
    configuration?: Configuration;
    lang: string;
    tenantSlug: string;
    pageId: string;
}

export function Navigation({ configuration, tenantSlug, lang, pageId }: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isHeroModeActive = useHeroMode(configuration);

    const isSticky = !!configuration?.navigation?.sticky;
    const isHeroMode = !!configuration?.navigation?.heroMode;
    const isTransparent = !!configuration?.navigation?.transparent;

    const links = configuration?.navigation?.links ?? [];
    const actions = configuration?.navigation?.actions ?? [];
    const borderBottom = !!configuration?.navigation?.borderBottom;

    return (
        <nav
            className={clsx(
                "w-full z-50 transition-all duration-500 ease-out",
                isSticky ? "fixed top-0 left-0 right-0" : "absolute top-0 left-0 right-0",
                (!isHeroModeActive && isTransparent) ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" : "",
                (!isHeroModeActive && !isTransparent) ? "bg-background" : "",
                (!isHeroModeActive && borderBottom) ? "border-b border-border" : "",
                isMenuOpen ? "bg-background" : "",
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(
                        "flex items-center justify-between gap-4",
                        // isHeroModeActive ? "h-20 md:h-24" : "",
                    )}
                    style={{ height: navHeight }}
                >
                    <NavLogo configuration={configuration} isHeroModeActive={isHeroMode} lang={lang} tenantSlug={tenantSlug} />
                    <DesktopLinks configuration={configuration} lang={lang} tenantSlug={tenantSlug} pageId={pageId} />

                    {/* Mobile Action Buttons & Menu */}
                    <div className="flex md:hidden items-center space-x-2">
                        {/* Mobile Actions (Always visible) */}
                        {actions.slice(-2).map((cta) => {
                            const url = getUrlFromLink(cta.link, tenantSlug, lang);

                            return (
                                <Link
                                    key={cta.id}
                                    href={url}
                                    target={!!cta.link?.newTab ? "_blank" : "_self"}
                                    className={clsx(
                                        "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300",
                                        "bg-primary text-primary-foreground"
                                    )}
                                >
                                    {cta.link?.label}
                                </Link>
                            );
                        })}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={clsx(
                                "ml-2 inline-flex items-center justify-center p-2 rounded-md transition-all duration-300",
                                "hover:scale-110 active:scale-95",
                                "bg-primary text-primary-foreground"
                            )}
                            aria-expanded="false"
                        >
                            <span className="sr-only">Hauptmenü öffnen</span>
                            <svg
                                className={clsx(
                                    "h-6 w-6 transform transition-all duration-300",
                                    isMenuOpen && "rotate-180"
                                )}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={clsx(
                        "md:hidden transition-all duration-300 overflow-hidden",
                        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div
                        className={clsx(
                            "py-4 space-y-1 transition-all duration-300",
                            "border-t border-border",
                        )}
                    >
                        {links.map((cta) => {
                            const url = getUrlFromLink(cta.link, tenantSlug, lang);
                            return (
                                <Link
                                    key={cta.id}
                                    href={url}
                                    target={!!cta.link?.newTab ? "_blank" : "_self"}
                                    className={clsx(
                                        "block px-4 py-3 rounded-lg transition-all duration-200",
                                        "text-white hover:bg-white/20"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {cta.link?.label}
                                </Link>
                            );
                        })}

                        {/* Additional actions in mobile menu */}
                        {actions.length > 2 && (
                            <div
                                className={clsx(
                                    "pt-4 mt-4 transition-all duration-300",
                                    isHeroModeActive
                                        ? "border-t border-white/20"
                                        : "border-t border-gray-200/30"
                                )}
                            >
                                {actions.slice(0, -2).map((cta) => {
                                    const url = getUrlFromLink(cta.link, tenantSlug, lang);
                                    return (
                                        <Link
                                            key={cta.id}
                                            href={url}
                                            target={!!cta.link?.newTab ? "_blank" : "_self"}
                                            className={clsx(
                                                "block px-4 py-3 rounded-lg transition-all duration-200",
                                                "text-white hover:bg-white/20"
                                            )}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {cta.link?.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}

                        <div className="py-3 pt-4 mt-4 border-t border-border">
                            <LanguageSelector
                                lang={lang}
                                tenantSlug={tenantSlug}
                                pageId={pageId}
                                configuration={configuration}
                                isMobile={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}