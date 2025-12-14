"use client";

import "flag-icons/css/flag-icons.min.css";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { Flag } from "../Flag";
import { getSlugInOtherLanguage } from "./getSlugInOtherLanguage";
import { Configuration } from "@/payload-types";
import clsx from "clsx";
import { availableLocales } from "@/config/availableLocales";


type Props = {
    lang: string;
    tenantSlug: string;
    pageId: string;
    configuration?: Configuration;
    isMobile?: boolean;
};

export function LanguageSelector({
    lang,
    tenantSlug,
    pageId,
    configuration,
    isMobile = false,
}: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const i18n = configuration?.i18n ?? {};
    const availableLangs = availableLocales.filter((it) => !!i18n[it.code]);

    const currentLang = availableLangs.find((l) => l.code === lang) ?? availableLangs[0];
    const otherLangs = availableLangs.filter((l) => l.code !== lang);

    async function handleSelect(code: string) {
        setOpen(false);
        const tenantPrefix = tenantSlug ? `/${tenantSlug}` : "";
        const newSlug = await getSlugInOtherLanguage(pageId, code);
        router.push(`${tenantPrefix}/${code}/${newSlug}`);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    if (availableLangs.length <= 1) {
        return null;
    }

    // Mobile Version
    if (isMobile) {
        return (
            <div className="flex flex-wrap items-center justify-center gap-4 px-4">
                {availableLangs.map((locale) => {
                    const isCurrent = locale.code === lang;
                    return (
                        <button
                            key={locale.code}
                            onClick={() => !isCurrent && handleSelect(locale.code)}
                            disabled={isCurrent}
                            className={clsx(
                                "transition-opacity",
                                isCurrent ? "hidden" : ""
                            )}
                            aria-label={`Switch to ${locale.code}`}
                        >
                            <Flag countryCode={locale.flag} size={1.75} contrastBackground />
                        </button>
                    );
                })}
            </div>
        );
    }

    // Desktop: Wenn genau 2 Sprachen
    if (availableLangs.length === 2) {
        const otherLang = otherLangs[0];
        return (
            <button
                onClick={() => handleSelect(otherLang.code)}
                className="flex items-center justify-center p-2 hover:bg-gray-100"
                title={`Switch to ${otherLang.code}`}
            >
                <Flag countryCode={otherLang.flag} size="md" />
            </button>
        );
    }

    // Desktop: Dropdown für mehr als 2 Sprachen
    return (
        <div ref={wrapperRef} className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center p-2 hover:bg-card cursor-pointer"
                title="Select language"
            >
                <Flag countryCode={currentLang.flag} size="md" contrastBackground />
            </button>

            {open && (
                <div className={clsx(
                    "absolute right-0 z-10 mt-2 min-w-[52px] origin-top-right",
                    "bg-card shadow-lg",
                )}>
                    <div className="flex flex-col p-1">
                        {otherLangs.map((locale) => (
                            <button
                                key={locale.code}
                                onClick={() => handleSelect(locale.code)}
                                className="flex w-full items-center justify-center p-2 hover:bg-primary"
                                title={`Switch to ${locale.code}`}
                            >
                                <Flag countryCode={locale.flag} size="md" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}