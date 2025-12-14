"use client"
import { useCurrentBreakpoint } from "@/utilities/useCurrentBreakpoint";
import { useEffect, useState } from "react";

export function useSlidesPerView(userValue: number) {
    const [slidesPerView, setSlidesPerView] = useState(1);
    const breakpoint = useCurrentBreakpoint();

    useEffect(() => {
        if (breakpoint === "xs") {
            setSlidesPerView(Math.min(1, userValue));
        } else if (breakpoint === "sm") {
            setSlidesPerView(Math.min(2, userValue));
        } else if (breakpoint === "md") {
            setSlidesPerView(Math.min(3, userValue));
        } else if (breakpoint === "lg") {
            setSlidesPerView(Math.min(4, userValue));
        } else if (breakpoint === "xl") {
            setSlidesPerView(Math.min(4, userValue));
        } else {
            setSlidesPerView(userValue);
        }
    }, [breakpoint, userValue]);

    return slidesPerView;
}
