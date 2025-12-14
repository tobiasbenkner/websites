import { Configuration } from "@/payload-types";
import clsx from "clsx";
import Link from "next/link";
import { JSX } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

type Contact = Configuration["contact"];
type Props = {
    contact?: Contact;
};

export function Contacts({ contact }: Props) {
    const contacts = contact?.phone ?? [];
    if (contacts.length === 0) return null;

    const iconMap: Record<string, { icon: JSX.Element; bg: string }> = {
        email: {
            icon: <FaEnvelope className="h-6 w-6 text-white" />,
            bg: "bg-blue-500"
        },
        phone: {
            icon: <FaPhone className="h-6 w-6 text-white" />,
            bg: "bg-orange-500"
        },
        whatsapp: {
            icon: <FaWhatsapp className="h-6 w-6 text-white" />,
            bg: "bg-green-500"
        }
    };

    return (
        <div className="space-y-3">
            {contacts.map((c) => {
                const iconData = iconMap[c.type ?? "phone"];
                return (
                    <Link
                        key={c.id}
                        prefetch={false}
                        href={c.link ?? ""}
                        className={clsx(
                            "flex items-center gap-3 p-3 rounded-lg border border-border",
                            "hover:bg-accent transition-colors duration-200"
                        )}
                    >
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconData?.bg || "bg-gray-500"}`}
                        >
                            {iconData?.icon}
                        </div>
                        <span className="font-medium">{c.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
