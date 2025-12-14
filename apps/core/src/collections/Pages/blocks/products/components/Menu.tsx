"use client";
import React from "react";
import { MenuImageFullscreen } from "./MenuImageFullscreen";
import { CategoryMenu } from "./CategoryMenu";
import { Product, ProductCategory } from "@/payload-types";
import { getImageInfo } from "@/utilities/getImageInfo";
import { RichText } from "@payloadcms/richtext-lexical/react";

type Props = {
    categories: ProductCategory[];
};

export function Menu({ categories }: Props) {

    return (
        <div>
            <CategoryMenu
                categories={categories}
            />
            {categories.map((category, categoryIndex) => {
                return (
                    <div
                        id={category.id}
                        key={category.id}
                        className="mb-8 scroll-mt-32"
                    >
                        <CategoryHeader
                            category={category}
                            first={categoryIndex === 0}
                        />
                        <div className="my-4"> </div>

                        <div className="grid grid-flow-dense grid-cols-1 gap-20 sm:grid-cols-2 xl:gap-x-24">
                            {(category.products?.docs ?? []).map((product) => {
                                if (typeof product === "string") {
                                    return <div key={product}>ProductId {product}</div>
                                }
                                return (
                                    <ProductItem
                                        product={product}
                                        key={product.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>

    );
}

function CategoryHeader({
    category,
    first,
}: {
    category: ProductCategory;
    first: boolean;
}) {
    // Simplified file getting - you'll need to adapt this to your getFile function
    const categoryImage = getImageInfo(category.image);
    const categoryName = category.name;
    const categoryDescription = category.description;

    return (
        <div
            className={`flex flex-col pb-4 lg:flex-row gap-8 ${first ? "mt-8" : "mt-40"
                }`}
        >
            {categoryImage.url && (
                <div className="self-center">
                    <img
                        src={categoryImage.url}
                        alt={categoryName}
                        className="w-full object-contain rounded max-w-xl"
                    />
                </div>
            )}

            <div className="flex-grow self-center">
                <h1 className="text-4xl font-bold uppercase text-balance mb-4">
                    {categoryName}
                </h1>
                <div className="text-balance mt-4">
                    <RichText data={categoryDescription!} />
                </div>
            </div>
        </div>
    );
}

function ProductItem({ product }: { product: Product; }) {
    const productImage = getImageInfo(product.image);
    const productName = product.name;
    const productDescription = product.description;
    const show_price = true;

    const getLayout = () => {
        let cls = "card";
        if (productImage) {
            cls += "-image";
        }
        if (productDescription) {
            cls += "-intro";
        }

        if (product.allergens && product.allergens.length > 0) {
            cls += "-tags";
        }

        return cls;
    };

    const prices = [product.price];

    // Simple price formatter - adapt as needed
    const formatPrice = (price: number) => {
        return `€${price.toFixed(2)}`;
    };

    // Simple allergy icon getter - you'll need to implement this
    const getAllergyIcon = (allergyName: string) => {
        return `/icons/allergens/${allergyName}.svg`; // Placeholder path
    };

    return (
        <>
            <div className={`menu-item relative grid h-fit ${getLayout()}`}>
                {productImage && (
                    <MenuImageFullscreen
                        src={productImage.url}
                        alt={productName}
                        className="w-20 h-20 object-cover rounded-full"
                    />
                )}

                <div className="info">
                    <h2 className="text-2xl font-semibold mb-2" style={{ fontSize: "27px" }}>
                        {productName}
                    </h2>

                    {productDescription && (
                        <div className="max-w-lg text-pretty pt-1">
                            <div dangerouslySetInnerHTML={{ __html: productDescription }} />
                        </div>
                    )}
                </div>

                {product.allergens && product.allergens.length > 0 && (
                    <div className="tags flex w-full flex-wrap items-end justify-end gap-2">
                        {product.allergens.map((name, index) => (
                            <div key={`allergy-${index}-${name}`}>
                                <img
                                    src={getAllergyIcon(name)}
                                    className="h-7 w-7"
                                    alt={name}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {show_price && (
                    <div
                        className={`price grid auto-rows-min gap-1 ${prices && prices.length > 1 && "mt-2"
                            }`}
                    >
                        {show_price &&
                            prices.map((price, index) => (
                                <div
                                    key={`price-${product.id}-${index}`}
                                    className="flex justify-between gap-2 text-sm"
                                >
                                    <span
                                        className={`${index === 0
                                            ? "text-base font-bold"
                                            : "text-base font-bold"
                                            }`}
                                    >
                                        {formatPrice(price)}
                                    </span>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}