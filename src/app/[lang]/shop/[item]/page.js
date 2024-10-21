import { PageContainer } from "@/app/components/container/PageContainer";
import { getProductBySlug } from "@/lib/sanity/getProduct";
import Product from "@/app/components/Product";
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
