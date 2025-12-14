"use client";

import { availableLocales } from '@/config/availableLocales';
import { Configuration, Page } from '@/payload-types';
import clsx from 'clsx';
import React from 'react';
import { SectionContainer } from '../SectionContainer';
import { useRouter } from 'next/navigation';
import { getSlugInOtherLanguage } from '@/components/navigation/getSlugInOtherLanguage';
import { Flag } from '@/components/Flag';
import { useCurrentBreakpoint } from '@/utilities/useCurrentBreakpoint';
import { Breakpoint } from '@/utilities/breakpoints';

export type LanguagePickerBlock = Extract<Page["layout"][0], { blockType: "language-picker" }>;

type Props = {
    block: LanguagePickerBlock;
    configuration?: Configuration;
    index: number;
    lang: string;
    tenantSlug: string;
    pageId: string;
};

export function LanguagePickerComponent({ block, lang, configuration, index, tenantSlug, pageId }: Props) {

    const router = useRouter();
    const currentBreakpoint = useCurrentBreakpoint();

    const i18n = configuration?.i18n ?? {};
    const availableLangs = availableLocales.filter((it) => !!i18n[it.code]);


    async function onLanguageChange(lang: string) {
        const tenantPrefix = tenantSlug ? `/${tenantSlug}` : "";
        const newSlug = await getSlugInOtherLanguage(pageId, lang);
        router.push(`${tenantPrefix}/${lang}/${newSlug}`);
    }

    const sizes: Breakpoint[] = ["xs", "sm", "md"];
    const size = sizes.includes(currentBreakpoint) ? "lg" : 2.2;

    return (
        <SectionContainer configuration={configuration} section={block.section} index={index}>
            <div className={clsx(`flex flex-wrap justify-center items-center gap-4 md:gap-8`)}>
                {availableLangs.map((locale) => {
                    const isCurrent = locale.code === lang;
                    return (
                        <button
                            key={locale.code}
                            onClick={() => !isCurrent && onLanguageChange(locale.code)}
                            disabled={isCurrent}
                            className={clsx(
                                "flex",
                                locale.code === lang ? "border-2 border-border rounded p-2" : "",
                            )}
                            aria-label={`Switch to ${locale.code}`}
                        >
                            <Flag countryCode={locale.flag} size={size} contrastBackground />
                        </button>
                    );
                })}
            </div>
        </SectionContainer>
    );
}