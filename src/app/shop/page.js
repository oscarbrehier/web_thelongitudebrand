'use client'
import { StoreItem } from "@/components/store/StoreItem";
import { useEffect, useRef, useState } from "react";
import { client } from "@/lib/sanity/client";
import { PageLayout } from "@/components/PageLayout";
import { PageContainer } from "@/components/container/page";

export default function Home() {

	const [data, setData] = useState({ products: null, filter: 'all' });
	const [columns, setColumns] = useState(null);

	useEffect(() => {

		async function getProducts() {

			const CONTENT_QUERY = '*[_type == "product"] { title, images, _type, _id, category ->  { _ref, _type, title }, price, slug }';
			const content = await client.fetch(CONTENT_QUERY);
			setData(previous => ({ ...previous, products: content }));

		};

		getProducts();

		function handleGrid() {

			setColumns(prevColumns => prevColumns === 3 ? 2 : 3);

		};

		setColumns(localStorage.getItem('gridcols') || 3);

		window.addEventListener('grid_change', handleGrid);
		return () => removeEventListener('grid_change', handleGrid);

	}, []);

	// const productsFilter = data.filter == 'all' ? data.products : data.products.filter(product => product.category.title == data.filter);

	return (

		<PageContainer>

			{/* <div className="h-auto w-full">

				<section className={`h-auto w-full grid ${columns == 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'}  md:grid-cols-2 grid-cols-1`}>

					{data.products && data.products.map((item, index) => (
						<StoreItem key={index} data={item} size={columns == 3 ? 'small' : 'big'} />
					))}

				</section>

			</div> */}

			<section className={`${data.products ? 'h-auto': 'h-screen'} w-full grid 2lg:grid-cols-3 md:grid-cols-2 grid-cols-1`}>

				{data.products && data.products.map((item, index) => (
					<StoreItem key={index} data={item} />
				))}

			</section>

		</PageContainer>

	);

}
