"use client";

import { ProductCategory, Product } from "@/payload-types";
import { CategoryNav } from "./components/CategoryNav";
import { MenuCategory } from "./components/MenuCategory";
import { ProductBlock } from "@/collections/Pages/blocks/products/ProductsComponent";
import { Fragment } from "react";

type Props = {
    categories: ProductCategory[];
    block: ProductBlock;
};

export function Menu({ categories, block }: Props) {
    // Sortierung bleibt wichtig für die korrekte Reihenfolge
    const sortedCategories = [...categories].sort((a, b) => {
        return (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name);
    });

    // Wir brauchen keine Refs oder State-Management mehr hier

    return (
        <div className="w-full">
            <CategoryNav categories={sortedCategories} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-24">
                    {sortedCategories.map((category) => {
                        const products = (category.products?.docs?.filter(
                            (p): p is Product => typeof p === 'object' && p !== null
                        ) ?? []);

                        if (products.length === 0) return null;

                        const sortedProducts = [...products].sort((a, b) => {
                            return (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name);
                        });

                        return (
                            <Fragment key={category.id}>
                                <MenuCategory
                                    category={category}
                                    products={sortedProducts}
                                    block={block}
                                />
                                <pre>{JSON.stringify(category.additionalContent, null, 2)}</pre>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}