import createCart from "./createCart";

export default async function createCheckoutSession(items, cancelUrl) {

    const { cart } = createCart(items);
    const { origin } = window.location;

    try {

        let res = await fetch(`${origin}/api/checkout-session`, {
            method: 'POST',
            body: JSON.stringify({
                cart: cart,
                cancelUrl
            }),
        });

        if (res.ok) {

            const { url, id } = await res.json();
            return {
                url,
                id
            };

        } else {

            throw new Error("Failed to create a checkout session");

        };

    } catch (err) {

        throw err;

    };

};