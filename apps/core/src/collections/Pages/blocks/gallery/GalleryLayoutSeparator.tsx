import { getImageInfo } from "@/utilities/getImageInfo";
import { GalleryProps } from "./GalleryComponent";

export function GalleryLayoutSeparator({ layout, images, id }: GalleryProps) {
    if (layout !== 'separator') {
        return null;
    }

    return (
        <section className="overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[33vh] md:auto-rows-[calc(40vh)] lg:auto-rows-[calc(50vh)]">
                {images.map((it) => {
                    const imgInfo = getImageInfo(it.image, "card");
                    return <div key={`${id}-${it.id}`} className="overflow-hidden">
                        <img
                            src={imgInfo.url}
                            alt={imgInfo.alt}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                })}
            </div>
        </section>
    );
}
