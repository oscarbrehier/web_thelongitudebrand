"use client"
import { ProductGrid } from "./container/ProductGrid";
import { StoreItem } from "./store/StoreItem";
import { captureException } from "@sentry/nextjs";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/sanity/product";
import { useTranslation } from "../i18n/client";

export default function ProductSuggestion({ lang }) {

	const { t } = useTranslation(lang, ["common"]);
	const [products, setProducts] = useState(null);

	useEffect(() => {

		const fetchProducts = async () => {

			try {
				const res = await getProducts({
					maxItems: 4,
					filters: [`availability != "out_of_stock"`]
				});
				setProducts(res);
			} catch (err) {
				captureException(err);
			};

		};

		fetchProducts();

	}, []);

	return (

		<>
			<h1 className="capitalize mx-2 my-1 text-lg">{t("suggestions")}</h1>
			<ProductGrid>
				{products && products.map((product) => (
					<StoreItem 
						variant="quick-add"
						key={product._id} 
						lang={lang} 
						data={product}
					/>
				))}
			</ProductGrid>
		</>

	);

};