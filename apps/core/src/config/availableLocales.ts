import { Config } from "@/payload-types";

type Locale = Config["locale"];

export type LocaleInfo = {
    code: Locale;
    flag: string;
};

export const availableLocales: LocaleInfo[] = [
    { code: "es", flag: "es" },
    { code: "de", flag: "de" },
    { code: "en", flag: "gb" },
    { code: "es-ar", flag: "ar" },
];