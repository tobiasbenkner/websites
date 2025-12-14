"use client";

import { useState } from "react";
import { getImageInfo } from "@/utilities/getImageInfo";
import { GalleryProps } from "./GalleryComponent";
import { Card } from "@/components/Card";

export function GalleryLayoutGallery({ layout, images, id }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<null | { url: string; alt: string }>(null);

    if (layout !== "gallery") {
        return null;
    }

    return (
        <>
            {/* Grid Layout */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {images.map((img) => {
                    const imgInfo = getImageInfo(img.image);
                    return (
                        <Card
                            key={`gallery-${id}-${img.id}`}
                            onClick={() => setSelectedImage(imgInfo)}
                            className="cursor-pointer"
                        >
                            <img
                                src={imgInfo.url}
                                alt={imgInfo.alt}
                                className="w-full h-48 object-contain"
                            />
                        </Card>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[90vh] rounded-lg shadow-xl"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full px-2"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
