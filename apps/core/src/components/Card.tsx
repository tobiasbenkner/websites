import clsx from "clsx";
import { CSSProperties, ReactNode } from "react"

type Props = {
    children: ReactNode;
    onClick?: () => void;
    zoom?: boolean;
    border?: boolean;
    style?: CSSProperties
    className?: string;
}
export function Card({ children, onClick, zoom, border = true, style = {}, className = "" }: Props) {
    return <div
        onClick={onClick}
        style={style}
        className={clsx(
            "bg-card text-card-foreground",
            "rounded-xl shadow-lg overflow-hidden",
            zoom ? "transition transform hover:scale-105" : undefined,
            border ? "border border-border" : undefined,
            className
        )}
    >
        {children}
    </div>
}