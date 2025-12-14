import { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
}
export function Wrapper({ title, children }: Props) {
    return <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {children}
    </div>
}