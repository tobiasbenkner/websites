"use client";

import { Configuration } from "@/payload-types";
import { getImageInfo } from "@/utilities/getImageInfo";
import clsx from "clsx";
import Link from "next/link";

type Props = {
    configuration?: Configuration;
    isHeroModeActive: boolean;
    tenantSlug: string;
    lang: string;
}

export function NavLogo({ configuration, isHeroModeActive, tenantSlug, lang }: Props) {

    const logo = getImageInfo(configuration?.navigation?.logo, "card");
    const url = tenantSlug ? `/${tenantSlug}/${lang}` : `/${lang}`

    if (!logo.url) {
        return <div></div>;
    }

    return (
        <div className="flex-shrink-0 transition-all duration-500 ease-out">
            <Link href={url}>
                <img
                    src={logo.url}
                    alt={logo.alt}
                    className={clsx(
                        "w-auto transition-all duration-500 ease-out",
                        isHeroModeActive
                            ? "h-10 md:h-14"
                            : "h-8 md:h-10"
                    )}
                />
            </Link>
        </div>
    )
}