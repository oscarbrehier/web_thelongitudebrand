import getProductSlugs from "@/lib/sanity/getProductSlugs"

export default async function Page() {

    const slugs = await getProductSlugs();

    return (

        <div>

        </div>

    )

}