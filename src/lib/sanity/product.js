import { urlFor } from "./client";
import { sanityFetch } from "./fetch";

function normalizeColors(colors) {

    const normalizedColors = colors.map(c => {

        const langEntries = c.translations.map(({ lang, value }) => [lang, value]);
        return {
            key: c.key,
            ...Object.fromEntries(langEntries),
        };

    });

    return (normalizedColors);

};

async function getProduct(query, tags = []) {

    const [product] = await sanityFetch({
        query,
        tags
    });

    if (product?.length == 0 || !product) return (null);

    const imageUrl = urlFor(product.images[0].asset._ref).url();
    product.cover = imageUrl;
    product.image_ref = product.images[0].asset;

    if (product.color) product.color = normalizeColors(product.color);
    if (product.variant) product.variant.map((v) => ({
        ...v,
        color: normalizeColors(v.color)
    }));

    return (product);

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

    const products = await sanityFetch({
        query
    });

    if (!products || products.length == 0) return (null);

    products.forEach((product) => {
        const imageURL = urlFor(product.images[0].asset._ref).url();
        product.cover = imageURL;
        product.image_ref = product.images[0].asset;
    })

    return (products);

};

async function getProductBySlug(slug) {

    const PRODUCT_QUERY = `*[_type == "product" && slug.current == "${slug}"]{
        ...,
        available_sizes[]->{
            size
        },
        variant[]->{
            _id,
            title,
            slug,
            price,
            images,
            color[]->{
                key,
                translations
            }
        },
        color[]->{
            key,
            translations
        }
    }`;

    const res = await getProduct(PRODUCT_QUERY, [`product:${slug}`]);
    return res;

};

async function getProductById(id) {

    const PRODUCT_QUERY = `*[_type == "product" && _id == "${id}"] { ..., available_sizes[] -> { size } }`;

    const res = await getProduct(PRODUCT_QUERY);
    return res;

};

export {
    getProductById,
    getProductBySlug,
    getProducts
};
