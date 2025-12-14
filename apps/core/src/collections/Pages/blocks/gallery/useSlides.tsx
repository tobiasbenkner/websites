"use client"
import { useCurrentBreakpoint } from "@/utilities/useCurrentBreakpoint";
import { useMemo } from "react";

const BREAKPOINT_LIMITS = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
} as const;

export function useSlidesPerView(userValue: number) {
    const breakpoint = useCurrentBreakpoint();

    const slidesPerView = useMemo(() => {
        const limit = BREAKPOINT_LIMITS[breakpoint as keyof typeof BREAKPOINT_LIMITS];
        return limit ? Math.min(limit, userValue) : userValue;
    }, [breakpoint, userValue]);

    return slidesPerView;
}