import { Configuration, Page } from "@/payload-types"

type FormProps = Extract<Page['layout'][0], { blockType: 'form' }>;

type Props = {
    block: FormProps;
    index: number;
    configuration?: Configuration;
}

export function FormComponent(props: Props) {
    console.log(props);
    return <div>
        Hello Form
    </div>
}
