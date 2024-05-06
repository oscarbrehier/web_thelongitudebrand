import { client } from "./sanity/client";
import { deleteCart } from "./cart";

export const checkout = async (carts, cancel_url) => {
    
    let { stripe_cart, sanity_cart } = carts;

    let { url, id } = await fetch('/api/checkout-session', {
        method: 'POST',
        body: JSON.stringify({
            cart: stripe_cart,
            cancel_url
        }),
    }).then(res => res.json());

    sanity_cart['stripe_checkout_id'] = id;

    try {

        client.create(sanity_cart);
        deleteCart();

    } catch (err) {

        console.error(err);

    };

    return { url };

};