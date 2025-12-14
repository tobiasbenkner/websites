// src/components/Menu/components/CategoryNav.tsx
"use client";

import { navHeight } from "@/components/navigation/config";
import { ProductCategory } from "@/payload-types";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Props = {
    categories: ProductCategory[];
};

// Konstante für den vertikalen Abstand, an dem ein Element als "aktiv" gilt
const SCROLL_OFFSET = 150;

export function CategoryNav({ categories }: Props) {
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(categories[0]?.id || null);
    const navRef = useRef<HTMLDivElement | null>(null);

    // Berechnet die Höhe einer eventuellen Haupt-Navigation darüber

    // Effekt #1: Beobachtet das Scrollen der Seite, um die aktive Kategorie zu bestimmen
    useEffect(() => {
        const handleScroll = () => {
            let currentBestCandidate: string | null = null;
            let smallestPositiveTop = Infinity;

            // Finde die Sektion, die am nächsten am "Aktiv"-Punkt (SCROLL_OFFSET) ist
            for (const category of categories) {
                const section = document.getElementById(category.id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // Prüfen, ob die Sektion im "aktiven" Bereich ist
                    if (rect.top <= SCROLL_OFFSET && rect.bottom >= SCROLL_OFFSET) {
                        currentBestCandidate = category.id;
                        break; // Perfekter Treffer, Schleife abbrechen
                    }
                    // Ansonsten: Merke dir die nächste kommende Sektion
                    if (rect.top > SCROLL_OFFSET && rect.top < smallestPositiveTop) {
                        smallestPositiveTop = rect.top;
                        currentBestCandidate = category.id;
                    }
                }
            }
            // Fallback: Wenn wir ganz oben sind, die erste Kategorie aktivieren
            if (window.scrollY < 200) {
                currentBestCandidate = categories[0]?.id || null;
            }

            setActiveCategoryId(currentBestCandidate);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Einmal beim Laden ausführen

        return () => window.removeEventListener("scroll", handleScroll);
    }, [categories]);

    // Effekt #2: Scrollt die Navigationsleiste horizontal, wenn sich die aktive Kategorie ändert
    useEffect(() => {
        if (activeCategoryId && navRef.current) {
            const activeElement = document.getElementById(`nav-item-${activeCategoryId}`);
            if (activeElement) {
                const parent = navRef.current;
                const parentRect = parent.getBoundingClientRect();
                const activeRect = activeElement.getBoundingClientRect();

                // Berechne die Position, um das aktive Element zu zentrieren
                const scrollLeft =
                    parent.scrollLeft +
                    activeRect.left -
                    parentRect.left -
                    (parentRect.width / 2) +
                    (activeRect.width / 2);

                parent.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }
        }
    }, [activeCategoryId]);

    // Verbesserter Klick-Handler für präzises Scrollen
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, categoryId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(categoryId);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET + 20; // +20 für etwas Puffer

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div
            style={{ top: `${navHeight}px` }}
            className="sticky z-20 w-full bg-background/80 py-3 backdrop-blur-lg border-b border-border"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Optional: Fade-out-Effekt am rechten Rand für bessere UX auf schmalen Viewports */}
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

                <div
                    ref={navRef}
                    className="flex items-center gap-2 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {categories.map((category) => (
                        <a
                            key={category.id}
                            id={`nav-item-${category.id}`}
                            href={`#${category.id}`}
                            onClick={(e) => handleLinkClick(e, category.id)}
                            className={clsx(
                                "inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                                {
                                    'bg-primary text-primary-foreground': activeCategoryId === category.id,
                                    'bg-muted text-muted-foreground hover:bg-card hover:text-card-foreground': activeCategoryId !== category.id
                                }
                            )}
                        >
                            {category.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}