import { PageContainer } from "@/app/components/container/PageContainer";
import { getProductBySlug } from "@/lib/sanity/getProduct";
import Product from "@/app/components/Product";
import getProductSlugs from "@/lib/sanity/getProductSlugs";
import { languages } from "@/app/i18n/settings";

export async function generateMetadata({ params: { item }}) {

    try {

        const response = await getProductBySlug(item);
        
        if (response?.length === 0) {

            return {
                title: "Not found",
                description: "The product you are looking for does not exist",
            };

        };

        console.log(response)

        return {
            title: response.title,
            openGraph: {
                title: response?.title,
                description: "default",
                images: response?.cover
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

    return (

        <PageContainer lang={lang}>

            <Product
                lang={lang}
                content={content}
            />


        </PageContainer>

    );

};
