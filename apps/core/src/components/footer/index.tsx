import { Configuration } from "@/payload-types";
import clsx from "clsx";
import Link from "next/link";
import { Schedule } from "./schedule";
import { Contact } from "./contact";
import { Address } from "./address";


type Props = {
    lang: string;
    configuration?: Configuration;
};

export function Footer({ lang, configuration }: Props) {
    const noFooterConfig = (configuration?.contact?.schedule ?? []).length === 0 && (configuration?.contact?.phone ?? []).length === 0 && !configuration?.contact?.address
    const isMinimal = !!configuration?.footer?.minimal || noFooterConfig;

    return (
        <footer className="bg-background border-t border-border">
            <div className="container mx-auto px-4 py-8">
                {
                    !isMinimal && <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <Address configuration={configuration} />
                        <Contact configuration={configuration} lang={lang} />
                        <Schedule configuration={configuration} lang={lang} />
                    </div>
                }

                {/* Footer Bottom */}
                <div className={clsx(
                    "flex flex-col md:flex-row justify-between items-center gap-4",
                    isMinimal ? "" : "border-t border-border pt-8 mt-12"
                )}>
                    <div className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()}. Todos los derechos
                    </div>
                    <nav className="flex space-x-6 text-sm">
                        <Link
                            prefetch={false}
                            href={`/aviso-legal`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Aviso Legal
                        </Link>
                        <Link
                            prefetch={false}
                            href={`/politica-de-privacidad`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Política de Privacidad
                        </Link>
                        <Link
                            prefetch={false}
                            href={`/politica-de-cookies`}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Política de Cookies
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
