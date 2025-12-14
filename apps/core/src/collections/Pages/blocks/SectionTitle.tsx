import clsx from "clsx";
import React from "react";

type Props = {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    withLine?: boolean;
    className?: string;
};

export function SectionTitle({
    title,
    subtitle,
    align = 'center',
    withLine = true,
    className,
}: Props) {

    const alignmentClasses = {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right',
    };

    const gradientDirection = {
        left: 'bg-gradient-to-r',
        center: 'bg-gradient-to-r',
        right: 'bg-gradient-to-l',
    };

    return (
        <div className={clsx(
            "flex flex-col mb-12 md:mb-16",
            alignmentClasses[align],
            className
        )}>

            <h1 className={clsx(
                "text-3xl font-bold md:text-4xl lg:text-5xl"
            )}>
                {title}
            </h1>

            {withLine && (
                <div className={clsx(
                    "h-1 w-24",
                    "mt-3",
                    gradientDirection[align],
                    "from-primary to-transparent"
                )} />
            )}

            {subtitle && (
                <p className={clsx(
                    withLine ? "mt-4" : "mt-3",
                    "max-w-3xl text-lg",
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}