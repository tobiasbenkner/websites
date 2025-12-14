"use client";

import { Configuration, Page } from "@/payload-types";
import { SectionContainer } from "../SectionContainer";
import { Embed } from "@/components/Embed";
import { Card } from "@/components/Card";
import {
  FaAddressBook,
  FaBuilding,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaMapLocation,
  FaTiktok,
  FaYelp,
  FaYoutube,
} from "react-icons/fa6";
import { SiTripadvisor } from "react-icons/si";
import { MdShare } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { Contacts } from "@/components/Contacts";
import clsx from "clsx";
import { t } from "@/utilities/translations";
import { translations } from "./ContactComponentTranslations";
import { hasSocialMedia } from "@/utilities/hasSocialMedia";

type ContactProps = Extract<Page["layout"][0], { blockType: "contact" }>;

interface Props {
  block: ContactProps;
  configuration?: Configuration;
  lang: string;
  index: number;
}

export function ContactComponent({ block, configuration: config, lang, index }: Props) {
  return (
    <SectionContainer section={block.section} index={index} configuration={config}>
      {/* Drei-Spalten-Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <InfoCard
          icon={<FaBuilding className="h-6 w-6 text-primary" />}
          title={t(translations.address, lang)}
        >
          <p className="leading-relaxed whitespace-pre-line">
            {config?.contact?.address}
          </p>
        </InfoCard>

        <InfoCard
          icon={<FaAddressBook className="h-6 w-6 text-primary" />}
          title={t(translations.contact, lang)}
        >
          <Contacts contact={config?.contact} />
        </InfoCard>

        <InfoCard
          icon={<FaClock className="h-6 w-6 text-primary" />}
          title={t(translations.openingHours, lang)}
          className="md:col-span-2 lg:col-span-1"
        >
          <div className="space-y-3">
            {config?.contact?.schedule?.map((it) => (
              <div
                key={it.id}
                className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
              >
                <span className="font-medium">{it.day}</span>
                <span className="font-semibold whitespace-pre-line text-right">
                  {it.time}
                </span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Karte & Social */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {config?.contact?.maps && (
          <InfoCard
            icon={<FaMapLocation className="h-6 w-6 text-primary" />}
            title={t(translations.location, lang)}
            className="lg:col-span-3"
          >
            <Embed url={config.contact.maps} />
          </InfoCard>
        )}

        {hasSocialMedia(config?.social) && (
          <InfoCard
            icon={<MdShare className="h-6 w-6 text-primary" />}
            title={t(translations.followUs, lang)}
          >
            <SocialLinks social={config?.social} />
          </InfoCard>
        )}
      </div>
    </SectionContainer>
  );
}

/* -----------------------
   Wiederverwendbare Card
------------------------ */
function InfoCard({
  icon,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      border
      className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border ${className}`}
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div>{children}</div>
    </Card>
  );
}

/* -----------------------
   Social Media Links
------------------------ */
function SocialLinks({ social }: { social?: Configuration["social"] }) {
  const socials = [
    {
      url: social?.facebook,
      label: "Facebook",
      icon: <FaFacebook className="h-6 w-6 text-white" />,
      bg: "bg-blue-600",
    },
    {
      url: social?.instagram,
      label: "Instagram",
      icon: <FaInstagram className="h-6 w-6 text-white" />,
      bg: "bg-gradient-to-br from-pink-500 to-purple-600",
    },
    {
      url: social?.youtube,
      label: "YouTube",
      icon: <FaYoutube className="h-6 w-6 text-white" />,
      bg: "bg-red-600",
    },
    {
      url: social?.tiktok,
      label: "TikTok",
      icon: <FaTiktok className="h-6 w-6 text-white" />,
      bg: "bg-gray-900",
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
      bg: "bg-white",
    },
    {
      url: social?.tripadvisor,
      label: "Tripadvisor",
      icon: <SiTripadvisor className="h-6 w-6 text-white" />,
      bg: "bg-green-600",
    },
    {
      url: social?.yelp,
      label: "Yelp",
      icon: <FaYelp className="h-6 w-6 text-white" />,
      bg: "bg-red-700",
    },
  ].filter((s) => s.url);

  return (
    <div className="space-y-3">
      {socials.map((s, i) => (
        <Link
          key={i}
          prefetch={false}
          target="_blank"
          href={s.url!}
          className={clsx(
            "flex items-center gap-3 p-3 rounded-xl",
            "border border-border",
            "hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          )}
        >
          <div
            className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}
          >
            {s.icon}
          </div>
          <span className="font-medium">{s.label}</span>
        </Link>
      ))}
    </div>
  );
}
