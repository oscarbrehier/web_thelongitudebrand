import { ProductsFilter } from "./products-filter";
import { useTranslation } from "@/app/i18n";
import { EmptyState } from "@/app/components/EmptyState";
import { getShopContent } from "@/lib/sanity/getShopContent";
import { RetryFetchButton } from "./RetryFetchButton";

export default async function Page(props) {

	const params = await props.params;
	const { lang } = params;
	const { t } = await useTranslation(lang, ["shop", "error"]);

	let products, categories = null;
	let hasError = false;

	try {

		const res = await getShopContent();
		products = res.products;
		categories = res.categories;

	} catch (err) {
		hasError = true;
	}

	const isEmpty =
		hasError || !products?.length || !categories?.length;

	return (

		<div className="pt-12 space-y-2 flex flex-col min-h-screen">

			<div className="h-40 w-full md:grid grid-cols-4 gap-4 flex flex-col justify-center md:items-end items-center space-y-3 my-10">

				<div className="h-full flex justify-start items-center col-start-2">
					<div className="bg-neon-green">
						<h1 className={`capitalize italic font-medium text-6xl font-times-roman`}>{t("shop")}</h1>
					</div>
				</div>

			</div>

			{
				isEmpty ? (

					<EmptyState
						trans={t}
						ns="error"
						title="loading_error"
						description="products_fetch_failure_desc"
					>
						<RetryFetchButton />
					</EmptyState>

				) : (

					<ProductsFilter
						lang={lang}
						products={products}
						categories={categories}
					/>

				)
			}

		</div>

	);
}
