import { Configuration } from "@/payload-types"
import Link from "next/link";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { Wrapper } from "./wrapper";
import { t } from "@/utilities/translations";

type Props = {
    configuration?: Configuration;
    lang: string;
}
export function Contact({ configuration, lang }: Props) {
    const contacts = configuration?.contact?.phone ?? [];

    if (contacts.length === 0) {
        return null;
    }

    return <Wrapper title={t(i18n.title, lang)}>
        {contacts.map((contact) => {
            return (
                <div key={contact.id} className="flex items-center space-x-3">
                    <Link
                        prefetch={false}
                        href={`${contact.link}`}
                        className="flex items-center"
                    >
                        {contact.type === "email" && <FaEnvelope className="h-5 w-5 mr-3" />}
                        {contact.type === "phone" && <FaPhone className="h-5 w-5 mr-3" />}
                        {contact.type === "whatsapp" && (
                            <FaWhatsapp className="h-5 w-5 mr-3" />
                        )}
                        <span>{contact.label}</span>
                    </Link>
                </div>
            );
        })}
    </Wrapper>
}

const i18n = {
    title: {
        es: "Contacto",
        de: "Kontakt",
        en: "Contact"
    }
}