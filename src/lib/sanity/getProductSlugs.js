import { client } from "./client";

export default async function getProductSlugs() {

    const QUERY = `*[_type == "product"] { slug }`;

    try {

        const res = await client.fetch(QUERY);
        return res?.map((item) => item.slug.current) || [];

    } catch (err) {

        console.error("Failed to fetch product slugs:", err);
        return [];

    };

};