"use client";

import { Configuration } from "@/payload-types";
import { useEffect, useState } from "react";

export function useHeroMode(configuration?: Configuration) {

    const isHeroMode = !!configuration?.navigation?.heroMode;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!isHeroMode) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const pixelToScroll = 80;
            setIsScrolled(scrollPosition > pixelToScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHeroMode]);

    const isHeroModeActive = isHeroMode && !isScrolled;
    return isHeroModeActive;
}