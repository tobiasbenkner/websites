type Props = {
    url?: string | null;
};

export function Embed({ url }: Props) {

    if (!url) {
        return null;
    }

    return (
        <div className="rounded-lg overflow-hidden shadow-sm border border-border">
            <iframe
                src={url}
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
            ></iframe>
        </div>
    );
}
