import { client } from "@/lib/sanity/client";
import { ProductsFilter } from "./products-filter";
import { useTranslation } from "@/app/i18n";
import { captureException } from "@sentry/nextjs";
import { EmptyState } from "@/app/components/EmptyState";
import Button from "@/app/components/ui/Button";

export default async function Page(props) {
	
	const params = await props.params;
	const { lang } = params;
	const { t } = await useTranslation(lang, ["shop", "error"]);

	const CONTENT_QUERY = '*[_type == "product"] { title, images, _type, _id, category ->  { _ref, _type, title }, price, slug }';
	const CATEGORY_QUERY = '*[_type == "category" && count(*[_type == "product" && references(^._id)]) > 0] { title }';

	let products, categories, categoryTitles = null;

	try {
		products = await client.fetch(CONTENT_QUERY);
		categories = await client.fetch(CATEGORY_QUERY);
		categoryTitles = ['view-all', ...categories.map((category) => category.title).reverse()];
	} catch (err) {
		captureException(err);
	}

	return (

		<div className="pt-12 space-y-2 flex flex-col min-h-screen">

			<div className="h-40 w-full md:grid grid-cols-4 gap-4 flex flex-col justify-center md:items-end items-center space-y-3 my-10">

				<div className="h-full flex justify-start items-center col-start-2">
					<div className="bg-neon-green">
						<h1 className={`capitalize italic font-medium text-6xl font-playfair`}>{t("shop")}</h1>
					</div>
				</div>

			</div>

			{
				products && categoryTitles ? (

					<ProductsFilter
						lang={lang}
						products={products}
						categories={categoryTitles}
					/>

				) : (

					<EmptyState
						trans={t}
						ns="error"
						title="loading_error"
						description="products_fetch_failure_desc"
					>
						<Button
							size="h-10 px-4"
							onClick="page-refresh"
						>
							Retry
						</Button>
					</EmptyState>


				)
			}

		</div>

	);
}
