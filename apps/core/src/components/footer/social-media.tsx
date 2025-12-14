import { Configuration } from "@/payload-types"
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok, FaYelp, FaYoutube } from "react-icons/fa6";
import Image from "next/image";
import { SiTripadvisor } from "react-icons/si";


type Social = Configuration["social"];

type Props = {
    social?: Social;
}

export function SocialMedia({ social }: Props) {

    const iconSize = "w-6 h-6";
    const classNames = "text-muted-foreground hover:text-foreground transition-colors"

    const socials = [
        {
            url: social?.facebook,
            label: "Facebook",
            icon: <FaFacebook className={iconSize} />,
        },
        {
            url: social?.instagram,
            label: "Instagram",
            icon: <FaInstagram className={iconSize} />,
        },
        {
            url: social?.youtube,
            label: "YouTube",
            icon: <FaYoutube className={iconSize} />,
        },
        {
            url: social?.tiktok,
            label: "TikTok",
            icon: <FaTiktok className={iconSize} />,
        },
        {
            url: social?.restaurantguru,
            label: "Restaurant Guru",
            icon: (
                <Image
                    src="/restaurant-guru.png"
                    alt="Restaurant Guru"
                    width={20}
                    height={20}
                />
            ),
        },
        {
            url: social?.tripadvisor,
            label: "Tripadvisor",
            icon: <SiTripadvisor className={iconSize} />,
        },
        {
            url: social?.yelp,
            label: "Yelp",
            icon: <FaYelp className={iconSize} />,
        },
    ].filter((s) => !!s.url);


    if (socials.length === 0) {
        return null;
    }


    return (
        <div className="flex flex-wrap gap-4 pt-2">
            {
                socials.map(it => {
                    return <Link
                        key={it.label}
                        prefetch={false}
                        href={it.url!}
                        className={classNames}
                        aria-label={it.label}
                    >
                        {it.icon}
                    </Link>
                })
            }
        </div>
    )

}