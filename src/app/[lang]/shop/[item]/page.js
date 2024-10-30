import { getProductBySlug } from "@/lib/sanity/getProduct";
import Product from "@/app/components/Product";
import getProductSlugs from "@/lib/sanity/getProductSlugs";
import { languages } from "@/app/i18n/settings";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { lang, item } }) {

    try {

        const response = await getProductBySlug(item);

        if (!response || response.length === 0) {

            return {
                title: "Not found",
                description: "The product you are looking for does not exist",
            };

        };

        const url = `https://thelongitudebrand.com/${lang}/shop/${item}`;

        return {
            title: response.title,
            description: response.description || "description",
            keywords: response.keywords ? response?.keywords.join(", ") : "",
            author: "Longitude",
            alternates: {
                canonical: url,
                languages: {
                    "en-EN": "/en",
                    "fr-FR": "/fr"
                }
            },
            openGraph: {
                title: response.title,
                type: "website",
                description: response.description || "default",
                url,
                images: response.cover ? [{ url: response.cover }] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: response.title,
                description: response.description || "description",
                images: response.cover || [],
            },
        };

    } catch (err) {

        console.log(err)

    };

};

export async function generateStaticParams() {

    const slugs = await getProductSlugs();

    return slugs.flatMap((slug) =>
        languages.map((lang) => ({
            item: slug,
            lang,
        }))
    );

};

export default async function Page({ params: { item, lang } }) {

    const content = await getProductBySlug(item);

    if (!content) notFound();

    const structuredData = JSON.stringify([
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Longitude",
            url: "https://thelongitudebrand.com",
            logo: "https://thelongitudebrand.com/logo.png",
        },  
        {
            "@context": "https://schema.org",
            "@type": "Product",
            name: content.title,
            description: content.description,
            image: Array.isArray(content.cover) ? content.cover : [content.cover],
            url: `https://thelongitudebrand.com/${lang}/shop/${item}`,
            brand: {
                "@type": "Brand",
                name: "Longitude",
            },
            offers: {
                "@type": "Offer",
                title: content.title,
                price: content.price,
                priceCurrency: "EUR",
            },
        }
    ]);

    return (

        <>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

            <Product
                lang={lang}
                content={content}
            />


        </>

    );

};
