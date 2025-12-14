import { getPayload } from "payload";
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";
import { Configuration, Page } from "@/payload-types";
import { RenderBlocks } from "@/collections/Pages/blocks/RenderBlocks";
import { Navigation } from "@/components/navigation";
import { ThemeComponent } from "@/components/theme/Theme";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

type Props = {
    params: Promise<{ domain: string, slug: string[] }>
}

type PageConfig = {
    lang: string;
    slug: string;
    domain: string;
    page: Page | null;
    configuration?: Configuration;
}

const getPageConfig = cache(async ({ params }: Props): Promise<PageConfig> => {
    const { domain, slug } = await params;

    const pageConfig: PageConfig = {
        lang: slug[0] ?? "",
        slug: slug[1] ? slug[1] : "home",
        domain: decodeURIComponent(domain),
        page: null,
        configuration: undefined,
    }

    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig })
    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    const { docs } = await payload.find({
        collection: "pages",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        locale: pageConfig.lang as any,
        where: {
            slug: {
                equals: pageConfig.slug
            },
            'tenant.domain': {
                equals: pageConfig.domain
            }
        },
        draft: Boolean(user),
        limit: 1,
    })

    const [page] = docs;

    if (!page) {
        return pageConfig
    }

    const tenantId = typeof page?.tenant === "object" ? page?.tenant?.id : ""


    const { docs: [configuration] } = await payload.find({
        collection: "configuration",
        locale: pageConfig.lang as any,
        where: {
            "tenant": {
                equals: tenantId
            }
        },
        limit: 1,
    })


    return {
        ...pageConfig,
        page: {
            ...page,
            meta: {
                ...page?.meta,
                title: page?.meta?.title ?? "unknown",
                description: page?.meta?.description ?? "unknown",
                image: page?.meta?.image
            }
        },
        configuration: configuration
    }
})


export async function generateMetadata(props: Props): Promise<Metadata> {

    const infos = await getPageConfig(props);
    const title = infos?.page?.meta?.title || "unknown";
    const description = infos?.page?.meta?.description || "unknown";
    const imageUrl = typeof infos?.page?.meta?.image === "object" ?
        encodeURI(`https://${infos.domain}${infos?.page?.meta?.image?.sizes?.seo?.url}`)
        : "";


    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            type: "website",
            siteName: infos.domain,
            images: !!imageUrl ? [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                },
            ] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: !!imageUrl ? [imageUrl] : undefined,
        }
    }

}

export default async function Pagee(props: Props) {

    const infos = await getPageConfig(props);
    const page = infos.page;

    if (!page) {
        return notFound();
    }

    return <ThemeComponent theme={infos.configuration?.theme}>
        <Navigation configuration={infos.configuration} lang={infos.lang} tenantSlug={""} pageId={infos.page?.id ?? ""} />
        <RenderBlocks blocks={page.layout} lang={infos.lang} tenantSlug="" configuration={infos.configuration} pageId={infos.page?.id ?? ""}  />
        <Footer lang={infos.lang} configuration={infos.configuration} />
    </ThemeComponent>
}