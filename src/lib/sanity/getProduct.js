import { client } from "./client";

async function getProduct(query) {

    const product = await client.fetch(query);

    if (product.length == 0 || !product) return null;
    
    let image_url = `https://cdn.sanity.io/images/xgcgiqjg/production/${product[0].images[0].asset._ref.slice(6).replace('-png', '.png')}`
    product[0].cover = image_url;
    product[0].image_ref = product[0].images[0].asset._ref;

    return product[0];

}

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

export {
    getProductById,
    getProductBySlug
}