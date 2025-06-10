import { EmptyState } from "@/app/components/EmptyState";
import ProductSuggestion from "@/app/components/ProductSuggestion";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { useTranslation } from "@/app/i18n";

export async function EmptyCart({ lang }) {

	const { t } = await useTranslation(lang, ["customer", "common"]);

	return (
		<div id="cart-suggestions" className="h-auto w-full lg:grid grid-cols-4 gap-4 pt-24 pb-10">

			<div className="h-[50vh] col-start-2 col-span-2 flex flex-col">

				{/* <div>
					<h1 className="text-lg capitalize mx-2">cart (0 items)</h1>
				</div>

				<div className="w-full flex-1 flex items-center justify-center flex-col space-y-2">
					<p>your cart is empty</p>
					<Hyperlink to="/shop" size="h-10 px-10" text="uppercase">
						continue shopping
					</Hyperlink>
				</div> */}

				<EmptyState
					trans={t}
					title="cart_empty_title"
					description="cart_empty_description"
				>
					<Hyperlink to="/shop" size="h-10 px-10" text="uppercase">
						{t("continue_shopping", { ns: "common" })}
					</Hyperlink>
				</EmptyState>

			</div>

			<div className="col-span-4">
				<ProductSuggestion lang={lang} />
			</div>

		</div>
	);
};