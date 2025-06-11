import { captureException } from "@sentry/nextjs";
import { sanityFetch } from "./fetch";

export async function getShopContent() {

	try {

		const products = await sanityFetch({
			query: `*[_type == "product"] { title, images, _type, _id, category ->  { _ref, _type, title }, price, slug }`,
			tags: ["products"]
		});

		const categories = await sanityFetch({
			query: `*[_type == "category" && count(*[_type == "product" && references(^._id)]) > 0] { title }`,
			tags: ["categories"]
		});

		const categoryTitles = ['view-all', ...categories.map((category) => category.title).reverse()]; 

		return ({
			products,
			categories: categoryTitles
		});

	} catch (err) {
		captureException(err);
		throw (err);
	};
 
};