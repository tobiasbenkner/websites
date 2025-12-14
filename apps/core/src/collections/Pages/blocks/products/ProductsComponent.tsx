import { Configuration, Page } from "@/payload-types";
import { SectionContainer } from "../SectionContainer";
import config from '@/payload.config'
import { getPayload } from "payload";
import { Menu } from "@/components/menu";

export type ProductBlock = Extract<Page["layout"][0], { blockType: "products" }>;

type Props = {
    block: ProductBlock;
    configuration?: Configuration;
    index: number;
    lang: string;
};

export async function ProductsComponent({ block, index, configuration, lang }: Props) {

    if (!configuration?.tenant) {
        return <SectionContainer section={block.section} index={index} configuration={configuration}>
            No Tenant ID
        </SectionContainer>
    }

    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    const { docs: categories } = await payload.find({
        collection: "productCategories",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        locale: lang as any,
        where: {
            'tenant': {
                equals: configuration.tenant
            }
        },
        limit: 1000,
    })

    return (
        <SectionContainer section={block.section} index={index} configuration={configuration}>
            <Menu
                categories={categories}
                block={block}
            />
        </SectionContainer>
    );
}