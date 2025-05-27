import SanityImage from "../ui/SanityImage";
import { VariantQuickAdd } from "./VariantQuickAdd";

export function StoreItem({
    data: content,
    lang,
    variant = "basic",
    ...props
}) {

    const structuredData = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: content.title,
        description: content.description,
        image: Array.isArray(content.cover) ? content.cover : [content.cover],
        url: `https://www.longitudebrand.com/${lang}/shop/${content.slug.current}`,
        brand: {
            "@type": "Brand",
            name: "Longitude",
        },
        offers: {
            "@type": "Offer",
            price: content.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
        },
    })

    switch (variant) {
        case "quick-add":
            return (<VariantQuickAdd content={content} lang={lang} structuredData={structuredData} {...props} />);
        default:
            return (<VariantBasic content={content} lang={lang} structuredData={structuredData} />);
    };

};

function VariantBasic({ content, lang, structuredData }) {

    return (
        <>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

            <article className="relative">

                <div className="w-full h-[30rem] bg-cream-200 p-4 flex flex-col">

                    <div className="flex-1 w-full flex items-center">
                        <SanityImage
                            source={content.images[0].asset._ref}
                            quality={70}
                            alt={content.title}
                        />
                    </div>

                    <div>
                        <h3 className="text-xs uppercase">{content.title}</h3>
                        <p className="text-xs font-medium">{content.price}€</p>
                    </div>

                </div>

                <a className="h-full w-full absolute top-0 left-0" href={`/shop/${content.slug.current}`}></a>

            </article>

        </>
    );
};