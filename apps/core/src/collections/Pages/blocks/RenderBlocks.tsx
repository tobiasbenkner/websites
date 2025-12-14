import { HeroComponent } from "./hero/HeroComponent";
import { FormComponent } from "./form/FormComponent";
import { Configuration, Page } from "@/payload-types";
import { GalleryComponent } from "./gallery/GalleryComponent";
import { ContactComponent } from "./contact/ContactComponent";
import { TextComponent } from "./text/TextComponent";
import { ProductsComponent } from "./products/ProductsComponent";
import { LanguagePickerComponent } from "./language-picker/language-picker-component";
import { EmbedComponent } from "./embed/embed-component";

type Props = {
    blocks: Page['layout'];
    lang: string;
    tenantSlug: string;
    configuration?: Configuration;
    pageId: string;
}
export function RenderBlocks({ blocks, lang, tenantSlug, configuration, pageId }: Props) {

    return blocks.map((it, index) => {
        switch (it.blockType) {
            case "hero":
                return <HeroComponent block={it} key={it.id} lang={lang} tenantSlug={tenantSlug} index={index} configuration={configuration} />
            case "gallery":
                return <GalleryComponent block={it} key={it.id} lang={lang} tenantSlug={tenantSlug} index={index} configuration={configuration} />
            case "form":
                return <FormComponent block={it} key={it.id} index={index} configuration={configuration} />
            case "contact":
                return <ContactComponent block={it} key={it.id} configuration={configuration} lang={lang} index={index} />
            case "text":
                return <TextComponent block={it} key={it.id} index={index} configuration={configuration} />
            case "products":
                return <ProductsComponent block={it} key={it.id} index={index} configuration={configuration} lang={lang} />
            case "language-picker":
                return <LanguagePickerComponent block={it} key={it.id} index={index} configuration={configuration} lang={lang} tenantSlug={tenantSlug} pageId={pageId} />
            case "embed":
                return <EmbedComponent block={it} key={it.id} index={index} configuration={configuration} lang={lang} />
            default:
                return <pre key={new Date().toISOString()}>{JSON.stringify(it, null, 2)}</pre>
        }
    })

}