import { Product } from "@/payload-types";
import { DietaryTag } from "./DietaryTag";
import { getImageInfo } from "@/utilities/getImageInfo";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { ProductBlock } from "@/collections/Pages/blocks/products/ProductsComponent";
import Image from "next/image";

type Props = {
    product: Product;
    block: ProductBlock;
};

export function MenuItem({ product, block }: Props) {
    const isAvailable = product.available !== false;
    const image = getImageInfo(product.image, "thumbnail");

    return (
        <article className={`border-b border-border/30 pb-8 ${!isAvailable ? 'opacity-50' : ''}`}>
            <div className="flex items-start gap-6">
                {/* Left Side: Title, Description, Tags */}
                <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-foreground">
                        {product.name}
                    </h3>

                    {product.description && (
                        <div className="prose prose-invert mt-2 text-muted-foreground">
                            <RichText data={product.description} />
                        </div>
                    )}

                    {
                        product.note?.map(it => {
                            return <DietaryTag key={it} type="allergy" label={it} />
                        })
                    }

                    <div className="mt-4 flex flex-wrap items-center gap-2">


                        {product.allergens?.map((allergen) => (
                            <img
                                key={allergen}
                                src={`/icons/allergens/${block.menu?.allergens || "1"}/${allergen.toLowerCase()}.svg`}
                                alt={`Allergen: ${allergen}`}
                                title={allergen}
                                className="w-6 h-6"
                            />
                        ))}
                        {!isAvailable && <DietaryTag type="availability" label="Nicht verfügbar" />}
                    </div>
                </div>

                {/* Right Side: Image and Price */}
                <div className="flex-shrink-0 w-32 text-center">
                    {image.url && (
                        <Image
                            src={image.url}
                            alt={image.alt || product.name}
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover mx-auto"
                        />
                    )}
                    <p className="mt-4 font-semibold text-foreground">
                        {typeof product.price === "number" ? formatPrice(product.price / 100) : ""}
                    </p>
                </div>
            </div>
        </article>
    );
}

function formatPrice(price: number) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);
}