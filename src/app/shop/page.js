'use client'
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { PageContainer } from "@/components/container/page";
import { StoreItem } from "@/components/store/StoreItem";

export default function Home() {

	const [data, setData] = useState({ products: null, filter: 'all' });
	const [categories, setCategories] = useState([]);

	useEffect(() => {

		async function getProducts() {

			const CONTENT_QUERY = '*[_type == "product"] { title, images, _type, _id, category ->  { _ref, _type, title }, price, slug }';
			const content = await client.fetch(CONTENT_QUERY);

			const CATEGORY_QUERY = '*[_type == "category" && count(*[_type == "product" && references(^._id)]) > 0] { title }';
			const res_categories = await client.fetch(CATEGORY_QUERY);

			setCategories(['all', ...res_categories.map((category) => category.title).reverse()]);
			
			setData(previous => ({ ...previous, products: content }));

		};

		getProducts();

	}, []);

	const productsFilter = data.filter == 'all' ? data.products : data.products.filter(product => product.category.title == data.filter);

	return (

		<PageContainer className="pt-12 space-y-2">


			<div className="h-40 w-full flex flex-col justify-center md:items-start items-center space-y-3 my-10">

				<div className="bg-neon-green md:mx-32">
					<p className="capitalize font-playfair italic font-medium text-6xl">shop</p>
				</div>

			</div>

			<div className="w-full flex items-center text-sm space-x-4 cursor-pointer">

				{
					categories && categories.map((category) => (
						<a
							className={`${data.filter == category && "bg-neon-green"}`}
							onClick={() => setData(prev => ({ ...prev, filter: category }))}
						>
							{category}
						</a>
					))
				}

			</div>

			<div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

				{data.products && productsFilter.map((item, index) => (
					<StoreItem key={index} data={item} />
				))}


			</div>

		</PageContainer>

	);

}
