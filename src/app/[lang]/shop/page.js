import { client } from "@/lib/sanity/client";
import { PageContainer } from "@/app/components/container/page";
import ProductsFilter from "@/app/components/ProductsFilter";
import { useTranslation } from "@/app/i18n";

export default async function Page({ params: { lang } }) {

	const CONTENT_QUERY = '*[_type == "product"] { title, images, _type, _id, category ->  { _ref, _type, title }, price, slug }';
	const CATEGORY_QUERY = '*[_type == "category" && count(*[_type == "product" && references(^._id)]) > 0] { title }';

	const products = await client.fetch(CONTENT_QUERY);
	const categories = await client.fetch(CATEGORY_QUERY);
	const categoryTitles = ['view_all', ...categories.map((category) => category.title).reverse()];

	const { t } = await useTranslation(lang, "shop");

	return (

		<PageContainer lang={lang} className="pt-12 space-y-2">

			<div className="h-40 w-full md:grid grid-cols-4 gap-4 flex flex-col justify-center md:items-end items-center space-y-3 my-10">

				<div className="h-full flex justify-start items-center col-start-2">
					<div className="bg-neon-green">
						<p className="capitalize font-playfair italic font-medium text-6xl">{t("shop")}</p>
					</div>
				</div>

			</div>

			<ProductsFilter
				lang={lang}
				products={products}
				categories={categoryTitles}
			/>

		</PageContainer>

	);

}
