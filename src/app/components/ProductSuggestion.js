"use client"
import { client } from "@/lib/sanity/client";
import { ProductGrid } from "./container/ProductGrid";
import { StoreItem } from "./store/StoreItem";
import { captureException } from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function ProductSuggestion({ lang }) {

	const [products, setProducts] = useState(null);
	const CONTENT_QUERY = '*[_type == "product"] { title, images, _type, _id, category ->  { _ref, _type, title }, price, slug }[0...4]';

	useEffect(() => {

		const fetchProducts = async () => {

			try {
				const res = await client.fetch(CONTENT_QUERY);
				setProducts(res);
			} catch (err) {
				captureException(err);
			};

		};

		fetchProducts();

	}, []);

	return (

		<>
			<h1 className="capitalize mx-2 my-1 text-lg">suggestions</h1>
			<ProductGrid>
				{products && products.map((product) => (
					<StoreItem key={product._id} lang={lang} data={product} />
				))}
			</ProductGrid>
		</>

	);

};