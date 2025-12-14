import { Configuration } from "@/payload-types"
import { Wrapper } from "./wrapper";
import { t } from "@/utilities/translations";

type Props = {
    configuration?: Configuration
    lang: string;
}
export function Schedule({ configuration, lang }: Props) {
    const schedule = configuration?.contact?.schedule ?? [];

    if (schedule.length === 0) {
        return null;
    }

    return <Wrapper title={t(i18n.title, lang)}>
        <ul className="space-y-2 text-sm">
            {schedule.map((it) => (
                <li
                    key={it.id}
                    className="flex justify-between text-muted-foreground"
                >
                    <span>{it.day}</span>
                    <span className="font-medium whitespace-pre-line text-right">{it.time}</span>
                </li>
            ))}
        </ul>
    </Wrapper>
}

const i18n = {
    title: {
        es: "Horario",
        de: "Öffnungszeiten",
        en: "Opening hours"
    }
}
