// src/components/Menu/components/MenuCategory.tsx
import { ProductCategory, Product } from "@/payload-types";
import { MenuItem } from "./MenuItem";
import { getImageInfo } from "@/utilities/getImageInfo";
import { ProductBlock } from "@/collections/Pages/blocks/products/ProductsComponent";

type Props = {
    category: ProductCategory;
    products: Product[];
    block: ProductBlock;
};

export function MenuCategory({ category, products, block }: Props) {
    const image = getImageInfo(category.image, "card");

    return (
        <section id={category.id} className="scroll-mt-36">
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg mb-12">
                {image.url ? (
                    <img
                        src={image.url}
                        alt={image.alt || category.name}
                        style={{
                            objectPosition: `${image.focalX}% ${image.focalY}%`,
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : <div className="absolute inset-0 bg-card"></div>}

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-wider uppercase"
                        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        {category.name}
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {products.map((product) => (
                    <MenuItem key={product.id} product={product} block={block} />
                ))}
            </div>
        </section>
    );
};