import fetchUserWishlist from "./fetch";

export default async function isProductInWishlist(userId, productId) {

    const wishlist = await fetchUserWishlist(userId);
    const exists = wishlist ? wishlist.indexOf(productId) !== -1 : false;
    
    return exists;

};