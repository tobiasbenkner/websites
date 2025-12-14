import "flag-icons/css/flag-icons.min.css";

import React from "react";
import clsx from "clsx";

interface Props {
  countryCode: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  contrastBackground?: boolean;
}

const sizeMap: Record<string, number> = {
  xs: 1,      // 16px
  sm: 1.25,   // 20px
  md: 1.5,    // 24px
  lg: 2,      // 32px
  xl: 2.5,    // 40px
};

export function Flag({
  countryCode,
  size = "md",
  className,
  contrastBackground = false,
}: Props) {
  const height = typeof size === "number" ? size : sizeMap[size] ?? sizeMap.md;
  const width = height * (4 / 3);

  return (
    <span
      className={clsx(
        "fi",
        `fi-${countryCode.toLowerCase()}`,
        "inline-block flex-shrink-0 overflow-hidden bg-cover bg-center",
        contrastBackground ? "bg-background border border-border" : "",
        className,
      )}
      style={{
        width: `${width}rem`,
        height: `${height}rem`,
      }}
      role="img"
      aria-label={`Flag of ${countryCode}`}
    />
  );
}