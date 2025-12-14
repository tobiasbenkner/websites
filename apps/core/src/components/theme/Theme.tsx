import { ReactNode } from "react";
import { Configuration } from "@/payload-types";
import { background, onBackground, primary, onPrimary, surface, onSurface, secondary, onSecondary, border } from "./ThemeConfig";

type ThemeProps = Configuration['theme']

type Props = {
    children: ReactNode;
    theme: ThemeProps;
};
export async function ThemeComponent({ children, theme }: Props) {
    return (
        <div
            style={
                {
                    // Basis
                    "--background": theme?.background || background,
                    "--on-background": theme?.fontColor || onBackground,

                    "--surface": theme?.surface || surface,
                    "--on-surface": theme?.onSurface || onSurface,

                    "--primary": theme?.primary || primary,
                    "--on-primary": theme?.onPrimary || onPrimary,

                    "--secondary": theme?.secondary || secondary,
                    "--on-secondary":
                        theme?.onSecondary || onSecondary,

                    "--border": theme?.border || border
                } as React.CSSProperties
            }
            className="bg-background text-foreground"
        >
            {children}
        </div>
    );
}


// // States
// "--destructive": theme.destructive || "hsl(0 84.2% 60.2%)",
// "--destructive-foreground":
//     theme.destructive_foreground || "hsl(210 40% 98%)",

// // Card
// "--card": theme.card_background || theme.background,
// "--card-foreground": theme.card_foreground || theme.font_color,

// // Popover
// "--popover": theme.popover_background || theme.background || "",
// "--popover-foreground":
//     theme.popover_foreground || theme.font_color || "",

// // Borders
// "--border": theme.border || "hsl(214.3 31.8% 91.4%)",
// "--separator": theme.separator || theme.border,

// // Muted
// "--muted": theme.muted || "hsl(210 40% 96%)",
// "--muted-foreground":
//     theme.muted_foreground || "hsl(215.4 16.3% 46.9%)",

// // Accent
// "--accent": theme.accent || "hsl(210 40% 96%)",
// "--accent-foreground":
//     theme.accent_foreground || "hsl(222.2 84% 4.9%)",

// // Input & Ring
// "--input": theme.input || "hsl(214.3 31.8% 91.4%)",
// "--ring": theme.ring || "hsl(222.2 84% 4.9%)",