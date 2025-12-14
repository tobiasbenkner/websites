import { Configuration, Page } from "@/payload-types";
import { SectionContainer } from "../SectionContainer";
import { Embed } from "@/components/Embed";

export type EmbedBlock = Extract<Page["layout"][0], { blockType: "embed" }>;

type Props = {
    block: EmbedBlock;
    configuration?: Configuration;
    index: number;
    lang: string;
};

export async function EmbedComponent({ block, index, configuration }: Props) {

    return (
        <SectionContainer section={block.section} index={index} configuration={configuration}>
            {/* <iframe src="https://grafana_greenhouse.benkner-it.com/d-solo/1abea260-c2dd-4864-93f3-5854ae67a7b1/greenhouse?orgId=1&from=1756077265034&to=1756163665034&timezone=browser&refresh=auto&panelId=1&__feature.dashboardSceneSolo=true" width="450" height="200" frameBorder="0"></iframe> */}
            <Embed url={block.embed?.url} />
        </SectionContainer>
    );
}