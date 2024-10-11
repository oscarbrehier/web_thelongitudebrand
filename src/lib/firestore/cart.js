import getCartFromDb from "./getCartFromDb";

export default async function addToCart(userId) {

    const cart = await getCartFromDb(userId);
    console.log(cart);

}