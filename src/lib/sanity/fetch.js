import { client } from "./client";

export async function sanityFetch({
	query,
	params = {},
	revalidate = 3600,
	tags = []
}) {

	return client
		.fetch(
			query,
			params,
			{
				next: {
					revalidate,
					tags
				}
			}
		);

};