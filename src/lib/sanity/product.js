import { client } from "./client";
import { parseSanityImage } from "./parseSanityImage";

async function getProduct(query) {

    const product = await client.fetch(query, {
        cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"
    });

    if (product.length == 0 || !product) return (null);

    const imageUrl = parseSanityImage(product[0].images[0].asset._ref);
    product[0].cover = imageUrl;
    product[0].image_ref = product[0].images[0].asset._ref;

    return (product[0]);

};

async function getProductBySlug(slug) {

    const PRODUCT_QUERY = `*[_type == "product" && slug.current == "${slug}"] { ..., available_sizes[] -> { size } }`;

    const res = await getProduct(PRODUCT_QUERY);
    return res;

};

async function getProductById(id) {

    const PRODUCT_QUERY = `*[_type == "product" && _id == "${id}"] { ..., available_sizes[] -> { size } }`;

    const res = await getProduct(PRODUCT_QUERY);
    return res;

};

async function getProducts(queryParams) {

    let filters = [`_type == "product"`];
    if (Array.isArray(queryParams.filters) && queryParams.filters.length != 0) {
        filters.push(queryParams.filters);
    }
    let query = `*[${filters.join(" && ")}]`;
    if (queryParams.maxItems) {
        query += `[0...${queryParams.maxItems}]`;
    }
    query += `{ title, images, _type, _id, category ->  { _ref, _type, title }, price, slug, available_sizes[] -> { size } }`;
    const products = await client.fetch(query, {
        cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache"
    });

    if (!products || products.length == 0) return (null);

    products.forEach((product) => {
        const imageURL = parseSanityImage(product.images[0].asset._ref);
        product.cover = imageURL;
        product.cover_ref = product.images[0].asset._ref
    })

    return (products);

};

export {
    getProductById,
    getProductBySlug,
    getProducts
};
