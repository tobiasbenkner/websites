import { Configuration } from "@/payload-types"
import { SocialMedia } from "./social-media";
import { Wrapper } from "./wrapper";

type Props = {
    configuration?: Configuration;
}
export function Address({ configuration }: Props) {
    const social = configuration?.social;
    const address = configuration?.contact?.address;

    const addressLines = address?.split('\n') || [];
    const firstLine = addressLines[0];
    const remainingLines = addressLines.slice(1).join('\n');

    return <Wrapper title={firstLine ?? ""}>
        <div className="text-sm text-muted-foreground">
            {remainingLines && (
                <div className="whitespace-break-spaces">
                    {remainingLines}
                </div>
            )}
        </div>
        <SocialMedia social={social} />
    </Wrapper>
}