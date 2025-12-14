import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa6";

interface Props {
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
}

export function MenuImageFullscreen({
    src,
    alt,
    sizes = "5rem",
    className = "w-full aspect-square object-cover rounded-full",
}: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div
                className="image cursor-pointer transition-transform hover:scale-105"
                onClick={() => setIsOpen(true)}
            >
                <img src={src} alt={alt} sizes={sizes} className={className} />
            </div>

            {/* Fullscreen Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-80"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Content */}
                    <div className="relative max-w-full max-h-full p-4">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-full object-contain"
                        />

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                        >
                            <FaQuestion size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}