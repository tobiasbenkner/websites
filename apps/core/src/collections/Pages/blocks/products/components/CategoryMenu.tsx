import { ProductCategory } from "@/payload-types";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";


type Props = {
    categories: ProductCategory[];
}

export function CategoryMenu({ categories }: Props) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            let activeId: string | null = null;
            categories.forEach((category) => {
                const section = document.getElementById(category.id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        activeId = category.id;
                    }
                }
            });

            if (activeId) setActiveCategory(activeId);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Call on mount to set the initial active category

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [categories]);

    useEffect(() => {
        if (activeCategory && menuRef.current) {
            const activeElement = document.getElementById(`menu-${activeCategory}`);
            if (activeElement && menuRef.current) {
                const parent = menuRef.current;
                const parentRect = parent.getBoundingClientRect();
                const activeRect = activeElement.getBoundingClientRect();

                const scrollLeft =
                    parent.scrollLeft +
                    activeRect.left -
                    parentRect.left -
                    parentRect.width / 2 +
                    activeRect.width / 2;

                parent.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }
        }
    }, [activeCategory]);

    return (
        <div
            className={
                clsx(
                    "flex flex-wrap justify-center gap-2",
                    "sticky z-30 mb-8 py-2 top-20",
                    "border-b-2 border-border bg-card"
                )
            }>
            <div className="relative w-full flex justify-center">
                <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" />
                <div
                    ref={menuRef}
                    className="flex gap-4 overflow-x-auto whitespace-nowrap py-2 scrollbar-hide scroll-smooth max-w-full pr-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {categories.map((category) => (
                        <div key={category.id} id={`menu-${category.id}`}>
                            <a
                                href={`#${category.id}`}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(category.id)?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                }}
                            >
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                >
                                    {category.name}
                                </span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}